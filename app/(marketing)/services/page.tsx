import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Ron's Landscape | San Antonio Lawn, Landscape & Hardscape",
  description:
    "Lawn maintenance, landscape installation, hardscape, irrigation, seasonal cleanups, and mulch & rock — for San Antonio homes and properties.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b-[1.5px] border-ink bg-cream/40">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
          <div className="label mb-3">What we do</div>
          <h1 className="display text-[44px] sm:text-[56px] leading-[0.95]">
            Services
          </h1>
          <p className="text-[16px] text-slate mt-4 max-w-2xl leading-relaxed">
            Everything it takes to keep a San Antonio property looking its best —
            from the weekly mow to a full landscape build. One crew, one point of
            contact, the whole yard handled.
          </p>
        </div>
      </section>

      {/* Quick index */}
      <section className="border-b-[1.5px] border-ink">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-5 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="chip chip-neutral hover:bg-cream">
              {s.name}
            </a>
          ))}
        </div>
      </section>

      {/* Service detail sections */}
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {SERVICES.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className="py-16 border-b border-dashed border-ink/25 scroll-mt-24"
          >
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 bg-moss border-[1.5px] border-ink flex items-center justify-center text-bone mono text-xl shadow-stamp-sm">
                    {s.icon}
                  </span>
                  <div className="mono text-[12px] text-slate uppercase tracking-wider">
                    {String(i + 1).padStart(2, "0")} · {s.tagline}
                  </div>
                </div>
                <h2 className="display text-[32px] sm:text-[38px] leading-tight mt-5">
                  {s.name}
                </h2>
                <p className="text-[15px] text-slate mt-4 leading-relaxed">
                  {s.blurb}
                </p>
                <Link href="/contact" className="btn btn-clay mt-6">
                  Get a Quote
                </Link>
              </div>

              <div className="lg:col-span-7">
                <div className="panel-stamp p-7">
                  <div className="label mb-4">What&rsquo;s included</div>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px]">
                        <span className="text-moss mt-0.5">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-20">
        <div className="panel-stamp bg-moss text-bone p-10 lg:p-14 text-center">
          <h2 className="display text-[32px] sm:text-[40px] leading-tight">
            Not sure what you need?
          </h2>
          <p className="text-[15px] text-bone/75 mt-4 max-w-lg mx-auto">
            Tell us about your property and we&rsquo;ll recommend the right plan —
            no pressure, no obligation.
          </p>
          <div className="mt-7 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-clay">
              Request an Estimate
            </Link>
            <a href={CONTACT.phoneHref} className="btn btn-secondary">
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
