#!/usr/bin/env python3
"""Audit ACIS Christmas snow-depth station data without changing live probabilities.

Default mode is offline, deterministic and stdlib-only. The optional --station
mode fetches public ACIS StnData records explicitly, never during a site build.
This is an observational station sample, not an official NOAA 1991-2020 normal.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import math
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

START_YEAR = 1991
END_YEAR = 2020
THRESHOLD_INCHES = 1.0
SOURCE_URL = "https://data.rcc-acis.org/StnData"
STATION_ID = re.compile(r"^[A-Za-z0-9_-]{2,36}(?: [0-9])?$")


def snow_depth_inches(raw):
    """T is a trace below the one-inch threshold; M and blank are missing."""
    if isinstance(raw, (list, tuple)):
        raw = raw[0] if raw else None
    if raw is None or isinstance(raw, bool):
        return None
    if isinstance(raw, str):
        value = raw.strip().upper()
        if value in {"M", "", "NA", "N/A", "NULL"}:
            return None
        if value == "T":
            return 0.0
        raw = value
    try:
        number = float(raw)
    except (TypeError, ValueError):
        return None
    if not math.isfinite(number) or number < 0:
        return None
    return number


def christmas_observations(rows):
    """One observation per December 25 year; duplicates are reported, not counted twice."""
    seen = {}
    duplicates = set()
    for row in rows:
        if not isinstance(row, (list, tuple)) or len(row) < 2:
            continue
        date = str(row[0])
        if not re.fullmatch(r"\d{4}-12-25", date):
            continue
        year = int(date[:4])
        if not START_YEAR <= year <= END_YEAR:
            continue
        value = snow_depth_inches(row[1])
        if year in seen:
            duplicates.add(year)
        else:
            seen[year] = value
    return seen, sorted(duplicates)


def audit_station(record):
    if not isinstance(record, dict):
        raise ValueError("Station entry must be an object")
    meta = record.get("meta") or {}
    station_id = str(record.get("station_id") or record.get("sid") or meta.get("uid") or "").strip()
    if not station_id:
        raise ValueError("Station entry needs station_id or sid (never infer city station identity)")
    observed, duplicates = christmas_observations(record.get("data", []))
    valid = {year: depth for year, depth in observed.items() if depth is not None}
    white = [year for year, depth in valid.items() if depth >= THRESHOLD_INCHES]
    missing = [year for year in range(START_YEAR, END_YEAR + 1) if year not in valid]
    count = len(valid)
    probability = round(100 * len(white) / count, 1) if count else None
    issues = []
    if duplicates:
        issues.append("duplicate_christmas_observations")
    if count < 15:
        issues.append("insufficient_valid_years")
    elif count < 25:
        issues.append("incomplete_station_coverage")
    if len(missing) > 0:
        issues.append("missing_christmas_records")
    status = "conflicting_input" if duplicates else ("insufficient" if count < 15 else "sample_only")
    return {
        "station_id": station_id,
        "station_name": record.get("station_name") or meta.get("name") or None,
        "station_lat_lon": meta.get("ll"),
        "station_elevation_ft": meta.get("elev"),
        "baseline_period": "1991-2020",
        "definition": "Observed snow depth at least 1 inch on December 25",
        "valid_years": count,
        "white_years": len(white),
        "missing_years": missing,
        "duplicate_years": duplicates,
        "observed_sample_percent": probability,
        "classification": status,
        "issues": issues,
        "provenance": "ACIS StnData observations, not a published NCEI Climate Normal",
    }


def evaluate_claims(claims, stations, tolerance=2.0):
    """Never compare city labels as if they establish identical climate stations."""
    known = {s["station_id"]: s for s in stations}
    results = []
    for claim in claims:
        label = str(claim.get("label") or "Unnamed claim")
        sid = claim.get("station_id")
        pct = claim.get("percent")
        period = claim.get("baseline_period")
        threshold = claim.get("threshold_inches")
        result = {"label": label, "claimed_percent": pct, "station_id": sid,
                  "reference": claim.get("source_url"), "status": "unverified", "difference_points": None}
        if not sid:
            result["status"] = "station_identity_unknown"
        elif period != "1991-2020" or threshold != 1:
            result["status"] = "incomparable_period_or_threshold"
        elif sid not in known:
            result["status"] = "station_not_fetched"
        elif known[sid]["classification"] != "sample_only":
            result["status"] = "station_sample_inadequate"
        elif not isinstance(pct, (int, float)) or not (0 <= pct <= 100):
            result["status"] = "invalid_claim"
        else:
            difference = round(float(pct) - known[sid]["observed_sample_percent"], 1)
            result["difference_points"] = difference
            result["status"] = "needs_review" if abs(difference) > tolerance else "consistent_with_sample"
        results.append(result)
    # Differing city-wide probabilities with unknown station IDs are a provenance
    # problem, NOT a statistical contradiction or evidence one number is correct.
    grouped = {}
    for c in claims:
        grouped.setdefault(str(c.get("place") or "").strip().casefold(), []).append(c)
    discrepancies = []
    for place, group in grouped.items():
        vals = [g.get("percent") for g in group if isinstance(g.get("percent"), (int, float))]
        if place and len(vals) > 1 and max(vals) - min(vals) > tolerance:
            discrepancies.append({
                "place": place, "reported_percentages": sorted(set(vals)),
                "status": "requires_station_period_threshold_reconciliation",
                "reason": "A location name alone does not establish common observing station or methodology",
            })
    return results, discrepancies


def fetch_station(sid):
    if not STATION_ID.fullmatch(sid):
        raise ValueError("Invalid public ACIS station identifier")
    body = {
        "sid": sid, "sdate": "1991-01-01", "edate": "2020-12-31",
        "meta": ["name", "state", "sids", "ll", "elev", "uid"],
        "elems": "snwd",
    }
    request = urllib.request.Request(
        SOURCE_URL, data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json",
                 "Accept": "application/json",
                 "User-Agent": "FreighterViewFarms-WhiteChristmasAudit/1.0"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=12) as response:
        payload = json.load(response)
    if not isinstance(payload, dict) or not isinstance(payload.get("data"), list):
        raise ValueError("Unexpected ACIS response for " + sid)
    payload["station_id"] = sid
    return payload


def build_report(stations, claims):
    results = [audit_station(station) for station in stations]
    claim_results, discrepancies = evaluate_claims(claims, results)
    return {
        "audit": "White Christmas December 25 observed station samples",
        "period": "1991-2020", "threshold_inches": THRESHOLD_INCHES,
        "stations": results, "claims": claim_results, "unresolved_location_discrepancies": discrepancies,
        "warning": "Do not overwrite live API/model probabilities or official NOAA normal values from this report alone.",
        "source_docs": ["https://docs.rcc-acis.org/acisws/", "https://www.ncei.noaa.gov/news/white-christmas"],
    }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, help="Offline JSON with stations and optional claims")
    parser.add_argument("--station", action="append", default=[], metavar="ACIS_SID",
                        help="Explicitly fetch public ACIS StnData for this station")
    parser.add_argument("--claims", type=Path, help="Additional claims ledger JSON with a claims array")
    parser.add_argument("--output", type=Path, help="Write JSON report to this path")
    parser.add_argument("--strict", action="store_true", help="Fail on comparable, adequately sampled station discrepancies")
    args = parser.parse_args(argv)
    if not args.input and not args.station and not args.claims:
        parser.error("Provide --input, --station or --claims")
    source = json.loads(args.input.read_text("utf-8")) if args.input else {}
    if not isinstance(source, dict):
        parser.error("Input must be an object with stations and claims arrays")
    stations = list(source.get("stations") or [])
    claims = list(source.get("claims") or [])
    if args.claims:
        ledger = json.loads(args.claims.read_text("utf-8"))
        claims.extend(ledger.get("claims") or [])
    try:
        stations.extend(fetch_station(sid) for sid in args.station)
        report = build_report(stations, claims)
    except (ValueError, urllib.error.URLError) as error:
        parser.exit(2, "Climate audit unavailable: " + str(error) + "\n")
    payload = json.dumps(report, indent=2, sort_keys=True) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(payload, encoding="utf-8")
    else:
        sys.stdout.write(payload)
    if args.strict and any(c["status"] == "needs_review" for c in report["claims"]):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
