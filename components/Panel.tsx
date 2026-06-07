export default function Panel({
  title,
  eyebrow,
  children,
  action,
  dense,
}: {
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  dense?: boolean;
}) {
  return (
    <section className="panel">
      {(title || eyebrow) && (
        <header className="px-5 py-4 border-b-[1.5px] border-ink flex items-center justify-between gap-3 bg-cream/30">
          <div>
            {eyebrow && <div className="label">{eyebrow}</div>}
            {title && <h2 className="display text-[22px] leading-tight mt-1">{title}</h2>}
          </div>
          {action}
        </header>
      )}
      <div className={dense ? "p-0" : "p-5"}>{children}</div>
    </section>
  );
}
