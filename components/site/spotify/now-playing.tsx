"use client";

import useSWR from "swr";
import Image from "next/image";

export function NowPlaying({ token }: { token: string }) {
  const { data } = useSWR(
    "/api/curr-playing?access_token=" + token,
    (url: string) => fetch(url).then((r) => r.json()),
    { refreshInterval: 1000 }
  );

  const playing = data?.is_playing;
  return (
    <div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
      <p className="mb-3 font-mono text-sm text-neutral-500">{"// now playing"}</p>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          {playing && data?.album?.images?.[0]?.url && (
            <Image src={data.album.images[0].url} alt="album art" fill sizes="64px" className="object-cover" />
          )}
        </div>
        <div className="min-w-0">
          {playing ? (
            <>
              <a
                href={data?.urls?.spotify}
                target="_blank"
                rel="noreferrer"
                className="block truncate font-medium underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:decoration-neutral-700"
              >
                {data?.name}
              </a>
              <p className="truncate text-sm text-neutral-600 dark:text-neutral-400">
                {data?.artists?.map((a: { name: string }) => a.name).join(", ")}
              </p>
            </>
          ) : (
            <p className="text-neutral-500">Nothing playing right now.</p>
          )}
        </div>
      </div>
      {playing && (
        <div className="mt-4 h-1 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div
            className="h-1 rounded-full bg-neutral-900 transition-all dark:bg-neutral-100"
            style={{ width: `${(data.progress / data.duration_ms) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
