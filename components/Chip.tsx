export function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "good" | "warn" | "bad" | "neutral";
}) {
  const cls =
    tone === "good"
      ? "chip chip-good"
      : tone === "warn"
      ? "chip chip-warn"
      : tone === "bad"
      ? "chip chip-bad"
      : "chip chip-neutral";
  return <span className={cls}>{children}</span>;
}
