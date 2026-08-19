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

function tile(size: number, radius: number, border: number) {
  return {
    width: size,
    height: size,
    borderRadius: radius,
    border: `${border}px solid #1A1A1A`,
    objectFit: "cover" as const,
  };
}

export default function OpengraphImage() {
  const logo = dataUri("public/images/logo@2x.png", "image/png");
  const tesagurido = dataUri("public/images/tesagurido_keyshot.jpg", "image/jpeg");
  const touchmatch = dataUri("public/images/touchmatch_keyshot.jpg", "image/jpeg");
  const brailleRelay = dataUri("public/images/braillerelay_keyshot.jpg", "image/jpeg");
  const yubibo = dataUri("public/images/yubibo_keyvisual.jpg", "image/jpeg");

  const small = tile(150, 20, 5);
  const medium = tile(214, 26, 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
          backgroundColor: "#FFD600",
        }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        <img src={tesagurido} style={small} alt="" />
        <img src={touchmatch} style={medium} alt="" />
        <img
          src={logo}
          width={312}
          height={312}
          style={{ objectFit: "contain" }}
          alt="NO LOOK PARK"
        />
        <img src={brailleRelay} style={medium} alt="" />
        <img src={yubibo} style={small} alt="" />
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    ),
    { ...size },
  );
}
