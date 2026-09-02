/**
 * Vizz Web Solutions - Healthcare Page Script
 * Page: healthcare.html
 * Functionality:
 * 1. Smooth-scrolling lead form triggers with auto input focus.
 * 2. Multi-Slider Manager with Splide.js (Active <= 991px, Destroyed on Desktop > 991px).
 * 3. Accessible Single-Open FAQ Accordion with ARIA state management.
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
  // 2. MULTI-SLIDER RESPONSIVE MANAGER (Active <= 991px, Destroyed on Desktop)
  // =========================================================================
  const sliderSelectors = [
    { selector: '#healthcare-services-slider', perPageTablet: 2, perPageMobile: 1 },
    { selector: '#clinical-workflows-slider', perPageTablet: 1, perPageMobile: 1 },
    { selector: '#operations-deck-slider', perPageTablet: 2, perPageMobile: 1 },
    { selector: '#connected-health-slider', perPageTablet: 2, perPageMobile: 1 },
    { selector: '#development-process-slider', perPageTablet: 2, perPageMobile: 1 },
    { selector: '#health-sectors-slider', perPageTablet: 2, perPageMobile: 1 },
    { selector: '#tech-stack-slider', perPageTablet: 2, perPageMobile: 1 },
    { selector: '#cost-factors-slider', perPageTablet: 2, perPageMobile: 1 },
  ];

  const sliderInstances = new Map();

  function initOrDestroySliders() {
    const isMobileOrTablet = window.innerWidth <= 991;

    if (typeof Splide === 'undefined') {
      return;
    }

    sliderSelectors.forEach((cfg) => {
      const el = document.querySelector(cfg.selector);
      if (!el) return;

      const hasInstance = sliderInstances.has(cfg.selector);

      if (isMobileOrTablet) {
        if (!hasInstance) {
          try {
            // Clean up any stray pagination DOM elements before mounting
            const existingPaginations = el.querySelectorAll('.splide__pagination');
            existingPaginations.forEach((p) => p.remove());

            const splide = new Splide(cfg.selector, {
              type: 'slide',
              perPage: cfg.perPageTablet,
              gap: '20px',
              arrows: false,
              pagination: true,
              speed: 450,
              breakpoints: {
                767: {
                  perPage: cfg.perPageMobile,
                  gap: '16px',
                },
              },
            });

            splide.mount();
            sliderInstances.set(cfg.selector, splide);
          } catch (err) {
            console.warn(`Error initializing slider for ${cfg.selector}:`, err);
          }
        }
      } else {
        if (hasInstance) {
          try {
            const splide = sliderInstances.get(cfg.selector);
            if (splide) {
              splide.destroy(true);
            }
          } catch (err) {
            console.warn(`Error destroying slider for ${cfg.selector}:`, err);
          }
          sliderInstances.delete(cfg.selector);
        }
      }
    });
  }

  // Initial execution
  initOrDestroySliders();

  // Debounced resize handler
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initOrDestroySliders, 150);
  });

  // =========================================================================
  // 3. ACCESSIBLE SINGLE-OPEN FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          if (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked item if it was closed
        if (!isCurrentlyActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});
