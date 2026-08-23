import { CONTENTS, IMG } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Contents() {
  return (
    <section
      id="contents"
      aria-label="コンテンツ"
      className="bg-cream px-6 py-24 md:px-12 md:py-28"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-10">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <SectionHeading jp="コンテンツ" en="CONTENTS" />
          <p className="max-w-[680px] text-base leading-[1.9] text-ink">
            視覚を手放すと、もっと自由になれる。
            <br className="hidden sm:block" />
            みえないからこそ楽しいコンテンツが、会場いっぱいに広がります。
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {CONTENTS.map((c, i) => (
            <Reveal
              key={c.num}
              delay={i * 60}
              duration={700}
              className="flex flex-col overflow-hidden rounded-xl border-2 border-ink"
            >
              {c.image ? (
                <div
                  role="img"
                  aria-label={c.alt}
                  className="relative h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${c.image})` }}
                />
              ) : (
                <div
                  aria-hidden
                  className="relative flex h-64 items-center justify-center bg-[#ececec]"
                >
                  <span className="text-[13px] tracking-[1px] text-ink opacity-40">
                    画像準備中
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 bg-white px-6 pb-7 pt-6">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-lg tracking-[1px] text-ink">{c.title}</h3>
                  <span className="text-[12px] text-ink opacity-60">
                    with {c.withNames}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.75] text-ink">{c.desc}</p>
              </div>
            </Reveal>
          ))}

          {/* Coming soon */}
          <Reveal
            delay={CONTENTS.length * 60}
            duration={700}
            className="flex flex-col overflow-hidden rounded-xl border-2 border-ink"
          >
            <div
              aria-hidden
              className="flex h-64 items-center justify-center bg-gradient-to-b from-brand to-ink"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG.logo}
                alt=""
                className="h-28 w-28 object-contain"
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white px-6 py-8 text-center">
              <span className="font-en text-lg tracking-[2px] text-ink">
                COMING SOON...
              </span>
              <span className="text-[13px] text-ink">他にもコンテンツを準備中！</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
