/**
 * Vizz Web - Game Development Dedicated Interactive Scripts
 * Page: game-development.html
 * Functionality:
 * 1. Smooth-scrolling lead form triggers with auto input focus.
 * 2. Hero Section inline Read More / Read Less toggle with accessible ARIA management.
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
  const heroDesc1 = document.getElementById('hero-desc-1');
  const heroDesc2 = document.getElementById('hero-desc-2');

  if (heroReadMoreBtn && heroMoreContent && heroDesc1 && heroDesc2) {
    heroReadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = heroReadMoreBtn.getAttribute('aria-expanded') === 'true';
      const textSpan = heroReadMoreBtn.querySelector('.read-more-text');

      if (isExpanded) {
        // Collapse content
        heroDesc1.appendChild(heroReadMoreBtn);
        heroMoreContent.style.display = 'none';
        heroReadMoreBtn.setAttribute('aria-expanded', 'false');
        if (textSpan) textSpan.textContent = 'Read More';
      } else {
        // Expand content
        heroMoreContent.style.display = 'block';
        heroDesc2.appendChild(heroReadMoreBtn);
        heroReadMoreBtn.setAttribute('aria-expanded', 'true');
        if (textSpan) textSpan.textContent = 'Read Less';
      }
    });
  }

  // =========================================================================
  // 3. GAME SERVICES SPLIDE SLIDER (ACTIVE ON BOTH SCREENS)
  // =========================================================================
  const servicesSliderElement = document.getElementById('game-services-slider');
  if (servicesSliderElement && typeof Splide !== 'undefined') {
    try {
      const servicesSplide = new Splide('#game-services-slider', {
        type: 'slide',
        perPage: 3,
        perMove: 1,
        gap: '24px',
        arrows: true,
        pagination: true,
        speed: 500,
        drag: true,
        snap: true,
        flickPower: 400,
        keyboard: true,
        breakpoints: {
          1200: {
            perPage: 3,
            gap: '20px',
          },
          991: {
            perPage: 2,
            gap: '18px',
          },
          640: {
            perPage: 1,
            gap: '14px',
          },
        },
      });

      servicesSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #game-services-slider:', err);
    }
  }
});
