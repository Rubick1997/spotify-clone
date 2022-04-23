import { ClockIcon } from "@heroicons/react/outline";
import { playlistState } from "atoms/playlistAtom";
import Song from "components/Song";
import React from "react";
import { useRecoilValue } from "recoil";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col space-y-1 bg-black px-2 pb-40 text-white">
      <div className="sticky top-0 bg-black ">
        <div className="mb-3 grid grid-cols-2 text-gray-500">
          <p># TITLE</p>
          <div className="ml-auto flex items-center justify-between md:ml-0">
            <p>ALBUM</p>
            <ClockIcon className="h-6 w-6" />
          </div>
        </div>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
      {playlist?.tracks?.items?.map(({ track }, i) => {
        return <Song key={i} order={i} track={track} />;
      })}
    </div>
  );
};

export default Songs;
