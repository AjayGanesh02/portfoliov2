import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import queryString from "query-string";
type Data = {
  access_token: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const data = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  }).catch((error) => {
    res.status(400).json(error);
    return;
  });
  const access_token = data ? data.data.access_token : "invalid";
  res.status(200).json({ access_token: access_token });
}
