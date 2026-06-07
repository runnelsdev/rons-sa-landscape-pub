import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, STATS, SERVICE_AREA, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Ron's S A Landscape | San Antonio Landscaping",
  description:
    "Ron's S A Landscape LLC is a local San Antonio landscaping company. Here's how we work and what we stand for.",
};

const values = [
  {
    title: "Do the small things right",
    body: "Clean edges, blown-down walks, gates latched. The details are the job — the big stuff takes care of itself.",
  },
  {
    title: "Be where we said we'd be",
    body: "Routes are planned and protected. A scheduled day is a promise, not a maybe.",
  },
  {
    title: "Treat the property like ours",
    body: "We notice the dry zone, the leaning fence post, the bed that needs mulch — and we tell you.",
  },
  {
    title: "Keep it honest",
    body: "Straight quotes, no surprise line items, and a real person on the other end of the phone.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b-[1.5px] border-ink bg-cream/40">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
          <div className="label mb-3">Who we are</div>
          <h1 className="display text-[44px] sm:text-[56px] leading-[0.95] max-w-3xl">
            A family crew that treats your yard like the shop out back.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-5 text-[16px] leading-relaxed text-ink/90">
            <p>
              {COMPANY.legalName} is a local landscaping company serving San
              Antonio and the surrounding Hill Country. We keep it simple: one
              dependable crew that shows up, does the work right, and treats your
              property like it matters.
            </p>
            <p>
              From recurring lawn maintenance to installs, hardscape, irrigation,
              and cleanups, we handle the whole yard — so you&rsquo;re not juggling
              three different companies to keep one property looking good.
            </p>
            <p>
              We&rsquo;re built for South Texas specifically — drought-tolerant
              plantings, water-wise irrigation, and turf care that holds up to a
              Hill Country summer. It&rsquo;s the difference between a yard
              that&rsquo;s mowed and a yard that&rsquo;s cared for.
            </p>
          </div>

          {/* How we work */}
          <div className="lg:col-span-5">
            <div className="panel-stamp p-7 bg-moss/5 border-l-[6px] border-moss">
              <div className="label text-moss">How we work</div>
              <p className="display text-[24px] leading-snug mt-3">
                Show up when we say, do the small things right, and leave the
                property better than we found it.
              </p>
              <div className="mono text-[11px] text-slate mt-3">
                — The {COMPANY.name} standard
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y-[1.5px] border-ink bg-cream/40">
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

      {/* Values */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-20">
        <div className="label mb-2">What we stand for</div>
        <h2 className="display text-[36px] sm:text-[44px] leading-tight max-w-2xl">
          Four rules we don&rsquo;t bend.
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {values.map((v, i) => (
            <div key={v.title} className="panel-stamp p-6">
              <div className="mono text-[13px] font-bold text-clay">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="display text-[22px] leading-tight mt-2">{v.title}</h3>
              <p className="text-[14px] text-slate mt-2 leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Service area + CTA */}
      <section className="border-t-[1.5px] border-ink bg-cream/40">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="label mb-3">Where we work</div>
              <h2 className="display text-[30px] sm:text-[36px] leading-tight">
                Rooted in San Antonio &amp; the surrounding Hill Country.
              </h2>
              <div className="flex flex-wrap gap-2 mt-5">
                {SERVICE_AREA.map((a) => (
                  <span key={a} className="chip chip-neutral">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
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
