import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Ticket } from "lucide-react";
import {
  GUIDE_CONTENTS,
  contentBySlug,
  contentsInZone,
  zoneOf,
  zoneLabel,
} from "@/lib/guide";
import { ZoneMark, Tag } from "@/components/guide/ZoneChip";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDE_CONTENTS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = contentBySlug(slug);
  if (!c) return {};
  const z = zoneOf(c.zone);
  return {
    title: `${c.code} ${c.title}`,
    description: `${c.catchCopy}｜${zoneLabel(z)}（${z.floor} ${z.place}）with ${c.withNames}`,
    openGraph: {
      title: `${c.title}｜NO LOOK PARK 当日ガイド`,
      description: c.catchCopy,
      type: "article",
      images: [{ url: c.image, alt: c.alt }],
    },
  };
}

export default async function GuideContentPage({ params }: Props) {
  const { slug } = await params;
  const c = contentBySlug(slug);
  if (!c) notFound();
  const z = zoneOf(c.zone);
  const siblings = contentsInZone(c.zone).filter((s) => s.code !== c.code);
  const idx = GUIDE_CONTENTS.findIndex((s) => s.code === c.code);
  const prev = idx > 0 ? GUIDE_CONTENTS[idx - 1] : undefined;
  const next = idx < GUIDE_CONTENTS.length - 1 ? GUIDE_CONTENTS[idx + 1] : undefined;

  return (
    <article>
      {/* ---- ヘッダー ---- */}
      <div className="bg-brand px-6 pb-12 pt-8 md:px-12 md:pb-16 md:pt-12">
        <div className="mx-auto flex max-w-[860px] flex-col gap-8">
          <nav aria-label="パンくず" className="text-[12px] tracking-[1px] text-ink">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/guide" className="underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60">
                  当日ガイド
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/guide#zone-${z.id}`} className="underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60">
                  {zoneLabel(z)}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{c.title}</li>
            </ol>
          </nav>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <ZoneMark id={z.id} />
              <span className="font-en text-[14px] tracking-[2px] text-ink">
                <span className="sr-only">エリア</span>
                {z.id}
                <span className="sr-only">、</span> {z.name}
              </span>
            </div>
            <h1 className="text-[34px] leading-[1.25] tracking-[1px] text-ink md:text-[48px]">
              <span className="font-en mr-3 text-[18px] tracking-[3px] opacity-60 md:text-[22px]">{c.code}</span>
              {c.title}
            </h1>
            <p className="text-[14px] text-ink opacity-70">with {c.withNames}</p>
            <p className="text-[20px] leading-[1.6] tracking-[1px] text-ink md:text-[24px]">{c.catchCopy}</p>
            {c.ticket && (
              <div>
                <Tag tone="ink">整理券制</Tag>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---- 本文 ---- */}
      <div className="bg-white px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-[860px] flex-col gap-12">
          <figure className="overflow-hidden rounded-xl border-2 border-ink">
            <Image
              src={c.image}
              alt={c.alt}
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 860px, 100vw"
              className="aspect-[3/2] h-auto w-full object-cover"
              priority
            />
          </figure>

          {c.ticket && (
            <section
              aria-labelledby="ticket-title"
              className="flex flex-col gap-4 rounded-xl border-2 border-ink bg-cream px-6 py-6 md:flex-row md:items-start md:gap-6 md:px-8"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                <Ticket size={20} aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <h2 id="ticket-title" className="text-[18px] tracking-[1px] text-ink">
                  整理券が必要です
                </h2>
                <p className="text-[14px] leading-[1.8] text-ink">
                  このブースで整理券を受け取り、時間になったらブースへお越しください。
                </p>
                <dl className="mt-1 flex flex-col gap-1 text-[14px] leading-[1.8] text-ink">
                  {c.ticket.duration && (
                    <div className="flex gap-3">
                      <dt className="w-[6em] shrink-0 opacity-60">所要時間</dt>
                      <dd>{c.ticket.duration}</dd>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <dt className="w-[6em] shrink-0 opacity-60">開始時間</dt>
                    <dd>{c.ticket.times}</dd>
                  </div>
                </dl>
              </div>
            </section>
          )}

          <section aria-labelledby="about-title" className="flex flex-col gap-4">
            <h2 id="about-title" className="text-[22px] tracking-[1px] text-ink">
              どんなコンテンツ？
            </h2>
            <p className="text-[16px] leading-[2] text-ink">{c.body}</p>
          </section>

          <section aria-labelledby="place-title" className="flex flex-col gap-4">
            <h2 id="place-title" className="text-[22px] tracking-[1px] text-ink">
              場所
            </h2>
            <div className="flex items-start gap-4 rounded-xl bg-cream px-5 py-5">
              <ZoneMark id={z.id} />
              <div className="flex flex-col gap-1">
                <p className="text-[17px] tracking-[1px] text-ink">
                  <span className="sr-only">エリア{z.id}、</span>
                  {z.name}
                </p>
                <p className="text-[14px] text-ink">
                  {z.floor} {z.place}
                </p>
                <p className="text-[13px] leading-[1.75] text-ink opacity-80">{z.copy}</p>
                <Link
                  href="/guide#map"
                  className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg border-2 border-ink px-3.5 py-2 text-[12px] text-ink transition-colors hover:bg-ink hover:text-brand"
                >
                  <MapPin size={14} aria-hidden />
                  会場MAPで確認する
                </Link>
              </div>
            </div>
          </section>

          {siblings.length > 0 && (
            <section aria-labelledby="siblings-title" className="flex flex-col gap-4">
              <h2 id="siblings-title" className="text-[22px] tracking-[1px] text-ink">
                同じエリアのコンテンツ
              </h2>
              <ul className="flex flex-col divide-y divide-line rounded-xl border-2 border-ink">
                {siblings.map((s) => (
                  <li key={s.code}>
                    <Link
                      href={`/guide/${s.slug}`}
                      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-cream"
                    >
                      <span className="font-en w-[2.5em] shrink-0 text-[13px] tracking-[2px] text-ink opacity-60">{s.code}</span>
                      <span className="flex flex-1 flex-col">
                        <span className="text-[16px] tracking-[1px] text-ink">{s.title}</span>
                        <span className="text-[12px] text-ink opacity-60">with {s.withNames}</span>
                      </span>
                      {s.ticket && <Tag tone="outline">整理券制</Tag>}
                      <ArrowRight size={16} aria-hidden className="shrink-0 text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="前後のコンテンツ" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/guide/${prev.slug}`}
                className="flex items-center gap-3 rounded-xl bg-cream px-5 py-4 text-ink transition-colors hover:bg-brand"
              >
                <ArrowLeft size={16} aria-hidden className="shrink-0" />
                <span className="flex flex-col">
                  <span className="text-[11px] tracking-[1px] opacity-60">前のコンテンツ</span>
                  <span className="text-[15px] tracking-[1px]">
                    {prev.code} {prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/guide/${next.slug}`}
                className="flex items-center justify-end gap-3 rounded-xl bg-cream px-5 py-4 text-right text-ink transition-colors hover:bg-brand"
              >
                <span className="flex flex-col">
                  <span className="text-[11px] tracking-[1px] opacity-60">次のコンテンツ</span>
                  <span className="text-[15px] tracking-[1px]">
                    {next.code} {next.title}
                  </span>
                </span>
                <ArrowRight size={16} aria-hidden className="shrink-0" />
              </Link>
            )}
          </nav>

          <div className="flex justify-center">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[14px] tracking-[1px] text-brand transition-transform hover:scale-105"
            >
              <ArrowLeft size={16} aria-hidden />
              当日ガイドのトップへ戻る
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
