import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A stray lockfile higher up the tree confuses root detection, so pin it.
  turbopack: { root: path.resolve(process.cwd()) },
};

export default nextConfig;
