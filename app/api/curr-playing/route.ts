import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const access = req.nextUrl.searchParams.get("access_token");
  if (!access) {
    return NextResponse.json({ data: "Specify an access token" }, { status: 400 });
  }

  const resp = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${access}` },
    cache: "no-store",
  });
  // Spotify returns 204 with an empty body when nothing is playing
  if (resp.status === 204) {
    return NextResponse.json({ is_playing: false });
  }
  if (!resp.ok) {
    return NextResponse.json({ data: "Spotify api request failed" }, { status: 400 });
  }
  const data = await resp.json();
  if (!data.is_playing) {
    return NextResponse.json({ is_playing: false });
  }
  return NextResponse.json({
    is_playing: data.is_playing,
    progress: data.progress_ms,
    album: {
      artist: data.item.album.artists,
      external_urls: data.item.album.external_urls,
      href: data.item.album.href,
      images: data.item.album.images,
      name: data.item.album.name,
      type: data.item.type,
    },
    artists: data.item.artists,
    duration_ms: data.item.duration_ms,
    urls: data.item.external_urls,
    href: data.item.href,
    name: data.item.name,
  });
}
