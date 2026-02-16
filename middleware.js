import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("🔥 Middleware triggered:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
