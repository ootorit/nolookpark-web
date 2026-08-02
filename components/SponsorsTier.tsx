import { ArrowUpRight } from "lucide-react";
import { CO_HOST, SILVER_SPONSORS, BRONZE_SPONSORS } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function TierLabel({
  en,
  jp,
  variant,
}: {
  en: string;
  jp: string;
  variant: "gold" | "silver" | "bronze";
}) {
  const chip =
    variant === "gold"
      ? "bg-brand text-ink"
      : variant === "silver"
        ? "bg-[#e5e5e5] text-ink"
        : "bg-white text-[#888888] ring-1 ring-inset ring-line";
  return (
    <div className="flex w-full items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span
        className={`flex items-center gap-2 rounded-full px-5 py-2 ${chip}`}
      >
        <span className="font-en text-xs tracking-[2px]">{en}</span>
        <span className="text-[11px] opacity-70">{jp}</span>
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

function VisionConsortiumCard() {
  return (
    <div className="flex w-full flex-col items-center gap-10 rounded-xl bg-white px-8 py-10 [outline:2px_solid_#1A1A1A] [outline-offset:-1px] sm:flex-row sm:gap-12 sm:px-12">
      <div className="flex h-[180px] w-full shrink-0 items-center justify-center rounded-lg bg-white sm:w-[360px]">
        <div className="flex items-center gap-[18px]">
          <span className="relative block h-16 w-16" aria-hidden>
            <span className="absolute inset-0 rounded-full bg-ink" />
            <span className="absolute left-[19px] top-[19px] h-[26px] w-[26px] rounded-full bg-brand" />
          </span>
          <span className="font-en flex flex-col gap-[3px] leading-none text-ink">
            <span className="text-[26px] tracking-[2px]">VISION</span>
            <span className="text-[13px] tracking-[2px]">CONSORTIUM</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h3 className="font-en text-[26px] tracking-[1px] text-ink">
          {CO_HOST.nameEn}
        </h3>
        <span className="text-[13px] text-ink opacity-60">{CO_HOST.nameJp}</span>
        <p className="text-[15px] leading-[1.9] text-ink">{CO_HOST.desc}</p>
        <a
          href={CO_HOST.href}
          className="flex w-fit items-center gap-1.5 text-[13px] text-ink transition-opacity hover:opacity-60"
        >
          {CO_HOST.linkText}
          <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>
    </div>
  );
}

export default function SponsorsTier() {
  return (
    <section
      id="sponsors"
      aria-label="協賛"
      className="bg-cream px-6 py-24 md:px-12 md:py-28"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <SectionHeading jp="協賛" en="SPONSORS" />
          <p className="max-w-[680px] text-base leading-[1.9] text-ink">
            NO LOOK PARK は、以下の企業・団体のご協賛により開催されます。
          </p>
        </Reveal>

        {/* Gold */}
        <Reveal className="flex w-full flex-col items-center gap-6">
          <TierLabel en="GOLD SPONSOR" jp="ゴールド" variant="gold" />
          <VisionConsortiumCard />
        </Reveal>

        {/* Silver */}
        <Reveal className="flex w-full flex-col items-center gap-6">
          <TierLabel en="SILVER SPONSOR" jp="シルバー" variant="silver" />
          <div className="flex w-full flex-col gap-5 sm:flex-row">
            {SILVER_SPONSORS.map((label, i) => (
              <div
                key={i}
                className="flex h-[150px] flex-1 items-center justify-center rounded-xl bg-white ring-1 ring-inset ring-line"
              >
                <span className="font-en text-[13px] tracking-[2px] text-ink opacity-50">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bronze */}
        <Reveal className="flex w-full flex-col items-center gap-6">
          <TierLabel en="BRONZE SPONSOR" jp="ブロンズ" variant="bronze" />
          <div className="grid w-full grid-cols-2 gap-[15px] sm:grid-cols-5">
            {BRONZE_SPONSORS.map((label, i) => (
              <div
                key={i}
                className="flex h-24 items-center justify-center rounded-[10px] bg-white ring-1 ring-inset ring-line"
              >
                <span className="font-en text-[11px] tracking-[2px] text-ink opacity-45">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
