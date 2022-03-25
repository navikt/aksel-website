import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {
  /* console.log(req.nextUrl); */
  if (req.nextUrl.origin.startsWith("https://verktoykasse.dev.nav.no")) {
    return NextResponse.redirect("https://aksel.dev.nav.no/");
  }

  /* console.log(req.nextUrl); */
  const T = req.nextUrl.clone();

  return NextResponse.json({
    a: T.href,
    b: T.origin,
    c: T.host,
    d: T.hostname,
    e: T.port,
    f: T.pathname,
  });

  /* return NextResponse.next(); */
}
