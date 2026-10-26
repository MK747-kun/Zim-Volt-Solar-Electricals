// Zim-Volt Portfolio Filter and Lightbox Engine
window.ZimPortfolio = (function () {
  function init() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('[data-category]');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter');
        filterButtons.forEach((b) => b.classList.remove('active', 'bg-amber-400', 'text-neutral-950'));
        btn.classList.add('active', 'bg-amber-400', 'text-neutral-950');

        cards.forEach((card) => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  return { init };
})();
