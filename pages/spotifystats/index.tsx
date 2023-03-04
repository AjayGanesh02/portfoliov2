import axios from "axios";
import queryString from "query-string";
import CurrPlayer from "../../components/spotifystats/currPlayer";
import TopContainer from "../../components/spotifystats/topContainer";
import { TermDict } from "../../components/types/termdict";

export default function SpotifyStats({
  token,
  top_artists,
  top_songs,
}: {
  token: string;
  top_artists: TermDict;
  top_songs: TermDict;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center text-center">
        <p>
          I love sharing what I&apos;ve been listening to recently, so I decided
          to use the Spotify API to build this tracker that shows my currently
          listening song and my top songs and artists of the past few months!
        </p>
      </div>
      <CurrPlayer token={token} />
      <TopContainer songs={top_songs} artists={top_artists} token={token} />
    </div>
  );
}

export async function getServerSideProps() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const resp = await axios({
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
  });

  const access_token = resp?.data?.access_token || "";

  const urls = [
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term",
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term",
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term",
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term",
  ];

  const requests = urls.map((url) => {
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
  });

  const responses = await axios.all<any>(requests);
  responses.forEach((response: any, idx: number) => {
    if (idx < 3) {
      response?.data.items.forEach((track: any) => {
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
    } else {
      response?.data.items.forEach((artist: any) => {
        delete artist.followers;
        delete artist.id;
        delete artist.type;
        delete artist.uri;
        delete artist.popularity;
      });
    }
  });
  return {
    props: {
      token: access_token,
      top_songs: {
        short: responses[0]?.data.items || [],
        medium: responses[1]?.data.items || [],
        long: responses[2]?.data.items || [],
      },
      top_artists: {
        short: responses[3]?.data.items || [],
        medium: responses[4]?.data.items || [],
        long: responses[5]?.data.items || [],
      },
    },
  };
}
