import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Stamp, Ticket } from "lucide-react";
import {
  ZONES,
  FLOORS,
  MAP_IMAGES,
  MAP_GUIDE,
  contentsInZone,
  zoneBySlug,
  zoneSlug,
  zonePath,
  zoneLabel,
} from "@/lib/guide";
import ContentCard from "@/components/guide/ContentCard";
import { ZoneMark } from "@/components/guide/ZoneChip";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return ZONES.map((z) => ({ id: zoneSlug(z.id) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = await params;
  const z = zoneBySlug(id);
  if (!z) return {};
  const n = contentsInZone(z.id).length;
  const { images } = (await parent).openGraph ?? {};
  return {
    title: `エリア${z.id} ${z.name}`,
    description: `${z.copy}｜${z.floor} ${z.place}。このエリアの${n}コンテンツを紹介します。`,
    openGraph: {
      title: `${zoneLabel(z)}｜NO LOOK PARK 当日ガイド`,
      description: z.copy,
      type: "website",
      images,
    },
  };
}

export default async function GuideZonePage({ params }: Props) {
  const { id } = await params;
  const z = zoneBySlug(id);
  if (!z) notFound();
  const contents = contentsInZone(z.id);
  const ticketed = contents.filter((c) => c.ticket);
  const floorLabel = FLOORS.find((f) => f.id === z.floor)?.label;
  const map = MAP_IMAGES.find((m) => m.floor === z.floor);
  const steps = MAP_GUIDE.find((m) => m.floor === z.floor)?.steps ?? [];
  const idx = ZONES.findIndex((s) => s.id === z.id);
  const prev = idx > 0 ? ZONES[idx - 1] : undefined;
  const next = idx < ZONES.length - 1 ? ZONES[idx + 1] : undefined;

  return (
    <article>
      {/* ---- ヘッダー ---- */}
      <div className="bg-brand px-6 pb-12 pt-8 md:px-12 md:pb-16 md:pt-12">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-8">
          <nav aria-label="パンくず" className="text-[12px] tracking-[1px] text-ink">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/guide" className="underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60">
                  当日ガイド
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{zoneLabel(z)}</li>
            </ol>
          </nav>

          <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
            <ZoneMark id={z.id} size="lg" />
            <div className="flex flex-col gap-4">
              <p className="font-en text-[13px] tracking-[3px] text-ink opacity-70">
                <span className="sr-only">エリア</span>
                {z.id}
                <span className="sr-only">、</span> / {z.floor} <span className="sr-only">{floorLabel}</span>
              </p>
              <h1 className="text-[34px] leading-[1.25] tracking-[1px] text-ink md:text-[48px]">
                <span className="sr-only">エリア{z.id}、</span>
                {z.name}
              </h1>
              <p className="flex items-center gap-2 text-[15px] text-ink">
                <MapPin size={16} aria-hidden className="shrink-0" />
                {floorLabel} {z.place}
              </p>
              <p className="text-[20px] leading-[1.6] tracking-[1px] text-ink md:text-[24px]">{z.copy}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- コンテンツ一覧 ---- */}
      <div className="bg-cream px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-12">
          <section aria-labelledby="zone-contents-title" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 id="zone-contents-title" className="text-[24px] tracking-[1px] text-ink md:text-[28px]">
                このエリアのコンテンツ
                <span className="font-en ml-3 text-[16px] tracking-[2px] opacity-60">
                  {contents.length}
                  <span className="sr-only">件</span>
                </span>
              </h2>
              <p className="text-[14px] leading-[1.8] text-ink">
                タイトルを押すと、それぞれの詳しい説明が読めます。
                {ticketed.length > 0 && (
                  <>
                    <br className="hidden sm:block" />
                    「整理券制」のコンテンツは、ブースで整理券を受け取ってから体験できます。
                  </>
                )}
              </p>
            </div>
            <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {contents.map((c) => (
                <li key={c.code}>
                  <ContentCard c={c} />
                </li>
              ))}
            </ul>
          </section>

          {ticketed.length > 0 && (
            <section
              aria-labelledby="zone-ticket-title"
              className="flex flex-col gap-4 rounded-xl border-2 border-ink bg-white px-6 py-6 md:px-8"
            >
              <h2 id="zone-ticket-title" className="flex items-center gap-3 text-[18px] tracking-[1px] text-ink">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                  <Ticket size={18} aria-hidden />
                </span>
                このエリアで整理券が必要なコンテンツ
              </h2>
              <ul className="flex flex-col gap-2 text-[14px] leading-[1.8] text-ink">
                {ticketed.map((c) => (
                  <li key={c.code} className="flex flex-col sm:flex-row sm:gap-4">
                    <Link
                      href={`/guide/${c.slug}`}
                      className="underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60 sm:w-[260px] sm:shrink-0"
                    >
                      <span className="font-en mr-2 text-[12px] tracking-[2px] opacity-60">{c.code}</span>
                      {c.title}
                    </Link>
                    <span>
                      {c.ticket?.duration && <span className="mr-2 opacity-70">{c.ticket.duration}</span>}
                      {c.ticket?.times}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="zone-place-title" className="flex flex-col gap-5">
            <h2 id="zone-place-title" className="text-[22px] tracking-[1px] text-ink">
              場所
            </h2>
            {map && (
              <figure className="flex w-full flex-col gap-4 rounded-xl border-2 border-ink bg-white px-4 py-5 md:px-8 md:py-7">
                <figcaption className="flex items-center gap-3 text-ink">
                  <span className="font-en text-[22px] tracking-[2px]">{map.floor}</span>
                  <span className="text-[14px] tracking-[1px]">{floorLabel}の会場MAP</span>
                </figcaption>
                <Image
                  src={map.src}
                  alt={map.alt}
                  width={map.width}
                  height={map.height}
                  sizes="(min-width: 1024px) 1040px, 100vw"
                  className="h-auto w-full"
                />
              </figure>
            )}
            {steps.length > 0 && (
              <div className="flex flex-col gap-3 rounded-xl bg-white px-6 py-6 md:px-8">
                <h3 className="text-[16px] tracking-[1px] text-ink">
                  {floorLabel}の歩き方
                </h3>
                <ol className="flex list-decimal flex-col gap-2 pl-6 text-[14px] leading-[1.8] text-ink">
                  {steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                <Link
                  href="/guide#map"
                  className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg border-2 border-ink px-3.5 py-2 text-[12px] text-ink transition-colors hover:bg-ink hover:text-brand"
                >
                  <MapPin size={14} aria-hidden />
                  会場全体のMAPを見る
                </Link>
              </div>
            )}
          </section>

          <p className="flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-[13px] tracking-[1px] text-brand">
            <Stamp size={18} aria-hidden className="shrink-0" />
            このエリアにもスタンプラリーのスタンプがあります。
          </p>

          <nav aria-label="前後のエリア" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={zonePath(prev.id)}
                className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 text-ink transition-colors hover:bg-brand"
              >
                <ArrowLeft size={16} aria-hidden className="shrink-0" />
                <span className="flex flex-col">
                  <span className="text-[11px] tracking-[1px] opacity-60">前のエリア</span>
                  <span className="text-[15px] tracking-[1px]">
                    <span className="sr-only">エリア</span>
                    {prev.id} {prev.name}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={zonePath(next.id)}
                className="flex items-center justify-end gap-3 rounded-xl bg-white px-5 py-4 text-right text-ink transition-colors hover:bg-brand"
              >
                <span className="flex flex-col">
                  <span className="text-[11px] tracking-[1px] opacity-60">次のエリア</span>
                  <span className="text-[15px] tracking-[1px]">
                    <span className="sr-only">エリア</span>
                    {next.id} {next.name}
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
