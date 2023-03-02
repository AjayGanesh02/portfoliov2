import axios from "axios";
import queryString from "query-string";
import CurrPlayer from "../../components/spotifystats/currPlayer";
import TopArtists from "../../components/spotifystats/topArtists";
import TopSongs from "../../components/spotifystats/topSongs";

export default function SpotifyStats({
  token,
  top_artists,
  top_songs,
}: {
  token: string;
  top_artists: any[];
  top_songs: any[];
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
      <div className="flex w-full flex-col lg:flex-row">
        <div className="flex basis-1/2 items-center justify-center">
          <TopSongs top_songs={top_songs} />
        </div>
        <div className="flex basis-1/2 items-center justify-center">
          <TopArtists top_artists={top_artists} />
        </div>
      </div>
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

  const url = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term";

  const resp2 = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
  });
  resp2.data.items.forEach((track: any) => {
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

  const url2 =
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term";

  const resp3 = await axios.get(url2, {
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
  });
  resp3.data.items.forEach((artist: any) => {
    delete artist.followers;
    delete artist.id;
    delete artist.type;
    delete artist.uri;
    delete artist.popularity;
  });

  return {
    props: {
      token: access_token,
      top_songs: resp2.data.items,
      top_artists: resp3.data.items,
    },
  };
}
