import { ArrowUpRight } from "lucide-react";
import { CO_HOST, SPONSOR_LOGOS, COLLABORATORS, IMG } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function GroupLabel({
  en,
  jp,
  variant,
}: {
  en: string;
  jp: string;
  variant: "cohost" | "sponsor";
}) {
  const chip =
    variant === "cohost"
      ? "bg-brand text-ink"
      : "bg-white text-ink ring-1 ring-inset ring-line";
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
      aria-label="共催・協賛"
      className="bg-cream px-6 py-24 md:px-12 md:py-28"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <SectionHeading jp="共催・協賛" en="SUPPORTERS" />
          <p className="max-w-[680px] text-base leading-[1.9] text-ink">
            NO LOOK PARK は、以下の企業・団体の共催・ご協賛により開催されます。
          </p>
        </Reveal>

        {/* 共催 */}
        <Reveal className="flex w-full flex-col items-center gap-6">
          <GroupLabel en="CO-HOST" jp="共催" variant="cohost" />
          <VisionConsortiumCard />
        </Reveal>

        {/* 協賛 */}
        <Reveal className="flex w-full flex-col items-center gap-6">
          <GroupLabel en="SPONSOR" jp="協賛" variant="sponsor" />
          <div className="flex w-full flex-wrap justify-center gap-[15px]">
            {SPONSOR_LOGOS.map((s, i) =>
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

        {/* 協力 */}
        <Reveal className="flex w-full flex-col items-center gap-6">
          <GroupLabel en="COOPERATION" jp="協力" variant="sponsor" />
          <ul className="flex max-w-[760px] flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {COLLABORATORS.map((name) => (
              <li
                key={name}
                className="text-[17px] tracking-[0.5px] text-ink"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
