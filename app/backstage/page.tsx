import { getContent } from "../../lib/content";
import type { ContentItem } from "../../lib/types";
import { ItemEditor, NewItemForm } from "./item-editor";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

function Panel({ title, items }: { title: string; items: ContentItem[] }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 font-mono text-sm text-neutral-500">
        {"// "}
        {title}{" "}
        <span className="text-neutral-400 dark:text-neutral-600">({items.length})</span>
      </h2>
      {items.length ? (
        <ul className="space-y-2">
          {items.map((i) => (
            <ItemEditor key={`${i.source}:${i.sourceKey}`} item={i} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-neutral-500">nothing ingested</p>
      )}
    </section>
  );
}

export default async function BackstagePage() {
  const { projects, experiences, education, warnings } = await getContent({
    includeHidden: true,
  });
  const all = [...experiences, ...education, ...projects];
  const bySource = (s: ContentItem["source"]) => all.filter((i) => i.source === s);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-mono text-sm text-neutral-500">{"// backstage"}</h1>
        <form action={logout}>
          <button className="font-mono text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
            logout
          </button>
        </form>
      </div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Everything the site ingests, from all three sources. Items shown here
        include hidden ones (struck through); the public site hides them.
        Editing an ingested item stores an override row — blank fields keep
        deferring to the source.
      </p>

      {warnings.length > 0 && (
        <div className="mt-6 rounded-md border border-amber-400 p-3 text-sm text-amber-700 dark:border-amber-600 dark:text-amber-400">
          <p className="mb-1 font-mono text-xs">{"// warnings"}</p>
          <ul className="list-inside list-disc">
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <Panel title="from resume (AGResume/main.tex)" items={bySource("resume")} />
      <Panel title="from github (topic: portfolio)" items={bySource("github")} />
      <Panel title="manual (database only)" items={bySource("manual")} />

      <div className="mt-10">
        <NewItemForm />
      </div>
    </div>
  );
}
