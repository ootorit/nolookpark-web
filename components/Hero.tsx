import { EVENT, IMG } from "@/lib/site";
import Reveal from "./Reveal";

function Tile({ src, size }: { src: string; size: "sm" | "lg" }) {
  return (
    <div
      className={[
        "shrink-0 rounded-[28px] bg-cover bg-center ring-[6px] ring-inset ring-ink",
        size === "lg"
          ? "h-[136px] w-[136px] sm:h-[190px] sm:w-[190px] lg:h-[255px] lg:w-[255px]"
          : "h-[108px] w-[108px] sm:h-[150px] sm:w-[150px] lg:h-[221px] lg:w-[221px]",
      ].join(" ")}
      style={{ backgroundImage: `url(${src})` }}
      aria-hidden
    />
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-10 overflow-hidden bg-brand px-6 py-28 md:py-32"
    >
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <Reveal delay={200}>
          <p className="font-en text-center text-sm font-bold tracking-[4px] text-ink md:text-2xl md:tracking-[6px]">
            {EVENT.dateLabel}
          </p>
        </Reveal>

        {/* Tile strip — logo first, then tiles emerge outward from the center */}
        <div className="flex items-center justify-center gap-3 md:gap-6">
          <Reveal variant="zoom" delay={700}>
            <Tile src={IMG.kvL2} size="sm" />
          </Reveal>
          <Reveal variant="zoom" delay={350}>
            <Tile src={IMG.kvL1} size="lg" />
          </Reveal>
          <Reveal variant="zoom" delay={0}>
            <div
              className="h-[136px] w-[136px] shrink-0 bg-contain bg-center bg-no-repeat sm:h-[190px] sm:w-[190px] lg:h-[357px] lg:w-[357px]"
              style={{ backgroundImage: `url(${IMG.logo})` }}
              aria-label="NO LOOK PARK ロゴ"
              role="img"
            />
          </Reveal>
          <Reveal variant="zoom" delay={350}>
            <Tile src={IMG.kvR1} size="lg" />
          </Reveal>
          <Reveal variant="zoom" delay={700}>
            <Tile src={IMG.kvR2} size="sm" />
          </Reveal>
        </div>

        <Reveal delay={950}>
          <div className="flex flex-col items-center gap-8">
            <p className="text-center text-sm font-extrabold text-ink/70 md:text-lg">
              {EVENT.locationLine}
            </p>
            <a
              href="#contact"
              className="group flex items-center gap-3 rounded-full bg-ink px-10 py-4 md:px-14 md:py-[18px]"
            >
              <span className="text-sm font-bold tracking-[3px] text-brand">
                チケットを購入する
              </span>
              <span className="font-en text-sm font-bold text-brand transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-en text-[10px] tracking-[3px] text-ink/50">SCROLL</span>
        <span className="h-8 w-px bg-ink/40" />
      </div>
    </section>
  );
}
