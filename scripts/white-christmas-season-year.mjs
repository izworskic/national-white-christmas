// Shared pure seasonal calendar for build output and deterministic tests.
// The upcoming Christmas changes on December 26 UTC, not on a hardcoded year.
export const BASE_YEAR = 2026;
export function christmasSeasonYear(now = new Date()) {
  const date = now instanceof Date ? now : new Date(now);
  if (!Number.isFinite(date.getTime())) throw new RangeError("Invalid calendar date");
  const year = date.getUTCFullYear();
  return year + (date.getTime() > Date.UTC(year, 11, 25, 23, 59, 59, 999) ? 1 : 0);
}
export function rollSeasonMarkup(html, year, contentChangedOn = String(year - 1) + '-12-26') {
  if (!Number.isInteger(year) || year < BASE_YEAR || year > 2100) throw new RangeError("Invalid Christmas season year");
  if (typeof html !== "string") throw new TypeError("Expected HTML source");
  // Generated source contains year-specific 2026 claims. Version strings and real
  // publication dates such as 2026-10-26 must not be rewritten.
  let result = html.replace(/(?<![0-9])2026(?![0-9]|-[0-9]{2}-[0-9]{2})/g, String(year));
  if (year > BASE_YEAR) {
    // In production use the recorded actual activation/build date, never invent
    // a modified date from the intended seasonal calendar alone.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(contentChangedOn)) throw new RangeError("Invalid annual content change date");
    result = result.replace(/"dateModified":"2026-[0-9]{2}-[0-9]{2}"/g,
      '"dateModified":"' + contentChangedOn + '"');
  }
  return result;
}
