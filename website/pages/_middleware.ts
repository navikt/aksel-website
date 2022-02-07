import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.url === "http://designsystem.nav.no/") {
    return NextResponse.redirect(new URL("/designsystem", req.url));
  }
  return NextResponse.next();
}
