import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "NO LOOK PARK — 「みえない」を楽しみつくす体験型イベント";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function dataUri(path: string, mime: string) {
  const buf = readFileSync(join(process.cwd(), path));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const KV = {
  tesagurido: "public/images/tesagurido_keyshot.jpg",
  touchmatch: "public/images/touchmatch_keyshot.jpg",
  braille: "public/images/braillerelay_keyshot.jpg",
  yubibo: "public/images/yubibo_keyvisual.jpg",
  dekabo: "public/images/dekabo_keyshot.jpg",
  touchpark: "public/images/touchpark_keyshot.jpg",
  blindblend: "public/images/blindblend_keyshot.jpg",
} as const;

export default function OpengraphImage() {
  const logo = dataUri("public/images/logo@2x.png", "image/png");

  // 4列 × 3行の均等グリッド（中央列はロゴ用に空ける）に、全作品を配置。
  // サイズと角度だけ少しずつ変えて散らしつつ、余白のリズムは揃える。端は見切れてOK。
  const cells: {
    cx: number;
    cy: number;
    s: number;
    rot: number;
    kv: keyof typeof KV;
  }[] = [
    { cx: 90, cy: 95, s: 200, rot: -5, kv: "tesagurido" },
    { cx: 330, cy: 95, s: 182, rot: 4, kv: "touchmatch" },
    { cx: 870, cy: 95, s: 192, rot: -4, kv: "braille" },
    { cx: 1110, cy: 95, s: 204, rot: 5, kv: "yubibo" },
    { cx: 90, cy: 315, s: 188, rot: 3, kv: "dekabo" },
    { cx: 330, cy: 315, s: 172, rot: -3, kv: "touchpark" },
    { cx: 870, cy: 315, s: 176, rot: 4, kv: "blindblend" },
    { cx: 1110, cy: 315, s: 196, rot: -5, kv: "tesagurido" },
    { cx: 90, cy: 535, s: 196, rot: 5, kv: "braille" },
    { cx: 330, cy: 535, s: 186, rot: -4, kv: "yubibo" },
    { cx: 870, cy: 535, s: 200, rot: 4, kv: "dekabo" },
    { cx: 1110, cy: 535, s: 184, rot: -5, kv: "touchmatch" },
  ];

  const tiles = cells.map((c) => ({ ...c, uri: dataUri(KV[c.kv], "image/jpeg") }));
  const logoSize = 330;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#FFD600",
        }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        {tiles.map((t, i) => (
          <img
            key={i}
            src={t.uri}
            width={t.s}
            height={t.s}
            alt=""
            style={{
              position: "absolute",
              left: t.cx - t.s / 2,
              top: t.cy - t.s / 2,
              width: t.s,
              height: t.s,
              borderRadius: Math.round(t.s * 0.16),
              border: "5px solid #1A1A1A",
              objectFit: "cover",
              transform: `rotate(${t.rot}deg)`,
            }}
          />
        ))}
        <img
          src={logo}
          width={logoSize}
          height={logoSize}
          alt="NO LOOK PARK"
          style={{
            position: "absolute",
            left: (1200 - logoSize) / 2,
            top: (630 - logoSize) / 2,
            width: logoSize,
            height: logoSize,
            objectFit: "contain",
          }}
        />
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    ),
    { ...size },
  );
}
