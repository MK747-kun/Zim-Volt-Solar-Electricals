<#
.SYNOPSIS
  Fixes TypeScript export and casing mismatches across Zim-Volt feature files.
#>

$ErrorActionPreference = "Stop"

Write-Host "Fixing Zim-Volt Solar Features codebase..." -ForegroundColor Cyan

# NOTE: single-quoted here-strings (@' ... '@) are written literally,
# so backticks and ${...} in the TypeScript are preserved.

# 1. src/features/solarEngine.ts
$solarEngineContent = @'
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
'@

# 2. src/features/zigRates.ts
$zigRatesContent = @'
const FALLBACK_ZWG_RATE = 26.58;

export async function fetchZiGRate(): Promise<number> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    return data.rates?.ZWG || data.rates?.ZIG || FALLBACK_ZWG_RATE;
  } catch (err) {
    console.warn('Using fallback ZiG rate:', FALLBACK_ZWG_RATE);
    return FALLBACK_ZWG_RATE;
  }
}

export function convertUsdToZig(usdAmount: number, rate: number = FALLBACK_ZWG_RATE): number {
  return Math.round(usdAmount * rate);
}
'@

# 3. src/features/PDFQuote.ts
$pdfQuoteContent = @'
export interface QuoteData {
  clientName?: string;
  location?: string;
  selectedLoadSummary: string;
  recommendedSetup: string;
  totalUsd: number;
  totalZig: number;
}

export function generatePdfQuote(data: QuoteData): void {
  const content = `
==================================================
        ZIM-VOLT SOLAR & ELECTRICALS
    Official Solar System Estimation Quote
==================================================

Client Location : ${data.location || 'Norton, Zimbabwe'}
Date            : ${new Date().toLocaleDateString()}

[SELECTED LOADS]
${data.selectedLoadSummary}

[RECOMMENDED SYSTEM SETUP]
${data.recommendedSetup}

[ESTIMATED PRICING]
USD Total       : $${data.totalUsd.toLocaleString()} USD
ZiG Total       : ZiG ${data.totalZig.toLocaleString()} (RBZ Interbank Rate)

--------------------------------------------------
Contact Zim-Volt for a free site visit & quotation.
==================================================
  `.trim();

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ZimVolt_Solar_Quote_${Date.now()}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}
'@

# Ensure destination folder exists
if (-not (Test-Path -Path "src/features")) {
    New-Item -ItemType Directory -Path "src/features" -Force | Out-Null
}

# Write files
Set-Content -Path "src/features/solarEngine.ts" -Value $solarEngineContent -Encoding UTF8
Set-Content -Path "src/features/zigRates.ts" -Value $zigRatesContent -Encoding UTF8
Set-Content -Path "src/features/PDFQuote.ts" -Value $pdfQuoteContent -Encoding UTF8

Write-Host "Files in src/features/ updated successfully!" -ForegroundColor Green
