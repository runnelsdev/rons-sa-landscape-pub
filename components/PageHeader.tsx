import Link from "next/link";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  backHref,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  backHref?: string;
}) {
  return (
    <div className="border-b-[1.5px] border-ink bg-cream/40">
      <div className="px-8 pt-7 pb-6">
        {backHref && (
          <Link
            href={backHref}
            className="mono text-[11px] uppercase tracking-[0.12em] text-slate hover:text-moss inline-flex items-center gap-1 mb-3"
          >
            <span>←</span> Back
          </Link>
        )}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="label mb-2">{eyebrow}</div>
            <h1 className="display text-[44px] leading-[0.95] text-ink">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-[15px] text-slate max-w-2xl">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      </div>
      <div className="ticker-stripe" />
    </div>
  );
}
