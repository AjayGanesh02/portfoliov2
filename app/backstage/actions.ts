"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq, and } from "drizzle-orm";
import {
  checkPassword,
  createSessionToken,
  requireAdmin,
  SESSION_COOKIE,
} from "../../lib/auth";
import { slugify } from "../../lib/slugify";

async function getDb() {
  const { db } = await import("../../db");
  const { items } = await import("../../db/schema");
  return { db, items };
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const password = formData.get("password");
  if (typeof password !== "string" || !checkPassword(password)) {
    return { error: "Wrong password." };
  }
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/backstage");
}

export async function logout() {
  await requireAdmin();
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/backstage/login");
}

function str(formData: FormData, name: string): string | null {
  const v = formData.get(name);
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * Create or update a row. For github/resume identities the row acts as an
 * override (empty fields defer to the ingested source); for manual rows the
 * fields are the content itself.
 */
export async function upsertItem(formData: FormData) {
  await requireAdmin();
  const { db, items } = await getDb();

  const source = str(formData, "source") as "manual" | "github" | "resume" | null;
  const kind = str(formData, "kind") as "project" | "experience" | "education" | null;
  const title = str(formData, "title");
  let sourceKey = str(formData, "sourceKey");
  if (!source || !kind) throw new Error("source and kind are required");
  if (source === "manual" && !sourceKey) {
    if (!title) throw new Error("manual items need a title");
    sourceKey = slugify(title);
  }
  if (!sourceKey) throw new Error("sourceKey is required");

  const slug = str(formData, "slug") ?? slugify(title ?? sourceKey.split("/").pop()!);
  const sortOrderRaw = str(formData, "sortOrder");
  const values = {
    source,
    sourceKey,
    kind,
    slug,
    title,
    blurb: str(formData, "blurb"),
    bodyMd: str(formData, "bodyMd"),
    imageUrl: str(formData, "imageUrl"),
    tags: str(formData, "tags")?.split(",").map((t) => t.trim()).filter(Boolean) ?? null,
    externalUrl: str(formData, "externalUrl"),
    repoUrl: str(formData, "repoUrl"),
    dateRange: str(formData, "dateRange"),
    hidden: formData.get("hidden") === "on",
    sortOrder: sortOrderRaw == null ? null : Number(sortOrderRaw),
    updatedAt: new Date(),
  };

  await db
    .insert(items)
    .values(values)
    .onConflictDoUpdate({
      target: [items.source, items.sourceKey],
      set: values,
    });
  revalidateSite();
}

/** Delete a row. For github/resume rows this resets the item to its source. */
export async function deleteItem(formData: FormData) {
  await requireAdmin();
  const { db, items } = await getDb();
  const source = str(formData, "source");
  const sourceKey = str(formData, "sourceKey");
  if (!source || !sourceKey) throw new Error("source and sourceKey required");
  await db
    .delete(items)
    .where(and(eq(items.source, source as "manual"), eq(items.sourceKey, sourceKey)));
  revalidateSite();
}

/** Flip visibility; creates an override row if none exists yet. */
export async function toggleHidden(formData: FormData) {
  await requireAdmin();
  const { db, items } = await getDb();
  const source = str(formData, "source") as "manual" | "github" | "resume" | null;
  const sourceKey = str(formData, "sourceKey");
  const kind = str(formData, "kind") as "project" | "experience" | "education" | null;
  const slug = str(formData, "slug");
  if (!source || !sourceKey || !kind || !slug) throw new Error("missing identity fields");

  const existing = await db
    .select()
    .from(items)
    .where(and(eq(items.source, source), eq(items.sourceKey, sourceKey)));

  if (existing.length) {
    await db
      .update(items)
      .set({ hidden: !existing[0].hidden, updatedAt: new Date() })
      .where(eq(items.id, existing[0].id));
  } else {
    await db.insert(items).values({ source, sourceKey, kind, slug, hidden: true });
  }
  revalidateSite();
}
