# ajayganesh.com

Personal site, built with Next.js (App Router), Tailwind CSS v4, and Drizzle +
Neon Postgres. Minimal, typography-first design with system-aware light/dark
theming.

## Content sources

The site merges three sources at render time (`lib/content.ts`):

1. **GitHub** (`lib/ingest/github.ts`) — public repos of `AjayGanesh02`
   tagged with the `portfolio` topic become projects. Add the topic to a repo
   and it shows up on the site within an hour.
2. **Resume** (`lib/ingest/resume.ts`) — `main.tex` from
   [AGResume](https://github.com/AjayGanesh02/AGResume) is fetched and parsed
   (`lib/ingest/latex.ts`); experience, education, and resume projects come
   from there. Push a resume update and the site follows.
3. **Postgres** (`db/schema.ts`, one `items` table) — manual entries, plus
   per-item **overrides** for the two sources above: any non-null column
   replaces the ingested value, `hidden` removes an item from the public site.
   Rows whose source item disappears (untagged repo, renamed resume entry)
   still render from their stored content, so nothing is ever silently lost.

## Admin

`/backstage` (unlinked, `noindex`) shows everything being ingested per source,
with inline editing, hide toggles, manual item CRUD, and ingestion warnings.
Auth: `ADMIN_PASSWORD` + signed session cookie (`ADMIN_SESSION_SECRET`),
enforced by `middleware.ts` and re-checked in every server action.

## Development

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

Useful scripts:

```bash
node --import tsx --test lib/ingest/latex.test.ts   # resume parser tests
npx tsx scripts/print-content.ts                    # dump merged content
npx tsx scripts/migrate-mongo.ts --dry-run          # (historical) Mongo migration
npx drizzle-kit push                                # apply schema to Postgres
```

The legacy MongoDB content was migrated with `scripts/migrate-mongo.ts`
(idempotent; `--verify` diffs Mongo against Postgres). Mongo itself was left
untouched as an archive.
