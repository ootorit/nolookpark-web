import type { Zone } from "@/lib/guide";

/** エリアの丸バッジ（A〜F）。 */
export function ZoneMark({
  id,
  size = "md",
}: {
  id: Zone["id"];
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "lg"
      ? "h-14 w-14 text-[26px]"
      : size === "sm"
        ? "h-8 w-8 text-[14px]"
        : "h-11 w-11 text-[20px]";
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-ink font-en text-brand ${dim}`}
    >
      {id}
    </span>
  );
}

/** 「整理券制」などの小さなタグ。 */
export function Tag({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "ink" | "outline";
}) {
  const cls =
    tone === "ink"
      ? "bg-ink text-brand"
      : tone === "outline"
        ? "bg-white text-ink ring-1 ring-inset ring-ink"
        : "bg-brand text-ink";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] tracking-[1px] ${cls}`}
    >
      {children}
    </span>
  );
}
