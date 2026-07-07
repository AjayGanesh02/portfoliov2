// One-time read-only dump of the Portfolio.Projects collection to scripts/mongo-backup.json.
import { MongoClient } from "mongodb";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const docs = await client.db("Portfolio").collection("Projects").find({}).toArray();
await client.close();

const out = join(root, "scripts", "mongo-backup.json");
writeFileSync(out, JSON.stringify(docs, null, 2));
console.log(`Dumped ${docs.length} docs to ${out}`);
for (const d of docs) {
  console.log(
    `- ${d.experience ? "[exp]" : "[proj]"} order=${d.order} name=${JSON.stringify(d.name)} ` +
      `mdDesc=${d.mdDesc ? d.mdDesc.length + " chars" : "MISSING"} img=${d.img ? "yes" : "no"} visit=${d.visit ? d.visit : "-"}`
  );
}
