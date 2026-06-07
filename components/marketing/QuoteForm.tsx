"use client";

import { useState } from "react";
import { CONTACT, SERVICES } from "@/lib/site";

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
      <div className="panel-stamp p-8 bg-moss/5 border-l-[6px] border-moss">
        <div className="label text-moss">Request received</div>
        <h3 className="display text-[26px] leading-tight mt-2">
          Thanks, {form.name || "neighbor"}.
        </h3>
        <p className="text-[15px] text-slate mt-3 leading-relaxed">
          We&rsquo;ll reach out to set up your free estimate — usually within one
          business day. Need us sooner? Call{" "}
          <a href={CONTACT.phoneHref} className="font-semibold hover:text-moss">
            {CONTACT.phone}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={mailtoHref} className="btn btn-clay">
            Send as Email
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="btn btn-secondary"
          >
            Edit Request
          </button>
        </div>
        <p className="mono text-[10px] text-slate mt-5">
          Demo form — submissions aren&rsquo;t stored. &ldquo;Send as Email&rdquo;
          opens your mail app with the details filled in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="panel-stamp p-7 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" required>
          <input
            className="field-input"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Phone" required>
          <input
            className="field-input"
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
            className="field-input"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Neighborhood / area">
          <input
            className="field-input"
            value={form.area}
            onChange={update("area")}
            placeholder="Stone Oak"
          />
        </Field>
      </div>

      <Field label="What do you need?">
        <select className="field-input" value={form.service} onChange={update("service")}>
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
          className="field-input min-h-[120px] resize-y"
          value={form.message}
          onChange={update("message")}
          placeholder="Lot size, what it looks like now, any specifics…"
        />
      </Field>

      <button type="submit" className="btn btn-clay w-full justify-center py-3">
        Request My Free Quote
      </button>
      <p className="mono text-[10px] text-slate text-center">
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
      <span className="label block mb-2">
        {label}
        {required && <span className="text-clay"> *</span>}
      </span>
      {children}
    </label>
  );
}
