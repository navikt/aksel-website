import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {
  console.log(req.nextUrl);
  if (req.nextUrl.href.startsWith("https://verktoykasse.dev.nav.no")) {
    return NextResponse.redirect(
      req.nextUrl.href.replace(
        "https://verktoykasse.dev.nav.no/",
        "https://aksel.dev.nav.no/"
      )
    );
  }

  console.log(req.nextUrl.href);

  return NextResponse.next();
}
