import {  useState } from "react";
import { TermDict } from "../types/termdict";
import TopArtists from "./topArtists";
import TopSongs from "./topSongs";

export default function TopContainer({
  songs,
  artists,
  token,
}: {
  songs: TermDict;
  artists: TermDict;
  token: string;
}) {
  const [term, setTerm] = useState("medium");
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-row items-center justify-center gap-6">
        Term:
        <div
          className="hover-state rounded-md border p-2"
          onClick={() => setTerm("short")}
        >
          short
        </div>
        <div
          className="hover-state rounded-md border p-2"
          onClick={() => setTerm("medium")}
        >
          medium
        </div>
        <div
          className="hover-state rounded-md border p-2"
          onClick={() => setTerm("long")}
        >
          long
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="flex basis-1/2 items-center justify-center">
          <TopSongs top_songs={songs[term]} />
        </div>
        <div className="flex basis-1/2 items-center justify-center">
          <TopArtists top_artists={artists[term]} />
        </div>
      </div>
    </div>
  );
}
