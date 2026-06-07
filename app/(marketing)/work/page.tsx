import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/marketing/Reveal";
import { GALLERY, SERVICE_AREA, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work — Ron's S A Landscape | San Antonio Project Gallery",
  description:
    "A look at recent Ron's S A Landscape projects across San Antonio — lawn transformations, installs, hardscape, and irrigation.",
};

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-20 lg:pt-28 pb-14">
        <Reveal>
          <div className="lux-eyebrow mb-5">Recent projects</div>
          <h1 className="display text-[46px] sm:text-[64px] leading-[0.98] max-w-3xl">
            Our work around the city.
          </h1>
          <p className="text-[17px] text-ink/70 mt-6 max-w-2xl leading-relaxed">
            A sampling of recent jobs across the San Antonio area — maintenance
            routes, installs, hardscape, and cleanups. Every property is
            different; the standard isn&rsquo;t.
          </p>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pb-8">
        {/* Asymmetric mosaic — spans chosen so it tiles with no gaps at both
            2-col (mobile) and 4-col (desktop). Image fills each cell so all
            four corners clip cleanly. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[168px] lg:auto-rows-[240px] gap-4">
          {GALLERY.map((g, i) => {
            const span =
              i === 0
                ? "col-span-2 row-span-2"
                : i === 5
                ? "col-span-2"
                : "";
            const featured = i === 0;
            return (
              <Reveal
                key={g.title}
                delay={(i % 4) * 80}
                className={`${span} h-full`}
              >
                <figure className="group relative h-full w-full rounded-2xl overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes={
                      featured
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                    className="object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-bone/75">
                      {g.category} · {g.area}
                    </div>
                    <div
                      className={`display text-bone leading-tight mt-1.5 ${
                        featured ? "text-[26px] lg:text-[32px]" : "text-[19px]"
                      }`}
                    >
                      {g.title}
                    </div>
                    <p className="text-[13px] text-bone/0 group-hover:text-bone/85 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 mt-0 group-hover:mt-2">
                      {g.blurb}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>

        <p className="text-[13px] text-slate mt-10 text-center">
          Project photography is representative — real Ron&rsquo;s S A Landscape
          jobs across {SERVICE_AREA.slice(0, 4).join(", ")} &amp; more coming soon.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-20">
        <div className="rounded-3xl bg-[#1f3219] text-bone px-8 py-16 lg:px-16 text-center">
          <Reveal>
            <h2 className="display text-[34px] sm:text-[46px] leading-[1.05]">
              Want yours on this page?
            </h2>
            <p className="text-[16px] text-bone/65 mt-4 max-w-lg mx-auto">
              Let&rsquo;s talk about your property and what it could be.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="lux-btn-light">
                Start a Project
              </Link>
              <a href={CONTACT.phoneHref} className="lux-btn-ghost">
                {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
