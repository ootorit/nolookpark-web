import { ArrowUpRight } from "lucide-react";
import { CO_HOST, SILVER_SPONSORS, BRONZE_SPONSORS, IMG } from "@/lib/site";
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
        : "bg-[#cd7f32] text-white";
  return (
    <div className="flex w-full items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span
        className={`flex items-center gap-2 rounded-full px-5 py-2 ${chip}`}
      >
        <span aria-hidden className="font-en text-xs tracking-[2px]">{en}</span>
        <span className="text-[11px] opacity-70">{jp}</span>
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

function VisionConsortiumCard() {
  return (
    <div className="flex w-full flex-col items-center gap-10 rounded-xl bg-white px-8 py-10 [outline:2px_solid_#1A1A1A] [outline-offset:-1px] sm:flex-row sm:gap-12 sm:px-12">
      <div className="flex h-[180px] w-full shrink-0 items-center justify-center rounded-lg bg-white p-8 sm:w-[360px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.visionConsortiumLogo}
          alt={`${CO_HOST.nameEn} のロゴ`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-[26px] tracking-[1px] text-ink">
          {CO_HOST.nameJp}
        </h3>
        <p className="text-[15px] leading-[1.9] text-ink">{CO_HOST.desc}</p>
        <a
          href={CO_HOST.href}
          target="_blank"
          rel="noopener noreferrer"
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

        {/* Silver — スポンサー未定のため非表示。SILVER_SPONSORS に追加すると表示される */}
        {SILVER_SPONSORS.length > 0 && (
          <Reveal className="flex w-full flex-col items-center gap-6">
            <TierLabel en="SILVER SPONSOR" jp="シルバー" variant="silver" />
            <div className="flex w-full flex-wrap justify-center gap-5">
              {SILVER_SPONSORS.map((s, i) =>
                s.logo ? (
                  <div
                    key={i}
                    className="flex min-h-[150px] w-full items-center justify-center rounded-xl bg-white px-6 ring-1 ring-inset ring-line sm:w-[300px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.logo}
                      alt={`${s.name} のロゴ`}
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    key={i}
                    aria-hidden
                    className="flex min-h-[150px] w-full items-center justify-center rounded-xl bg-white ring-1 ring-inset ring-line sm:w-[300px]"
                  >
                    <span className="font-en text-[13px] tracking-[2px] text-ink opacity-50">
                      {s.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </Reveal>
        )}

        {/* Bronze */}
        <Reveal className="flex w-full flex-col items-center gap-6">
          <TierLabel en="BRONZE SPONSOR" jp="ブロンズ" variant="bronze" />
          <div className="flex w-full flex-wrap justify-center gap-[15px]">
            {BRONZE_SPONSORS.map((s, i) =>
              s.logo ? (
                <div
                  key={i}
                  className="flex h-24 w-[46%] items-center justify-center rounded-[10px] bg-white px-4 ring-1 ring-inset ring-line sm:w-[200px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.logo}
                    alt={`${s.name} のロゴ`}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              ) : (
                <div
                  key={i}
                  aria-hidden
                  className="flex h-24 w-[46%] items-center justify-center rounded-[10px] bg-white ring-1 ring-inset ring-line sm:w-[200px]"
                >
                  <span className="text-[13px] tracking-[2px] text-[#888888]">
                    {s.name}
                  </span>
                </div>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
