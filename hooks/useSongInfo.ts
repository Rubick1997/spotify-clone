import React, { useEffect, useState } from "react";
import { curretTrackIdState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import useSpotify from "./useSpotify";
import spotifyApi from "../lib/spotify";

const useSongInfo = () => {
  const spotify = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(curretTrackIdState);
  const [songInfo, setSongInfo] = useState<any>(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await spotifyApi
          .getTrack(currentIdTrack)
          .then((res) => res.body);
        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentIdTrack, spotify]);

  return songInfo;
};

export default useSongInfo;
