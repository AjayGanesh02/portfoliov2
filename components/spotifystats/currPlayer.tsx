import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import emptyImage from "../../public/assets/emptyImage.png";

export default function CurrPlayer({ token }: { token: string }) {
  const { data, error, isLoading } = useSWR(
    "/api/curr_playing?access_token=" + token,
    (url) => fetch(url).then((r) => r.json()),
    { refreshInterval: 1000 }
  );
  if (error) return <div>error</div>;
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl">Currently Playing:</h1>
      <div className="flex w-3/5 flex-col gap-20 rounded-md border p-10">
        <div className="flex flex-col items-center justify-center gap-20 lg:flex-row">
          <div className="flex basis-1/2 items-center justify-center">
            <div className="hover-state relative h-40 w-40 overflow-hidden rounded-md object-cover">
              <Link href={data?.urls?.spotify || ""}>
                <Image
                  src={data?.album?.images[0].url || emptyImage}
                  alt="album"
                  fill={true}
                />
              </Link>
            </div>
          </div>
          <div className="flex basis-1/2 flex-col items-center justify-center gap-4 text-center">
            <Link href={data?.urls?.spotify || ""}>
              <h2 className="text-lg">
                {data?.name || "Nothing currently playing"}
              </h2>
            </Link>
            <h3 className="flex flex-col flex-wrap text-gray-400">
              {data?.artists?.map((artist: any, idx: number) => {
                return (
                  <Link key={idx} href={artist.external_urls.spotify}>
                    {artist.name + " "}
                  </Link>
                );
              })}
            </h3>
          </div>
        </div>
        {data?.is_playing && (
          <div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-black">
              <div
                className="h-2.5 rounded-full bg-blue-600"
                style={{
                  width:
                    ((data?.progress / data?.duration_ms) * 100).toString() +
                    "%",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div>
        <p>
          I love sharing what I&apos;ve been listening to recently, so I decided
          to use the Spotify API to build this tracker that shows my currently
          listening song.
        </p>
      </div>
    </div>
  );
}
