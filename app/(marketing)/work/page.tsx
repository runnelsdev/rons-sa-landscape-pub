import type { Metadata } from "next";
import Link from "next/link";
import WorkGallery from "@/components/marketing/WorkGallery";
import { SERVICE_AREA, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work — Ron's S A Landscape | San Antonio Project Gallery",
  description:
    "Recent Ron's S A Landscape projects across San Antonio — residential, commercial, HOA, and multi-family.",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 lg:px-8 pt-14 lg:pt-20 pb-8">
        <div className="lux-eyebrow mb-4">Recent projects</div>
        <h1 className="display text-[40px] sm:text-[52px] leading-[1.02]">
          Our work
        </h1>
        <p className="text-[17px] text-ink/70 mt-4 max-w-2xl leading-relaxed">
          A sampling of recent jobs across the San Antonio area. Filter by
          property type below.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 lg:px-8 pb-8">
        <WorkGallery />
        <p className="text-[13px] text-slate mt-10">
          Photography is representative — real Ron&rsquo;s S A Landscape jobs
          across {SERVICE_AREA.slice(0, 4).join(", ")} &amp; more coming soon.
        </p>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 text-center">
          <h2 className="display text-[30px] sm:text-[38px]">
            Want yours on this page?
          </h2>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="lux-btn">
              Start a Project
            </Link>
            <a href={CONTACT.phoneHref} className="lux-btn-outline">
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
