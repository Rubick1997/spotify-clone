import { curretTrackIdState, isPLayingState } from "atoms/songAtom";
import useSpotify from "hooks/useSpotify";
import useSongInfo from "hooks/useSongInfo";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useRecoilState } from "recoil";
import {
  HeartIcon,
  VolumeUpIcon as VolumDownIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import {
  PauseIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  PlayIcon,
  ReplyIcon,
  FastForwardIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(curretTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPLayingState);
  const [volume, setVolume] = useState(50);
  const [reset, setReset] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isPending, startTransition] = useTransition();
  const songInfo = useSongInfo();

  const fetchCurrrentSong = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      setCurrentTrackId(data?.body?.item?.id as string);

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing);
      });
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrrentSong();
      setVolume(50);
    }
  }, [curretTrackIdState, spotifyApi, session, reset]);

  useEffect(() => {
    if (volume > 0 && volume <= 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume: number) => {
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  return (
    songInfo && (
      <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-gray-800 to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
        <div className="flex items-center space-x-4">
          <img
            className="hidden h-11 w-11 rounded md:inline"
            src={songInfo?.album.images?.[0]?.url}
            alt={`${songInfo?.name} cover`}
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0].name}</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon
            className="button"
            onClick={() => {
              spotifyApi.skipToPrevious();
            }}
          />
          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
          )}
          <FastForwardIcon
            className="button"
            onClick={() => {
              spotifyApi.skipToNext();
            }}
          />
          <ReplyIcon className="button" />
        </div>
        <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
          <VolumDownIcon
            className="button"
            onClick={() => volume > 0 && setVolume(volume - 10)}
          />
          <input
            className="w-14 md:w-28"
            type="range"
            value={volume}
            onChange={(e) => {
              startTransition(() => {
                setVolume(Number(e.target.value));
              });
            }}
            min={0}
            max={100}
          />
          <VolumeUpIcon
            onClick={() => volume < 100 && setVolume(volume + 10)}
            className="button"
          />
        </div>
      </div>
    )
  );
};

export default Player;
