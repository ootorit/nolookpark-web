import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Noto Sans JP で描画するため fontconfig を指定。
process.env.FONTCONFIG_FILE = path.join(ROOT, "scripts/fonts.conf");
const sharp = (await import("sharp")).default;

const SIZE = 1080;
const YELLOW = "#FFD600";
const INK = "#1A1A1A";
const FONT = "'Noto Sans JP'";
const WEIGHT = 900;

// ロゴと同じ雰囲気の黒い角丸フレーム
const INSET = 60;
const STROKE = 9;
const RADIUS = 88;
const PAD = 58;
const AREA_L = INSET + PAD;
const AREA_R = SIZE - INSET - PAD;
const TEXT_W = AREA_R - AREA_L;

// 上部に置く NO LOOK RADIO ロゴ（見つかれば合成）。余白をトリムして高さで揃える。
const LOGO_PATH = path.join(ROOT, "public/images/nolook-radio-logo.png");
const LOGO_H = 300;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// maxChars で折り返し（" / " の直後で優先的に改行）
function wrap(text, maxChars) {
  const chars = [...text];
  const lines = [];
  let line = "";
  for (let i = 0; i < chars.length; i++) {
    line += chars[i];
    const justClosedSlash = chars[i] === " " && chars[i - 1] === "/";
    if ((justClosedSlash && line.length >= maxChars * 0.6) || line.length >= maxChars) {
      lines.push(line.trim());
      line = "";
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

// ロゴを一度だけ用意
let logoBuf = null;
let logoH = 0;
let logoW = 0;
if (existsSync(LOGO_PATH)) {
  logoBuf = await sharp(LOGO_PATH).trim().resize({ height: LOGO_H }).png().toBuffer();
  const m = await sharp(logoBuf).metadata();
  logoH = m.height;
  logoW = m.width;
} else {
  console.warn("⚠ logo not found:", LOGO_PATH);
}

async function render(topics, outName) {
  const JOINED = topics.join(" / ");

  const logoTop = INSET + 78;
  const textTop = logoBuf ? logoTop + logoH + 30 : INSET + PAD;
  const textBottom = SIZE - INSET - PAD;
  const textAreaH = textBottom - textTop;

  // テキストエリアを埋める最大フォントサイズを選ぶ
  let chosen = { fs: 24, lines: [JOINED] };
  for (let fs = 72; fs >= 22; fs -= 1) {
    const maxChars = Math.max(6, Math.floor(TEXT_W / (fs * 0.98)));
    const lines = wrap(JOINED, maxChars);
    const lineGap = fs * 1.5;
    const blockH = (lines.length - 1) * lineGap + fs;
    if (blockH <= textAreaH) {
      chosen = { fs, lines };
      break;
    }
  }
  const { fs, lines } = chosen;
  const lineGap = Math.round(fs * 1.5);
  const blockH = (lines.length - 1) * lineGap + fs;
  const firstBaseline = Math.round(textTop + (textAreaH - blockH) / 2 + fs * 0.82);

  // 両端揃え（最終行以外は幅いっぱいに伸ばして左右マージンを揃える）
  const tspans = lines
    .map((ln, i) => {
      const justify = i < lines.length - 1 && [...ln].length > 1;
      const attr = justify ? ` textLength="${TEXT_W}" lengthAdjust="spacing"` : "";
      return `<tspan x="${AREA_L}" y="${firstBaseline + i * lineGap}"${attr}>${esc(ln)}</tspan>`;
    })
    .join("");

  const svg = Buffer.from(`
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${SIZE}" height="${SIZE}" fill="${YELLOW}"/>
  <rect x="${INSET}" y="${INSET}" width="${SIZE - 2 * INSET}" height="${SIZE - 2 * INSET}" rx="${RADIUS}" ry="${RADIUS}" fill="none" stroke="${INK}" stroke-width="${STROKE}"/>
  <text font-family="${FONT}" font-weight="${WEIGHT}" font-size="${fs}" fill="${INK}" text-anchor="start">${tspans}</text>
</svg>`);

  const composites = logoBuf
    ? [{ input: logoBuf, left: Math.round((SIZE - logoW) / 2), top: logoTop }]
    : [];
  const out = path.join(ROOT, "public/images", outName);
  await sharp(svg).composite(composites).png().toFile(out);
  console.log(`generated ${outName}  fs=${fs}  lines=${lines.length}`);
}

// 第1回
const EP1 = [
  "社会のはぐれ者が3人、平日の昼間に集まって",
  "ツナマヨおにぎり",
  "ある朝起きたら、見えなくなっていた",
  "当事者と、当事者の親と、当事者とともにつくる人",
  "うまい棒からはじまる、日常が異常になる瞬間",
  "「大変だったよね」という呪いを解く",
  "目を閉じると、目新しくなる",
  "ロールモデルは「近所の面白い視覚障害のおっちゃん」",
  "コミュ力お化けと、見えない占い師",
  "未知の既知化",
];
// 第2回
const EP2 = [
  "適当なのに、行動力がある人たち",
  "ネオ百姓と、アルティメットノールック",
  "小さい声で、みんなの耳を奪っていく",
  "自分で扉を開けに行く",
  "触覚は、思ったより平等らしい",
  "触覚日記から生まれたゲーム",
  "会話って、けっこう適当",
  "ゆびぼうは、指の概念を塗り替える",
  "マテリアルとマジック",
  "DEKABOは、その場に前衛芸術を出現させる",
  "ノールックというスパイスを、堂々と持っていていい",
  "隠し味は、いつだってノールック",
];

await render(EP1, "podcast-topics.png");
await render(EP2, "podcast-topics-2.png");
