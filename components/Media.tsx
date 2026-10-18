import { ArrowUpRight } from "lucide-react";
import { MEDIA_COVERAGE } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * メディア掲載。インタビューのすぐ下に、媒体名・日付・題名だけの小さなカードで並べる
 * （チケットや会場の情報までの距離を延ばさないよう、画像は使わない）。
 * 本数が増えてモバイルで長くなるようなら、インタビューと同じ横スクロールにする。
 */
export default function Media() {
  return (
    <section
      id="media"
      aria-labelledby="media-title"
      className="bg-white px-6 pb-20 pt-4 md:px-12 md:pb-24"
    >
      <div className="mx-auto flex max-w-[880px] flex-col items-center gap-8 md:gap-10">
        <Reveal>
          <SectionHeading id="media-title" jp="メディア掲載" en="MEDIA" />
        </Reveal>

        <Reveal delay={80} className="w-full">
          <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {MEDIA_COVERAGE.map((m) => (
              <li key={m.url}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-xl border-2 border-ink bg-white px-5 py-5 transition-colors hover:bg-cream"
                >
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="rounded-full bg-brand px-3 py-1 text-[11px] tracking-[1px] text-ink">
                      {m.media}
                    </span>
                    <span className="font-en text-[12px] tracking-[1px] text-ink opacity-70">
                      {m.date}
                    </span>
                  </span>
                  <span className="text-[15px] leading-[1.7] text-ink">
                    {m.title}
                  </span>
                  <span className="mt-auto flex items-center gap-1 text-[12px] tracking-[1px] text-ink">
                    記事を読む
                    <ArrowUpRight size={14} aria-hidden />
                    <span className="sr-only">（新しいタブで開く）</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
