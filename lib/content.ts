import { fetchGithubItems } from "./ingest/github";
import { fetchResumeItems } from "./ingest/resume";
import type { ContentItem, ContentKind } from "./types";
import type { ItemRow } from "../db/schema";

export type SiteContent = {
  projects: ContentItem[];
  experiences: ContentItem[];
  education: ContentItem[];
  skills: { label: string; values: string }[];
  /** ingestion/DB problems, surfaced on the admin page */
  warnings: string[];
};

const OVERRIDE_FIELDS = [
  "title",
  "blurb",
  "bodyMd",
  "imageUrl",
  "tags",
  "externalUrl",
  "dateRange",
] as const;

function applyRow(item: ContentItem, row: ItemRow): ContentItem {
  const merged: ContentItem = { ...item, dbId: row.id, hidden: row.hidden, sortOrder: row.sortOrder };
  let overridden = row.hidden || row.sortOrder != null;
  for (const f of OVERRIDE_FIELDS) {
    const v = row[f];
    if (v != null) {
      (merged as Record<string, unknown>)[f] = v;
      overridden = true;
    }
  }
  merged.slug = row.slug; // slugs live in the DB so detail URLs are stable
  merged.overridden = overridden;
  return merged;
}

function rowToItem(row: ItemRow): ContentItem {
  return {
    source: row.source,
    sourceKey: row.sourceKey,
    kind: row.kind,
    slug: row.slug,
    title: row.title ?? row.sourceKey.split("/").pop() ?? row.sourceKey,
    blurb: row.blurb ?? undefined,
    bodyMd: row.bodyMd ?? undefined,
    imageUrl: row.imageUrl ?? undefined,
    tags: row.tags ?? undefined,
    externalUrl: row.externalUrl ?? undefined,
    // a github-sourced row still links to its repo even when the repo
    // isn't topic-tagged (or the API call failed)
    repoUrl: row.source === "github" ? `https://github.com/${row.sourceKey}` : undefined,
    dateRange: row.dateRange ?? undefined,
    defaultOrder: 0,
    sortOrder: row.sortOrder,
    hidden: row.hidden,
    orphaned: row.source !== "manual",
    dbId: row.id,
  };
}

/** Explicitly ordered items first (desc), then source-default order (desc). */
function byRank(a: ContentItem, b: ContentItem): number {
  const aHas = a.sortOrder != null;
  const bHas = b.sortOrder != null;
  if (aHas && bHas && a.sortOrder !== b.sortOrder) return b.sortOrder! - a.sortOrder!;
  if (aHas !== bHas) return aHas ? -1 : 1;
  return b.defaultOrder - a.defaultOrder;
}

async function fetchRows(): Promise<{ rows: ItemRow[]; error?: string }> {
  try {
    const { db } = await import("../db");
    const { items } = await import("../db/schema");
    return { rows: await db.select().from(items) };
  } catch (e) {
    return { rows: [], error: `Database unavailable: ${e instanceof Error ? e.message : e}` };
  }
}

/**
 * Merge the three content sources:
 *  - ingested items (GitHub repos, resume entries) get their matching DB row
 *    applied as an override (non-null fields win, `hidden` filters)
 *  - DB rows without a matching ingested item render standalone, so content
 *    never disappears when a source is unreachable or an item is untagged
 */
export async function getContent(
  { includeHidden = false }: { includeHidden?: boolean } = {}
): Promise<SiteContent> {
  const [github, resume, dbRes] = await Promise.all([
    fetchGithubItems(),
    fetchResumeItems(),
    fetchRows(),
  ]);

  const warnings: string[] = [];
  if (github.error) warnings.push(github.error);
  if (resume.error) warnings.push(resume.error);
  if (resume.warnings?.length) warnings.push(...resume.warnings);
  if (dbRes.error) warnings.push(dbRes.error);

  const rowByKey = new Map(dbRes.rows.map((r) => [`${r.source}:${r.sourceKey}`, r]));
  const consumed = new Set<string>();
  const merged: ContentItem[] = [];

  for (const ingested of [...resume.items, ...github.items]) {
    const key = `${ingested.source}:${ingested.sourceKey}`;
    const row = rowByKey.get(key);
    if (row) {
      consumed.add(key);
      merged.push(applyRow({ ...ingested, hidden: false }, row));
    } else {
      merged.push({ ...ingested, hidden: false });
    }
  }

  for (const row of dbRes.rows) {
    if (!consumed.has(`${row.source}:${row.sourceKey}`)) merged.push(rowToItem(row));
  }

  const visible = includeHidden ? merged : merged.filter((i) => !i.hidden);
  const ofKind = (kind: ContentKind) => visible.filter((i) => i.kind === kind).sort(byRank);

  return {
    projects: ofKind("project"),
    experiences: ofKind("experience"),
    education: ofKind("education"),
    skills: resume.skills ?? [],
    warnings,
  };
}
