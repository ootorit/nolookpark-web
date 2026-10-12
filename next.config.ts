import type { NextConfig } from "next";
import { GUIDE_CONTENTS, ZONES } from "./lib/guide";

const nextConfig: NextConfig = {
  async redirects() {
    // リーフレットの記号（A1 など）でもアクセスできるようにする:
    //   /guide/a1 → /guide/touch-park
    //   /guide/a  → /guide/zone/a（エリア別ページ）
    return [
      ...GUIDE_CONTENTS.map((c) => ({
        source: `/guide/${c.code.toLowerCase()}`,
        destination: `/guide/${c.slug}`,
        permanent: true,
      })),
      ...ZONES.map((z) => ({
        source: `/guide/${z.id.toLowerCase()}`,
        destination: `/guide/zone/${z.id.toLowerCase()}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
