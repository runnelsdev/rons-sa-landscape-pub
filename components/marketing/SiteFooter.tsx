import Link from "next/link";
import { COMPANY, CONTACT, SERVICE_AREA, SERVICES } from "@/lib/site";

export default function SiteFooter() {
  const year = 2026;
  return (
    <footer className="border-t-[1.5px] border-ink bg-cream/40 mt-24">
      <div className="ticker-stripe" />
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 bg-moss border-[1.5px] border-ink flex items-center justify-center text-bone font-display text-xl shadow-stamp-sm">
                R
              </span>
              <span className="display text-[19px] leading-none">
                {COMPANY.name}
              </span>
            </div>
            <p className="text-[14px] text-slate mt-4 leading-relaxed">
              {COMPANY.tagline} Family-run and rooted in San Antonio.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="label mb-4">Services</div>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-[14px] hover:text-moss"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="label mb-4">Company</div>
            <ul className="space-y-2">
              <li>
                <Link href="/work" className="text-[14px] hover:text-moss">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[14px] hover:text-moss">
                  About Ron&rsquo;s
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[14px] hover:text-moss">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[14px] hover:text-moss">
                  Crew / Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="label mb-4">Get in touch</div>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-moss font-semibold">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="hover:text-moss">
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-slate">{CONTACT.city}</li>
              <li className="mono text-[12px] text-slate pt-1">{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        {/* Service area */}
        <div className="mt-12 pt-6 border-t border-dashed border-ink/30">
          <div className="label mb-3">Service Area</div>
          <div className="flex flex-wrap gap-2">
            {SERVICE_AREA.map((a) => (
              <span key={a} className="chip chip-neutral">
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="mono text-[11px] text-slate">
            © {year} {COMPANY.legalName} · San Antonio, TX
          </div>
          <div className="mono text-[11px] text-slate">
            Lawn · Landscape · Hardscape · Irrigation
          </div>
        </div>
      </div>
    </footer>
  );
}
