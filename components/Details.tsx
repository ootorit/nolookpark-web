import { EVENT } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-5">
      <div className="flex w-[86px] shrink-0 items-center justify-center rounded-full bg-ink py-[7px]">
        <span className="text-[13px] font-bold tracking-[2px] text-brand">{label}</span>
      </div>
      <div className="flex-1 text-base font-semibold leading-[1.7] text-ink">
        {children}
      </div>
    </div>
  );
}

export default function Details() {
  return (
    <section id="details" className="bg-brand px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-12">
        <Reveal>
          <SectionHeading jp="開催概要" en="EVENT DETAILS" />
        </Reveal>

        <Reveal
          delay={100}
          className="grid w-full grid-cols-1 gap-12 md:grid-cols-[1fr_400px] md:items-start"
        >
          <div className="flex flex-col gap-8">
            <Row label="日程">{EVENT.date}</Row>
            <Row label="時間">{EVENT.time}</Row>
            <Row label="会場">
              {EVENT.venue}
              <br />
              {EVENT.venueArea}
            </Row>
            <Row label="料金">
              {EVENT.price.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </Row>
            <Row label="主催">{EVENT.organizer}</Row>
            <Row label="共催">{EVENT.coHost}</Row>
          </div>

          <div className="flex h-64 items-center justify-center rounded-xl bg-black/5 ring-[3px] ring-inset ring-ink md:h-80">
            <span className="font-en text-sm text-ink/50">MAP</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
