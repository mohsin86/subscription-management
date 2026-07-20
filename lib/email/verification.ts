import { Resend } from "resend";

/**
 * sendVerificationEmail — emails a confirmation link for a new signup.
 * Instantiates Resend inside the function (not module scope) so `next build`'s
 * page-data-collection step, which imports every route/action module regardless
 * of whether it runs, doesn't crash without RESEND_API_KEY at build time.
 * Args: email (recipient), verifyUrl (absolute link back to /api/verify-email).
 * Returns: void; throws if Resend reports a send failure.
 */
export async function sendVerificationEmail(email: string, verifyUrl: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Subscription Tracker <onboarding@resend.dev>",
    to: [email],
    subject: "Confirm your email address",
    html: `
      <p>Thanks for signing up for Subscription Tracker.</p>
      <p>Click the link below to confirm your email address and activate your account:</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>This link expires in 24 hours.</p>
    `,
  });

  if (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email.");
  }
}
