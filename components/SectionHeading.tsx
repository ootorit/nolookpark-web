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
      <div className={`text-[26px] font-bold tracking-[2px] md:text-[30px] ${color}`}>
        {jp}
      </div>
      <div className={`font-en text-[13px] font-bold tracking-[4px] opacity-45 ${color}`}>
        {en}
      </div>
    </div>
  );
}
