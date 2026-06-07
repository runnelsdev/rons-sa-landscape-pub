import type { Metadata } from "next";
import QuoteForm from "@/components/marketing/QuoteForm";
import { CONTACT, SERVICE_AREA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Ron's S A Landscape | Free San Antonio Landscaping Quote",
  description:
    "Request a free landscaping or lawn-care quote from Ron's S A Landscape, serving San Antonio and the surrounding Hill Country. Call (210) 668-4924.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b-[1.5px] border-ink bg-cream/40">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
          <div className="label mb-3">Get in touch</div>
          <h1 className="display text-[44px] sm:text-[56px] leading-[0.95]">
            Let&rsquo;s get you a quote.
          </h1>
          <p className="text-[16px] text-slate mt-4 max-w-2xl leading-relaxed">
            Tell us about your property and we&rsquo;ll set up a free on-site
            estimate — usually the same week. Prefer to talk? Give us a call.
          </p>
        </div>
      </section>

      {/* Form + details */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="panel-stamp p-7">
              <div className="label mb-4">Reach us directly</div>
              <ul className="space-y-4">
                <li>
                  <div className="mono text-[10px] uppercase tracking-wider text-slate">
                    Phone
                  </div>
                  <a
                    href={CONTACT.phoneHref}
                    className="display text-[24px] hover:text-moss"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <div className="mono text-[10px] uppercase tracking-wider text-slate">
                    Email
                  </div>
                  <a
                    href={CONTACT.emailHref}
                    className="text-[16px] hover:text-moss break-all"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <div className="mono text-[10px] uppercase tracking-wider text-slate">
                    Hours
                  </div>
                  <div className="text-[16px]">{CONTACT.hours}</div>
                </li>
                <li>
                  <div className="mono text-[10px] uppercase tracking-wider text-slate">
                    Based in
                  </div>
                  <div className="text-[16px]">{CONTACT.city}</div>
                </li>
              </ul>
            </div>

            <div className="panel-stamp p-7 bg-moss text-bone">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-bone/70 mb-3">
                Service area
              </div>
              <p className="text-[15px] leading-relaxed text-bone/90">
                We serve {SERVICE_AREA.slice(0, -1).join(", ")}, and{" "}
                {SERVICE_AREA[SERVICE_AREA.length - 1]}. Not sure if you&rsquo;re
                in range? Just ask.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
