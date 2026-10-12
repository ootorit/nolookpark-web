import Link from "next/link";
import Image from "next/image";
import type { GuideContent } from "@/lib/guide";
import { Tag } from "./ZoneChip";

/**
 * コンテンツ一覧のカード。カード全体がリンク（見出し内のリンクを疑似要素で
 * 広げている）なので、スクリーンリーダーには「A1 TOUCH PARK」のリンクとして読まれる。
 */
export default function ContentCard({ c }: { c: GuideContent }) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-xl border-2 border-ink bg-white transition-transform focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-ink hover:-translate-y-0.5">
      <div className="relative aspect-[3/2] w-full bg-[#ececec]">
        <Image
          src={c.image}
          alt={c.alt}
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {c.ticket && (
          <span className="absolute left-3 top-3">
            <Tag tone="ink">整理券制</Tag>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 pb-6 pt-5">
        <h4 className="flex items-baseline gap-2 text-[18px] leading-snug tracking-[1px] text-ink">
          <span className="font-en text-[12px] tracking-[2px] opacity-60">
            {c.code}
          </span>
          <Link
            href={`/guide/${c.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
          >
            {c.title}
          </Link>
        </h4>
        <p className="text-[12px] text-ink opacity-60">with {c.withNames}</p>
        <p className="text-[13px] leading-[1.8] text-ink">{c.lead}</p>
        {c.ticket && (
          <p className="mt-1 text-[12px] leading-[1.7] text-ink">
            {c.ticket.duration ? `${c.ticket.duration}　` : ""}
            {c.ticket.times}
          </p>
        )}
      </div>
    </article>
  );
}
