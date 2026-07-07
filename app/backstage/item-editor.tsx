"use client";

import { useState } from "react";
import type { ContentItem } from "../../lib/types";
import { upsertItem, deleteItem, toggleHidden } from "./actions";

const inputCls =
  "w-full rounded border border-neutral-300 bg-transparent px-2 py-1 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700";
const btnCls =
  "rounded border border-neutral-300 px-2 py-1 font-mono text-xs text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100";

function Field({
  label,
  name,
  defaultValue,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-0.5 block font-mono text-xs text-neutral-500">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue ?? ""}
          rows={6}
          className={`${inputCls} font-mono`}
        />
      ) : (
        <input name={name} defaultValue={defaultValue ?? ""} className={inputCls} />
      )}
    </label>
  );
}

export function ItemEditor({ item }: { item: ContentItem }) {
  const [open, setOpen] = useState(false);
  const ingested = item.source !== "manual";

  return (
    <li className="rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <span className={`font-medium ${item.hidden ? "line-through opacity-50" : ""}`}>
            {item.title}
          </span>
          <span className="ml-2 font-mono text-xs text-neutral-500">
            {item.sourceKey} · {item.kind}
            {item.overridden && " · overridden"}
            {item.orphaned && " · orphaned"}
            {item.hidden && " · hidden"}
          </span>
        </div>
        <div className="flex shrink-0 gap-2">
          <form action={toggleHidden}>
            <input type="hidden" name="source" value={item.source} />
            <input type="hidden" name="sourceKey" value={item.sourceKey} />
            <input type="hidden" name="kind" value={item.kind} />
            <input type="hidden" name="slug" value={item.slug} />
            <button className={btnCls}>{item.hidden ? "show" : "hide"}</button>
          </form>
          <button className={btnCls} onClick={() => setOpen((o) => !o)}>
            {open ? "close" : "edit"}
          </button>
          {item.dbId != null && (
            <form
              action={deleteItem}
              onSubmit={(e) => {
                const msg =
                  item.source === "manual"
                    ? `Permanently delete "${item.title}"?`
                    : `Remove the override for "${item.title}" and reset it to its source values?`;
                if (!confirm(msg)) e.preventDefault();
              }}
            >
              <input type="hidden" name="source" value={item.source} />
              <input type="hidden" name="sourceKey" value={item.sourceKey} />
              <button className={btnCls}>{item.source === "manual" ? "delete" : "reset"}</button>
            </form>
          )}
        </div>
      </div>

      {open && (
        <form action={upsertItem} className="mt-3 space-y-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
          <input type="hidden" name="source" value={item.source} />
          <input type="hidden" name="sourceKey" value={item.sourceKey} />
          <input type="hidden" name="kind" value={item.kind} />
          {ingested && (
            <p className="font-mono text-xs text-neutral-500">
              Saved values override the ingested ones; blank fields defer to the source.
            </p>
          )}
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="title" name="title" defaultValue={item.title} />
            <Field label="slug" name="slug" defaultValue={item.slug} />
            <Field label="date range" name="dateRange" defaultValue={item.dateRange} />
            <Field label="sort order" name="sortOrder" defaultValue={item.sortOrder ?? ""} />
            <Field label="external url" name="externalUrl" defaultValue={item.externalUrl} />
            <Field label="image url" name="imageUrl" defaultValue={item.imageUrl} />
          </div>
          <Field label="tags (comma-separated)" name="tags" defaultValue={item.tags?.join(", ")} />
          <Field label="blurb" name="blurb" defaultValue={item.blurb} />
          <Field label="body (markdown)" name="bodyMd" defaultValue={item.bodyMd} textarea />
          <label className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            <input type="checkbox" name="hidden" defaultChecked={item.hidden} /> hidden
          </label>
          <button className={btnCls}>save</button>
        </form>
      )}
    </li>
  );
}

export function NewItemForm() {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <button className={btnCls} onClick={() => setOpen(true)}>
        + new manual item
      </button>
    );
  }
  return (
    <form
      action={upsertItem}
      className="space-y-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800"
    >
      <input type="hidden" name="source" value="manual" />
      <div className="grid gap-2 sm:grid-cols-2">
        <Field label="title (required)" name="title" />
        <label className="block">
          <span className="mb-0.5 block font-mono text-xs text-neutral-500">kind</span>
          <select name="kind" className={inputCls} defaultValue="project">
            <option value="project">project</option>
            <option value="experience">experience</option>
            <option value="education">education</option>
          </select>
        </label>
        <Field label="date range" name="dateRange" />
        <Field label="sort order" name="sortOrder" />
        <Field label="external url" name="externalUrl" />
        <Field label="image url" name="imageUrl" />
      </div>
      <Field label="tags (comma-separated)" name="tags" />
      <Field label="blurb" name="blurb" />
      <Field label="body (markdown)" name="bodyMd" textarea />
      <div className="flex gap-2">
        <button className={btnCls}>create</button>
        <button type="button" className={btnCls} onClick={() => setOpen(false)}>
          cancel
        </button>
      </div>
    </form>
  );
}
