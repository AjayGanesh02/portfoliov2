import Link from "next/link";
import type { ContentItem } from "../../lib/types";

function TitleLink({ item }: { item: ContentItem }) {
  const cls =
    "font-medium underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-current dark:decoration-neutral-700";
  if (item.bodyMd) {
    return (
      <Link href={`/projects/${item.slug}`} className={cls}>
        {item.title}
      </Link>
    );
  }
  const href = item.externalUrl ?? item.repoUrl;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {item.title}
      </a>
    );
  }
  return <span className="font-medium">{item.title}</span>;
}

export function ItemRow({ item }: { item: ContentItem }) {
  return (
    <li className="group">
      <div className="flex items-baseline justify-between gap-4">
        <span>
          <TitleLink item={item} />
          {item.subtitle && (
            <span className="text-neutral-600 dark:text-neutral-400"> · {item.subtitle}</span>
          )}
        </span>
        {item.dateRange && (
          <span className="shrink-0 font-mono text-xs text-neutral-500">{item.dateRange}</span>
        )}
      </div>
      {item.blurb && (
        <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">{item.blurb}</p>
      )}
      <div className="mt-0.5 flex gap-3 font-mono text-xs text-neutral-500">
        {item.repoUrl && (
          <a
            href={item.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            code ↗
          </a>
        )}
        {item.externalUrl && (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            visit ↗
          </a>
        )}
        {item.tags && item.tags.length > 0 && (
          <span className="truncate text-neutral-400 dark:text-neutral-600">
            {item.tags.slice(0, 5).join(" · ")}
          </span>
        )}
      </div>
    </li>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-8">
      <h2 className="mb-4 font-mono text-sm text-neutral-500">{"// "}{title}</h2>
      {children}
    </section>
  );
}
