// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const access = req.query.access_token;
  const term = (req.query.term || "medium") + "_term";

  if (!access) {
    res.status(400).json({ data: "Specify an access token" });
    return;
  }

  const url = "https://api.spotify.com/v1/me/top/tracks?time_range=" + term;

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
  resp.data.items.forEach((track: any) => {
    delete track.available_markets;
    delete track.disc_number;
    delete track.external_ids;
    delete track.id;
    delete track.explicit;
    delete track.is_local;
    delete track.type;
    delete track.uri;
    delete track.album.available_markets;
    delete track.album.release_date;
    delete track.album.release_date_precision;
    delete track.album.total_tracks;
  });
  res.status(200).json(resp.data.items);
}
