# setup_features.ps1
# PowerShell script to inject advanced features into Zim-Volt Solar Electricals

Write-Host "Setting up advanced solar calculator features..." -ForegroundColor Green

# Create features directory if it doesn't exist
$featuresDir = "src/features"
if (!(Test-Path $featuresDir)) {
    New-Item -ItemType Directory -Path $featuresDir -Force | Out-Null
}

# 1. Create ZiG Exchange Rate Utility
$bankRateCode = @'
// src/features/zigRates.ts

export interface ExchangeRateData {
  rate: number;
  lastUpdated: string;
}

// Default fallback bank rate for ZiG
const DEFAULT_ZIG_RATE = 26.50;

export async function fetchCurrentZiGRate(): Promise<ExchangeRateData> {
  try {
    // Fetches live official/interbank rate API if accessible
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (response.ok) {
      const data = await response.json();
      if (data.rates && data.rates.ZWG) {
        return {
          rate: data.rates.ZWG,
          lastUpdated: new Date().toLocaleDateString()
        };
      }
    }
  } catch (error) {
    console.warn('Unable to fetch live ZiG rate, using fallback default.', error);
  }

  return {
    rate: DEFAULT_ZIG_RATE,
    lastUpdated: new Date().toLocaleDateString()
  };
}

export function convertUSDToZiG(usdAmount: number, rate: number): string {
  const totalZiG = usdAmount * rate;
  return new Intl.NumberFormat('en-ZW', {
    style: 'currency',
    currency: 'ZWG',
    maximumFractionDigits: 2
  }).format(totalZiG);
}
'@

Set-Content -Path "src/features/zigRates.ts" -Value $bankRateCode
Write-Host "Created src/features/zigRates.ts (ZiG Exchange Rate Module)" -ForegroundColor Cyan

# 2. Create Solar Calculator Feature Utilities (ROI & Surge Sizing)
$calculatorFeaturesCode = @'
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
'@

Set-Content -Path "src/features/solarEngine.ts" -Value $calculatorFeaturesCode
Write-Host "Created src/features/solarEngine.ts (ROI & Surge Calculations)" -ForegroundColor Cyan

# 3. Create Printable PDF Proposal Component
$pdfGeneratorCode = @'
// src/features/PDFQuote.ts

export function generatePrintableQuote(
  clientName: string,
  location: string,
  recommendedSetup: string,
  usdCost: number,
  zigCost: string,
  paybackYears: number
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Zim-Volt Solar Estimate - ${clientName}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; color: #333; }
        .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px; }
        .title { color: #d97706; font-size: 24px; font-weight: bold; }
        .meta { margin-bottom: 20px; line-height: 1.6; }
        .box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .price { font-size: 20px; color: #059669; font-weight: bold; }
        .footer { margin-top: 40px; font-size: 12px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">⚡ Zim-Volt Solar & Electricals</div>
        <p>Custom Solar Power System Estimate</p>
      </div>
      <div class="meta">
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      <div class="box">
        <h3>Recommended Solution</h3>
        <p>${recommendedSetup}</p>
      </div>
      <div class="box">
        <h3>Financial Summary</h3>
        <p>Estimate (USD): <span class="price">$${usdCost.toLocaleString()}</span></p>
        <p>Estimate (ZiG equivalent): <strong>${zigCost}</strong></p>
        <p>Estimated ROI / Payback Period: <strong>${paybackYears} Years</strong></p>
      </div>
      <div class="footer">
        <p>Zim-Volt Solar & Electricals • Professional Solar Installations & Site Audits</p>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 500);
}
'@

Set-Content -Path "src/features/PDFQuote.ts" -Value $pdfGeneratorCode
Write-Host "Created src/features/PDFQuote.ts (PDF / Print Proposal Generator)" -ForegroundColor Cyan

Write-Host "`nAll feature files created successfully in src/features/!" -ForegroundColor Green
Write-Host "You can now import these helpers into your main calculator UI component." -ForegroundColor Yellow