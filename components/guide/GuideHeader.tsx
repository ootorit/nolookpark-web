import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/lib/site";

/**
 * 当日ガイド用のヘッダー。トップページのナビと違い、常に表示・固定しない
 * （スクリーンリーダーや拡大表示で邪魔にならないように）。
 */
export default function GuideHeader() {
  return (
    <header className="bg-brand">
      <nav
        aria-label="ガイドナビゲーション"
        className="mx-auto flex max-w-[1100px] items-center gap-4 px-6 py-4 md:px-10"
      >
        <Link
          href="/guide"
          className="flex items-center gap-3 rounded-lg transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.logo}
            alt=""
            className="h-10 w-10 object-contain md:h-12 md:w-12"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-en text-[11px] tracking-[2px] text-ink opacity-70">
              NO LOOK PARK
            </span>
            <span className="text-[15px] tracking-[1px] text-ink">当日ガイド</span>
          </span>
        </Link>

        <div className="flex-1" />

        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2.5 text-[12px] tracking-[1px] text-brand transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          公式サイト
          <ArrowUpRight size={14} aria-hidden />
        </Link>
      </nav>
    </header>
  );
}
