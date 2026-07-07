import { list } from "@vercel/blob";

export type AlbumImage = {
  url: string;
  pathname: string;
};

/**
 * Photo album images live in Vercel Blob under the `album/` prefix.
 * Adding a photo to the site = uploading one blob; no code change.
 * Returns [] when the store is unreachable so the header degrades gracefully.
 */
export async function getAlbumImages(): Promise<AlbumImage[]> {
  try {
    const { blobs } = await list({ prefix: "album/" });
    return blobs
      .filter((b) => b.size > 0)
      .sort((a, b) => a.pathname.localeCompare(b.pathname))
      .map((b) => ({ url: b.url, pathname: b.pathname }));
  } catch {
    return [];
  }
}
