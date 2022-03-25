import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {
  if (req.nextUrl.href.startsWith("https://verktoykasse.dev.nav.no/")) {
    return NextResponse.redirect(
      req.nextUrl.href.replace(
        "https://verktoykasse.dev.nav.no/",
        "https://aksel.dev.nav.no/"
      )
    );
  }

  console.log(req.nextUrl);

  return NextResponse.next();
}
