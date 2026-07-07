export type ContentSource = "manual" | "github" | "resume";
export type ContentKind = "project" | "experience" | "education";

/** A fully merged content item, ready to render. */
export type ContentItem = {
  source: ContentSource;
  sourceKey: string;
  kind: ContentKind;
  slug: string;
  title: string;
  /** role for experiences, degree for education */
  subtitle?: string;
  location?: string;
  blurb?: string;
  bodyMd?: string;
  imageUrl?: string;
  tags?: string[];
  /** homepage / live-site link */
  externalUrl?: string;
  /** GitHub repository link, when the item is github-linked */
  repoUrl?: string;
  dateRange?: string;
  /**
   * Fallback ranking within a source when no explicit sortOrder is set.
   * Resume: reverse document position. GitHub: pushed_at epoch seconds.
   */
  defaultOrder: number;
  /** explicit ordering set in the admin (or migrated from Mongo) */
  sortOrder?: number | null;
  hidden: boolean;
  /** true when a DB row overrides at least one field of an ingested item */
  overridden?: boolean;
  /**
   * true for a github/resume DB row whose source no longer produces a matching
   * item (repo untagged, resume entry renamed, source fetch failed). The row's
   * own content still renders so nothing silently disappears.
   */
  orphaned?: boolean;
  /** DB row id backing this item (override row or manual row), if any */
  dbId?: number;
};

/** An item as produced by an ingestion source, before DB overrides. */
export type IngestedItem = Omit<ContentItem, "hidden" | "overridden" | "dbId" | "sortOrder">;
