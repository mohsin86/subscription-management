/**
 * This makes next build produce a minimal, self-contained .next/standalone folder 
 * (only the files actually needed at runtime, traced via @vercel/nft) instead of requiring the full node_modules in the final image.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // content/interview-practice/*.md isn't under node_modules or public/, and the
  // read path is built dynamically (fs.readFileSync(`${slug}.md`)), so Next's
  // automatic file tracing can miss it — this makes sure the standalone/Vercel
  // build actually bundles those files.
  outputFileTracingIncludes: {
    "/interview-practice/*": ["./content/interview-practice/**/*"],
  },
  async redirects() {
    return [
      {
        source: '/subscription-management',
        destination: '/subscription-management/login',
        permanent: false, // Use false (307 Temporary Redirect) so browsers don't cache it forever
      },
    ];
  },
};

export default nextConfig;
