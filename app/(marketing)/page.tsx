import Image from "next/image";
import Link from "next/link";
import {
  CONTACT,
  SERVICES,
  SEGMENTS,
  HERO_IMAGE,
  SERVICE_IMAGES,
  GALLERY,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero — full-width photo, headline below */}
      <section>
        <div className="relative w-full h-[46vh] min-h-[300px] lg:h-[58vh]">
          <Image
            src={HERO_IMAGE}
            alt="Landscaped garden in San Antonio"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-12 lg:py-16">
          <div className="lux-eyebrow mb-4">
            San Antonio · Landscaping &amp; Lawn Care
          </div>
          <h1 className="display text-[40px] sm:text-[54px] leading-[1.02] max-w-3xl">
            Landscaping &amp; lawn care, done right.
          </h1>
          <p className="text-[17px] text-ink/70 mt-5 max-w-xl leading-relaxed">
            Full-service lawn, landscape, and hardscape across San Antonio — one
            dependable crew for the whole property.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="lux-btn">
              Get a Free Quote
            </Link>
            <a href={CONTACT.phoneHref} className="lux-btn-outline">
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 lg:py-20">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
            <h2 className="display text-[30px] sm:text-[38px]">What we do</h2>
            <Link
              href="/services"
              className="text-[15px] font-semibold text-moss hover:underline"
            >
              All services →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="group">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-cream/40">
                  <Image
                    src={SERVICE_IMAGES[s.slug]}
                    alt={s.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[19px] font-semibold mt-3 group-hover:text-moss">
                  {s.name}
                </h3>
                <p className="text-[14px] text-ink/60 mt-1">{s.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 lg:py-20">
          <h2 className="display text-[30px] sm:text-[38px] mb-10">
            Who we serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {SEGMENTS.map((s) => (
              <div key={s.name} className="border-t border-ink/15 pt-4">
                <h3 className="text-[19px] font-semibold">{s.name}</h3>
                <p className="text-[14px] text-ink/60 mt-1.5 leading-relaxed">
                  {s.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 lg:py-20">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
            <h2 className="display text-[30px] sm:text-[38px]">Recent work</h2>
            <Link
              href="/work"
              className="text-[15px] font-semibold text-moss hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.slice(0, 4).map((g) => (
              <div key={g.title}>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-cream/40">
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-[13px] text-ink/70 mt-2">{g.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16 text-center">
          <h2 className="display text-[30px] sm:text-[40px]">
            Ready for a free quote?
          </h2>
          <p className="text-[16px] text-ink/65 mt-3">
            No pressure — usually same week.
          </p>
          <div className="mt-7 flex flex-wrap gap-4 justify-center">
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
