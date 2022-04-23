import { DefaultSession, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
export interface UserSession extends User {
  accessToken: string;
  refreshToken: string;
  username: string;
}

export interface CustomSession extends Session {
  user: UserSession;
}

export interface CustomJWT extends JWT {
  accessToken: string;
  refreshToken: string;
  username: string;
}
