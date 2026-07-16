import { auth } from "@/auth";

import { NextResponse } from "next/server";

export default auth((req) => {
  // Check if the current path matches the path you want to redirect
  // if (req.nextUrl.pathname === "/subscription-management") {
  //   return NextResponse.redirect(new URL("/subscription-management/login", req.url));
  // }
});

export const config = {
  // Make sure to add the target route to the matcher array
  matcher: [
    "/dashboard/:path*", 
    "/subscriptions/:path*", 
    // "/subscription-management"
  ],
};