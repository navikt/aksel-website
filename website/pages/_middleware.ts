import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {
  /* if (req.pathname === "login") {
    return NextResponse.next();
  }
  const token = req.cookies.token;

  if (!token) {
    return NextResponse.redirect("/login");
  } */
  /* console.log(req.nextUrl); */
  return NextResponse.next();
  /* return new Response("Hello, world!"); */
}
