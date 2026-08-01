import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PGlite (local dev DB fallback) ships Wasm assets that must not be bundled
  serverExternalPackages: ['@electric-sql/pglite'],
  // The dev-tools indicator floats over the bottom-left corner — exactly where
  // the lesson chat trigger lives — and eats its clicks in local test runs.
  devIndicators: false,
};

export default nextConfig;
