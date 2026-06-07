import Link from "next/link";
import { COMPANY, CONTACT, SERVICE_AREA } from "@/lib/site";

export default function SiteFooter() {
  const year = 2026;
  return (
    <footer className="border-t border-ink/10 mt-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="display text-[18px]">{COMPANY.name}</div>
            <p className="text-[14px] text-ink/60 mt-3 leading-relaxed">
              {COMPANY.tagline}
            </p>
          </div>

          <div>
            <div className="text-[12px] uppercase tracking-[0.14em] text-slate mb-3">
              Site
            </div>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/services" className="hover:text-moss">Services</Link></li>
              <li><Link href="/work" className="hover:text-moss">Work</Link></li>
              <li><Link href="/about" className="hover:text-moss">About</Link></li>
              <li><Link href="/contact" className="hover:text-moss">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[12px] uppercase tracking-[0.14em] text-slate mb-3">
              Contact
            </div>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a href={CONTACT.phoneHref} className="font-semibold hover:text-moss">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="hover:text-moss break-all">
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-ink/60">{CONTACT.city}</li>
              <li className="text-ink/50">{CONTACT.hours}</li>
            </ul>
          </div>

          <div>
            <div className="text-[12px] uppercase tracking-[0.14em] text-slate mb-3">
              Service area
            </div>
            <p className="text-[14px] text-ink/60 leading-relaxed">
              {SERVICE_AREA.join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink/10 text-[12px] text-slate">
          © {year} {COMPANY.legalName} · San Antonio, TX
        </div>
      </div>
    </footer>
  );
}
