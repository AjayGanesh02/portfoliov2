import octokit from "../octokit";
import { slugify } from "../slugify";
import type { IngestedItem } from "../types";

const GITHUB_USER = "AjayGanesh02";
const PORTFOLIO_TOPIC = "portfolio";

export type IngestResult = {
  items: IngestedItem[];
  error?: string;
};

/**
 * Public repos of GITHUB_USER tagged with the `portfolio` topic become
 * project items. The repo link comes along for free; the homepage field
 * becomes the external "visit" link.
 */
export async function fetchGithubItems(): Promise<IngestResult> {
  try {
    const repos = await octokit.paginate("GET /users/{username}/repos", {
      username: GITHUB_USER,
      per_page: 100,
      sort: "pushed",
    });
    const items = repos
      .filter((r) => (r.topics ?? []).includes(PORTFOLIO_TOPIC))
      .map((r): IngestedItem => ({
        source: "github",
        sourceKey: r.full_name,
        kind: "project",
        slug: slugify(r.name),
        title: r.name,
        blurb: r.description ?? undefined,
        tags: (r.topics ?? []).filter((t) => t !== PORTFOLIO_TOPIC),
        externalUrl: r.homepage || undefined,
        repoUrl: r.html_url,
        defaultOrder: r.pushed_at ? Math.floor(new Date(r.pushed_at).getTime() / 1000) : 0,
      }));
    return { items };
  } catch (e) {
    return { items: [], error: `GitHub ingestion failed: ${e instanceof Error ? e.message : e}` };
  }
}
