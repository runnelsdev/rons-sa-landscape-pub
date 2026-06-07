export default function DataRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="data-row">
      <div className="label pt-1">{label}</div>
      <div className="text-[14px] text-ink">{children}</div>
    </div>
  );
}
