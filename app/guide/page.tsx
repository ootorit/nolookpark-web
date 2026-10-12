import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Ticket, Stamp } from "lucide-react";
import { EVENT, STATEMENT_BODY, ORGANIZERS, CO_HOST, IMG } from "@/lib/site";
import {
  ZONES,
  FLOORS,
  TICKET_CONTENTS,
  TICKET_NOTE,
  MAP_GUIDE,
  STAMP_RALLY,
  CREDITS,
  contentsInZone,
} from "@/lib/guide";
import ContentCard from "@/components/guide/ContentCard";
import { ZoneMark } from "@/components/guide/ZoneChip";

const TOC = [
  { href: "#greeting", label: "ごあいさつ" },
  { href: "#tickets", label: "整理券が必要なコンテンツ" },
  { href: "#map", label: "会場MAP" },
  { href: "#contents", label: "コンテンツ一覧" },
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

      {/* ---- 整理券 ---- */}
      <section aria-labelledby="tickets" className="bg-cream px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-10">
          <H2 id="tickets" jp="整理券が必要なコンテンツ" en="TICKETED CONTENTS" />
          <p className="max-w-[640px] text-center text-[15px] leading-[1.9] text-ink">{TICKET_NOTE}</p>
          <ul className="flex w-full flex-col gap-4">
            {TICKET_CONTENTS.map((c) => (
              <li
                key={c.code}
                className="flex flex-col gap-3 rounded-xl border-2 border-ink bg-white px-6 py-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex items-center gap-3 sm:w-[300px] sm:shrink-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Ticket size={18} aria-hidden />
                  </span>
                  <Link
                    href={`/guide/${c.slug}`}
                    className="text-[17px] tracking-[1px] text-ink underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
                  >
                    <span className="font-en mr-2 text-[12px] tracking-[2px] opacity-60">{c.code}</span>
                    {c.title}
                  </Link>
                </div>
                <p className="text-[14px] leading-[1.7] text-ink">
                  {c.ticket?.duration && <span className="mr-2 opacity-70">{c.ticket.duration}</span>}
                  {c.ticket?.times}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- 会場MAP ---- */}
      <section aria-labelledby="map" className="bg-brand px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-10">
          <H2 id="map" jp="会場MAP" en="VENUE MAP" />
          <p className="max-w-[640px] text-center text-[15px] leading-[1.9] text-ink">
            会場は {EVENT.venue} の1階と2階。エリアはA〜Fの6つです。
            地図の内容は、下の「会場の歩き方」に文章でも書いてあります。
          </p>

          <figure className="w-full overflow-hidden rounded-xl border-2 border-ink bg-brand">
            <Image
              src="/images/guide/map.png"
              alt="会場MAP。1階と2階の見取り図に、A〜Fのエリアの位置と受付・エントランス・門が示されている。詳しい位置は、この下の「会場の歩き方」に書いてあります。"
              width={2332}
              height={2004}
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="h-auto w-full"
              priority={false}
            />
            <figcaption className="sr-only">HOME/WORK VILLAGE 会場MAP</figcaption>
          </figure>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {ZONES.map((z) => (
              <div key={z.id} className="flex items-start gap-4 rounded-xl bg-white px-5 py-5">
                <ZoneMark id={z.id} />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[17px] leading-snug tracking-[1px] text-ink">
                    <a href={`#zone-${z.id}`} className="underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60">
                      <span className="sr-only">エリア{z.id}、</span>
                      {z.name}
                    </a>
                  </h3>
                  <p className="text-[12px] text-ink opacity-70">
                    {z.floor} {z.place}
                  </p>
                  <p className="text-[13px] leading-[1.75] text-ink">{z.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col gap-6 rounded-xl border-2 border-ink bg-white px-6 py-7 md:px-10 md:py-9">
            <h3 className="text-[20px] tracking-[1px] text-ink">会場の歩き方</h3>
            {MAP_GUIDE.map((m) => (
              <div key={m.floor} className="flex flex-col gap-3">
                <h4 className="font-en text-[15px] tracking-[2px] text-ink">
                  {m.floor} <span className="sr-only">{FLOORS.find((f) => f.id === m.floor)?.label}</span>
                </h4>
                <ol className="flex list-decimal flex-col gap-2 pl-6 text-[14px] leading-[1.8] text-ink">
                  {m.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>
            ))}
            <a
              href={EVENT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border-2 border-ink px-4 py-2.5 text-[13px] text-ink transition-colors hover:bg-ink hover:text-brand"
            >
              会場までの道のりを Googleマップで見る
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ---- コンテンツ一覧 ---- */}
      <section aria-labelledby="contents" className="bg-cream px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <H2 id="contents" jp="コンテンツ一覧" en="CONTENTS" />
            <p className="max-w-[680px] text-[15px] leading-[1.9] text-ink">
              全18コンテンツを、エリアごとに紹介します。
              <br className="hidden sm:block" />
              タイトルを押すと、それぞれの詳しい説明が読めます。
            </p>
          </div>

          {FLOORS.map((f) => (
            <div key={f.id} className="flex w-full flex-col gap-10">
              <h3 className="flex items-center gap-4 text-ink">
                <span className="font-en text-[32px] tracking-[2px]">{f.id}</span>
                <span className="text-[15px] tracking-[1px]">{f.label}</span>
                <span aria-hidden className="h-px flex-1 bg-ink/20" />
              </h3>

              {ZONES.filter((z) => z.floor === f.id).map((z) => (
                <section
                  key={z.id}
                  id={`zone-${z.id}`}
                  aria-labelledby={`zone-${z.id}-title`}
                  className="flex scroll-mt-6 flex-col gap-6"
                >
                  <div className="flex items-start gap-4">
                    <ZoneMark id={z.id} size="lg" />
                    <div className="flex flex-col gap-1">
                      <h4 id={`zone-${z.id}-title`} className="text-[24px] leading-tight tracking-[1px] text-ink">
                        <span className="sr-only">エリア{z.id}、</span>
                        {z.name}
                      </h4>
                      <p className="text-[13px] text-ink opacity-70">
                        {z.floor} {z.place}
                      </p>
                      <p className="text-[14px] leading-[1.8] text-ink">{z.copy}</p>
                    </div>
                  </div>
                  <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {contentsInZone(z.id).map((c) => (
                      <li key={c.code}>
                        <ContentCard c={c} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---- スタンプラリー ---- */}
      <section aria-labelledby="stamp" className="bg-brand px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-brand">
            <Stamp size={30} aria-hidden />
          </span>
          <H2 id="stamp" jp="スタンプラリー" en="STAMP RALLY" />
          <p className="text-[15px] leading-[1.9] text-ink">{STAMP_RALLY.body}</p>
          <ul aria-label="スタンプのあるエリア" className="flex flex-wrap justify-center gap-3">
            {ZONES.map((z) => (
              <li key={z.id} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] text-ink">
                <ZoneMark id={z.id} size="sm" />
                <span className="sr-only">エリア{z.id} </span>
                {z.name}
              </li>
            ))}
          </ul>
          <p className="rounded-full bg-ink px-6 py-3 text-[14px] tracking-[1px] text-brand">{STAMP_RALLY.note}</p>
        </div>
      </section>

      {/* ---- 主催者・共催・協賛 ---- */}
      <section aria-labelledby="organizers" className="bg-white px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-12">
          <H2 id="organizers" jp="主催者" en="ORGANIZERS" />
          <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="font-en text-[28px] tracking-[1px] text-ink md:text-[36px]">NO LOOK BROTHERS</h3>
            <p className="max-w-[680px] text-[15px] leading-[1.9] text-ink">
              「見ない」を起点にアイデアを考える3人組。それぞれの得意分野を持ち寄って NO LOOK PARK を作っています。
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
