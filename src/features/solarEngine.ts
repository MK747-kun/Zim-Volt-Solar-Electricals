export interface Appliance {
  id: string;
  name: string;
  category?: string;
  runningWatts: number;
  surgeMultiplier: number;
  isInductive: boolean;
}

export function checkMotorSurge(appliances: Appliance[]) {
  const heavyItems = appliances.filter(
    (item) => item.isInductive || item.surgeMultiplier >= 3
  );

  return {
    hasHeavySurge: heavyItems.length > 0,
    items: heavyItems,
    recommendation: heavyItems.length > 0
      ? 'Inductive motor surge detected (borehole/booster pump). Ensure inverter supports 2x peak surge.'
      : 'Standard continuous loads.'
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
