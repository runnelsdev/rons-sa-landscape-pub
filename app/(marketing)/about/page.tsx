import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/marketing/Reveal";
import {
  COMPANY,
  STATS,
  SERVICE_AREA,
  CONTACT,
  ABOUT_IMAGE,
  DETAIL_IMAGE,
} from "@/lib/site";

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
    body: "We notice the dry zone, the leaning post, the bed that needs mulch — and we tell you.",
  },
  {
    title: "Keep it honest",
    body: "Straight quotes, no surprise line items, and a real person on the other end of the phone.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header + image */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-20 lg:pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="lux-eyebrow mb-5">Who we are</div>
            <h1 className="display text-[42px] sm:text-[58px] leading-[0.98]">
              A family crew that treats your yard like it matters.
            </h1>
            <p className="text-[17px] text-ink/70 mt-6 leading-relaxed max-w-xl">
              {COMPANY.legalName} is a local landscaping company serving San
              Antonio and the surrounding Hill Country — one dependable team for
              the whole property.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_40px_80px_-44px_rgba(26,26,23,0.6)]">
              <Image
                src={ABOUT_IMAGE}
                alt="Landscaped patio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#F3EFE4]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_36px_70px_-44px_rgba(26,26,23,0.55)]">
                <Image
                  src={DETAIL_IMAGE}
                  alt="Garden detail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="lg:col-span-7 space-y-5 text-[16px] leading-relaxed text-ink/80">
              <Reveal>
                <h2 className="display text-[30px] sm:text-[38px] leading-[1.08] text-ink mb-6">
                  Built for South Texas, kept to one standard.
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  We keep it simple: one crew that shows up, does the work right,
                  and treats your property like its own. From recurring lawn
                  maintenance to installs, hardscape, irrigation, and cleanups, we
                  handle the whole yard — so you&rsquo;re not juggling three
                  companies to keep one property looking good.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p>
                  And we&rsquo;re built for this climate specifically —
                  drought-tolerant plantings, water-wise irrigation, and turf care
                  that holds up to a Hill Country summer. It&rsquo;s the difference
                  between a yard that&rsquo;s mowed and a yard that&rsquo;s cared
                  for.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="border-l-2 border-moss pl-5 mt-8">
                  <p className="display text-[22px] leading-snug text-ink">
                    Show up when we say, do the small things right, and leave the
                    property better than we found it.
                  </p>
                  <div className="lux-eyebrow text-slate mt-3">
                    The {COMPANY.name} standard
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24">
        <Reveal>
          <div className="lux-eyebrow mb-4">What we stand for</div>
          <h2 className="display text-[34px] sm:text-[46px] leading-[1.05] max-w-2xl">
            Four rules we don&rsquo;t bend.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-14">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 90}>
              <div className="flex gap-5">
                <div className="display text-[22px] text-clay/80 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="display text-[23px] leading-tight">{v.title}</h3>
                  <p className="text-[15px] text-ink/65 mt-2 leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1f3219] text-bone">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="display text-[40px] leading-none text-bone">
                  {s.value}
                </div>
                <div className="text-[12px] uppercase tracking-[0.16em] text-bone/55 mt-3">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area + CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="lux-eyebrow mb-4">Where we work</div>
              <h2 className="display text-[30px] sm:text-[40px] leading-[1.05]">
                Rooted in San Antonio &amp; the Hill Country.
              </h2>
              <p className="text-[15px] text-ink/65 mt-5 leading-relaxed max-w-xl">
                {SERVICE_AREA.join(" · ")}
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link href="/contact" className="lux-btn">
                Get a Quote
              </Link>
              <a href={CONTACT.phoneHref} className="lux-btn-outline">
                {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
