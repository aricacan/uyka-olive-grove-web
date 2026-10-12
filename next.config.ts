import type { NextConfig } from "next";

/**
 * Static export: the whole site is prebuilt to `out/` and can be served from
 * any static host (Vercel, Netlify, Cloudflare Pages, cPanel). No Node server.
 * Image optimization is done at build time by `npm run assets`, so the
 * runtime optimizer is disabled.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Each locale has its own root layout, so unmatched URLs need a global 404.
  experimental: { globalNotFound: true },
};

export default nextConfig;
