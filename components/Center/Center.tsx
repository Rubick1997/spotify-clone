import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { colors, styles } from "./Center.constants";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "atoms/playlistAtom";
import useSpotify from "hooks/useSpotify";
import Songs from "components/Songs";

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<any>(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data?.body as any);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi, playlistId]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div onClick={() => signOut()} className={styles.userWrapper}>
          <img
            className={styles.userImg}
            src={session?.user?.image as string}
            alt={`${session?.user?.name} profile image`}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className={styles.chevronIcon} />
        </div>
      </header>
      <section className={`${color} ${styles.section}`}>
        <img
          className={styles.playlistImg}
          src={playlist?.images?.[0]?.url}
          alt={`${playlist?.name} playlist cover`}
        />
        <div>
          <p>PUBLIC PLAYLIST</p>
          <h1 className={styles.playlistName}>{playlist?.name}</h1>
          <p className={styles.playlistDescr}>{playlist?.description}</p>
          <p>
            <img src="" alt="" /> {playlist?.owner?.display_name} ·{" "}
            {playlist?.followers?.total} likes · {playlist?.tracks?.total} songs
          </p>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
