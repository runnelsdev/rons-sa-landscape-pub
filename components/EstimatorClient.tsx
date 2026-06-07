"use client";

import { useState, useMemo } from "react";
import { estimate } from "@/lib/estimator";
import { EstimateInputs } from "@/lib/types";
import { fmtMoney } from "@/lib/utils";
import Panel from "@/components/Panel";

const DEFAULTS: EstimateInputs = {
  lotSizeSqFt: 8000,
  hasGrass: true,
  hasBeds: true,
  heavyPlanting: false,
  hedgeLinearFt: 40,
  rockYards: 0,
  mulchYards: 4,
  crewSize: 2,
  isFirstTime: true,
  deliveryMiles: 12,
};

const PRESETS = [
  {
    label: "Small lot — turf only",
    values: {
      ...DEFAULTS,
      lotSizeSqFt: 4500,
      hasBeds: false,
      hedgeLinearFt: 0,
      mulchYards: 0,
      isFirstTime: false,
      crewSize: 2,
    },
  },
  {
    label: "Average residential",
    values: DEFAULTS,
  },
  {
    label: "Large estate",
    values: {
      ...DEFAULTS,
      lotSizeSqFt: 20000,
      heavyPlanting: true,
      hedgeLinearFt: 120,
      rockYards: 3,
      mulchYards: 8,
      deliveryMiles: 18,
      crewSize: 3,
    },
  },
  {
    label: "Commercial property",
    values: {
      ...DEFAULTS,
      lotSizeSqFt: 50000,
      hedgeLinearFt: 200,
      mulchYards: 12,
      isFirstTime: false,
      crewSize: 3,
    },
  },
];

export default function EstimatorClient() {
  const [inputs, setInputs] = useState<EstimateInputs>(DEFAULTS);

  const result = useMemo(() => estimate(inputs), [inputs]);

  const update = <K extends keyof EstimateInputs>(
    key: K,
    value: EstimateInputs[K]
  ) => setInputs((p) => ({ ...p, [key]: value }));

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* INPUTS */}
      <div className="lg:col-span-3 space-y-6">
        {/* Presets */}
        <Panel eyebrow="Quick Start" title="Presets">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setInputs(p.values)}
                className="btn btn-secondary"
              >
                {p.label}
              </button>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Property" title="Site Details">
          <div className="space-y-5">
            <Field label={`Lot size: ${inputs.lotSizeSqFt.toLocaleString()} sq ft`}>
              <input
                type="range"
                min={1500}
                max={80000}
                step={500}
                value={inputs.lotSizeSqFt}
                onChange={(e) => update("lotSizeSqFt", +e.target.value)}
                className="w-full accent-moss"
              />
              <div className="mono text-[10px] text-slate flex justify-between mt-1">
                <span>1,500</span>
                <span>80,000</span>
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Toggle
                label="Has grass"
                value={inputs.hasGrass}
                onChange={(v) => update("hasGrass", v)}
              />
              <Toggle
                label="Has beds"
                value={inputs.hasBeds}
                onChange={(v) => update("hasBeds", v)}
              />
              <Toggle
                label="Heavy planting"
                value={inputs.heavyPlanting}
                onChange={(v) => update("heavyPlanting", v)}
              />
              <Toggle
                label="First-time cleanup"
                value={inputs.isFirstTime}
                onChange={(v) => update("isFirstTime", v)}
              />
            </div>

            <Field label={`Hedge linear feet: ${inputs.hedgeLinearFt}`}>
              <input
                type="range"
                min={0}
                max={400}
                value={inputs.hedgeLinearFt}
                onChange={(e) => update("hedgeLinearFt", +e.target.value)}
                className="w-full accent-moss"
              />
            </Field>
          </div>
        </Panel>

        <Panel eyebrow="Materials" title="Hardscape & Beds">
          <div className="grid grid-cols-2 gap-4">
            <Field label={`Rock: ${inputs.rockYards} yd`}>
              <input
                type="number"
                min={0}
                step={0.5}
                value={inputs.rockYards}
                onChange={(e) => update("rockYards", +e.target.value)}
                className="field-input"
              />
            </Field>
            <Field label={`Mulch: ${inputs.mulchYards} yd`}>
              <input
                type="number"
                min={0}
                step={0.5}
                value={inputs.mulchYards}
                onChange={(e) => update("mulchYards", +e.target.value)}
                className="field-input"
              />
            </Field>
            <Field label="Delivery miles (one way)">
              <input
                type="number"
                min={0}
                value={inputs.deliveryMiles}
                onChange={(e) => update("deliveryMiles", +e.target.value)}
                className="field-input"
              />
            </Field>
            <Field label="Crew size">
              <input
                type="number"
                min={1}
                max={5}
                value={inputs.crewSize}
                onChange={(e) => update("crewSize", +e.target.value)}
                className="field-input"
              />
            </Field>
          </div>
        </Panel>
      </div>

      {/* RESULT */}
      <div className="lg:col-span-2">
        <div className="sticky top-6 space-y-5">
          <div className="panel-stamp p-6 bg-moss text-bone">
            <div className="label text-bone/70">Job Total</div>
            <div className="display text-[56px] leading-none mt-2">
              {fmtMoney(result.total)}
            </div>
            <div className="mono text-[11px] text-bone/70 mt-3">
              {result.laborHours.toFixed(1)} man-hours · {(result.laborHours / inputs.crewSize).toFixed(1)} crew-hours
            </div>
          </div>

          <Panel eyebrow="Recurring" title="Maintenance Pricing">
            <div className="text-center py-3">
              <div className="display text-[36px] text-clay">
                {fmtMoney(result.recurringMaintenancePrice)}
              </div>
              <div className="mono text-[10px] uppercase tracking-wider text-slate mt-1">
                per visit (recurring)
              </div>
              <div className="mt-4 pt-4 border-t border-dashed border-ink/20">
                <div className="display text-[28px]">
                  {fmtMoney(result.monthlyValue)}
                  <span className="mono text-[12px] text-slate">/mo</span>
                </div>
                <div className="mono text-[10px] text-slate uppercase tracking-wider mt-1">
                  if weekly service
                </div>
              </div>
            </div>
          </Panel>

          <Panel eyebrow="Math" title="Breakdown" dense>
            <ul className="divide-y divide-ink/10">
              {result.breakdown.map((b, i) => (
                <li
                  key={i}
                  className="px-5 py-3 flex justify-between items-center text-[13px]"
                >
                  <span className="text-slate">{b.label}</span>
                  <span className="mono">{fmtMoney(b.amount)}</span>
                </li>
              ))}
              <li className="px-5 py-3 flex justify-between items-center bg-cream/40">
                <span className="label">Total</span>
                <span className="mono font-bold">{fmtMoney(result.total)}</span>
              </li>
            </ul>
          </Panel>

          <button className="btn w-full justify-center">
            Save as Estimate →
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="label mb-2">{label}</div>
      {children}
    </label>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`p-3 border-[1.5px] border-ink rounded text-left transition ${
        value
          ? "bg-moss text-bone shadow-stamp-sm"
          : "bg-cream/50 hover:bg-cream"
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 border-[1.5px] flex items-center justify-center ${
            value ? "border-bone bg-bone" : "border-ink bg-bone"
          }`}
        >
          {value && <span className="text-moss text-[12px] font-bold leading-none">✓</span>}
        </div>
        <span className="mono text-[11px] uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>
    </button>
  );
}
