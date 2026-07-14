/**
 * This makes next build produce a minimal, self-contained .next/standalone folder 
 * (only the files actually needed at runtime, traced via @vercel/nft) instead of requiring the full node_modules in the final image.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
