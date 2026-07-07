import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const contentSource = pgEnum("content_source", [
  "manual",
  "github",
  "resume",
]);

export const contentKind = pgEnum("content_kind", [
  "project",
  "experience",
  "education",
]);

/**
 * Unified content table. For source='manual' the fields ARE the content.
 * For source='github'/'resume' the row is an override: non-null fields
 * replace the ingested values, and `hidden` removes the item from the site.
 */
export const items = pgTable(
  "items",
  {
    id: serial("id").primaryKey(),
    source: contentSource("source").notNull(),
    // manual: slug; github: "AjayGanesh02/<repo>"; resume: "experience/meta"
    sourceKey: text("source_key").notNull(),
    kind: contentKind("kind").notNull(),
    slug: text("slug").notNull().unique(),
    title: text("title"),
    blurb: text("blurb"),
    bodyMd: text("body_md"),
    imageUrl: text("image_url"),
    tags: text("tags").array(),
    externalUrl: text("external_url"),
    repoUrl: text("repo_url"),
    dateRange: text("date_range"),
    hidden: boolean("hidden").notNull().default(false),
    sortOrder: integer("sort_order"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [unique().on(t.source, t.sourceKey)]
);

export type ItemRow = typeof items.$inferSelect;
export type NewItemRow = typeof items.$inferInsert;
