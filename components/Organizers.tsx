import { ArrowUpRight } from "lucide-react";
import { ORGANIZERS, CO_HOST } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 1.5h3.4l-7.4 8.5L23.7 22h-6.8l-5.3-7-6.1 7H2l7.9-9.1L1.6 1.5h7l4.8 6.4L18.9 1.5Zm-1.2 18.4h1.9L7.1 3.5H5.1l12.6 16.4Z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconLink({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full ring-[1.5px] ring-inset ring-ink transition-colors hover:bg-ink hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Organizers() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-14">
        <Reveal>
          <SectionHeading jp="主催者" en="ORGANIZERS" />
        </Reveal>

        <Reveal delay={80} className="flex flex-col items-center gap-5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold tracking-[2px] text-ink">
              主催者
            </span>
            <h3 className="font-en text-3xl font-bold tracking-[1px] text-ink md:text-[44px]">
              NO LOOK BROTHERS
            </h3>
          </div>
          <p className="max-w-[680px] text-[15px] leading-[1.9] text-ink/70">
            「見ないで遊ぶ」を本気でやってみたかった3人組。企画・空間・音、それぞれの得意分野を持ち寄って
            NO LOOK PARK を作っています。
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {ORGANIZERS.map((o, i) => (
            <Reveal
              key={o.num}
              delay={i * 100}
              className="overflow-hidden rounded-xl ring-2 ring-inset ring-ink"
            >
              <div
                className="relative h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${o.image})` }}
              >
                <span className="font-en absolute left-4 top-2 text-[80px] font-bold leading-none text-ink/20">
                  {o.num}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 bg-white px-6 pb-7 pt-6">
                <span className="w-fit rounded-full bg-brand px-3 py-1.5 text-[11px] font-bold tracking-[1px] text-ink">
                  肩書き・役職
                </span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[22px] font-bold tracking-[1px] text-ink">
                    {o.name}
                  </h4>
                  <span className="font-en text-[11px] font-bold tracking-[2px] text-ink/45">
                    {o.romaji}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.75] text-ink/70">{o.desc}</p>

                <div className="mt-3.5 flex flex-col gap-3.5">
                  <div className="h-px w-full bg-line" />
                  <div className="flex items-center gap-2">
                    <IconLink label={`${o.name} X`}>
                      <XIcon />
                    </IconLink>
                    <IconLink label={`${o.name} Instagram`}>
                      <InstagramIcon />
                    </IconLink>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-bold tracking-[1px] text-ink ring-[1.5px] ring-inset ring-ink transition-colors hover:bg-ink hover:text-white"
                    >
                      公式サイト
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 共催（Vision Consortium）ハイライト */}
        <Reveal className="flex w-full flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand px-3 py-1.5 text-xs font-bold tracking-[2px] text-ink">
              {CO_HOST.chip}
            </span>
            <span className="font-en text-[13px] font-bold tracking-[2px] text-muted">
              {CO_HOST.label}
            </span>
          </div>

          <div className="flex w-full flex-col items-center gap-10 rounded-xl bg-cream px-8 py-10 ring-2 ring-inset ring-ink sm:flex-row sm:px-12">
            <div className="flex h-[140px] w-full shrink-0 items-center justify-center rounded-lg bg-white sm:w-[280px]">
              <div className="flex items-center gap-3.5">
                <span className="relative block h-[52px] w-[52px]">
                  <span className="absolute inset-0 rounded-full bg-ink" />
                  <span className="absolute left-[15px] top-[15px] h-[22px] w-[22px] rounded-full bg-brand" />
                </span>
                <span className="font-en flex flex-col gap-[3px] leading-none text-ink">
                  <span className="text-[22px] font-bold tracking-[3px]">VISION</span>
                  <span className="text-xs font-bold tracking-[3.4px]">CONSORTIUM</span>
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <h3 className="font-en text-[26px] font-bold tracking-[1px] text-ink">
                {CO_HOST.nameEn}
              </h3>
              <span className="text-[13px] text-ink/50">{CO_HOST.nameJp}</span>
              <p className="text-[15px] leading-[1.9] text-ink/70">{CO_HOST.desc}</p>
              <a
                href={CO_HOST.href}
                className="flex w-fit items-center gap-1.5 text-[13px] font-bold tracking-[1px] text-ink transition-opacity hover:opacity-60"
              >
                {CO_HOST.linkText}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
