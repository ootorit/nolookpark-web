import { EVENT, IMG, TICKET_URL } from "@/lib/site";
import Reveal from "./Reveal";

function Tile({
  src,
  size,
}: {
  src: string;
  size: "sm" | "lg";
}) {
  return (
    <div
      aria-hidden
      className={[
        "shrink-0 rounded-[28px] bg-cover bg-center ring-[6px] ring-inset ring-ink",
        size === "lg"
          ? "h-[170px] w-[170px] sm:h-[232px] sm:w-[232px] lg:h-[320px] lg:w-[320px]"
          : "h-[135px] w-[135px] sm:h-[186px] sm:w-[186px] lg:h-[276px] lg:w-[276px]",
      ].join(" ")}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="トップ"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-10 overflow-hidden bg-brand px-6 py-28 md:py-32"
    >
      <h1 className="sr-only">
        NO LOOK PARK — 「みえない」を楽しみつくす体験型イベント
      </h1>

      <div className="flex flex-col items-center gap-6 md:gap-8">
        <Reveal delay={200}>
          <p className="text-center text-2xl font-bold tracking-[2px] text-ink md:text-[44px] md:tracking-[3px]">
            {EVENT.heroCopy}
          </p>
        </Reveal>

        {/* Tile strip — logo first, then tiles emerge outward from the center */}
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <Reveal variant="zoom" delay={1050}>
            <Tile src={IMG.contentTouchpark} size="sm" />
          </Reveal>
          <Reveal variant="zoom" delay={700}>
            <Tile src={IMG.contentTesagurido} size="sm" />
          </Reveal>
          <Reveal variant="zoom" delay={350}>
            <Tile src={IMG.contentTouchmatch} size="lg" />
          </Reveal>
          <Reveal variant="zoom" delay={0}>
            <div
              aria-hidden
              className="h-[210px] w-[210px] shrink-0 bg-contain bg-center bg-no-repeat sm:h-[280px] sm:w-[280px] lg:h-[392px] lg:w-[392px]"
              style={{ backgroundImage: `url(${IMG.logo})` }}
            />
          </Reveal>
          <Reveal variant="zoom" delay={350}>
            <Tile src={IMG.contentBrailleRelay} size="lg" />
          </Reveal>
          <Reveal variant="zoom" delay={700}>
            <Tile src={IMG.contentYubibo} size="sm" />
          </Reveal>
          <Reveal variant="zoom" delay={1050}>
            <Tile src={IMG.contentTouchpark} size="sm" />
          </Reveal>
        </div>

        <Reveal delay={1150}>
          <div className="flex flex-col items-center gap-2">
            <p className="flex flex-wrap items-baseline justify-center font-bold tracking-[1px] text-ink text-2xl md:text-[34px]">
              <span>{EVENT.dateParts.year}</span>
              <span className="text-[0.6em]">年</span>
              <span>{EVENT.dateParts.month}</span>
              <span className="text-[0.6em]">月</span>
              <span>{EVENT.dateParts.day}</span>
              <span className="text-[0.6em]">日（{EVENT.dateParts.dow}）</span>
              <span className="ml-2.5">{EVENT.dateParts.time}</span>
            </p>
            <p className="text-center text-sm text-ink md:text-lg">
              {EVENT.locationLine}
            </p>
          </div>
        </Reveal>

        <Reveal delay={1300}>
          <div className="flex flex-col items-center gap-8">
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full bg-ink px-10 py-4 md:px-14 md:py-[18px]"
            >
              <span className="text-sm tracking-[1px] text-brand">
                チケットを購入する
              </span>
              <span
                aria-hidden
                className="font-en text-sm text-brand transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-en text-[10px] tracking-[1px] text-ink">SCROLL</span>
        <span className="h-8 w-px bg-ink/40" />
      </div>
    </section>
  );
}
