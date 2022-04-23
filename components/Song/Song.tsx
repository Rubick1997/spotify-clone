import { curretTrackIdState, isPLayingState } from "atoms/songAtom";
import spotifyApi from "lib/spotify";
import { toMinutesAndSeconds } from "lib/time";
import React, { FC } from "react";
import { useRecoilState } from "recoil";

type TrackType = {
  album: {
    images: any[];
    name: string;
  };
  uri: string;
  name: string;
  artists: any[];
  id: string;
  duration_ms: number;
};

type SongType = {
  order: any;
  track: TrackType;
};

const Song: FC<SongType> = ({ order, track }) => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(curretTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPLayingState);

  const playSong = () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [track.uri] });
  };

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg py-2 px-5 text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track?.album?.images[0]?.url}
          alt={`${track.name} cover`}
        />
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.name}</p>
          <p className="inline w-60">{track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="w-500 hidden md:inline">{track?.album?.name}</p>
        <p>{toMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
