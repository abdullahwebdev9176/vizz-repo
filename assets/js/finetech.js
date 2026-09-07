/**
 * Vizz Web Solutions - Fintech Page Dedicated Controller
 * Page: finetech.html
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. SMOOTH SCROLL HANDLER FOR LEAD FORM TRIGGERS
  // =========================================================================
  const leadTriggers = document.querySelectorAll('a[href^="#lead-form"]');

  leadTriggers.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetElement = document.getElementById('lead-form');
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        // Focus first input for enhanced accessibility and conversion
        const firstInput = targetElement.querySelector('input');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 450);
        }
      }
    });
  });

  // =========================================================================
  // 2. HERO SECTION INLINE READ MORE / READ LESS TOGGLE
  // =========================================================================
  const heroReadMoreBtn = document.getElementById('hero-read-more-btn');
  const heroMoreContent = document.getElementById('hero-more-content');

  if (heroReadMoreBtn && heroMoreContent) {
    heroReadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = heroReadMoreBtn.getAttribute('aria-expanded') === 'true';
      const textSpan = heroReadMoreBtn.querySelector('.read-more-text');

      if (isExpanded) {
        heroMoreContent.style.display = 'none';
        heroReadMoreBtn.setAttribute('aria-expanded', 'false');
        if (textSpan) textSpan.textContent = 'Read More';
      } else {
        heroMoreContent.style.display = 'block';
        heroReadMoreBtn.setAttribute('aria-expanded', 'true');
        if (textSpan) textSpan.textContent = 'Read Less';
      }
    });
  }
});
