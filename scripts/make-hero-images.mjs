import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG = (f) => path.join(ROOT, "public/images", f);

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
].map(IMG);

const TILE = 200;
const GAP = 10;
const RAD = 18;
const CARD = 2 * TILE + GAP; // 中央カード = 2×2タイル

const HEAD = "Hiragino Sans"; // 太字は W8 系にフォールバック
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

async function buildCard() {
  // 影
  const shadow = await sharp({
    create: {
      width: CARD + 80,
      height: CARD + 80,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${CARD + 80}" height="${CARD + 80}"><rect x="40" y="48" width="${CARD}" height="${CARD}" rx="${RAD}" ry="${RAD}" fill="rgba(0,0,0,0.42)"/></svg>`
        ),
        top: 0,
        left: 0,
      },
    ])
    .blur(22)
    .png()
    .toBuffer();

  // カード本体（黄色角丸＋テキスト）
  const cardSvg = Buffer.from(`
<svg width="${CARD}" height="${CARD}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${CARD}" height="${CARD}" rx="${RAD}" ry="${RAD}" fill="${YELLOW}"/>
  <text x="${CARD / 2}" y="66" text-anchor="middle" font-family="${HEAD}" font-weight="800" font-size="27" fill="${INK}">「みえない」を楽しみつくそう！</text>
  <text x="${CARD / 2}" y="352" text-anchor="middle" font-family="${HEAD}" font-weight="700" font-size="21" fill="${INK}">2026年10月24日（土）11:00-17:00</text>
  <text x="${CARD / 2}" y="382" text-anchor="middle" font-family="${HEAD}" font-weight="500" font-size="13" fill="${INK}">${esc("@ HOME/WORK VILLAGE（東京・池尻大橋）")}</text>
</svg>`);

  const LOGO = 232;
  const logoBuf = await sharp(IMG("logo@2x.png"))
    .resize(LOGO, LOGO, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const card = await sharp(cardSvg)
    .composite([{ input: logoBuf, left: Math.round((CARD - LOGO) / 2), top: 84 }])
    .png()
    .toBuffer();

  return { card, shadow };
}

async function generate(width, height, outPath) {
  const cols = evenCover(width);
  const rows = evenCover(height);
  const gridW = cols * TILE + (cols - 1) * GAP;
  const gridH = rows * TILE + (rows - 1) * GAP;

  // グリッドを大きめキャンバスに敷いてから中央をトリム
  const tiles = [];
  let k = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const buf = await roundedTile(PHOTOS[(k * 7) % PHOTOS.length]);
      k++;
      tiles.push({ input: buf, left: c * (TILE + GAP), top: r * (TILE + GAP) });
    }
  }
  const grid = await sharp({
    create: { width: gridW, height: gridH, channels: 4, background: INK },
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

  // ビネット＋下側の落とし込み
  const vignette = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="v" cx="50%" cy="45%" r="72%">
      <stop offset="34%" stop-color="#1A1A1A" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1A1A1A" stop-opacity="0.62"/>
    </radialGradient>
    <linearGradient id="b" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#1A1A1A" stop-opacity="0.8"/>
      <stop offset="34%" stop-color="#1A1A1A" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#v)"/>
  <rect width="${width}" height="${height}" fill="url(#b)"/>
</svg>`);

  const { card, shadow } = await buildCard();

  await sharp(mosaic)
    .composite([
      { input: vignette, left: 0, top: 0 },
      {
        input: shadow,
        left: Math.round((width - (CARD + 80)) / 2),
        top: Math.round((height - (CARD + 80)) / 2),
      },
      {
        input: card,
        left: Math.round((width - CARD) / 2),
        top: Math.round((height - CARD) / 2),
      },
    ])
    .png()
    .toFile(outPath);

  console.log(`generated ${outPath} (${width}x${height}, grid ${cols}x${rows})`);
}

await generate(1200, 630, IMG("ogp.png"));
await generate(1300, 640, IMG("peatix-header.png"));
