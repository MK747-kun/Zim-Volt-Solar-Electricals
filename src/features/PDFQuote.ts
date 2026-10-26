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
