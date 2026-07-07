import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { getContent } from "../../../lib/content";
import { legacyProjectRedirects } from "../../../lib/legacy-redirects";
import { Markdown } from "../../../components/site/markdown";
import type { ContentItem } from "../../../lib/types";

export const revalidate = 3600;

async function allDetailItems(): Promise<ContentItem[]> {
  const { projects, experiences, education } = await getContent();
  return [...projects, ...experiences, ...education].filter((i) => i.bodyMd);
}

async function findItem(slug: string): Promise<ContentItem | undefined> {
  return (await allDetailItems()).find((i) => i.slug === slug);
}

export async function generateStaticParams() {
  return (await allDetailItems()).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await findItem(decodeURIComponent(slug));
  return item ? { title: item.title, description: item.blurb } : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  const item = await findItem(slug);

  if (!item) {
    // old URLs were keyed by the Mongo `name` field — redirect them forever
    const legacy = legacyProjectRedirects[slug];
    if (legacy) permanentRedirect(`/projects/${legacy}`);
    notFound();
  }

  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h1 className="text-xl font-medium tracking-tight">{item.title}</h1>
        {item.dateRange && (
          <span className="font-mono text-xs text-neutral-500">{item.dateRange}</span>
        )}
      </div>
      {item.subtitle && (
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          {item.subtitle}
          {item.location ? ` · ${item.location}` : ""}
        </p>
      )}
      {item.blurb && <p className="mt-1 text-sm text-neutral-500">{item.blurb}</p>}

      <div className="mt-3 flex gap-3 font-mono text-xs text-neutral-500">
        {item.repoUrl && (
          <a href={item.repoUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
            code ↗
          </a>
        )}
        {item.externalUrl && (
          <a href={item.externalUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
            visit ↗
          </a>
        )}
      </div>

      {item.imageUrl && (
        <div className="mt-6 overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={1200}
            height={675}
            className="h-auto w-full"
          />
        </div>
      )}

      <div className="mt-8">
        <Markdown>{item.bodyMd!}</Markdown>
      </div>

      {item.tags && item.tags.length > 0 && (
        <p className="mt-8 font-mono text-xs text-neutral-400 dark:text-neutral-600">
          {item.tags.join(" · ")}
        </p>
      )}
    </article>
  );
}
