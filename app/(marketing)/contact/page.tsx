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
    <section className="mx-auto max-w-6xl px-5 lg:px-8 pt-14 lg:pt-20 pb-20">
      <div className="lux-eyebrow mb-4">Get in touch</div>
      <h1 className="display text-[40px] sm:text-[52px] leading-[1.02]">
        Let&rsquo;s get you a quote.
      </h1>
      <p className="text-[17px] text-ink/70 mt-4 max-w-2xl leading-relaxed">
        Tell us about your property and we&rsquo;ll set up a free on-site estimate
        — usually the same week. Prefer to talk? Give us a call.
      </p>

      <div className="grid lg:grid-cols-12 gap-10 mt-12">
        <div className="lg:col-span-7">
          <QuoteForm />
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-lg border border-ink/15 p-7">
            <div className="text-[12px] uppercase tracking-[0.14em] text-slate mb-5">
              Reach us directly
            </div>
            <ul className="space-y-5">
              <li>
                <div className="text-[12px] uppercase tracking-[0.12em] text-slate">
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
                <div className="text-[12px] uppercase tracking-[0.12em] text-slate">
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
                <div className="text-[12px] uppercase tracking-[0.12em] text-slate">
                  Hours
                </div>
                <div className="text-[16px]">{CONTACT.hours}</div>
              </li>
              <li>
                <div className="text-[12px] uppercase tracking-[0.12em] text-slate">
                  Service area
                </div>
                <div className="text-[15px] text-ink/70 leading-relaxed">
                  {SERVICE_AREA.join(", ")}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
