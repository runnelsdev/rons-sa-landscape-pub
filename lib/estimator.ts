import { EstimateInputs, EstimateOutput } from "./types";

// Ron's Pricing Logic (encoded from his charts/comps)
//
// Base assumptions for a San Antonio market, 2026:
// - Loaded labor rate: $75/hr per person
// - Mowing productivity: ~5,000 sqft/man-hour for grass-only
// - Beds/landscape add 25% time
// - Heavy planting adds another 35% time
// - Hedge trim: 8 linear ft / man-hour
// - Material delivery: $2.10/mile + $45 base

const RATES = {
  laborRate: 75,                  // $/man-hour
  mowingSqFtPerManHour: 5000,
  bedsTimeMultiplier: 1.25,
  heavyPlantingMultiplier: 1.35,
  hedgeFeetPerManHour: 8,
  rockPricePerYard: 95,           // installed
  mulchPricePerYard: 78,          // installed
  deliveryPerMile: 2.10,
  deliveryBase: 45,
  cleanupOverheadMultiplier: 1.6, // first-time cleanups always take longer
  recurringMargin: 1.45,          // markup on labor for ongoing maintenance
};

export function estimate(inputs: EstimateInputs): EstimateOutput {
  const breakdown: { label: string; amount: number }[] = [];

  // 1. Mowing/turf labor
  let turfHours = 0;
  if (inputs.hasGrass) {
    turfHours = inputs.lotSizeSqFt / RATES.mowingSqFtPerManHour;
  }

  // 2. Bed maintenance multiplier
  if (inputs.hasBeds) {
    turfHours *= RATES.bedsTimeMultiplier;
  }
  if (inputs.heavyPlanting) {
    turfHours *= RATES.heavyPlantingMultiplier;
  }

  // 3. Hedge trim hours
  const hedgeHours = inputs.hedgeLinearFt / RATES.hedgeFeetPerManHour;

  // 4. Total labor hours (man-hours, not crew-hours)
  const totalManHours = turfHours + hedgeHours;
  const crewHours = totalManHours / Math.max(1, inputs.crewSize);
  const laborCost = totalManHours * RATES.laborRate;

  if (turfHours > 0) {
    breakdown.push({
      label: `Mow / turf labor (${turfHours.toFixed(1)} man-hrs)`,
      amount: turfHours * RATES.laborRate,
    });
  }
  if (hedgeHours > 0) {
    breakdown.push({
      label: `Hedge trim (${hedgeHours.toFixed(1)} man-hrs)`,
      amount: hedgeHours * RATES.laborRate,
    });
  }

  // 5. Materials
  const rockCost = inputs.rockYards * RATES.rockPricePerYard;
  const mulchCost = inputs.mulchYards * RATES.mulchPricePerYard;
  const materialsCost = rockCost + mulchCost;

  if (rockCost > 0) breakdown.push({ label: `Rock (${inputs.rockYards} yd)`, amount: rockCost });
  if (mulchCost > 0) breakdown.push({ label: `Mulch (${inputs.mulchYards} yd)`, amount: mulchCost });

  // 6. Delivery
  let deliveryCost = 0;
  if (inputs.rockYards > 0 || inputs.mulchYards > 0) {
    deliveryCost = RATES.deliveryBase + inputs.deliveryMiles * RATES.deliveryPerMile;
    breakdown.push({ label: `Material delivery (${inputs.deliveryMiles} mi)`, amount: deliveryCost });
  }

  // 7. First-time cleanup
  let firstTimeCleanupCost = 0;
  if (inputs.isFirstTime) {
    firstTimeCleanupCost = laborCost * RATES.cleanupOverheadMultiplier;
    breakdown.push({ label: "First-time cleanup overhead (1.6×)", amount: firstTimeCleanupCost - laborCost });
  }

  // 8. Recurring maintenance pricing (per visit, with margin)
  const recurringMaintenancePrice = (turfHours * RATES.laborRate) * RATES.recurringMargin;
  const monthlyValue = recurringMaintenancePrice * 4; // weekly default

  // 9. Total (one-time job total)
  const total = (inputs.isFirstTime ? firstTimeCleanupCost : laborCost) + materialsCost + deliveryCost;

  return {
    laborHours: totalManHours,
    laborCost,
    materialsCost,
    deliveryCost,
    firstTimeCleanupCost,
    recurringMaintenancePrice,
    monthlyValue,
    total,
    breakdown,
  };
}

// Useful for showing "what crew x what time of day" summary
export function crewDaySummary(crewHours: number, crewSize: number) {
  return `${crewSize}-person crew × ${crewHours.toFixed(1)} hrs on site`;
}
