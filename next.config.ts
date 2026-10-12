import type { NextConfig } from "next";
import { GUIDE_CONTENTS } from "./lib/guide";

const nextConfig: NextConfig = {
  async redirects() {
    // リーフレットの記号（A1 など）でもアクセスできるようにする:
    //   /guide/a1 → /guide/touch-park
    return GUIDE_CONTENTS.map((c) => ({
      source: `/guide/${c.code.toLowerCase()}`,
      destination: `/guide/${c.slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
