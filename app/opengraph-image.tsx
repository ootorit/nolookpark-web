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
  const left = [
    dataUri("public/images/tesagurido_keyshot.jpg", "image/jpeg"),
    dataUri("public/images/touchmatch_keyshot.jpg", "image/jpeg"),
  ];
  const right = [
    dataUri("public/images/braillerelay_keyshot.jpg", "image/jpeg"),
    dataUri("public/images/yubibo_keyvisual.jpg", "image/jpeg"),
  ];

  const tile = {
    width: 188,
    height: 188,
    borderRadius: 26,
    border: "6px solid #1A1A1A",
    objectFit: "cover" as const,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          backgroundColor: "#FFD600",
        }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        {left.map((src, i) => (
          <img key={`l${i}`} src={src} style={tile} alt="" />
        ))}
        <img
          src={logo}
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
          alt="NO LOOK PARK"
        />
        {right.map((src, i) => (
          <img key={`r${i}`} src={src} style={tile} alt="" />
        ))}
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    ),
    { ...size },
  );
}
