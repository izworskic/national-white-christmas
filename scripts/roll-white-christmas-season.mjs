#!/usr/bin/env node
// Build-time HTML season rollover. Never edits weather/climate data or API models.
import {readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {christmasSeasonYear, rollSeasonMarkup} from "./white-christmas-season-year.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = process.argv.find(x => x.startsWith("--year="));
const year = arg ? Number(arg.slice("--year=".length)) : christmasSeasonYear();
const dryRun = process.argv.includes("--dry-run");
const seasonState = JSON.parse(await readFile(path.join(root,"data/current-white-christmas-season.json"),"utf8"));
const contentChangedOn = seasonState.year === year && /^\d{4}-\d{2}-\d{2}$/.test(seasonState.activated_on || "") ? seasonState.activated_on : new Date().toISOString().slice(0,10);
const manifest = JSON.parse(await readFile(path.join(root,"public/white-christmas-route-manifest.json"),"utf8"));
const uniquePaths = [...new Set(manifest.routes.map(r => r.file))];
let changed = 0, oldYearReferences = 0;
for (const relative of uniquePaths) {
  if (!relative.startsWith("public/") || !relative.endsWith("/index.html") || relative.includes("..")) {
    throw new Error("Invalid route manifest backing file: " + relative);
  }
  const file = path.join(root,relative);
  const source = await readFile(file,"utf8");
  const next = rollSeasonMarkup(source,year,contentChangedOn);
  oldYearReferences += (source.match(/(?<![0-9])2026(?![0-9]|-[0-9]{2}-[0-9]{2})/g)||[]).length;
  if (source !== next) {
    changed++;
    if (!dryRun) await writeFile(file,next,"utf8");
  }
}
console.log(JSON.stringify({year,route_files:uniquePaths.length,year_references:oldYearReferences,changed,dryRun}));
