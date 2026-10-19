import { ArrowUpRight } from "lucide-react";
import { MEDIA_COVERAGE } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * メディア掲載。インタビューのすぐ下に、記事の OGP 画像＋媒体名・日付・題名のカードで並べる。
 * モバイルは画像を左に小さく置いて、カードが縦に延びないようにする（チケットや会場の情報までの距離を延ばさない）。
 * 本数が増えてモバイルで長くなるようなら、インタビューと同じ横スクロールにする。
 */
export default function Media() {
  return (
    <section
      id="media"
      aria-labelledby="media-title"
      className="bg-white px-6 py-20 md:px-12 md:py-24"
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
                  className="group flex h-full flex-row gap-3 overflow-hidden rounded-xl border-2 border-ink bg-white p-3 transition-colors hover:bg-cream md:flex-col md:gap-0 md:p-0"
                >
                  {/* 画像：モバイルは左に小さく（カードを縦に延ばさない）、PC は上に。記事の OGP（1200×630）の比率 */}
                  <span className="w-[38%] shrink-0 self-start overflow-hidden rounded-md md:w-full md:rounded-none md:border-b-2 md:border-ink">
                    {m.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.image}
                        alt=""
                        loading="lazy"
                        className="block aspect-[40/21] w-full object-cover object-top"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex aspect-[40/21] w-full items-center justify-center bg-brand text-[13px] tracking-[2px] text-ink md:text-[20px]"
                      >
                        {m.media.replace(/（.*）$/, "")}
                      </span>
                    )}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-3 md:px-5 md:py-5">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[11px] tracking-[1px] text-ink">
                        {m.media}
                      </span>
                      <span className="font-en text-[11px] tracking-[1px] text-ink opacity-70">
                        {m.date}
                      </span>
                    </span>
                    <span className="text-[13px] leading-[1.6] text-ink md:text-[15px] md:leading-[1.7]">
                      {m.title}
                    </span>
                    <span className="mt-auto hidden items-center gap-1 text-[12px] tracking-[1px] text-ink md:flex">
                      記事を読む
                      <ArrowUpRight size={14} aria-hidden />
                    </span>
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
