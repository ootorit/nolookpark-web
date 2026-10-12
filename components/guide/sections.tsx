import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Ticket, Stamp } from "lucide-react";
import { EVENT } from "@/lib/site";
import {
  ZONES,
  FLOORS,
  TICKET_CONTENTS,
  TICKET_NOTE,
  MAP_GUIDE,
  MAP_IMAGES,
  STAMP_RALLY,
  contentsInZone,
  zonePath,
} from "@/lib/guide";
import ContentCard from "./ContentCard";
import { ZoneMark } from "./ZoneChip";

/**
 * 当日ガイドのセクション群。/guide とトップページ（/）の両方で使う。
 * 見出しは呼び出し側から渡す（トップは SectionHeading、/guide は目次用の H2）。
 */

type SectionProps = {
  heading: React.ReactNode;
  /** 背景色・余白など、section 要素のクラス */
  className?: string;
};

const SECTION = "px-6 py-20 md:px-12 md:py-24";

/* ---------------- 会場MAP ---------------- */

/** 「会場の歩き方」。クリックで開く（details/summary なので JS 不要・キーボード操作可） */
export function WalkGuide({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <details
      open={defaultOpen || undefined}
      className="group w-full rounded-xl border-2 border-ink bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-ink [&::-webkit-details-marker]:hidden md:px-10 md:py-6">
        <span className="flex flex-col gap-0.5">
          <span className="text-[20px] tracking-[1px]">会場の歩き方</span>
          <span className="text-[12px] opacity-60">
            地図の内容を文章で説明します
          </span>
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-brand transition-transform duration-300 group-open:rotate-180">
          <ChevronDown size={18} aria-hidden />
        </span>
      </summary>
      <div className="flex flex-col gap-6 border-t-2 border-ink px-6 py-7 md:px-10 md:py-9">
        {MAP_GUIDE.map((m) => (
          <div key={m.floor} className="flex flex-col gap-3">
            <h4 className="font-en text-[15px] tracking-[2px] text-ink">
              {m.floor}{" "}
              <span className="sr-only">
                {FLOORS.find((f) => f.id === m.floor)?.label}
              </span>
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
    </details>
  );
}

export function MapSection({
  heading,
  className = `bg-brand ${SECTION}`,
  walkGuideOpen = false,
}: SectionProps & { walkGuideOpen?: boolean }) {
  return (
    <section
      id="map"
      aria-labelledby="map-title"
      className={`scroll-mt-20 ${className}`}
    >
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-10">
        {heading}
        <p className="max-w-[640px] text-center text-[15px] leading-[1.9] text-ink">
          会場は {EVENT.venue} の1階と2階。エリアはA〜Fの6つです。
          地図の内容は、下の「会場の歩き方」に文章でも書いてあります。
        </p>

        <div className="flex w-full flex-col gap-6">
          {MAP_IMAGES.map((mi) => (
            <figure
              key={mi.floor}
              className="flex w-full flex-col gap-4 rounded-xl border-2 border-ink bg-white px-4 py-5 md:px-8 md:py-7"
            >
              <figcaption className="flex items-center gap-3 text-ink">
                <span className="font-en text-[22px] tracking-[2px]">
                  {mi.floor}
                </span>
                <span className="text-[14px] tracking-[1px]">
                  {FLOORS.find((f) => f.id === mi.floor)?.label}の会場MAP
                </span>
              </figcaption>
              <Image
                src={mi.src}
                alt={mi.alt}
                width={mi.width}
                height={mi.height}
                sizes="(min-width: 1024px) 940px, 100vw"
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>

        <WalkGuide defaultOpen={walkGuideOpen} />
      </div>
    </section>
  );
}

/* ---------------- コンテンツ一覧 ---------------- */

export function ContentsSection({
  heading,
  className = `bg-cream ${SECTION}`,
  zoneLinks = true,
  cardLinks = true,
}: SectionProps & {
  /** エリア名をエリアページ（/guide/zone/[id]）へのリンクにする */
  zoneLinks?: boolean;
  /** 各カードをコンテンツ個別ページへのリンクにする */
  cardLinks?: boolean;
}) {
  return (
    <section
      id="contents"
      aria-labelledby="contents-title"
      className={`scroll-mt-20 ${className}`}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          {heading}
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
                className="flex scroll-mt-20 flex-col gap-6"
              >
                <div className="flex items-start gap-4">
                  <ZoneMark id={z.id} size="lg" />
                  <div className="flex flex-col gap-1">
                    <h4
                      id={`zone-${z.id}-title`}
                      className="text-[24px] leading-tight tracking-[1px] text-ink"
                    >
                      <span className="sr-only">エリア{z.id}、</span>
                      {zoneLinks ? (
                        <Link
                          href={zonePath(z.id)}
                          className="underline decoration-2 underline-offset-[6px] transition-opacity hover:opacity-60"
                        >
                          {z.name}
                        </Link>
                      ) : (
                        z.name
                      )}
                    </h4>
                    <p className="text-[13px] text-ink opacity-70">
                      {z.floor} {z.place}
                    </p>
                    <p className="text-[14px] leading-[1.8] text-ink">
                      {z.copy}
                    </p>
                  </div>
                </div>
                <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {contentsInZone(z.id).map((c) => (
                    <li key={c.code}>
                      <ContentCard c={c} link={cardLinks} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 整理券 ---------------- */

export function TicketsSection({
  heading,
  className = `bg-white ${SECTION}`,
  linkTitles = true,
}: SectionProps & {
  /** コンテンツ名を個別ページへのリンクにする（トップページではリンクなし） */
  linkTitles?: boolean;
}) {
  return (
    <section
      id="tickets"
      aria-labelledby="tickets-title"
      className={`scroll-mt-20 ${className}`}
    >
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-10">
        {heading}
        <p className="max-w-[640px] text-center text-[15px] leading-[1.9] text-ink">
          {TICKET_NOTE}
        </p>
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
                {linkTitles ? (
                  <Link
                    href={`/guide/${c.slug}`}
                    className="text-[17px] tracking-[1px] text-ink underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
                  >
                    <span className="font-en mr-2 text-[12px] tracking-[2px] opacity-60">
                      {c.code}
                    </span>
                    {c.title}
                  </Link>
                ) : (
                  <span className="text-[17px] tracking-[1px] text-ink">
                    <span className="font-en mr-2 text-[12px] tracking-[2px] opacity-60">
                      {c.code}
                    </span>
                    {c.title}
                  </span>
                )}
              </div>
              <p className="text-[14px] leading-[1.7] text-ink">
                {c.ticket?.duration && (
                  <span className="mr-2 opacity-70">{c.ticket.duration}</span>
                )}
                {c.ticket?.times}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- スタンプラリー ---------------- */

export function StampSection({
  heading,
  className = `bg-brand ${SECTION}`,
}: SectionProps) {
  return (
    <section
      id="stamp"
      aria-labelledby="stamp-title"
      className={`scroll-mt-20 ${className}`}
    >
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-brand">
          <Stamp size={30} aria-hidden />
        </span>
        {heading}
        <p className="text-[15px] leading-[1.9] text-ink">{STAMP_RALLY.body}</p>
        <ul
          aria-label="スタンプのあるエリア"
          className="flex flex-wrap justify-center gap-3"
        >
          {ZONES.map((z) => (
            <li
              key={z.id}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] text-ink"
            >
              <ZoneMark id={z.id} size="sm" />
              <span className="sr-only">エリア{z.id} </span>
              {z.name}
            </li>
          ))}
        </ul>
        <p className="rounded-full bg-ink px-6 py-3 text-[14px] tracking-[1px] text-brand">
          {STAMP_RALLY.note}
        </p>
      </div>
    </section>
  );
}
