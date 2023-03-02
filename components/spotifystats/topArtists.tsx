import Link from "next/link";
import Image from "next/image";

export default function TopArtists({ top_artists }: { top_artists: any[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-center text-lg">Top Artists</h1>
      <div>
        {top_artists.map((artist, idx) => {
          return (
            <div key={idx} className="flex h-28 flex-row gap-6">
              <div className="flex basis-1/3 items-center justify-center">
                <div className="hover-state relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-md">
                  <Link href={artist.external_urls.spotify}>
                    <Image
                      src={artist.images[0].url}
                      alt={artist.name}
                      fill={true}
                    />
                  </Link>
                </div>
              </div>
              <div className="flex basis-2/3 flex-col items-center justify-center text-center">
                <Link href={artist.external_urls.spotify}>
                  <h1>{artist.name}</h1>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
