"use client";

import { useState } from "react";
import { CONTACT, SERVICES } from "@/lib/site";

const inputCls =
  "w-full px-4 py-3 rounded-xl bg-white border border-ink/15 text-[15px] text-ink placeholder:text-ink/35 transition-colors focus:outline-none focus:border-moss focus:ring-2 focus:ring-moss/15";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    service: SERVICES[0].name,
    message: "",
  });

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const mailtoHref =
    `${CONTACT.emailHref}?subject=${encodeURIComponent(
      `Quote request — ${form.service}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nArea: ${form.area}\nService: ${form.service}\n\n${form.message}`
    )}`;

  if (submitted) {
    return (
      <div className="rounded-lg bg-white border border-ink/15 p-8">
        <div className="w-12 h-12 rounded-full bg-moss/10 text-moss flex items-center justify-center text-xl">
          ✓
        </div>
        <h3 className="display text-[28px] leading-tight mt-5">
          Thanks, {form.name || "neighbor"}.
        </h3>
        <p className="text-[15px] text-ink/65 mt-3 leading-relaxed">
          We&rsquo;ll reach out to set up your free estimate — usually within one
          business day. Need us sooner? Call{" "}
          <a href={CONTACT.phoneHref} className="font-semibold text-moss">
            {CONTACT.phone}
          </a>
          .
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={mailtoHref} className="lux-btn">
            Send as Email
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="lux-btn-outline"
          >
            Edit Request
          </button>
        </div>
        <p className="text-[11px] text-slate mt-6">
          Demo form — submissions aren&rsquo;t stored yet. &ldquo;Send as
          Email&rdquo; opens your mail app with the details filled in.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white border border-ink/15 p-7 lg:p-8 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" required>
          <input
            className={inputCls}
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Phone" required>
          <input
            className={inputCls}
            required
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="(210) 555-0123"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email">
          <input
            className={inputCls}
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Neighborhood / area">
          <input
            className={inputCls}
            value={form.area}
            onChange={update("area")}
            placeholder="Stone Oak"
          />
        </Field>
      </div>

      <Field label="What do you need?">
        <select className={inputCls} value={form.service} onChange={update("service")}>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Not sure / multiple">Not sure / multiple</option>
        </select>
      </Field>

      <Field label="Tell us about the property">
        <textarea
          className={`${inputCls} min-h-[120px] resize-y`}
          value={form.message}
          onChange={update("message")}
          placeholder="Lot size, what it looks like now, any specifics…"
        />
      </Field>

      <button type="submit" className="lux-btn w-full py-3.5">
        Request My Free Quote
      </button>
      <p className="text-[11px] text-slate text-center">
        No spam, no obligation. We&rsquo;ll only use this to get back to you.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block mb-2 text-[13px] font-semibold text-ink/75">
        {label}
        {required && <span className="text-clay"> *</span>}
      </span>
      {children}
    </label>
  );
}
