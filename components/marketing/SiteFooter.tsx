import Link from "next/link";
import { COMPANY, CONTACT, SERVICE_AREA, SERVICES } from "@/lib/site";

const eyebrow =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-bone/45";

export default function SiteFooter() {
  const year = 2026;
  return (
    <footer className="bg-[#1f3219] text-bone">
      {/* CTA band */}
      <div className="border-b border-bone/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="display text-[30px] sm:text-[38px] leading-[1.05]">
              Let&rsquo;s make your yard the best on the block.
            </h2>
            <p className="text-bone/60 mt-2 text-[15px]">
              Free, no-pressure estimates across {CONTACT.city.split(",")[0]} &amp; the Hill Country.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/contact" className="lux-btn-light">
              Get a Quote
            </Link>
            <a href={CONTACT.phoneHref} className="lux-btn-ghost">
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-md bg-bone text-[#1f3219] flex items-center justify-center display text-lg">
                R
              </span>
              <span className="display text-[20px]">{COMPANY.name}</span>
            </div>
            <p className="text-[14px] text-bone/60 mt-4 leading-relaxed">
              {COMPANY.tagline} Family-run and rooted in San Antonio.
            </p>
          </div>

          <div>
            <div className={eyebrow + " mb-4"}>Services</div>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-[14px] text-bone/75 hover:text-bone transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={eyebrow + " mb-4"}>Company</div>
            <ul className="space-y-2.5">
              {[
                { href: "/work", label: "Our Work" },
                { href: "/about", label: "About Ron’s" },
                { href: "/contact", label: "Get a Quote" },
                { href: "/dashboard", label: "Crew / Client Portal" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-bone/75 hover:text-bone transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={eyebrow + " mb-4"}>Get in touch</div>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-bone hover:text-bone/80 font-semibold transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="text-bone/75 hover:text-bone transition-colors break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-bone/60">{CONTACT.city}</li>
              <li className="text-bone/50 text-[13px] pt-1">{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        {/* Service area */}
        <div className="mt-14 pt-8 border-t border-bone/10">
          <div className={eyebrow + " mb-3"}>Proudly serving</div>
          <p className="text-[15px] text-bone/70 max-w-3xl leading-relaxed">
            {SERVICE_AREA.join(" · ")}
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-bone/45">
          <div>© {year} {COMPANY.legalName} · San Antonio, TX</div>
          <div>Lawn · Landscape · Hardscape · Irrigation</div>
        </div>
      </div>
    </footer>
  );
}
