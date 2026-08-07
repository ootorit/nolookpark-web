import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "image-originals";
const OUT = "public/images";
const MAX_EDGE = 1600;
const JPEG_QUALITY = 80;

const files = await readdir(SRC);
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const srcPath = path.join(SRC, file);
  const outPath = path.join(OUT, file);
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

  const before = (await stat(srcPath)).size;
  let pipeline = sharp(srcPath).rotate().resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9 });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: JPEG_QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  await pipeline.toFile(outPath + ".tmp");
  const { renameSync } = await import("node:fs");
  renameSync(outPath + ".tmp", outPath);
  const after = (await stat(outPath)).size;

  totalBefore += before;
  totalAfter += after;
  const pct = ((1 - after / before) * 100).toFixed(0);
  console.log(
    `${file}: ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB  (-${pct}%)`
  );
}

console.log(
  `\nTOTAL: ${(totalBefore / 1e6).toFixed(1)}MB -> ${(totalAfter / 1e6).toFixed(1)}MB  (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`
);
