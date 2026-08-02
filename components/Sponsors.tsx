import { SPONSORS } from "@/lib/site";

export default function Sponsors() {
  return (
    <section className="bg-cream px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
        {SPONSORS.map((s) => (
          <div
            key={s}
            className="flex h-14 w-32 items-center justify-center rounded-lg bg-[#e5e5e5] md:w-36"
          >
            <span className="font-en text-[13px] font-medium text-muted">{s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
