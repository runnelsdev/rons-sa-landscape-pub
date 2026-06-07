"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FBFAF7]/90 backdrop-blur-md border-b border-ink/10 shadow-[0_10px_40px_-28px_rgba(26,26,23,0.7)]"
          : "bg-[#FBFAF7]/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex items-center justify-between h-[76px] gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <span className="w-9 h-9 rounded-md bg-moss text-bone flex items-center justify-center display text-lg">
              R
            </span>
            <span className="leading-none">
              <span className="display text-[20px] tracking-tight block">
                {COMPANY.name}
              </span>
              <span className="lux-eyebrow text-[9px] block mt-1 text-slate">
                San Antonio, TX
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[15px] font-medium transition-colors hover:text-moss ${
                    active ? "text-moss" : "text-ink/80"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-moss transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <a
              href={CONTACT.phoneHref}
              className="text-[15px] font-semibold hover:text-moss transition-colors"
            >
              {CONTACT.phone}
            </a>
            <Link href="/contact" className="lux-btn">
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 rounded-md border border-ink/20 flex items-center justify-center text-xl"
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FBFAF7] border-b border-ink/10">
          <nav className="mx-auto max-w-7xl px-5 py-5 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-[16px] font-medium border-b border-ink/5 ${
                  pathname === item.href ? "text-moss" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-3 mt-4">
              <a href={CONTACT.phoneHref} className="text-[16px] font-semibold">
                {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="lux-btn"
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
