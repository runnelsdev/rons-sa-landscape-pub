import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/marketing/Reveal";
import { SERVICES, SERVICE_IMAGES, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Ron's S A Landscape | San Antonio Lawn, Landscape & Hardscape",
  description:
    "Lawn maintenance, landscape installation, hardscape, irrigation, seasonal cleanups, and mulch & rock — for San Antonio homes and properties.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-20 lg:pt-28 pb-12">
        <Reveal>
          <div className="lux-eyebrow mb-5">What we do</div>
          <h1 className="display text-[46px] sm:text-[64px] leading-[0.98] max-w-3xl">
            Services for the whole property.
          </h1>
          <p className="text-[17px] text-ink/70 mt-6 max-w-2xl leading-relaxed">
            From the weekly mow to a full landscape build — one crew, one point of
            contact, the whole yard handled to a single high standard.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="text-[14px] text-ink/60 hover:text-moss transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Service rows */}
      <div className="mx-auto max-w-7xl px-5 lg:px-10 pb-12">
        {SERVICES.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              className="py-14 lg:py-20 border-t border-ink/10 scroll-mt-24"
            >
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_36px_70px_-44px_rgba(26,26,23,0.6)] group">
                    <Image
                      src={SERVICE_IMAGES[s.slug]}
                      alt={s.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover img-zoom"
                    />
                  </div>
                </Reveal>

                <Reveal className={flip ? "lg:order-1" : ""} delay={100}>
                  <div className="lux-eyebrow text-sage mb-3">
                    {String(i + 1).padStart(2, "0")} · {s.tagline}
                  </div>
                  <h2 className="display text-[32px] sm:text-[40px] leading-[1.05]">
                    {s.name}
                  </h2>
                  <p className="text-[16px] text-ink/70 mt-4 leading-relaxed">
                    {s.blurb}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-7">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[15px] text-ink/80"
                      >
                        <span className="text-moss mt-1 text-[12px]" aria-hidden>
                          ●
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="lux-btn mt-8">
                    Get a Quote
                  </Link>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="bg-[#1f3219] text-bone">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20 text-center">
          <Reveal>
            <h2 className="display text-[34px] sm:text-[46px] leading-[1.05] max-w-2xl mx-auto">
              Not sure what you need?
            </h2>
            <p className="text-[16px] text-bone/65 mt-4 max-w-lg mx-auto">
              Tell us about your property and we&rsquo;ll recommend the right plan
              — no pressure, no obligation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="lux-btn-light">
                Request an Estimate
              </Link>
              <a href={CONTACT.phoneHref} className="lux-btn-ghost">
                Call {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
