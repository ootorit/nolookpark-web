import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { copyFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG = (f) => path.join(ROOT, "public/images", f);

// ヒーローと同じ壁面写真（コンテンツKV＋追加素材）。
const PHOTOS = [
  "tesagurido_keyshot.jpg",
  "touchmatch_keyshot.jpg",
  "braillerelay_keyshot.jpg",
  "yubibo_keyvisual.jpg",
  "dekabo_keyshot.jpg",
  "shodo_keyshot.jpg",
  "touchpark_keyshot.jpg",
  "blindblend_keyshot.jpg",
  "ninnin_keyshot.jpg",
  ...Array.from({ length: 12 }, (_, i) => `wall/wall-${String(i + 1).padStart(2, "0")}.jpg`),
].map(IMG);

const TILE = 200;
const GAP = 10;
const RAD = 18;

const FONT = "Poppins, 'Noto Sans JP'";
const INK = "#1A1A1A";
const YELLOW = "#FFD600";

const roundMask = (w, h, r) =>
  Buffer.from(
    `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`
  );

async function roundedTile(src) {
  return sharp(src)
    .resize(TILE, TILE, { fit: "cover" })
    .composite([{ input: roundMask(TILE, TILE, RAD), blend: "dest-in" }])
    .png()
    .toBuffer();
}

function evenCover(target) {
  let n = 2;
  while (n * TILE + (n - 1) * GAP < target) n += 2;
  return n;
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function logoBuf(size) {
  return sharp(IMG("logo@2x.png"))
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

const backing = (size) =>
  Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.06)}" ry="${Math.round(size * 0.06)}" fill="${YELLOW}"/></svg>`
  );

// ロゴのみ（キャッチ・日時・場所なし）。ロゴを大きく中央に。
async function buildLogoCard(size) {
  const L = Math.round(size * 0.82);
  const logo = await logoBuf(L);
  return sharp(backing(size))
    .composite([{ input: logo, left: Math.round((size - L) / 2), top: Math.round((size - L) / 2) }])
    .png()
    .toBuffer();
}

// キャッチ・ロゴ・日時・場所の入ったカード（Peatix用）。
async function buildFullCard(size) {
  const svg = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.05)}" ry="${Math.round(size * 0.05)}" fill="${YELLOW}"/>
  <text x="${size / 2}" y="58" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="25" fill="${INK}">「みえない」を楽しみつくそう！</text>
  <text x="${size / 2}" y="356" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="20" fill="${INK}">2026年10月24日（土）11:00-17:00</text>
  <text x="${size / 2}" y="386" text-anchor="middle" font-family="${FONT}" font-weight="400" font-size="13" fill="${INK}">${esc("@ HOME/WORK VILLAGE（東京・池尻大橋）")}</text>
</svg>`);
  const L = Math.round(size * 0.55);
  const logo = await logoBuf(L);
  // ロゴは中央やや上。日時テキスト(y356)と重ならない位置に収める。
  return sharp(svg)
    .composite([{ input: logo, left: Math.round((size - L) / 2), top: 92 }])
    .png()
    .toBuffer();
}

async function generate(width, height, outPath, { card }) {
  const cols = evenCover(width);
  const rows = evenCover(height);
  const gridW = cols * TILE + (cols - 1) * GAP;
  const gridH = rows * TILE + (rows - 1) * GAP;

  const tiles = [];
  let k = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const buf = await roundedTile(PHOTOS[(k * 5) % PHOTOS.length]);
      k++;
      tiles.push({ input: buf, left: c * (TILE + GAP), top: r * (TILE + GAP) });
    }
  }
  const grid = await sharp({
    create: { width: gridW, height: gridH, channels: 4, background: YELLOW },
  })
    .composite(tiles)
    .png()
    .toBuffer();

  const mosaic = await sharp(grid)
    .extract({
      left: Math.floor((gridW - width) / 2),
      top: Math.floor((gridH - height) / 2),
      width,
      height,
    })
    .toBuffer();

  // 画面下部のみ黄色グラデ（トーン合わせ）
  const grad = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#FFD600" stop-opacity="0.7"/>
      <stop offset="26%" stop-color="#FFD600" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
</svg>`);

  await sharp(mosaic)
    .composite([
      { input: grad, left: 0, top: 0 },
      {
        input: card,
        left: Math.round((width - (await sharp(card).metadata()).width) / 2),
        top: Math.round((height - (await sharp(card).metadata()).height) / 2),
      },
    ])
    .png()
    .toFile(outPath);

  console.log(`generated ${outPath} (${width}x${height}, grid ${cols}x${rows})`);
}

// OGP：ロゴのみ・拡大して中央（キャッチ/日時/場所なし）
const ogpCard = await buildLogoCard(470);
const ogpPath = path.join(ROOT, "app/opengraph-image.png");
await generate(1200, 630, ogpPath, { card: ogpCard });
copyFileSync(ogpPath, path.join(ROOT, "app/twitter-image.png"));

// note ヘッダー：ロゴのみ（1280×670）
const noteCard = await buildLogoCard(500);
await generate(1280, 670, path.join(ROOT, "public/images/note-header.png"), {
  card: noteCard,
});

// Peatix ヘッダー：情報入り（1300×640）
const peatixCard = await buildFullCard(410);
await generate(1300, 640, path.join(ROOT, "public/images/peatix-header.png"), {
  card: peatixCard,
});
