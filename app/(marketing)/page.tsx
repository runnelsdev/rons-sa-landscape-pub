import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/marketing/Reveal";
import {
  CONTACT,
  SERVICES,
  STATS,
  SEGMENTS,
  HERO_IMAGE,
  SERVICE_IMAGES,
  ABOUT_IMAGE,
  GALLERY,
} from "@/lib/site";

const WHY = [
  {
    k: "01",
    title: "Same crew, every visit",
    body: "The crew that knows your property is the one that shows up.",
  },
  {
    k: "02",
    title: "Show up you can set a clock by",
    body: "Planned routes, six days a week. A scheduled day is a promise.",
  },
  {
    k: "03",
    title: "Built for South Texas",
    body: "Drought-tolerant plantings and water-wise irrigation, tuned to the Hill Country.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Manicured landscaped garden"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" />
        <div className="relative mx-auto max-w-7xl w-full px-5 lg:px-10 pb-20 lg:pb-28">
          <div className="max-w-2xl">
            <div className="lux-eyebrow text-bone/80">
              San Antonio · Landscaping &amp; Lawn Care
            </div>
            <h1 className="display text-bone text-[44px] sm:text-[62px] lg:text-[76px] leading-[0.98] mt-5">
              A landscape worth coming home to.
            </h1>
            <p className="text-bone/85 text-[17px] lg:text-[19px] leading-relaxed mt-6 max-w-xl">
              Full-service lawn care, landscape, and hardscape across San Antonio
              — one dependable crew for the whole property.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="lux-btn-light">
                Get a Free Quote
              </Link>
              <a href={CONTACT.phoneHref} className="lux-btn-ghost">
                Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Intro ===== */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-7">
            <div className="lux-eyebrow mb-5">Welcome to Ron&rsquo;s</div>
            <h2 className="display text-[34px] sm:text-[46px] leading-[1.05] text-ink">
              The difference between a yard that&rsquo;s mowed and one
              that&rsquo;s truly cared for.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <p className="text-[17px] text-ink/70 leading-relaxed">
              A San Antonio crew handling the whole property — mowing, installs,
              hardscape, and irrigation. One team, one standard, a yard you never
              have to think about.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/services" className="lux-btn">
                Explore Services
              </Link>
              <Link href="/work" className="lux-btn-outline">
                See Our Work
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-ink/10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="display text-[40px] leading-none text-moss">
                {s.value}
              </div>
              <div className="text-[13px] uppercase tracking-[0.14em] text-slate mt-3">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="bg-[#F3EFE4]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-28">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
            <Reveal>
              <div className="lux-eyebrow mb-4">What we do</div>
              <h2 className="display text-[34px] sm:text-[46px] leading-[1.05]">
                One crew for the whole yard.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/services" className="lux-btn-outline">
                All Services
              </Link>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-white shadow-[0_30px_60px_-40px_rgba(26,26,23,0.5)] hover:shadow-[0_40px_70px_-35px_rgba(26,26,23,0.55)] transition-shadow h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES[s.slug]}
                      alt={s.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover img-zoom"
                    />
                  </div>
                  <div className="p-7">
                    <div className="lux-eyebrow text-sage">{s.tagline}</div>
                    <h3 className="display text-[24px] leading-tight mt-2">
                      {s.name}
                    </h3>
                    <p className="text-[14px] text-ink/65 mt-3 leading-relaxed">
                      {s.blurb}
                    </p>
                    <div className="text-[13px] font-semibold text-moss mt-5 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Learn more <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Who we serve ===== */}
      <section className="bg-[#1f3219] text-bone">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20">
          <Reveal>
            <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bone/45 mb-4">
              Who we serve
            </div>
            <h2 className="display text-[34px] sm:text-[46px] leading-[1.05] max-w-2xl">
              From a single yard to the whole property.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mt-14">
            {SEGMENTS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 90}>
                <div className="border-t border-bone/15 pt-5">
                  <h3 className="display text-[24px] leading-tight">{s.name}</h3>
                  <p className="text-[14px] text-bone/65 mt-2 leading-relaxed">
                    {s.blurb}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why us (image + points) ===== */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(26,26,23,0.6)]">
              <Image
                src={ABOUT_IMAGE}
                alt="Flagstone patio detail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="lux-eyebrow mb-4">Why Ron&rsquo;s</div>
              <h2 className="display text-[34px] sm:text-[44px] leading-[1.05] max-w-md">
                A yard you don&rsquo;t have to think about.
              </h2>
            </Reveal>
            <div className="mt-12 space-y-9">
              {WHY.map((w, i) => (
                <Reveal key={w.k} delay={i * 80}>
                  <div className="flex gap-6">
                    <div className="display text-[20px] text-clay/80 pt-0.5">
                      {w.k}
                    </div>
                    <div>
                      <h3 className="display text-[22px] leading-tight">
                        {w.title}
                      </h3>
                      <p className="text-[15px] text-ink/65 mt-2 leading-relaxed max-w-md">
                        {w.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Work preview ===== */}
      <section className="bg-[#F3EFE4]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-24">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <Reveal>
              <div className="lux-eyebrow mb-4">Recent work</div>
              <h2 className="display text-[34px] sm:text-[46px] leading-[1.05]">
                Seen around San Antonio.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/work" className="lux-btn-outline">
                Full Gallery
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.slice(0, 4).map((g, i) => (
              <Reveal key={g.title} delay={(i % 4) * 80}>
                <Link
                  href="/work"
                  className="group block relative aspect-[3/4] rounded-xl overflow-hidden"
                >
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-bone/70">
                      {g.category}
                    </div>
                    <div className="display text-bone text-[17px] leading-tight mt-1">
                      {g.title}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] flex items-center overflow-hidden">
          <Image
            src="/images/garden-golden.jpg"
            alt="Golden-hour landscaping"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/60" />
          <div className="relative mx-auto max-w-7xl w-full px-5 lg:px-10 text-center">
            <Reveal>
              <div className="lux-eyebrow text-bone/75 mb-4">
                Free, no-pressure estimate
              </div>
              <h2 className="display text-bone text-[36px] sm:text-[52px] leading-[1.03] max-w-3xl mx-auto">
                Ready to hand off the yard work?
              </h2>
              <div className="mt-9 flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="lux-btn-light">
                  Get a Quote
                </Link>
                <a href={CONTACT.phoneHref} className="lux-btn-ghost">
                  {CONTACT.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
