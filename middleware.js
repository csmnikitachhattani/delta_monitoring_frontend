import { NextResponse } from "next/server";

export function middleware(request) {
    console.log("running ")
  const token = localStorage.getItem('user_id')

  const isLoggedIn = !!token;
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute =
    pathname.startsWith("/form") ||
    pathname.startsWith("/table");

  if (isProtectedRoute && !isLoggedIn) {
      console.log("logged in not")
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && isLoggedIn) {
    console.log("logged")
    return NextResponse.redirect(new URL("/table", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/form/:path*", "/table/:path*", "/login"],
};
