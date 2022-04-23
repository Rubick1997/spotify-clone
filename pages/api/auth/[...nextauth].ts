import spotifyApi, { LOGIN_URL } from "lib/spotify";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { CustomJWT } from "./auth.types";

const refreshAccessToken = async (token: CustomJWT) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("Refreshed token is", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      acccessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, /// 1 hour as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return { ...token, error: "RefreshAccesstokenError" };
  }
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "",
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }: any): Promise<any> {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          acccessTokenExpires: (account.expires_at as number) * 1000, //handling time in milliseconds
        };
      }

      //return previous token if the access token has not expired yet
      if (Date.now() < (token.acccessTokenExpires as number)) {
        console.log("existing token is valid");
        return token;
      }

      //access token expires
      console.log("access token was expired");
      return await refreshAccessToken(token);
    },
    async session({ session, token }: any): Promise<any> {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
