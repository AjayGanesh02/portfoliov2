export type AlbumImage = {
  url: string;
  pathname: string;
};

/**
 * Photo album images are static files in `public/album/`, served with the site
 * bundle. The file list is read at build time in next.config.mjs (exposed as
 * ALBUM_PHOTOS), so adding a photo = dropping a file in that folder and
 * redeploying. Returns [] when the folder is empty so the header degrades
 * gracefully.
 */
export function getAlbumImages(): AlbumImage[] {
  const files: string[] = JSON.parse(process.env.ALBUM_PHOTOS || "[]");
  return files.map((f) => ({ url: `/album/${encodeURIComponent(f)}`, pathname: `album/${f}` }));
}
