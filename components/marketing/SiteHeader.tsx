"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { COMPANY, CONTACT } from "@/lib/site";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-bone/95 backdrop-blur border-b-[1.5px] border-ink">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="flex items-center justify-between h-[68px] gap-4">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <span className="w-10 h-10 bg-moss border-[1.5px] border-ink flex items-center justify-center text-bone font-display text-xl shadow-stamp-sm">
                R
              </span>
              <span>
                <span className="display text-[19px] leading-none block">
                  {COMPANY.name}
                </span>
                <span className="mono text-[9px] tracking-[0.18em] text-slate uppercase block mt-1">
                  San Antonio, TX
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 mono text-[12px] font-semibold uppercase tracking-[0.06em] border-[1.5px] rounded-[3px] transition-colors ${
                      active
                        ? "border-ink bg-cream"
                        : "border-transparent hover:border-ink hover:bg-cream/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <a
                href={CONTACT.phoneHref}
                className="mono text-[13px] font-semibold hover:text-moss"
              >
                {CONTACT.phone}
              </a>
              <Link href="/contact" className="btn btn-clay">
                Get a Quote
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 border-[1.5px] border-ink rounded-[3px] bg-cream flex items-center justify-center mono text-lg shadow-stamp-sm"
            >
              {open ? "✕" : "≡"}
            </button>
          </div>
        </div>
      </div>
      <div className="ticker-stripe" />

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bone border-b-[1.5px] border-ink">
          <nav className="mx-auto max-w-6xl px-5 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-3 mono text-[13px] font-semibold uppercase tracking-[0.06em] border-[1.5px] rounded-[3px] ${
                  pathname === item.href
                    ? "border-ink bg-cream"
                    : "border-transparent"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-dashed border-ink/30">
              <a
                href={CONTACT.phoneHref}
                className="mono text-[14px] font-semibold"
              >
                {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-clay"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
