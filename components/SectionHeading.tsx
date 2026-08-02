export default function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-en text-2xl font-bold tracking-[1.5px] md:text-[32px] ${className}`}
    >
      {children}
    </h2>
  );
}
