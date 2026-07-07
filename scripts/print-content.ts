/** Prints the merged site content — sanity check for the ingest + merge layer. */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "..");
for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

async function main() {
  const { getContent } = await import("../lib/content");
  const content = await getContent({ includeHidden: true });

  for (const [label, items] of [
    ["EXPERIENCE", content.experiences],
    ["PROJECTS", content.projects],
    ["EDUCATION", content.education],
  ] as const) {
    console.log(`\n=== ${label} ===`);
    for (const i of items) {
      const flags = [
        i.hidden && "HIDDEN",
        i.overridden && "overridden",
        i.orphaned && "orphaned",
      ]
        .filter(Boolean)
        .join(",");
      console.log(
        `${(i.sortOrder ?? "-").toString().padStart(2)} | ${i.source.padEnd(6)} | ${i.slug.padEnd(32)} | ${i.title.padEnd(40)} | ${i.dateRange ?? ""} ${flags ? "[" + flags + "]" : ""}`
      );
      if (i.subtitle) console.log(`     ${" ".repeat(9)}${i.subtitle}`);
    }
  }
  console.log(`\n=== SKILLS ===`);
  for (const s of content.skills) console.log(`${s.label}: ${s.values}`);
  console.log(`\n=== WARNINGS ===`);
  for (const w of content.warnings) console.log(`! ${w}`);
  if (!content.warnings.length) console.log("(none)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
