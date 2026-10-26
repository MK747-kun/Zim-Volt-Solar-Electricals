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
