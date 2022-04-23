import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  //token will exist if user is logged in
  const token = await getToken({
    req: req as any,
    secret: process.env.JWT_SECRET,
  });

  const { pathname } = req.nextUrl;
  //allow the requests if the following is true...
  //1) Its a request ofr next-auth session & provider fetching
  //2) if the token exists
  if (token && pathname === "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //Redirect them to login  if they do not have token and are requesting a protected route
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
