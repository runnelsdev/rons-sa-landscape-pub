import type { Metadata } from "next";
import QuoteForm from "@/components/marketing/QuoteForm";
import Reveal from "@/components/marketing/Reveal";
import { CONTACT, SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Ron's S A Landscape | Free San Antonio Landscaping Quote",
  description:
    "Request a free landscaping or lawn-care quote from Ron's S A Landscape, serving San Antonio and the surrounding Hill Country. Call (210) 668-4924.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-20 lg:pt-28 pb-24">
      <Reveal>
        <div className="lux-eyebrow mb-5">Get in touch</div>
        <h1 className="display text-[46px] sm:text-[62px] leading-[0.98] max-w-3xl">
          Let&rsquo;s get you a quote.
        </h1>
        <p className="text-[17px] text-ink/70 mt-6 max-w-2xl leading-relaxed">
          Tell us about your property and we&rsquo;ll set up a free on-site
          estimate — usually the same week. Prefer to talk? Give us a call.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-14">
        {/* Form */}
        <Reveal className="lg:col-span-7">
          <QuoteForm />
        </Reveal>

        {/* Details */}
        <Reveal className="lg:col-span-5" delay={120}>
          <div className="space-y-6">
            <div className="rounded-2xl bg-white border border-ink/10 p-7 shadow-[0_30px_60px_-46px_rgba(26,26,23,0.5)]">
              <div className="lux-eyebrow text-sage mb-5">Reach us directly</div>
              <ul className="space-y-5">
                <li>
                  <div className="text-[12px] uppercase tracking-[0.14em] text-slate">
                    Phone
                  </div>
                  <a
                    href={CONTACT.phoneHref}
                    className="display text-[26px] hover:text-moss transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <div className="text-[12px] uppercase tracking-[0.14em] text-slate">
                    Email
                  </div>
                  <a
                    href={CONTACT.emailHref}
                    className="text-[16px] hover:text-moss transition-colors break-all"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <div className="text-[12px] uppercase tracking-[0.14em] text-slate">
                    Hours
                  </div>
                  <div className="text-[16px]">{CONTACT.hours}</div>
                </li>
                <li>
                  <div className="text-[12px] uppercase tracking-[0.14em] text-slate">
                    Based in
                  </div>
                  <div className="text-[16px]">{CONTACT.city}</div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#1f3219] text-bone p-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-bone/50 mb-3">
                Service area
              </div>
              <p className="text-[15px] leading-relaxed text-bone/85">
                We serve {SERVICE_AREA.slice(0, -1).join(", ")}, and{" "}
                {SERVICE_AREA[SERVICE_AREA.length - 1]}. Not sure if you&rsquo;re
                in range? Just ask.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
