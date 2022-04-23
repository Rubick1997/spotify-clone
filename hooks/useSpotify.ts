import spotifyApi from "lib/spotify";
import { useSession, signIn } from "next-auth/react";
import React, { useEffect } from "react";

const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      //if refresh token attempts fails, direct user to login...
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session?.user?.accessToken);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
