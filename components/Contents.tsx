import { CONTENTS } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Contents() {
  return (
    <section id="contents" className="bg-cream px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-10">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <SectionHeading jp="コンテンツ" en="CONTENTS" />
          <p className="max-w-[680px] text-base leading-[1.9] text-ink/70">
            視覚を手放すと、遊びはもっと自由になる。
            <br className="hidden sm:block" />
            見えないからこそ楽しいコンテンツが、会場いっぱいに広がります。
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {CONTENTS.map((c, i) => (
            <Reveal
              key={c.num}
              delay={i * 100}
              className="overflow-hidden rounded-xl ring-2 ring-inset ring-ink"
            >
              <div
                className="relative h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${c.image})` }}
              >
                <span className="font-en absolute left-4 top-2 text-[80px] font-bold leading-none text-brand/30">
                  {c.num}
                </span>
              </div>
              <div className="flex flex-col gap-3 bg-white px-6 pb-7 pt-6">
                <h3 className="font-en text-lg font-bold tracking-[2px] text-ink">
                  {c.title}
                </h3>
                <p className="text-[13px] leading-[1.75] text-ink/70">{c.desc}</p>
              </div>
            </Reveal>
          ))}

          {/* Coming soon */}
          <Reveal
            delay={CONTENTS.length * 100}
            className="flex flex-col overflow-hidden rounded-xl ring-2 ring-inset ring-ink"
          >
            <div className="h-64 bg-gradient-to-b from-brand to-ink" />
            <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white px-6 py-8 text-center">
              <span className="font-en text-lg font-bold tracking-[4px] text-muted">
                COMING SOON...
              </span>
              <span className="text-[13px] text-muted/80">他にもコンテンツを準備中！</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
