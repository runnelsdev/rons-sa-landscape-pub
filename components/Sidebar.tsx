"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Yard Office", icon: "◆" },
  { href: "/dashboard/clients", label: "Clients", icon: "◌" },
  { href: "/dashboard/work-orders", label: "Work Orders", icon: "◳" },
  { href: "/dashboard/contracts", label: "Contracts", icon: "≡" },
  { href: "/dashboard/estimator", label: "Estimator", icon: "$" },
  { href: "/dashboard/routes", label: "Routes", icon: "→" },
  { href: "/dashboard/equipment", label: "Equipment", icon: "▲" },
  { href: "/dashboard/crew", label: "Crew", icon: "✦" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] shrink-0 border-r-[1.5px] border-ink bg-cream/50 flex flex-col">
      {/* Brand mark — links back to the public site */}
      <Link
        href="/"
        className="block px-5 py-6 border-b-[1.5px] border-ink hover:bg-cream/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-moss border-[1.5px] border-ink flex items-center justify-center text-bone font-display text-xl shadow-stamp-sm">
            R
          </div>
          <div>
            <div className="display text-[18px] leading-none">Ron&rsquo;s</div>
            <div className="mono text-[10px] tracking-[0.18em] text-slate uppercase mt-1">
              Landscape · OS
            </div>
          </div>
        </div>
      </Link>

      <div className="ticker-stripe" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <div className="label px-2 mb-2">Operations</div>
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? "nav-link-active" : ""}`}
            >
              <span className="font-mono text-[14px] w-4">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / status */}
      <div className="border-t-[1.5px] border-ink px-5 py-4 bg-bone">
        <div className="label">System Status</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-moss animate-pulse" />
          <span className="mono text-[11px] text-ink">All systems nominal</span>
        </div>
        <div className="mono text-[10px] text-slate mt-3">
          v0.1.0 &middot; San Antonio HQ
        </div>
      </div>
    </aside>
  );
}
