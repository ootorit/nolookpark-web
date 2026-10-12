import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { EVENT, STATEMENT_BODY, ORGANIZERS, CO_HOST, IMG } from "@/lib/site";
import { CREDITS } from "@/lib/guide";
import { MapSection, ContentsSection, TicketsSection, StampSection } from "@/components/guide/sections";

// セクションの並びはトップページ（/）と同じ: 会場MAP → コンテンツ一覧 → 整理券 → スタンプラリー
const TOC = [
  { href: "#greeting", label: "ごあいさつ" },
  { href: "#map", label: "会場MAP" },
  { href: "#contents", label: "コンテンツ一覧" },
  { href: "#tickets", label: "整理券が必要なコンテンツ" },
  { href: "#stamp", label: "スタンプラリー" },
  { href: "#organizers", label: "主催者・共催・協賛" },
];

function H2({
  id,
  jp,
  en,
  tone = "ink",
}: {
  id?: string;
  jp: string;
  en: string;
  tone?: "ink" | "brand";
}) {
  const color = tone === "brand" ? "text-brand" : "text-ink";
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <h2 id={id} className={`scroll-mt-6 text-[26px] tracking-[2px] md:text-[30px] ${color}`}>
        {jp}
      </h2>
      <span aria-hidden className={`font-en text-[13px] tracking-[2px] opacity-45 ${color}`}>
        {en}
      </span>
    </div>
  );
}

export default function GuidePage() {
  return (
    <>
      {/* ---- タイトル ---- */}
      <section aria-labelledby="guide-title" className="bg-brand px-6 pb-14 pt-10 md:px-12 md:pb-20 md:pt-16">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 text-center">
          <p className="font-en text-[13px] tracking-[3px] text-ink opacity-70">
            {EVENT.dateParts.year}.{EVENT.dateParts.month}.{EVENT.dateParts.day} SAT
          </p>
          <h1 id="guide-title" className="text-[34px] leading-[1.3] tracking-[2px] text-ink md:text-[48px]">
            「みえない」を
            <br className="md:hidden" />
            楽しみつくそう！
          </h1>
          <p className="text-[15px] leading-[1.9] text-ink">
            NO LOOK PARK 当日ガイド
            <br />
            {EVENT.date} {EVENT.time}
            <br />
            {EVENT.venue}（{EVENT.venueArea}）
          </p>

          <nav aria-label="このページの目次" className="mt-4 w-full max-w-[720px]">
            <ul className="flex flex-wrap justify-center gap-2.5">
              {TOC.map((t) => (
                <li key={t.href}>
                  <a
                    href={t.href}
                    className="inline-block rounded-full bg-ink px-5 py-2.5 text-[13px] tracking-[1px] text-brand transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ---- ごあいさつ ---- */}
      <section aria-labelledby="greeting" className="bg-white px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-10">
          <H2 id="greeting" jp="ごあいさつ" en="GREETING" />
          <div className="flex flex-col gap-6 text-[15px] leading-[2] text-ink md:text-center">
            {STATEMENT_BODY.map((para, i) => (
              <p key={i}>
                {para.map((line, j) => (
                  <span key={j}>
                    {line.replaceAll("==", "")}
                    {j < para.length - 1 && <br className="hidden md:inline" />}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 会場MAP / コンテンツ一覧 / 整理券 / スタンプラリー（トップページと共通） ---- */}
      <MapSection heading={<H2 id="map-title" jp="会場MAP" en="VENUE MAP" />} walkGuideOpen />
      <ContentsSection heading={<H2 id="contents-title" jp="コンテンツ一覧" en="CONTENTS" />} />
      <TicketsSection
        heading={<H2 id="tickets-title" jp="整理券が必要なコンテンツ" en="TICKETED CONTENTS" />}
        className="bg-cream px-6 py-20 md:px-12 md:py-24"
      />
      <StampSection heading={<H2 id="stamp-title" jp="スタンプラリー" en="STAMP RALLY" />} />

      {/* ---- 主催者・共催・協賛 ---- */}
      <section aria-labelledby="organizers" className="bg-white px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-12">
          <H2 id="organizers" jp="主催者" en="ORGANIZERS" />
          <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="font-en text-[28px] tracking-[1px] text-ink md:text-[36px]">NO LOOK BROTHERS</h3>
            <p className="max-w-[680px] text-[15px] leading-[1.9] text-ink">
              「みえない」を起点にアイデアを考える3人組。それぞれの得意分野を持ち寄って NO LOOK PARK を作っています。
            </p>
          </div>

          <ul className="grid w-full list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ORGANIZERS.map((o) => (
              <li key={o.num} className="flex flex-col overflow-hidden rounded-xl border-2 border-ink bg-white">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={o.image}
                    alt={`${o.name}のポートレート`}
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2.5 px-6 pb-7 pt-6">
                  <span className="w-fit rounded-full bg-brand px-3 py-1.5 text-[11px] tracking-[1px] text-ink">{o.role}</span>
                  <h4 className="text-[22px] tracking-[1px] text-ink">
                    <span className="font-en mr-2 text-[12px] tracking-[2px] opacity-60">{o.num}</span>
                    {o.name}
                  </h4>
                  <p className="text-[13px] leading-[1.75] text-ink">{o.desc}</p>
                  <a
                    href={o.links.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] tracking-[1px] text-ink ring-[1.5px] ring-inset ring-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    {o.name}の公式サイト
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-col items-center gap-8 rounded-xl bg-cream px-6 py-8 md:flex-row md:items-start md:gap-12 md:px-10">
            <a
              href={CO_HOST.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[120px] w-full shrink-0 items-center justify-center rounded-lg bg-white p-6 transition-opacity hover:opacity-70 md:w-[280px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.visionConsortiumLogo} alt={`${CO_HOST.nameEn} のロゴ`} className="max-h-full max-w-full object-contain" />
            </a>
            <div className="flex flex-1 flex-col gap-3">
              <p className="font-en text-[12px] tracking-[2px] text-ink opacity-60">
                共催 <span aria-hidden>SUPPORTED BY</span>
              </p>
              <h3 className="text-[22px] tracking-[1px] text-ink">{CO_HOST.nameJp}</h3>
              <p className="text-[13px] leading-[1.9] text-ink">{CO_HOST.desc}</p>
              <a
                href={CO_HOST.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-[13px] text-ink underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
              >
                {CO_HOST.linkText}
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>
          </div>

          <dl className="flex w-full flex-col gap-4 text-[13px] leading-[1.8] text-ink">
            {CREDITS.map((c) => (
              <div key={c.label} className="flex flex-col gap-1 sm:flex-row sm:gap-5">
                <dt className="flex h-7 w-[64px] shrink-0 items-center justify-center rounded-full bg-ink text-[12px] tracking-[2px] text-brand">
                  {c.label}
                </dt>
                <dd className="flex-1 pt-0.5">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
