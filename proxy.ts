import { auth } from "@/auth";

export default auth;

export const config = {
  matcher: ["/dashboard/:path*", "/subscriptions/:path*"],
};