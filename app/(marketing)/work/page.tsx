import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work — Ron's Landscape | San Antonio Project Gallery",
  description:
    "A look at recent Ron's Landscape projects across San Antonio — lawn transformations, installs, hardscape, and irrigation.",
};

type Project = {
  title: string;
  category: string;
  area: string;
  blurb: string;
  // tailwind gradient classes for the placeholder "photo"
  swatch: string;
};

const projects: Project[] = [
  {
    title: "Front-yard reset & sod",
    category: "Installation",
    area: "Alamo Heights",
    blurb: "Tired turf out, fresh sod and crisp steel edging in.",
    swatch: "from-moss to-sage",
  },
  {
    title: "Flagstone patio & seat wall",
    category: "Hardscape",
    area: "Stone Oak",
    blurb: "A shaded gathering space built to last in Hill Country soil.",
    swatch: "from-bark to-rust",
  },
  {
    title: "Weekly maintenance route",
    category: "Maintenance",
    area: "Helotes",
    blurb: "Same crew, same day — sharp lines every single visit.",
    swatch: "from-sage to-moss",
  },
  {
    title: "Drip irrigation retrofit",
    category: "Irrigation",
    area: "Boerne",
    blurb: "SAWS-smart zones that cut water use without losing green.",
    swatch: "from-moss to-bark",
  },
  {
    title: "Overgrown lot cleanup",
    category: "Cleanups",
    area: "Schertz",
    blurb: "Neglected to neat in a single push — then on a plan.",
    swatch: "from-clay to-sun",
  },
  {
    title: "Native bed & mulch refresh",
    category: "Mulch & Rock",
    area: "New Braunfels",
    blurb: "Texas-native plantings with clean hardwood-mulch beds.",
    swatch: "from-sage to-sun",
  },
  {
    title: "Backyard regrade & turf",
    category: "Installation",
    area: "San Antonio",
    blurb: "Fixed drainage, leveled, and laid for a usable lawn.",
    swatch: "from-moss to-sage",
  },
  {
    title: "Decorative river-rock borders",
    category: "Hardscape",
    area: "Stone Oak",
    blurb: "Low-maintenance rock lines that frame the whole yard.",
    swatch: "from-bark to-sage",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b-[1.5px] border-ink bg-cream/40">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
          <div className="label mb-3">Recent projects</div>
          <h1 className="display text-[44px] sm:text-[56px] leading-[0.95]">
            Our Work
          </h1>
          <p className="text-[16px] text-slate mt-4 max-w-2xl leading-relaxed">
            A sampling of recent jobs across the San Antonio area — maintenance
            routes, installs, hardscape, and cleanups. Every property is
            different; the standard isn&rsquo;t.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article key={p.title} className="panel-stamp overflow-hidden">
              {/* Placeholder "photo" */}
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${p.swatch} border-b-[1.5px] border-ink`}
              >
                <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(45deg,#1A1A17_0,#1A1A17_1px,transparent_1px,transparent_10px)]" />
                <span className="absolute top-3 left-3 chip chip-neutral">
                  {p.category}
                </span>
                <span className="absolute bottom-3 right-3 mono text-[10px] uppercase tracking-[0.18em] text-bone/80">
                  Ron&rsquo;s Landscape
                </span>
              </div>
              <div className="p-5">
                <div className="mono text-[11px] uppercase tracking-wider text-slate">
                  {p.area}
                </div>
                <h2 className="display text-[20px] leading-tight mt-1">
                  {p.title}
                </h2>
                <p className="text-[13px] text-slate mt-2 leading-relaxed">
                  {p.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mono text-[11px] text-slate mt-8 text-center">
          Photography coming soon — these are representative project types across{" "}
          {SERVICE_AREA.slice(0, 4).join(", ")} &amp; more.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 pb-20">
        <div className="panel-stamp bg-ink text-bone p-10 lg:p-14 text-center">
          <h2 className="display text-[32px] sm:text-[40px] leading-tight">
            Want yours on this page?
          </h2>
          <p className="text-[15px] text-bone/70 mt-4 max-w-lg mx-auto">
            Let&rsquo;s talk about your property and what it could be.
          </p>
          <Link href="/contact" className="btn btn-clay mt-7">
            Start a Project
          </Link>
        </div>
      </section>
    </>
  );
}
