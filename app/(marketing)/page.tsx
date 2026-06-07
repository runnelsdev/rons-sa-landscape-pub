import Link from "next/link";
import { CONTACT, SERVICES, STATS, COMPANY } from "@/lib/site";

const WHY = [
  {
    k: "01",
    title: "Same crew, every visit",
    body: "You get to know your crew and they get to know your property. No rotating strangers, no re-explaining.",
  },
  {
    k: "02",
    title: "Show up you can set a clock by",
    body: "Routes are planned and run six days a week. When we say a day, we mean that day.",
  },
  {
    k: "03",
    title: "Built for South Texas",
    body: "Drought-tolerant plantings, SAWS-smart irrigation, and turf care tuned to the Hill Country climate.",
  },
  {
    k: "04",
    title: "Licensed & insured",
    body: "Fully insured crews and clean, accountable work. The boring stuff handled so you don't have to worry.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[1.5px] border-ink">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="label mb-4">
                San Antonio, TX · Since {COMPANY.foundedYear}
              </div>
              <h1 className="display text-[44px] sm:text-[60px] lg:text-[68px] leading-[0.95] text-ink">
                Lawns and landscapes that look{" "}
                <span className="text-moss">handled.</span>
              </h1>
              <p className="mt-6 text-[17px] text-slate max-w-xl leading-relaxed">
                {COMPANY.name} is a family-run crew keeping San Antonio yards
                sharp — recurring maintenance, fresh installs, hardscape,
                irrigation, and cleanups. One dependable team for the whole
                property.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn btn-clay">
                  Get a Free Quote
                </Link>
                <Link href="/work" className="btn btn-secondary">
                  See Our Work
                </Link>
                <a
                  href={CONTACT.phoneHref}
                  className="mono text-[14px] font-semibold hover:text-moss"
                >
                  or call {CONTACT.phone}
                </a>
              </div>
            </div>

            {/* Decorative stamp card */}
            <div className="lg:col-span-5">
              <div className="panel-stamp p-7 bg-moss text-bone">
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-bone/70">
                  This week on the route
                </div>
                <div className="display text-[30px] leading-tight mt-3">
                  Mow · Edge · Blow.
                  <br />
                  Repeat like clockwork.
                </div>
                <div className="h-px bg-bone/30 my-6" />
                <ul className="space-y-3">
                  {["Weekly & biweekly plans", "Free on-site estimates", "Text-ahead arrivals"].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-3 text-[15px]">
                        <span className="text-sun">✦</span>
                        {t}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b-[1.5px] border-ink bg-cream/40">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="display text-[38px] leading-none text-moss">
                  {s.value}
                </div>
                <div className="mono text-[11px] uppercase tracking-wider text-slate mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <div>
            <div className="label mb-2">What we do</div>
            <h2 className="display text-[36px] sm:text-[44px] leading-tight">
              One crew for the whole yard.
            </h2>
          </div>
          <Link href="/services" className="btn btn-secondary">
            All Services
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="panel-stamp p-6 block group"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-cream border-[1.5px] border-ink flex items-center justify-center mono text-lg shadow-stamp-sm">
                  {s.icon}
                </span>
                <div className="label">{s.tagline}</div>
              </div>
              <h3 className="display text-[22px] leading-tight mt-4">{s.name}</h3>
              <p className="text-[14px] text-slate mt-2 leading-relaxed">
                {s.blurb}
              </p>
              <div className="mono text-[12px] font-semibold uppercase tracking-wider mt-4 text-moss group-hover:translate-x-1 transition-transform">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y-[1.5px] border-ink bg-cream/40">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-20">
          <div className="label mb-2">Why Ron&rsquo;s</div>
          <h2 className="display text-[36px] sm:text-[44px] leading-tight max-w-2xl">
            A yard you don&rsquo;t have to think about.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mt-12">
            {WHY.map((w) => (
              <div key={w.k} className="flex gap-5">
                <div className="mono text-[13px] font-bold text-clay pt-1">
                  {w.k}
                </div>
                <div>
                  <h3 className="display text-[21px] leading-tight">{w.title}</h3>
                  <p className="text-[14px] text-slate mt-2 leading-relaxed max-w-md">
                    {w.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-20">
        <div className="panel-stamp bg-ink text-bone p-10 lg:p-14">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-bone/60 mb-3">
                Free, no-pressure estimate
              </div>
              <h2 className="display text-[32px] sm:text-[40px] leading-tight">
                Ready to hand off the yard work?
              </h2>
              <p className="text-[15px] text-bone/70 mt-4 max-w-lg">
                Tell us about your property and we&rsquo;ll get you a quote —
                usually same week.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap gap-4 lg:justify-end">
              <Link href="/contact" className="btn btn-clay">
                Get a Quote
              </Link>
              <a href={CONTACT.phoneHref} className="btn btn-secondary">
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
