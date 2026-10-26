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
