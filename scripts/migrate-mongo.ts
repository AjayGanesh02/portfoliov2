/**
 * One-time MongoDB -> Postgres content migration.
 *
 * Reads every doc from the Portfolio.Projects collection (read-only; Mongo is
 * never modified) and inserts a row per doc into the Postgres `items` table
 * using scripts/migration-map.json to assign each doc a source identity:
 *   - github: doc becomes an override row attached to the repo (source_key)
 *   - resume: doc becomes an override row attached to the resume entry
 *   - manual: doc IS the content
 *
 * Usage:
 *   npx tsx scripts/migrate-mongo.ts --dry-run   # print plan, write scripts/mongo-backup.json
 *   npx tsx scripts/migrate-mongo.ts             # idempotent insert (ON CONFLICT DO NOTHING)
 *   npx tsx scripts/migrate-mongo.ts --verify    # diff Mongo docs vs Postgres rows
 */
import { MongoClient } from "mongodb";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "..");

// Load .env.local (tsx does not auto-load env files)
for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

type MongoDoc = {
  name: string;
  img?: string;
  tags?: string[];
  blurb?: string;
  mdDesc?: string;
  visit?: string;
  experience: boolean;
  order?: number;
};

type MapEntry = {
  source: "manual" | "github" | "resume";
  sourceKey: string;
  kind: "project" | "experience" | "education";
  slug: string;
  skipTitle?: boolean; // resume rows: let the resume drive the title
};

const map: Record<string, MapEntry> = JSON.parse(
  readFileSync(join(root, "scripts", "migration-map.json"), "utf8")
);

const dryRun = process.argv.includes("--dry-run");
const verify = process.argv.includes("--verify");

function toRow(doc: MongoDoc, entry: MapEntry) {
  return {
    source: entry.source,
    sourceKey: entry.sourceKey,
    kind: entry.kind,
    slug: entry.slug,
    title: entry.skipTitle ? null : doc.name,
    blurb: doc.blurb ?? null,
    bodyMd: doc.mdDesc ?? null,
    imageUrl: doc.img ?? null,
    tags: doc.tags ?? null,
    externalUrl: doc.visit ?? null,
    dateRange: null,
    hidden: false,
    sortOrder: doc.order ?? null,
  };
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const docs = (await client
    .db("Portfolio")
    .collection("Projects")
    .find({})
    .toArray()) as unknown as MongoDoc[];
  await client.close();

  const backupPath = join(root, "scripts", "mongo-backup.json");
  writeFileSync(backupPath, JSON.stringify(docs, null, 2));
  console.log(`Backed up ${docs.length} Mongo docs to ${backupPath}\n`);

  const unmapped = docs.filter((d) => !map[d.name]);
  if (unmapped.length) {
    console.error("UNMAPPED docs (add to migration-map.json):");
    for (const d of unmapped) console.error(`  - ${d.name}`);
    process.exit(1);
  }

  const rows = docs.map((d) => toRow(d, map[d.name]));

  if (dryRun) {
    for (const r of rows) {
      console.log(
        `${r.source.padEnd(6)} ${r.sourceKey.padEnd(35)} kind=${r.kind.padEnd(10)} slug=${r.slug.padEnd(32)} title=${r.title ?? "(from source)"} body=${r.bodyMd ? r.bodyMd.length + "ch" : "-"} order=${r.sortOrder}`
      );
    }
    console.log(`\nDry run only — nothing written to Postgres.`);
    return;
  }

  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
  const { db } = await import("../db");
  const { items } = await import("../db/schema");

  if (verify) {
    const pgRows = await db.select().from(items);
    let ok = 0;
    let bad = 0;
    for (const r of rows) {
      const match = pgRows.find(
        (p) => p.source === r.source && p.sourceKey === r.sourceKey
      );
      if (!match) {
        console.error(`MISSING in Postgres: ${r.source}:${r.sourceKey}`);
        bad++;
        continue;
      }
      const diffs: string[] = [];
      for (const f of ["slug", "title", "blurb", "bodyMd", "imageUrl", "externalUrl", "sortOrder"] as const) {
        if ((match[f] ?? null) !== (r[f] ?? null)) diffs.push(f);
      }
      if ((match.tags ?? []).join("|") !== (r.tags ?? []).join("|")) diffs.push("tags");
      if (diffs.length) {
        // Field drift is expected once the admin page edits rows — report, don't fail.
        console.log(`DRIFT   ${r.source}:${r.sourceKey} differs in: ${diffs.join(", ")}`);
      } else {
        console.log(`OK      ${r.source}:${r.sourceKey}`);
      }
      ok++;
    }
    console.log(`\n${ok}/${rows.length} docs present in Postgres, ${bad} missing. Total Postgres rows: ${pgRows.length}`);
    process.exit(bad ? 1 : 0);
  }

  let inserted = 0;
  for (const r of rows) {
    const res = await db.insert(items).values(r).onConflictDoNothing().returning({ id: items.id });
    if (res.length) inserted++;
  }
  console.log(`Inserted ${inserted} rows (${rows.length - inserted} already existed).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
