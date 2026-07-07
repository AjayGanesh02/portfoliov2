"use client";

import { useState } from "react";
import Image from "next/image";

type Term = "short" | "medium" | "long";
export type TermDict<T> = Record<Term, T[]>;

export type Track = {
  name: string;
  external_urls: { spotify: string };
  album: { images: { url: string }[] };
  artists: { name: string; external_urls: { spotify: string } }[];
};

export type Artist = {
  name: string;
  external_urls: { spotify: string };
  images: { url: string }[];
};

const TERMS: { key: Term; label: string }[] = [
  { key: "short", label: "4 weeks" },
  { key: "medium", label: "6 months" },
  { key: "long", label: "all time" },
];

function Row({
  href,
  image,
  title,
  subtitle,
}: {
  href: string;
  image?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        {image && <Image src={image} alt={title} fill sizes="40px" className="object-cover" />}
      </div>
      <div className="min-w-0">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="block truncate text-sm font-medium underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:decoration-neutral-700"
        >
          {title}
        </a>
        {subtitle && (
          <p className="truncate text-xs text-neutral-500">{subtitle}</p>
        )}
      </div>
    </li>
  );
}

export function TopLists({
  songs,
  artists,
}: {
  songs: TermDict<Track>;
  artists: TermDict<Artist>;
}) {
  const [term, setTerm] = useState<Term>("medium");
  return (
    <div>
      <div className="mb-6 flex items-center gap-3 font-mono text-sm">
        <span className="text-neutral-500">range:</span>
        {TERMS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTerm(t.key)}
            className={
              term === t.key
                ? "text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
                : "text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
            }
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-10 sm:grid-cols-2">
        <section>
          <h2 className="mb-4 font-mono text-sm text-neutral-500">// top songs</h2>
          <ul className="space-y-3">
            {songs[term].map((song, i) => (
              <Row
                key={i}
                href={song.external_urls.spotify}
                image={song.album.images[0]?.url}
                title={song.name}
                subtitle={song.artists
                  .slice(0, 2)
                  .map((a) => a.name)
                  .join(", ")}
              />
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-4 font-mono text-sm text-neutral-500">// top artists</h2>
          <ul className="space-y-3">
            {artists[term].map((artist, i) => (
              <Row
                key={i}
                href={artist.external_urls.spotify}
                image={artist.images[0]?.url}
                title={artist.name}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
