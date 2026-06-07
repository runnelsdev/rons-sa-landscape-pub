"use client";

import Image from "next/image";
import { useState } from "react";
import { GALLERY, SEGMENTS, type GalleryItem } from "@/lib/site";

const FILTERS = ["All", ...SEGMENTS.map((s) => s.name)];

function Card({ g, featured = false }: { g: GalleryItem; featured?: boolean }) {
  return (
    <figure className="group relative h-full w-full rounded-2xl overflow-hidden">
      <Image
        src={g.image}
        alt={g.title}
        fill
        sizes={
          featured
            ? "(max-width: 640px) 100vw, 50vw"
            : "(max-width: 640px) 50vw, 25vw"
        }
        className="object-cover img-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <figcaption className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
        <div className="text-[11px] uppercase tracking-[0.18em] text-bone/75">
          {g.category} · {g.area}
        </div>
        <div
          className={`display text-bone leading-tight mt-1.5 ${
            featured ? "text-[26px] lg:text-[32px]" : "text-[19px]"
          }`}
        >
          {g.title}
        </div>
        <p className="text-[13px] text-bone/0 group-hover:text-bone/85 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 mt-0 group-hover:mt-2">
          {g.blurb}
        </p>
      </figcaption>
    </figure>
  );
}

export default function WorkGallery() {
  const [active, setActive] = useState("All");
  const items =
    active === "All" ? GALLERY : GALLERY.filter((g) => g.category === active);
  const isAll = active === "All";

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
              active === f
                ? "bg-moss text-bone border-moss"
                : "bg-transparent text-ink/70 border-ink/15 hover:border-ink/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid: asymmetric mosaic for "All", clean uniform grid when filtered */}
      {isAll ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[168px] lg:auto-rows-[240px] gap-4">
          {items.map((g, i) => {
            const span =
              i === 0 ? "col-span-2 row-span-2" : i === 5 ? "col-span-2" : "";
            return (
              <div key={g.title} className={`${span} h-full`}>
                <Card g={g} featured={i === 0} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px] lg:auto-rows-[300px]">
          {items.map((g) => (
            <div key={g.title} className="h-full">
              <Card g={g} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
