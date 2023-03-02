import Link from "next/link";
import Image from "next/image";

export default function TopSongs({ top_songs }: { top_songs: any[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-center text-lg">Top Songs</h1>
      <div>
        {top_songs.map((song, idx) => {
          return (
            <div key={idx} className="flex h-28 flex-row">
              <div className="flex basis-1/3 items-center justify-center">
                <div className="hover-state relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-md">
                  <Link href={song.external_urls.spotify}>
                    <Image
                      src={song.album.images[0].url}
                      alt={song.name}
                      fill={true}
                    />
                  </Link>
                </div>
              </div>
              <div className="flex basis-2/3 flex-col items-center justify-center text-center">
                <Link href={song.external_urls.spotify}>
                  <h1>{song.name}</h1>
                </Link>
                <div>
                  {song.artists.map((artist: any, idx: number) => {
                    if (idx >= 2) return;
                    return (
                      <Link href={artist.external_urls.spotify} key={idx}>
                        <h1 className="text-gray-400">{artist.name}</h1>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
