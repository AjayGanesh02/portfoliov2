import useSWR from "swr";
import CurrPlayer from "../../components/spotifystats/currPlayer";

type RefreshResp = {
  access_token: string;
};

export default function SpotifyStats() {
  const { data } = useSWR<RefreshResp, any, any>(
    "/api/refresh_token",
    (url: string) => fetch(url).then((r) => r.json())
  );
  return (
    <div className="flex flex-col justify-center items-center">
      <CurrPlayer token={data?.access_token || ""} />
    </div>
  );
}
