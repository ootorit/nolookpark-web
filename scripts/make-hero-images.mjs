import { fileURLToPath } from "node:url";
import { copyFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// テキストを Poppins（欧文・数字）＋ Noto Sans JP（和文）で描画するため、
// librsvg/fontconfig にフォントの場所を教える。sharp の native 初期化前に
// 環境変数を立てる必要があるので、sharp は動的 import する。
process.env.FONTCONFIG_FILE = path.join(ROOT, "scripts/fonts.conf");
const sharp = (await import("sharp")).default;
const IMG = (f) => path.join(ROOT, "public/images", f);

// ヒーローと同じ壁面写真（コンテンツKV＋追加素材）。
// NINNIN のロボットが写る ninnin_keyshot / wall-02 / wall-05 は
// 出展未確定のため除外し、ヒーロー（Hero.tsx）と同じ18点に揃える。
const PHOTOS = [
  "tesagurido_keyshot.jpg",
  "touchmatch_keyshot.jpg",
  "braillerelay_keyshot.jpg",
  "yubibo_keyvisual.jpg",
  "dekabo_keyshot.jpg",
  "shodo_keyshot.jpg",
  "touchpark_keyshot.jpg",
  "blindblend_keyshot.jpg",
  ...[1, 3, 4, 6, 7, 8, 9, 10, 11, 12].map(
    (n) => `wall/wall-${String(n).padStart(2, "0")}.jpg`
  ),
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
  const L = Math.round(size * 0.9);
  const logo = await logoBuf(L);
  return sharp(backing(size))
    .composite([{ input: logo, left: Math.round((size - L) / 2), top: Math.round((size - L) / 2) }])
    .png()
    .toBuffer();
}

// キャッチ・ロゴ・日時・場所の入ったカード（Peatix用）。
// 日付は数字を大きく、年月日（土）を小さく（ヒーローと同じ文字組み）。
async function buildFullCard(size) {
  const cx = size / 2;
  const head = Math.round(size * 0.058); // キャッチ
  const big = Math.round(size * 0.06); // 日付の数字
  const unit = Math.round(big * 0.62); // 年月日（土）
  const loc = Math.round(size * 0.032); // 会場
  const svg = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.05)}" ry="${Math.round(size * 0.05)}" fill="${YELLOW}"/>
  <text x="${cx}" y="${Math.round(size * 0.12)}" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="${head}" fill="${INK}">「みえない」を楽しみつくそう！</text>
  <text x="${cx}" y="${Math.round(size * 0.885)}" text-anchor="middle" font-family="${FONT}" font-weight="700" fill="${INK}"><tspan font-size="${big}">2026</tspan><tspan font-size="${unit}">年</tspan><tspan font-size="${big}">10</tspan><tspan font-size="${unit}">月</tspan><tspan font-size="${big}">24</tspan><tspan font-size="${unit}">日（土）</tspan><tspan font-size="${big}" dx="7">11:00-17:00</tspan></text>
  <text x="${cx}" y="${Math.round(size * 0.945)}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${loc}" fill="${INK}">${esc("@ HOME/WORK VILLAGE（東京・池尻大橋）")}</text>
</svg>`);
  const L = Math.round(size * 0.61);
  const logo = await logoBuf(L);
  return sharp(svg)
    .composite([{ input: logo, left: Math.round((size - L) / 2), top: Math.round(size * 0.185) }])
    .png()
    .toBuffer();
}

async function generate(width, height, outPath, { card, zoom = 1 }) {
  const cols = evenCover(width);
  const rows = evenCover(height);
  const gridW = cols * TILE + (cols - 1) * GAP;
  const gridH = rows * TILE + (rows - 1) * GAP;
  const cropLeft = Math.floor((gridW - width) / 2);
  const cropTop = Math.floor((gridH - height) / 2);

  // カードは正方形で、グリッドの整数セル（2×2 など）にぴったり合わせる。
  // ヒーローと同様、その中央セルは画像を敷かず黄色のまま空けてカードを重ねる
  // （ロゴ・黄色ボックスがグリッドに綺麗に収まる）。
  const cardSize = (await sharp(card).metadata()).width;
  const cardCells = Math.round((cardSize + GAP) / (TILE + GAP));
  const cStart = cols / 2 - cardCells / 2;
  const rStart = rows / 2 - cardCells / 2;

  const tiles = [];
  let k = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isCenter =
        c >= cStart && c < cStart + cardCells && r >= rStart && r < rStart + cardCells;
      k++;
      if (isCenter) continue; // 中央セルは空ける
      const buf = await roundedTile(PHOTOS[((k - 1) * 5) % PHOTOS.length]);
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
    .extract({ left: cropLeft, top: cropTop, width, height })
    .toBuffer();

  let out = await sharp(mosaic)
    .composite([
      {
        input: card,
        left: cStart * (TILE + GAP) - cropLeft,
        top: rStart * (TILE + GAP) - cropTop,
      },
    ])
    .png()
    .toBuffer();

  // 全体を少しズーム（拡大して中央トリム）
  if (zoom && zoom !== 1) {
    const zw = Math.round(width * zoom);
    const zh = Math.round(height * zoom);
    out = await sharp(out)
      .resize(zw, zh)
      .extract({
        left: Math.round((zw - width) / 2),
        top: Math.round((zh - height) / 2),
        width,
        height,
      })
      .png()
      .toBuffer();
  }

  await sharp(out).toFile(outPath);
  console.log(`generated ${outPath} (${width}x${height}, grid ${cols}x${rows}, zoom ${zoom})`);
}

// OGP：ロゴのみ・拡大して中央（キャッチ/日時/場所なし）
const ogpCard = await buildLogoCard(410);
const ogpPath = path.join(ROOT, "app/opengraph-image.png");
await generate(1200, 630, ogpPath, { card: ogpCard });
copyFileSync(ogpPath, path.join(ROOT, "app/twitter-image.png"));

// note ヘッダー：ロゴのみ（1280×670）
const noteCard = await buildLogoCard(410);
await generate(1280, 670, path.join(ROOT, "public/images/note-header.png"), {
  card: noteCard,
  zoom: 1.1,
});

// Peatix ヘッダー：情報入り（1300×640）
const peatixCard = await buildFullCard(410);
await generate(1300, 640, path.join(ROOT, "public/images/peatix-header.png"), {
  card: peatixCard,
  zoom: 1.1,
});
