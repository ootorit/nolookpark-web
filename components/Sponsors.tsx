import { SPONSORS } from "@/lib/site";

export default function Sponsors() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...SPONSORS, ...SPONSORS];

  return (
    <section aria-label="協賛" className="overflow-hidden bg-cream py-16">
      <div className="flex w-max animate-marquee">
        {items.map((s, i) => (
          <div
            key={i}
            className="mr-10 flex h-14 w-32 shrink-0 items-center justify-center rounded-lg bg-[#e5e5e5] md:mr-16 md:w-36"
            aria-hidden={i >= SPONSORS.length}
          >
            <span className="font-en text-[13px] font-medium text-muted">{s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
