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

// キャッチ・ロゴ・（日時）・場所の入ったカード（Peatix・縦型用）。
// 日付は数字を大きく、年月日（土）を小さく（ヒーローと同じ文字組み）。
// showDate=false で日時行を省き、ロゴを少し大きくする。
async function buildFullCard(size, { showDate = true } = {}) {
  const cx = size / 2;
  const head = Math.round(size * 0.058); // キャッチ
  const big = Math.round(size * 0.06); // 日付の数字
  const unit = Math.round(big * 0.62); // 年月日（土）
  const loc = Math.round(size * 0.032); // 会場
  const dateText = showDate
    ? `<text x="${cx}" y="${Math.round(size * 0.885)}" text-anchor="middle" font-family="${FONT}" font-weight="700" fill="${INK}"><tspan font-size="${big}">2026</tspan><tspan font-size="${unit}">年</tspan><tspan font-size="${big}">10</tspan><tspan font-size="${unit}">月</tspan><tspan font-size="${big}">24</tspan><tspan font-size="${unit}">日（土）</tspan><tspan font-size="${big}" dx="7">11:00-17:00</tspan></text>`
    : "";
  const venueY = showDate ? 0.945 : 0.92;
  const svg = Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.05)}" ry="${Math.round(size * 0.05)}" fill="${YELLOW}"/>
  <text x="${cx}" y="${Math.round(size * 0.12)}" text-anchor="middle" font-family="${FONT}" font-weight="900" font-size="${head}" fill="${INK}">「みえない」を楽しみつくそう！</text>
  ${dateText}
  <text x="${cx}" y="${Math.round(size * venueY)}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${loc}" fill="${INK}">${esc("@ HOME/WORK VILLAGE（東京・池尻大橋）")}</text>
</svg>`);
  const L = Math.round(size * (showDate ? 0.61 : 0.62));
  const logo = await logoBuf(L);
  const top = Math.round(size * (showDate ? 0.185 : 0.22));
  return sharp(svg)
    .composite([{ input: logo, left: Math.round((size - L) / 2), top }])
    .png()
    .toBuffer();
}

// 写真の割り当て。写真より升目のほうが多いので重複は避けられないが、
// 「同じ写真ばかり見える」状態にならないよう2点を守る：
//   1. 使用回数を均等にする（PHOTOS を1周ずつ使い切る「パス」に区切る）。
//   2. 同じ写真どうしをできるだけ引き離す（各升目には、そのパスの残りのうち
//      既に置かれた同じ写真から最も遠いものを選ぶ）。
// 1周目は全員未配置なので、従来どおり 5 とびの順番がそのまま出る。
function planPhotos(cells) {
  const n = PHOTOS.length;
  const placed = Array.from({ length: n }, () => []);
  const plan = [];
  let pool = [];
  let pass = 0;
  for (const cell of cells) {
    if (pool.length === 0) {
      // PHOTOS.length と互いに素な 5 とびで並べ、パスごとに開始位置をずらす。
      pool = Array.from({ length: n }, (_, j) => (pass + j * 5) % n);
      pass++;
    }
    let bestAt = 0;
    let bestDist = -1;
    for (let i = 0; i < pool.length; i++) {
      let d = Infinity;
      for (const q of placed[pool[i]]) {
        const dd = Math.hypot(q.c - cell.c, q.r - cell.r);
        if (dd < d) d = dd;
      }
      if (d > bestDist) {
        bestDist = d;
        bestAt = i;
      }
    }
    const photo = pool[bestAt];
    pool.splice(bestAt, 1);
    plan.push(photo);
    placed[photo].push(cell);
  }
  return refine(cells, plan);
}

// 同じ写真どうしの距離を昇順に並べたもの。これを辞書順で大きくしていけば、
// 「いちばん近い重複」から順に引き離せる。
function dupDistances(cells, plan) {
  const groups = Array.from({ length: PHOTOS.length }, () => []);
  plan.forEach((photo, i) => groups[photo].push(cells[i]));
  const ds = [];
  for (const g of groups) {
    for (let i = 0; i < g.length; i++) {
      for (let j = i + 1; j < g.length; j++) {
        ds.push(Math.hypot(g[i].c - g[j].c, g[i].r - g[j].r));
      }
    }
  }
  return ds.sort((a, b) => a - b);
}

const isBetter = (a, b) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (Math.abs(a[i] - b[i]) > 1e-9) return a[i] > b[i];
  }
  return false;
};

// 2枚を入れ替えて改善するならそうする、を改善が止まるまで繰り返す。
// 使用回数は入れ替えでは変わらないので、均等さを保ったまま重複だけが遠ざかる。
function refine(cells, plan) {
  let best = plan.slice();
  let bestD = dupDistances(cells, best);
  for (let round = 0; round < 200; round++) {
    let improved = false;
    for (let i = 0; i < best.length && !improved; i++) {
      for (let j = i + 1; j < best.length; j++) {
        if (best[i] === best[j]) continue;
        const cand = best.slice();
        cand[i] = best[j];
        cand[j] = best[i];
        const candD = dupDistances(cells, cand);
        if (isBetter(candD, bestD)) {
          best = cand;
          bestD = candD;
          improved = true;
          break;
        }
      }
    }
    if (!improved) break;
  }
  return best;
}

// 出力。入稿用のポスターは JPEG（PNG だと 2.4MB 前後で重く、入稿先の上限に
// かかることがある）。黄色地に黒文字が乗るので、色にじみが出ないよう
// クロマサブサンプリングは 4:4:4 のままにする。
async function write(buf, outPath) {
  const img = sharp(buf);
  if (/\.jpe?g$/i.test(outPath)) {
    return img
      .jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true })
      .toFile(outPath);
  }
  return img.toFile(outPath);
}

async function generate(width, height, outPath, { card, zoom = 1 }) {
  // カードは正方形で、グリッドの整数セル（2×2, 3×3 など）にぴったり合わせる。
  // カードのセル数と同じ偶奇で列・行を広げると、中央にカードがぴったり収まる。
  const cardSize = (await sharp(card).metadata()).width;
  const cardCells = Math.round((cardSize + GAP) / (TILE + GAP));
  const cover = (target) => {
    let n = cardCells;
    while (n * TILE + (n - 1) * GAP < target) n += 2;
    return n;
  };
  const cols = cover(width);
  const rows = cover(height);
  const gridW = cols * TILE + (cols - 1) * GAP;
  const gridH = rows * TILE + (rows - 1) * GAP;
  const cropLeft = Math.floor((gridW - width) / 2);
  const cropTop = Math.floor((gridH - height) / 2);

  // ヒーローと同様、中央のカード用セルは画像を敷かず黄色のまま空けてカードを重ねる。
  const cStart = (cols - cardCells) / 2;
  const rStart = (rows - cardCells) / 2;

  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isCenter =
        c >= cStart && c < cStart + cardCells && r >= rStart && r < rStart + cardCells;
      if (isCenter) continue; // 中央セルは空ける
      cells.push({ c, r });
    }
  }

  const tiles = [];
  const plan = planPhotos(cells);
  for (let i = 0; i < cells.length; i++) {
    const buf = await roundedTile(PHOTOS[plan[i]]);
    tiles.push({
      input: buf,
      left: cells[i].c * (TILE + GAP),
      top: cells[i].r * (TILE + GAP),
    });
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

  await write(out, outPath);
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

// 4:5 縦型（Instagram / HOME/WORK VILLAGE 掲載用）1080×1350。
// カードは 3×3（620px）に小さくして、体験写真（アートウォール）を多めに見せる。
const v45DateCard = await buildFullCard(620, { showDate: true });
await generate(1080, 1350, path.join(ROOT, "public/images/poster-4x5-date.jpg"), {
  card: v45DateCard,
  zoom: 1.08,
});

// 5:4 横型 1350×1080。上の縦型と同じ内容・同じカード（3×3）で、天地を入れ替えた版。
const h54DateCard = await buildFullCard(620, { showDate: true });
await generate(1350, 1080, path.join(ROOT, "public/images/poster-5x4-date.jpg"), {
  card: h54DateCard,
  zoom: 1.08,
});

// 3:4 縦型 1080×1440。上の 4:5 より一段縦長。
const v34DateCard = await buildFullCard(620, { showDate: true });
await generate(1080, 1440, path.join(ROOT, "public/images/poster-3x4-date.jpg"), {
  card: v34DateCard,
  zoom: 1.08,
});

// 9:16 縦型（16:9 を縦にしたストーリーズ・リール比）1080×1920。
// 縦に細長いぶん画面に入るタイルが多く、ズーム 1.08 のままだと36枚が見えて
// そのうち16枚ぶんが重複になる。カードは他の縦型と同じ 620px に揃えたまま、
// ズームだけ 1.3 に上げて外周を落とす。半分以上見えているタイルは12枚まで減り、
// タイル1枚あたりも大きく写る。
const v916DateCard = await buildFullCard(620, { showDate: true });
await generate(1080, 1920, path.join(ROOT, "public/images/poster-9x16-date.jpg"), {
  card: v916DateCard,
  zoom: 1.3,
});
