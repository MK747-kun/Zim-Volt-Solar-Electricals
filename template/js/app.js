// Zim-Volt Core Dynamic Bindings (loads config data into HTML)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG === 'undefined') return;

  // Bind business texts
  document.querySelectorAll('[data-bind="businessName"]').forEach(el => el.textContent = CONFIG.businessName);
  document.querySelectorAll('[data-bind="phoneNumber"]').forEach(el => el.textContent = CONFIG.phoneNumber);
  document.querySelectorAll('[data-bind="physicalAddress"]').forEach(el => el.textContent = CONFIG.physicalAddress);
  document.querySelectorAll('[data-bind="pricingNote"]').forEach(el => el.textContent = CONFIG.pricingNote);

  // Bind phone links
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.href = `tel:${CONFIG.phoneNumber.replace(/\s+/g, '')}`;
  });

  // Bind WhatsApp links
  const defaultWa = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi " + CONFIG.businessName + ", I would like a quote for a solar backup system.")}`;
  document.querySelectorAll('[data-bind="whatsappLink"]').forEach(el => {
    el.href = defaultWa;
  });

  // Render packages if container exists
  const pkgContainer = document.getElementById('packages-container');
  if (pkgContainer && CONFIG.packages) {
    pkgContainer.innerHTML = CONFIG.packages.map(pkg => `
      <div class="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-bold text-white mb-2">${pkg.name}</h3>
          <div class="text-3xl font-black text-amber-400 mb-4">$${pkg.price} <span class="text-xs text-neutral-400 font-normal">USD</span></div>
          <div class="p-3 rounded-lg bg-neutral-950 text-xs text-neutral-300 mb-4">
            <strong class="text-amber-400">Ideal for:</strong> ${pkg.idealFor}
          </div>
          <ul class="space-y-2 text-xs text-neutral-300">
            ${pkg.specs.map(s => `<li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> ${s}</li>`).join('')}
          </ul>
        </div>
        <div class="pt-6">
          <a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi ' + CONFIG.businessName + ', I am interested in the ' + pkg.name + ' ($' + pkg.price + ')')}" 
             target="_blank" 
             class="w-full block text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm">
            Ask About This Package
          </a>
        </div>
      </div>
    `).join('');
  }

  // Init portfolio if available
  if (window.ZimPortfolio) {
    window.ZimPortfolio.init();
  }
});
