import { SPONSORS, IMG, CO_HOST } from "@/lib/site";

type MarqueeItem = { name: string; logo?: string };

// 実スポンサーのみ（Vision Consortium + SPONSORS）。
const REAL: MarqueeItem[] = [
  { name: CO_HOST.nameEn, logo: IMG.visionConsortiumLogo },
  ...SPONSORS,
];

// スポンサーが少なくても帯を満たしてシームレスに流れるよう、
// 一列ぶん（HALF）を十分な幅まで繰り返し、それを2つ並べて -50% ループさせる。
const HALF: MarqueeItem[] = Array.from({ length: 6 }, () => REAL).flat();

export default function Sponsors() {
  const items = [...HALF, ...HALF];

  return (
    <section aria-label="協賛" className="overflow-hidden bg-cream py-7">
      <div className="flex w-max items-center animate-marquee">
        {items.map((item, i) =>
          item.logo ? (
            <div
              key={i}
              className="mr-10 flex h-20 shrink-0 items-center justify-center md:mr-16"
              aria-hidden={i >= REAL.length}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo}
                alt={`${item.name} のロゴ`}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ) : (
            <div
              key={i}
              className="mr-10 flex h-14 shrink-0 items-center justify-center rounded-lg bg-white px-5 ring-1 ring-inset ring-line md:mr-16"
              aria-hidden={i >= REAL.length}
            >
              <span className="font-en w-24 text-center text-[13px] text-ink md:w-28">
                {item.name}
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
}
