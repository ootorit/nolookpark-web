import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Poppins（欧文・数字）＋ Noto Sans JP（和文）で描画するため fontconfig を指定。
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
const CX = SIZE / 2;
const AREA_L = INSET + PAD;
const AREA_R = SIZE - INSET - PAD;
const TEXT_W = AREA_R - AREA_L;

// 上部に置く NO LOOK RADIO ロゴ（見つかれば合成）。余白をトリムして高さで揃える。
const LOGO_PATH = path.join(ROOT, "public/images/nolook-radio-logo.png");
const LOGO_H = 300; // 合成する高さ

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const TOPICS = [
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
// スラッシュ区切りの1本のテキストにして幅いっぱいに流す
const JOINED = TOPICS.join(" / ");

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

async function main() {
  const hasLogo = existsSync(LOGO_PATH);
  let logoBuf = null;
  let logoH = 0;
  let logoW = 0;
  if (hasLogo) {
    // 黄色の余白をトリムしてワードマークだけにし、高さで揃える
    logoBuf = await sharp(LOGO_PATH)
      .trim()
      .resize({ height: LOGO_H })
      .png()
      .toBuffer();
    const m = await sharp(logoBuf).metadata();
    logoH = m.height;
    logoW = m.width;
  } else {
    console.warn("⚠ logo not found:", LOGO_PATH, "→ ロゴなしで生成");
  }

  // テキストエリア（ロゴがあればその下）。ロゴ上部の余白を広めにとる。
  const logoTop = INSET + 78;
  const textTop = hasLogo ? logoTop + logoH + 30 : INSET + PAD;
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
  const firstBaseline = Math.round(
    textTop + (textAreaH - blockH) / 2 + fs * 0.82
  );
  const tspans = lines
    .map((ln, i) => `<tspan x="${AREA_L}" y="${firstBaseline + i * lineGap}">${esc(ln)}</tspan>`)
    .join("");

  const svg = Buffer.from(`
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${SIZE}" height="${SIZE}" fill="${YELLOW}"/>
  <rect x="${INSET}" y="${INSET}" width="${SIZE - 2 * INSET}" height="${SIZE - 2 * INSET}" rx="${RADIUS}" ry="${RADIUS}" fill="none" stroke="${INK}" stroke-width="${STROKE}"/>
  <text font-family="${FONT}" font-weight="${WEIGHT}" font-size="${fs}" fill="${INK}" text-anchor="start">${tspans}</text>
</svg>`);

  const composites = [];
  if (logoBuf) {
    composites.push({ input: logoBuf, left: AREA_L, top: logoTop });
  }
  const out = path.join(ROOT, "public/images/podcast-topics.png");
  await sharp(svg).composite(composites).png().toFile(out);
  console.log(`generated ${out}  fs=${fs}  lines=${lines.length}  logo=${hasLogo}`);
}

await main();
