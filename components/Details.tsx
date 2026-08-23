import { MapPin, ArrowUpRight, Phone, TrainFront, Bus, Car } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { EVENT, IMG } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-5">
      {/* h-7 matches the value's first-line box (16px × 1.75) so their centers line up */}
      <div className="flex h-7 w-[86px] shrink-0 items-center justify-center rounded-full bg-ink">
        <span className="text-[13px] tracking-[2px] text-brand">{label}</span>
      </div>
      <div className="flex-1 text-base leading-[1.75] text-ink">{children}</div>
    </div>
  );
}

function AccessItem({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-brand">
        <Icon size={18} aria-hidden />
      </span>
      <div className="flex flex-col gap-1 pt-1">
        <span className="text-[13px] tracking-[1px] text-ink">{label}</span>
        <div className="text-[14px] leading-[1.7] text-ink">{children}</div>
      </div>
    </div>
  );
}

export default function Details() {
  return (
    <section
      id="details"
      aria-label="開催概要"
      className="bg-brand px-6 py-24 md:px-12 md:py-28"
    >
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-12">
        <Reveal>
          <SectionHeading jp="開催概要" en="EVENT DETAILS" />
        </Reveal>

        <Reveal
          delay={100}
          className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:items-start"
        >
          <div className="flex flex-col gap-8">
            <Row label="日程">{EVENT.date}</Row>
            <Row label="時間">{EVENT.time}</Row>
            <Row label="会場">
              <div className="flex flex-col items-start gap-2.5">
                <a
                  href={EVENT.venueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
                >
                  {EVENT.venue}
                </a>
                <div className="text-[13px]">
                  {EVENT.venuePostal} {EVENT.venueAddress}
                </div>
                <a
                  href={EVENT.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/map mt-1 inline-flex items-center gap-2 rounded-lg border-2 border-ink px-4 py-2.5 text-[13px] text-ink transition-colors hover:bg-ink hover:text-brand"
                >
                  <MapPin size={16} aria-hidden />
                  Googleマップで見る
                  <ArrowUpRight
                    size={15}
                    aria-hidden
                    className="transition-transform group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5"
                  />
                </a>
              </div>
            </Row>
            <Row label="料金">
              {EVENT.price.map((line, i) => (
                <span
                  key={i}
                  className={line.startsWith("※") ? "block text-[13px]" : "block"}
                >
                  {line}
                </span>
              ))}
            </Row>
            <Row label="主催">{EVENT.organizer}</Row>
            <Row label="共催">{EVENT.coHost}</Row>
          </div>

          <div className="flex flex-col gap-3">
            <div
              role="img"
              aria-label="HOME/WORK VILLAGE の外観の写真"
              className="aspect-[3/2] w-full rounded-xl bg-cover bg-center [outline:2px_solid_#1A1A1A] [outline-offset:-1px]"
              style={{ backgroundImage: `url(${IMG.venuePhoto1})` }}
            />
            <div
              role="img"
              aria-label="HOME/WORK VILLAGE の内観の写真"
              className="aspect-[3/2] w-full rounded-xl bg-cover bg-center [outline:2px_solid_#1A1A1A] [outline-offset:-1px]"
              style={{ backgroundImage: `url(${IMG.venuePhoto2})` }}
            />
          </div>
        </Reveal>

        {/* アクセス */}
        <Reveal delay={150} className="w-full">
          <div className="flex flex-col gap-8 rounded-2xl bg-white p-8 [outline:2px_solid_#1A1A1A] [outline-offset:-1px] md:p-10">
            <div className="flex items-center gap-3">
              <span className="text-lg tracking-[1px] text-ink">アクセス</span>
              <span
                aria-hidden
                className="font-en text-[11px] tracking-[2px] text-ink opacity-45"
              >
                ACCESS
              </span>
            </div>
            <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
              <AccessItem icon={Phone} label="電話">
                <a
                  href={`tel:${EVENT.venueTel.replace(/-/g, "")}`}
                  className="transition-opacity hover:opacity-60"
                >
                  {EVENT.venueTel}
                </a>
                <span className="ml-2 text-[13px] opacity-70">
                  （{EVENT.venueTelNote}）
                </span>
              </AccessItem>
              <AccessItem icon={TrainFront} label="電車">
                {EVENT.access.train.map((l, i) => (
                  <div key={i}>{l}</div>
                ))}
              </AccessItem>
              <AccessItem icon={Bus} label="バス">
                {EVENT.access.bus.map((l, i) => (
                  <div key={i}>{l}</div>
                ))}
              </AccessItem>
              <AccessItem icon={Car} label="車">
                {EVENT.access.car.map((l, i) => (
                  <div key={i}>{l}</div>
                ))}
              </AccessItem>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
