// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const access = req.query.access_token;

  if (!access) {
    res.status(400).json({ data: "Specify an access token" });
    return;
  }

  const url = "https://api.spotify.com/v1/me/player/currently-playing";

  const resp = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + access,
      "Content-Type": "application/json",
    },
  });
  if (resp.status !== 200) {
    res.status(400).json({ data: "Spotify api request failed" });
    return;
  }
  if (!resp.data.is_playing) {
    res.status(200).json({ is_playing: false });
    return;
  }
  const resdata = {
    is_playing: resp.data.is_playing,
    progress: resp.data.progress_ms,
    album: {
      artist: resp.data.item.album.artists,
      external_urls: resp.data.item.album.external_urls,
      href: resp.data.item.album.href,
      images: resp.data.item.album.images,
      name: resp.data.item.album.name,
      type: resp.data.item.type,
    },
    artists: resp.data.item.artists,
    duration_ms: resp.data.item.duration_ms,
    urls: resp.data.item.external_urls,
    href: resp.data.item.href,
    name: resp.data.item.name,
  };
  res.status(200).json(resdata);
}
