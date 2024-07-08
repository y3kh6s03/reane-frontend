export { auth as middleware } from "@/../auth";

export const config = {
  matcher: [
    "/((?!api|login|terms|privacy|_next/static|_next/image|favicon\\.ico|.*\\.png|.*\\.svg|.*\\.mp4).*)"
  ]
}