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
