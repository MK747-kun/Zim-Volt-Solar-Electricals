// src/features/solarEngine.ts

export interface Appliance {
  id: string;
  name: string;
  category: string;
  runningWatts: number;
  surgeMultiplier: number; // e.g. 3x for inductive loads like borehole pumps
  isInductive: boolean;
}

export interface SystemRecommendation {
  inverterKw: number;
  batteryKwh: number;
  panelKw: number;
  estimatedUsdCost: number;
  paybackYears: number;
  hasHeavySurge: boolean;
  totalSurgeWatts: number;
}

export function calculateSurgeAndSizing(selectedAppliances: Appliance[]): {
  totalRunningWatts: number;
  totalSurgeWatts: number;
  hasHeavySurge: boolean;
} {
  let totalRunningWatts = 0;
  let totalSurgeWatts = 0;
  let hasHeavySurge = false;

  selectedAppliances.forEach((item) => {
    totalRunningWatts += item.runningWatts;
    const itemSurge = item.runningWatts * item.surgeMultiplier;
    totalSurgeWatts += itemSurge;

    if (item.isInductive || item.surgeMultiplier >= 3) {
      hasHeavySurge = true;
    }
  });

  return {
    totalRunningWatts,
    totalSurgeWatts,
    hasHeavySurge
  };
}

export function calculateFinancialROI(
  monthlyZesaSpendUSD: number,
  monthlyGeneratorFuelUSD: number,
  systemCostUSD: number
): number {
  const monthlySavings = monthlyZesaSpendUSD + monthlyGeneratorFuelUSD;
  if (monthlySavings <= 0) return 0;

  const annualSavings = monthlySavings * 12;
  const paybackPeriodYears = systemCostUSD / annualSavings;
  return parseFloat(paybackPeriodYears.toFixed(1));
}
