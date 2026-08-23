import { EVENT, IMG } from "@/lib/site";
import Reveal from "./Reveal";

// アートウォール用の写真。9点を敷き詰めて壁面モザイクをつくる。
const PHOTOS = [
  IMG.contentTesagurido,
  IMG.contentTouchmatch,
  IMG.contentBrailleRelay,
  IMG.contentYubibo,
  IMG.contentDekabo,
  IMG.contentShodo,
  IMG.contentTouchpark,
  IMG.contentBlindBlend,
  IMG.contentNinnin,
];

// 一部タイルに重ねる作品ラベル（各1回だけ表示）。
const LABELS: Record<string, string> = {
  [IMG.contentTouchpark]: "TOUCH PARK",
  [IMG.contentBlindBlend]: "BLIND BLEND",
  [IMG.contentYubibo]: "YUBIBO",
};

// 正方形タイルを固定サイズで敷き詰め、画面より大きいグリッドを中央寄せして
// はみ出しをトリムする。列×行は偶数にして中央がちょうど 2×2 になるようにする。
const COLS = 12;
const ROWS = 10;
const MOSAIC_TILES: { src: string; label?: string }[] = Array.from(
  { length: COLS * ROWS },
  (_, i) => ({ src: PHOTOS[(i * 7) % PHOTOS.length] })
);
const usedLabels = new Set<string>();
for (const tile of MOSAIC_TILES) {
  const label = LABELS[tile.src];
  if (label && !usedLabels.has(label)) {
    tile.label = label;
    usedLabels.add(label);
  }
}

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="トップ"
      className="relative min-h-[100svh] overflow-hidden bg-ink [--gap:6px] [--tile:116px] sm:[--tile:150px] md:[--gap:8px] md:[--tile:200px] lg:[--tile:240px]"
    >
      <h1 className="sr-only">
        NO LOOK PARK — 「みえない」を楽しみつくす体験型イベント
      </h1>

      {/* アートウォール（固定サイズの正方形タイル・中央基準でトリム） */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2"
        style={{
          gridTemplateColumns: `repeat(${COLS}, var(--tile))`,
          gap: "var(--gap)",
        }}
      >
        {MOSAIC_TILES.map((tile, i) => (
          <div
            key={i}
            className="relative h-[var(--tile)] w-[var(--tile)] overflow-hidden rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${tile.src})` }}
          >
            {tile.label && (
              <span className="absolute bottom-2 left-2 font-en text-[10px] font-medium tracking-[1.5px] text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                {tile.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 周辺フェード（ビネット）＋下側の落とし込み */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 45%, rgba(26,26,26,0) 34%, rgba(26,26,26,0.62) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent"
      />

      {/* 中央カード（2×2タイル分の正方形）：タグライン・ロゴ・日付 */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <Reveal variant="zoom">
          <div
            className="flex flex-col items-center justify-center gap-[3.5%] rounded-2xl bg-brand px-[7%] [box-shadow:0_18px_48px_rgba(0,0,0,0.5)]"
            style={{
              width: "calc(2 * var(--tile) + var(--gap))",
              height: "calc(2 * var(--tile) + var(--gap))",
            }}
          >
            <p className="whitespace-nowrap text-center text-[13px] font-black leading-tight tracking-normal text-ink sm:text-base md:text-xl lg:text-[26px]">
              {EVENT.heroCopy}
            </p>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.logo} alt="NO LOOK PARK" className="w-[70%]" />

            <div className="flex flex-col items-center gap-1">
              <p className="flex flex-wrap items-baseline justify-center text-[15px] font-bold tracking-[0.5px] text-ink sm:text-lg md:text-xl lg:text-[22px]">
                <span>{EVENT.dateParts.year}</span>
                <span className="text-[0.6em]">年</span>
                <span>{EVENT.dateParts.month}</span>
                <span className="text-[0.6em]">月</span>
                <span>{EVENT.dateParts.day}</span>
                <span className="text-[0.6em]">日（{EVENT.dateParts.dow}）</span>
                <span className="ml-1.5">{EVENT.dateParts.time}</span>
              </p>
              <p className="text-center text-[9px] text-ink sm:text-[10px] md:text-xs">
                {EVENT.locationLine}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
