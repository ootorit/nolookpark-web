"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CONTENTS } from "@/lib/site";
import { GUIDE_CONTENTS } from "@/lib/guide";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type Card = {
  key: string;
  title: string;
  withNames: string;
  image?: string;
  alt?: string;
  desc: string;
  /** 当日ガイドの詳細ページ（/guide/[slug]） */
  slug?: string;
};

// メインの8件は lib/site.ts の CONTENTS（従来どおりの並び・文章・写真）。
const MAIN: Card[] = CONTENTS.map((c) => ({
  key: c.num,
  title: c.title,
  withNames: c.withNames,
  image: c.image,
  alt: c.alt,
  desc: c.desc,
  slug: GUIDE_CONTENTS.find((g) => g.title === c.title)?.slug,
}));

// 残りは当日ガイド（lib/guide.ts）のコンテンツから、メイン8件に無いものをガイドの順で。
const mainTitles = new Set(CONTENTS.map((c) => c.title));
const MORE: Card[] = GUIDE_CONTENTS.filter((g) => !mainTitles.has(g.title)).map((g) => ({
  key: g.code,
  title: g.title,
  withNames: g.withNames,
  image: g.image,
  alt: g.alt,
  desc: g.lead,
  slug: g.slug,
}));

function ContentCard({ c, delay }: { c: Card; delay: number }) {
  return (
    <Reveal
      delay={delay}
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
        {c.slug && (
          <Link
            href={`/guide/${c.slug}`}
            className="mt-2 inline-flex w-fit items-center gap-1 text-[12px] tracking-[1px] text-ink underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
          >
            くわしく見る
            <ArrowRight size={13} aria-hidden />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

export default function Contents() {
  const [expanded, setExpanded] = useState(false);
  const moreId = useId();

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
          {MAIN.map((c, i) => (
            <ContentCard key={c.key} c={c} delay={i * 60} />
          ))}
        </div>

        {/* 残りのコンテンツ: 「すべてを表示」でスッと開く（grid-template-rows の 0fr → 1fr を transition） */}
        <div
          id={moreId}
          className="grid w-full transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          aria-hidden={!expanded}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={`grid w-full grid-cols-1 gap-6 pb-1 transition-opacity duration-500 sm:grid-cols-2 ${
                expanded ? "opacity-100 delay-150" : "opacity-0"
              }`}
              // 閉じている間はフォーカスやタブ移動の対象にしない
              inert={!expanded}
            >
              {MORE.map((c, i) => (
                <ContentCard key={c.key} c={c} delay={(i % 2) * 60} />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={moreId}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[14px] tracking-[1px] text-brand transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {expanded ? "メインのコンテンツだけ表示" : `すべてのコンテンツを表示（全${MAIN.length + MORE.length}件）`}
          <ChevronDown
            size={16}
            aria-hidden
            className={`transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </section>
  );
}
