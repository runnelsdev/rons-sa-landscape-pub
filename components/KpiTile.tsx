export default function KpiTile({
  label,
  value,
  delta,
  tone = "neutral",
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "good" | "warn" | "bad" | "neutral";
}) {
  const accent =
    tone === "good"
      ? "text-moss"
      : tone === "warn"
      ? "text-sun"
      : tone === "bad"
      ? "text-rust"
      : "text-ink";
  return (
    <div className="panel-stamp p-5">
      <div className="label">{label}</div>
      <div className={`display text-[36px] leading-[1] mt-3 ${accent}`}>{value}</div>
      {delta && <div className="mono text-[11px] text-slate mt-2">{delta}</div>}
    </div>
  );
}
