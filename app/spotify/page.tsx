import type { Metadata } from "next";
import { NowPlaying } from "../../components/site/spotify/now-playing";
import { TopLists, type Track, type Artist, type TermDict } from "../../components/site/spotify/top-lists";

export const metadata: Metadata = { title: "Spotify" };
export const dynamic = "force-dynamic";

async function getAccessToken(): Promise<string> {
  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
    }),
    cache: "no-store",
  });
  const data = await resp.json();
  return data?.access_token ?? "";
}

async function getTop(token: string, type: "tracks" | "artists", range: string) {
  const resp = await fetch(
    `https://api.spotify.com/v1/me/top/${type}?time_range=${range}_term`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  );
  if (!resp.ok) return [];
  return (await resp.json()).items ?? [];
}

export default async function SpotifyPage() {
  const token = await getAccessToken();
  const [songsShort, songsMedium, songsLong, artistsShort, artistsMedium, artistsLong] =
    await Promise.all([
      getTop(token, "tracks", "short"),
      getTop(token, "tracks", "medium"),
      getTop(token, "tracks", "long"),
      getTop(token, "artists", "short"),
      getTop(token, "artists", "medium"),
      getTop(token, "artists", "long"),
    ]);

  const songs: TermDict<Track> = { short: songsShort, medium: songsMedium, long: songsLong };
  const artists: TermDict<Artist> = { short: artistsShort, medium: artistsMedium, long: artistsLong };

  return (
    <div className="space-y-8">
      <p>
        I love sharing what I&apos;ve been listening to recently, so I use the
        Spotify API to track my currently playing song and my top songs and
        artists of the past few months.
      </p>
      <NowPlaying token={token} />
      <TopLists songs={songs} artists={artists} />
    </div>
  );
}
