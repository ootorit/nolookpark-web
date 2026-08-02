export default function SectionHeading({
  jp,
  en,
  tone = "ink",
}: {
  jp: string;
  en: string;
  tone?: "ink" | "brand";
}) {
  const color = tone === "brand" ? "text-brand" : "text-ink";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <h2 className={`text-[26px] tracking-[2px] md:text-[30px] ${color}`}>
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
