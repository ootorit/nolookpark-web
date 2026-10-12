export default function SectionHeading({
  id,
  jp,
  en,
  tone = "ink",
}: {
  id?: string;
  jp: string;
  en: string;
  tone?: "ink" | "brand";
}) {
  const color = tone === "brand" ? "text-brand" : "text-ink";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <h2 id={id} className={`text-[26px] tracking-[2px] md:text-[30px] ${color}`}>
        {jp}
      </h2>
      <span
        aria-hidden
        className={`font-en text-[13px] tracking-[2px] opacity-45 ${color}`}
      >
        {en}
      </span>
    </div>
  );
}
