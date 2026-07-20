import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/verify-email?token=... — the link clicked from a confirmation
 * email. Marks the matching user's email as verified and consumes the token.
 * Args: token (query param). Returns: redirect to /login with a status query
 * param (verified=1 or verifyError=1) for the login page to show a message.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const loginUrl = new URL("/subscription-management/login", request.nextUrl.origin);

  if (!token) {
    loginUrl.searchParams.set("verifyError", "1");
    return NextResponse.redirect(loginUrl);
  }

  const verificationToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!verificationToken || verificationToken.expires < new Date()) {
    if (verificationToken) {
      await prisma.verificationToken.delete({
        where: { identifier_token: { identifier: verificationToken.identifier, token } },
      });
    }
    loginUrl.searchParams.set("verifyError", "1");
    return NextResponse.redirect(loginUrl);
  }

  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { emailVerified: new Date() },
  });
  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: verificationToken.identifier, token } },
  });

  loginUrl.searchParams.set("verified", "1");
  return NextResponse.redirect(loginUrl);
}
