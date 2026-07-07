import octokit from "../octokit";
import { slugify } from "../slugify";
import { parseResume, type ResumeEntry } from "./latex";
import type { IngestedItem } from "../types";
import type { IngestResult } from "./github";

const RESUME_OWNER = "AjayGanesh02";
const RESUME_REPO = "AGResume";
const RESUME_PATH = "main.tex";

export type ResumeIngestResult = IngestResult & {
  skills?: { label: string; values: string }[];
  warnings?: string[];
};

function bulletsToMarkdown(bullets: string[]): string | undefined {
  if (!bullets.length) return undefined;
  return bullets.map((b) => `- ${b}`).join("\n");
}

function entryToItem(
  entry: ResumeEntry,
  kind: "experience" | "education" | "project",
  keyPrefix: string,
  defaultOrder: number
): IngestedItem {
  const slug = slugify(entry.heading);
  return {
    source: "resume",
    sourceKey: `${keyPrefix}/${slug}`,
    kind,
    slug,
    title: entry.heading,
    subtitle: entry.subheading,
    location: entry.location,
    dateRange: entry.dates,
    bodyMd: bulletsToMarkdown(entry.bullets),
    defaultOrder,
  };
}

/** Fetch main.tex from the AGResume repo and parse it into content items. */
export async function fetchResumeItems(): Promise<ResumeIngestResult> {
  let tex: string;
  try {
    const res = await octokit.rest.repos.getContent({
      owner: RESUME_OWNER,
      repo: RESUME_REPO,
      path: RESUME_PATH,
      mediaType: { format: "raw" },
    });
    tex = res.data as unknown as string;
  } catch (e) {
    return {
      items: [],
      error: `Resume fetch failed: ${e instanceof Error ? e.message : e}`,
    };
  }

  try {
    const parsed = parseResume(tex);
    const items: IngestedItem[] = [
      // reverse document position: first entry ranks highest
      ...parsed.experience.map((e, i) =>
        entryToItem(e, "experience", "experience", parsed.experience.length - i)
      ),
      ...parsed.projects.map((p, i) =>
        entryToItem(p, "project", "projects", parsed.projects.length - i)
      ),
      ...parsed.education.map((e, i) =>
        entryToItem(e, "education", "education", parsed.education.length - i)
      ),
    ];
    return { items, skills: parsed.skills, warnings: parsed.warnings };
  } catch (e) {
    return {
      items: [],
      error: `Resume parse failed: ${e instanceof Error ? e.message : e}`,
    };
  }
}
