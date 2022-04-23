import type { NextPage } from "next";
import Head from "next/head";
import { Center, Sidebar } from "components";
import { ReflexContainer, ReflexElement } from "react-reflex";
import { getSession, GetSessionParams } from "next-auth/react";
import Player from "components/Player";

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify Clone</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        />
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default Home;
