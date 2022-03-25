import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {
  if (req.nextUrl.hostname === "verktoykasse.dev.nav") {
    return NextResponse.redirect("https://aksel.nav.no/");
  }

  return NextResponse.next();
}
