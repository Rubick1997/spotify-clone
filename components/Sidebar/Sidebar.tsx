import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { secNav, mainNav, styles } from "./Sidebar.constants";
import useSpotify from "hooks/useSpotify";
import { useRecoilState, useResetRecoilState } from "recoil";
import { playlistIdState } from "atoms/playlistAtom";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistId, setPlaylisttId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists({ limit: 50 }).then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnWrapper}>
        {mainNav.map(({ icon: Icon, title }) => (
          <button className={styles.btn} key={title}>
            <Icon className={styles.icon} />
            <p>{title}</p>
          </button>
        ))}
        <hr className={styles.hr} />
        {secNav.map(({ icon: Icon, title }) => (
          <button className={styles.btn} key={title}>
            <Icon className={styles.icon} />
            <p>{title}</p>
          </button>
        ))}
        <hr className={styles.hr} />
        {playlists.map(({ id, name }) => (
          <p
            key={id}
            onClick={() => setPlaylisttId(id)}
            className={`${id === playlistId && "text-white"} ${
              styles.playlist
            }`}
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
