import { EVENT, IMG, TICKET_URL } from "@/lib/site";
import Reveal from "./Reveal";

// アートウォール用の写真。コンテンツKV＋追加素材を敷き詰めて壁面モザイクをつくる。
const WALL_EXTRA = Array.from(
  { length: 12 },
  (_, i) => `/images/wall/wall-${String(i + 1).padStart(2, "0")}.jpg`
);
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
  ...WALL_EXTRA,
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
const CENTER_C = (COLS - 1) / 2;
const CENTER_R = (ROWS - 1) / 2;
// 中央 2×2（ロゴカードの背後）は画像を敷かず黄色にする。
const C0 = Math.floor(CENTER_C);
const C1 = Math.ceil(CENTER_C);
const R0 = Math.floor(CENTER_R);
const R1 = Math.ceil(CENTER_R);

const MOSAIC_TILES: {
  src: string;
  label?: string;
  delay: number;
  center: boolean;
}[] = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  // 中心からの距離でディレイを付け、中央から咲くように出す。
  const dist = Math.hypot(col - CENTER_C, row - CENTER_R);
  const center = (col === C0 || col === C1) && (row === R0 || row === R1);
  // PHOTOS.length(21) と互いに素な 5 でずらし、隣接タイルの重複を避ける。
  return {
    src: PHOTOS[(i * 5) % PHOTOS.length],
    delay: Math.round(dist * 45),
    center,
  };
});
const usedLabels = new Set<string>();
for (const tile of MOSAIC_TILES) {
  if (tile.center) continue;
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
      className="relative min-h-[100svh] overflow-hidden bg-brand [--gap:6px] [--tile:150px] md:[--gap:8px] md:[--tile:200px] lg:[--tile:240px]"
    >
      <h1 className="sr-only">
        NO LOOK PARK — 「みえない」を楽しみつくす体験型イベント
      </h1>

      {/* アートウォール（固定サイズの正方形タイル・中央基準でトリム）。
          中央 2×2 は画像を敷かず黄色にして、ロゴカードの背景をクリーンにする。 */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2"
        style={{
          gridTemplateColumns: `repeat(${COLS}, var(--tile))`,
          gap: "var(--gap)",
        }}
      >
        {MOSAIC_TILES.map((tile, i) =>
          tile.center ? (
            <div key={i} className="h-[var(--tile)] w-[var(--tile)]" />
          ) : (
            <div
              key={i}
              className="hero-tile relative h-[var(--tile)] w-[var(--tile)] overflow-hidden rounded-2xl bg-cover bg-center transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.03]"
              style={{
                backgroundImage: `url(${tile.src})`,
                animationDelay: `${tile.delay}ms`,
              }}
            >
              {tile.label && (
                <span className="absolute bottom-2 left-2 font-en text-[10px] font-medium tracking-[1.5px] text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                  {tile.label}
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* 画面下部のみ黄色グラデーションでなじませる */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-brand/70 to-transparent"
      />

      {/* 中央カード（中央2×2にぴったり整列） */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <Reveal variant="zoom">
          <div
            className="flex flex-col items-center justify-center gap-[3.5%] rounded-2xl bg-brand px-[7%]"
            style={{
              width: "calc(2 * var(--tile) + var(--gap))",
              height: "calc(2 * var(--tile) + var(--gap))",
            }}
          >
            <p className="whitespace-nowrap text-center text-[17px] font-black leading-tight tracking-normal text-ink sm:text-lg md:text-[22px] lg:text-[28px]">
              {EVENT.heroCopy}
            </p>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG.logo}
              alt="NO LOOK PARK"
              className="w-[62%] sm:w-[68%]"
            />

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
              <p className="text-center text-[13px] text-ink sm:text-sm md:text-[15px]">
                <span className="sm:hidden">{EVENT.locationLineShort}</span>
                <span className="hidden sm:inline">{EVENT.locationLine}</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* チケットボタン（カードの下） */}
      <div
        className="absolute inset-x-0 z-10 flex justify-center px-6"
        style={{ top: "calc(50% + var(--tile) + var(--gap) / 2 + 24px)" }}
      >
        <Reveal variant="up" delay={250}>
          <a
            href={TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex scale-[0.95] items-center gap-3 whitespace-nowrap rounded-full bg-ink px-12 py-4 ring-2 ring-inset ring-ink transition-colors duration-300 [box-shadow:0_16px_38px_rgba(0,0,0,0.4)] hover:bg-brand md:px-16 md:py-5"
          >
            <span className="text-base tracking-[1px] text-brand transition-colors duration-300 group-hover:text-ink md:text-lg">
              チケットを購入する
            </span>
            <span
              aria-hidden
              className="font-en text-base text-brand transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-ink md:text-lg"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>

      {/* スクロール誘導（黒・下向きシェブロン） */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-en text-[11px] font-semibold tracking-[2px] text-ink [text-shadow:0_0_10px_#FFD600,0_0_18px_#FFD600]">
          SCROLL
        </span>
        <svg
          className="scroll-chevron text-ink [filter:drop-shadow(0_0_6px_#FFD600)]"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
