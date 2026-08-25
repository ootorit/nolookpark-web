import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Poppins（欧文・数字）＋ Noto Sans JP（和文）で描画するため fontconfig を指定。
process.env.FONTCONFIG_FILE = path.join(ROOT, "scripts/fonts.conf");
const sharp = (await import("sharp")).default;

const SIZE = 1080;
const YELLOW = "#FFD600";
const INK = "#1A1A1A";
const FONT = "'Noto Sans JP', Poppins";
const WEIGHT = 900; // 一段階太く（Black）

// ロゴと同じ雰囲気の黒い角丸フレーム
const INSET = 60;
const STROKE = 9;
const RADIUS = 88;
// 文字エリア（枠の内側にさらに余白）
const PAD = 58;
const TEXT_W = SIZE - 2 * (INSET + PAD);
const TEXT_H = SIZE - 2 * (INSET + PAD);
const CENTER = SIZE / 2;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ポッドキャストのトピック（1枚に全部並べる）
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

// 全トピックが1行ずつ収まる最大フォントサイズ
const n = TOPICS.length;
const maxLen = Math.max(...TOPICS.map((t) => [...t].length));
const LINE = 1.85; // 行送り
const widthFs = TEXT_W / (maxLen * 0.98);
const heightFs = TEXT_H / (n * LINE);
const fs = Math.floor(Math.min(widthFs, heightFs));
const lineGap = Math.round(fs * LINE);

// 縦方向は中央寄せ
const blockH = (n - 1) * lineGap;
const firstBaseline = Math.round(CENTER - blockH / 2 + fs * 0.35);
const tspans = TOPICS.map(
  (t, i) =>
    `<tspan x="${CENTER}" y="${firstBaseline + i * lineGap}">${esc(t)}</tspan>`
).join("");

const svg = Buffer.from(`
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${SIZE}" height="${SIZE}" fill="${YELLOW}"/>
  <rect x="${INSET}" y="${INSET}" width="${SIZE - 2 * INSET}" height="${SIZE - 2 * INSET}" rx="${RADIUS}" ry="${RADIUS}" fill="none" stroke="${INK}" stroke-width="${STROKE}"/>
  <text font-family="${FONT}" font-weight="${WEIGHT}" font-size="${fs}" fill="${INK}" text-anchor="middle">${tspans}</text>
</svg>`);

const out = path.join(ROOT, "public/images/podcast-topics.png");
await sharp(svg).png().toFile(out);
console.log(`generated ${out}  fs=${fs}  topics=${n}`);
