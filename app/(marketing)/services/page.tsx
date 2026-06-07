import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES, SERVICE_IMAGES, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Ron's S A Landscape | San Antonio Lawn, Landscape & Hardscape",
  description:
    "Lawn maintenance, landscape installation, hardscape, irrigation, seasonal cleanups, and mulch & rock — for San Antonio homes and properties.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 lg:px-8 pt-14 lg:pt-20 pb-4">
        <div className="lux-eyebrow mb-4">What we do</div>
        <h1 className="display text-[40px] sm:text-[52px] leading-[1.02]">
          Services
        </h1>
        <p className="text-[17px] text-ink/70 mt-4 max-w-2xl leading-relaxed">
          From the weekly mow to a full landscape build — one crew for the whole
          property.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">
          {SERVICES.map((s) => (
            <div key={s.slug} id={s.slug} className="scroll-mt-20">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-cream/40">
                <Image
                  src={SERVICE_IMAGES[s.slug]}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h2 className="display text-[24px] mt-4">{s.name}</h2>
              <p className="text-[15px] text-ink/65 mt-2 leading-relaxed">
                {s.blurb}
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-[14px] text-ink/75 flex items-start gap-2"
                  >
                    <span className="text-moss">·</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 text-center">
          <h2 className="display text-[30px] sm:text-[38px]">
            Not sure what you need?
          </h2>
          <p className="text-[16px] text-ink/65 mt-3 max-w-lg mx-auto">
            Tell us about your property and we&rsquo;ll recommend the right plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="lux-btn">
              Request an Estimate
            </Link>
            <a href={CONTACT.phoneHref} className="lux-btn-outline">
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
