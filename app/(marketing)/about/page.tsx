import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, SERVICE_AREA, CONTACT, ABOUT_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Ron's S A Landscape | San Antonio Landscaping",
  description:
    "Ron's S A Landscape LLC is a local San Antonio landscaping company. Here's how we work and what we stand for.",
};

const values = [
  {
    title: "Do the small things right",
    body: "Clean edges, blown-down walks, gates latched. The details are the job.",
  },
  {
    title: "Be where we said we'd be",
    body: "Routes are planned. A scheduled day is a promise, not a maybe.",
  },
  {
    title: "Treat the property like ours",
    body: "We notice the dry zone, the leaning post, the bed that needs mulch.",
  },
  {
    title: "Keep it honest",
    body: "Straight quotes, no surprise line items, and a real person on the phone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 lg:px-8 pt-14 lg:pt-20 pb-10">
        <div className="lux-eyebrow mb-4">Who we are</div>
        <h1 className="display text-[40px] sm:text-[52px] leading-[1.02] max-w-3xl">
          A local crew that treats your yard like it matters.
        </h1>
      </section>

      {/* Story + image */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 pb-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-cream/40">
            <Image
              src={ABOUT_IMAGE}
              alt="Landscaped patio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4 text-[16px] leading-relaxed text-ink/75">
            <p>
              {COMPANY.legalName} is a local landscaping company serving San
              Antonio and the surrounding Hill Country — one dependable team for
              the whole property.
            </p>
            <p>
              From recurring lawn maintenance to installs, hardscape, irrigation,
              and cleanups, we handle it all — built for the South Texas climate,
              kept to one standard.
            </p>
            <p className="text-ink/90 font-medium">
              Show up when we say, do the small things right, and leave the
              property better than we found it.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 lg:py-20">
          <h2 className="display text-[30px] sm:text-[38px] mb-10">
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {values.map((v) => (
              <div key={v.title} className="border-t border-ink/15 pt-4">
                <h3 className="text-[19px] font-semibold">{v.title}</h3>
                <p className="text-[15px] text-ink/60 mt-1.5 leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area + CTA */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
          <div className="lux-eyebrow mb-3">Where we work</div>
          <p className="text-[16px] text-ink/70 max-w-2xl leading-relaxed">
            {SERVICE_AREA.join(", ")}.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/contact" className="lux-btn">
              Get a Quote
            </Link>
            <a href={CONTACT.phoneHref} className="lux-btn-outline">
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
