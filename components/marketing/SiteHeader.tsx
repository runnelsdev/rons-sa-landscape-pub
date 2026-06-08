"use client";

import Image from "next/image";
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
    <header className="sticky top-0 z-50 bg-white border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center" aria-label={COMPANY.legalName}>
            <Image
              src="/brand/logo.png"
              alt={COMPANY.legalName}
              width={385}
              height={275}
              priority
              className="h-11 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] hover:text-moss transition-colors ${
                    active ? "text-moss font-semibold" : "text-ink/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href={CONTACT.phoneHref}
              className="text-[15px] font-semibold hover:text-moss"
            >
              {CONTACT.phone}
            </a>
            <Link href="/contact" className="lux-btn">
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 border border-ink/20 rounded-md flex items-center justify-center text-xl"
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10">
          <nav className="mx-auto max-w-6xl px-5 py-4 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[16px] border-b border-ink/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between mt-4">
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
