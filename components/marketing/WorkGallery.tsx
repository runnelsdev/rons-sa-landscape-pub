"use client";

import Image from "next/image";
import { useState } from "react";
import { GALLERY, SEGMENTS } from "@/lib/site";

const FILTERS = ["All", ...SEGMENTS.map((s) => s.name)];

export default function WorkGallery() {
  const [active, setActive] = useState("All");
  const items =
    active === "All" ? GALLERY : GALLERY.filter((g) => g.category === active);

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`px-3.5 py-1.5 rounded-md text-[13px] border transition-colors ${
              active === f
                ? "bg-moss text-white border-moss"
                : "border-ink/15 text-ink/70 hover:border-ink/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Uniform grid, captions below */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {items.map((g) => (
          <figure key={g.title}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-cream/40">
              <Image
                src={g.image}
                alt={g.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <div className="text-[12px] uppercase tracking-[0.12em] text-slate">
                {g.category} · {g.area}
              </div>
              <div className="text-[18px] font-semibold mt-1">{g.title}</div>
              <p className="text-[14px] text-ink/60 mt-1">{g.blurb}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
