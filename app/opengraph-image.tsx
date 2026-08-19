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

export default function OpengraphImage() {
  const logo = dataUri("public/images/logo@2x.png", "image/png");

  // 全作品のキービジュアルを、ロゴ中心の周囲にバラバラのサイズ・角度で配置
  const tiles = [
    { src: "public/images/tesagurido_keyshot.jpg", size: 150, left: 92, top: 66, rot: -6 },
    { src: "public/images/touchmatch_keyshot.jpg", size: 168, left: 852, top: 48, rot: 6 },
    { src: "public/images/braillerelay_keyshot.jpg", size: 140, left: 1012, top: 248, rot: -5 },
    { src: "public/images/yubibo_keyvisual.jpg", size: 156, left: 838, top: 424, rot: 7 },
    { src: "public/images/dekabo_keyshot.jpg", size: 158, left: 160, top: 412, rot: -7 },
    { src: "public/images/touchpark_keyshot.jpg", size: 122, left: 34, top: 236, rot: 5 },
    { src: "public/images/blindblend_keyshot.jpg", size: 134, left: 508, top: 478, rot: -4 },
  ].map((t) => ({ ...t, uri: dataUri(t.src, "image/jpeg") }));

  const logoSize = 300;

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
            width={t.size}
            height={t.size}
            alt=""
            style={{
              position: "absolute",
              left: t.left,
              top: t.top,
              width: t.size,
              height: t.size,
              borderRadius: Math.round(t.size * 0.16),
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
