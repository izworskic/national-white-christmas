"""Deterministic tests for station identity, trace and missing records, and claim truth."""
import datetime as dt
import importlib.util
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("white_christmas_climate_audit", ROOT / "scripts/white_christmas_climate_audit.py")
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


def record(sid="STATION-A", whites=21, missing=0, extra=None):
    data = []
    for year in range(1991, 2021):
        offset = year - 1991
        value = "M" if offset < missing else ("2" if offset - missing < whites else "0")
        data.append([f"{year}-12-25", value])
    data.extend(extra or [])
    return {"station_id": sid, "station_name": "Unit test station", "data": data}


class ClimateAuditTests(unittest.TestCase):
    def test_trace_missing_and_threshold(self):
        self.assertIsNone(audit.snow_depth_inches("M"))
        self.assertIsNone(audit.snow_depth_inches(""))
        self.assertEqual(audit.snow_depth_inches("T"), 0)
        self.assertEqual(audit.snow_depth_inches("0.9"), 0.9)
        self.assertIsNone(audit.snow_depth_inches("-1"))
        self.assertIsNone(audit.snow_depth_inches("not observed"))

    def test_one_inch_december_25_and_denominator(self):
        rows = record(whites=19, missing=2)["data"]
        rows.extend([["2000-12-24", "30"], ["2000-12-26", "30"], ["2021-12-25", "30"]])
        result = audit.audit_station({"station_id": "COOP-X", "data": rows})
        self.assertEqual(result["valid_years"], 28)
        self.assertEqual(result["white_years"], 19)
        self.assertEqual(result["observed_sample_percent"], 67.9)
        self.assertEqual(result["missing_years"], [1991, 1992])
        self.assertEqual(result["classification"], "sample_only")

    def test_duplicates_do_not_create_false_certainty(self):
        candidate = record(whites=25, extra=[["1994-12-25", "M"]])
        result = audit.audit_station(candidate)
        self.assertEqual(result["valid_years"], 30)
        self.assertEqual(result["white_years"], 25)
        self.assertEqual(result["classification"], "conflicting_input")
        self.assertEqual(result["duplicate_years"], [1994])

    def test_insufficient_records_cannot_validate_claim(self):
        candidate = audit.audit_station(record(whites=5, missing=20))
        self.assertEqual(candidate["classification"], "insufficient")
        result, _ = audit.evaluate_claims([{
            "label":"Old claim", "place":"Test", "station_id":"STATION-A",
            "baseline_period":"1991-2020", "threshold_inches":1, "percent":50,
        }], [candidate])
        self.assertEqual(result[0]["status"], "station_sample_inadequate")

    def test_same_station_comparison_but_no_city_to_station_guess(self):
        s = audit.audit_station(record("MARQ-TEST", whites=27))
        claims = [
            {"label":"A", "place":"Marquette, Michigan", "percent":85, "station_id":None,
             "baseline_period":"1991-2020", "threshold_inches":1},
            {"label":"B", "place":"Marquette, Michigan", "percent":96, "station_id":None,
             "baseline_period":"1991-2020", "threshold_inches":1},
            {"label":"C", "place":"Another", "percent":90, "station_id":"MARQ-TEST",
             "baseline_period":"1991-2020", "threshold_inches":1},
            {"label":"D", "place":"Another", "percent":77, "station_id":"MARQ-TEST",
             "baseline_period":"1991-2020", "threshold_inches":1},
        ]
        results, differences = audit.evaluate_claims(claims, [s])
        self.assertEqual(results[0]["status"], "station_identity_unknown")
        self.assertEqual(results[1]["status"], "station_identity_unknown")
        self.assertEqual(results[2]["status"], "consistent_with_sample")
        self.assertEqual(results[3]["status"], "needs_review")
        self.assertEqual(differences[0]["status"], "requires_station_period_threshold_reconciliation")

    def test_claim_ledger_flags_marquette_without_verifying_numbers(self):
        ledger = json.loads((ROOT/"data/white-christmas-claim-ledger.json").read_text("utf-8"))
        report = audit.build_report([], ledger["claims"])
        self.assertTrue(any(x["place"]=="marquette, michigan" for x in report["unresolved_location_discrepancies"]))
        self.assertTrue(all(c["status"]=="station_identity_unknown" for c in report["claims"]))
        self.assertIn("Do not overwrite", report["warning"])

    def test_acis_identity_rejects_url_injection(self):
        with self.assertRaises(ValueError):
            audit.fetch_station("https://invalid.example/data")
        self.assertTrue(audit.STATION_ID.fullmatch("USW00014838 6"))


if __name__ == "__main__":
    unittest.main()
