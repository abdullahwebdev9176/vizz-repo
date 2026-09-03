/**
 * Vizz Web Solutions - Healthcare Page Dedicated Responsive Sliders & Scripts
 * Page: healthcare.html
 * Functionality:
 * 1. Auto-moving showcase cards slider (#showcase-cards-slider) showing 2 cards at a time with autoplay loop.
 * 2. Activates Splide.js sliders on mobile & tablet (<= 991px) for grid sections.
 * 3. Automatically destroys responsive sliders on desktop (> 991px) to preserve native CSS grids.
 * 4. Smooth-scrolling lead form triggers with auto input focus.
 * 5. Accessible Single-Open FAQ Accordion with ARIA state management.
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
  // 2. AUTO-MOVING SHOWCASE CARDS SLIDERS (2 Cards at a time, Autoplays Loop)
  // =========================================================================
  const autoMovingSliders = ['showcase-cards-slider', 'clinical-showcase-slider'];

  autoMovingSliders.forEach((sliderId) => {
    const sliderEl = document.getElementById(sliderId);
    if (sliderEl && typeof Splide !== 'undefined') {
      try {
        const splideInstance = new Splide(`#${sliderId}`, {
          type: 'loop',
          perPage: 3,
          perMove: 1,
          gap: '28px',
          arrows: false,
          pagination: true,
          autoplay: true,
          interval: 3200,
          speed: 800,
          pauseOnHover: true,
          pauseOnFocus: true,
          drag: true,
          breakpoints: {
            991: {
              perPage: 2,
              gap: '20px',
            },
            767: {
              perPage: 1,
              gap: '16px',
            },
          },
        });

        splideInstance.mount();
      } catch (err) {
        console.warn(`[Splide] Error mounting #${sliderId}:`, err);
      }
    }
  });

  // =========================================================================
  // 3. MULTI-SLIDER RESPONSIVE MANAGER (Active <= 991px, Destroyed on Desktop)
  // =========================================================================
  const sliderConfigs = [
    {
      id: 'clinical-workflows-slider',
      perPageTablet: 1,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'operations-deck-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'connected-health-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'development-process-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'health-sectors-slider',
      perPageTablet: 3,
      perPageMobile: 2,
      gapTablet: '16px',
      gapMobile: '12px',
      extraBreakpoints: {
        576: {
          perPage: 1,
          gap: '12px',
        },
      },
    },
    {
      id: 'tech-stack-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '18px',
      gapMobile: '14px',
    },
    {
      id: 'cost-factors-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
  ];

  // Map to hold active Splide instances
  const activeSplideInstances = {};

  /**
   * Initializes or destroys sliders based on current viewport width
   */
  function handleResponsiveSliders() {
    const isMobileOrTablet = window.innerWidth <= 991;

    sliderConfigs.forEach((config) => {
      const sliderElement = document.getElementById(config.id);
      if (!sliderElement || typeof Splide === 'undefined') {
        return;
      }

      if (isMobileOrTablet) {
        // Mount Splide if not already active
        if (!activeSplideInstances[config.id]) {
          try {
            // Remove any leftover duplicate pagination elements before mounting
            const existingPaginations = sliderElement.querySelectorAll('.splide__pagination');
            existingPaginations.forEach((p) => p.remove());

            const breakpointsConfig = {
              767: {
                perPage: config.perPageMobile,
                gap: config.gapMobile,
              },
            };

            if (config.extraBreakpoints) {
              Object.assign(breakpointsConfig, config.extraBreakpoints);
            }

            const splideInstance = new Splide(`#${config.id}`, {
              type: 'slide',
              perPage: config.perPageTablet,
              gap: config.gapTablet,
              arrows: false,
              pagination: true,
              speed: 450,
              drag: true,
              snap: true,
              flickPower: 400,
              keyboard: false,
              breakpoints: breakpointsConfig,
            });

            splideInstance.mount();
            activeSplideInstances[config.id] = splideInstance;
          } catch (err) {
            console.warn(`[Splide] Error mounting slider #${config.id}:`, err);
          }
        }
      } else {
        // Destroy Splide if active on desktop > 991px
        if (activeSplideInstances[config.id]) {
          try {
            activeSplideInstances[config.id].destroy(true);
          } catch (err) {
            console.warn(`[Splide] Error destroying slider #${config.id}:`, err);
          }
          delete activeSplideInstances[config.id];
        }

        // Clean up any remaining pagination elements on desktop
        const strayPaginations = sliderElement.querySelectorAll('.splide__pagination');
        strayPaginations.forEach((p) => p.remove());
      }
    });
  }

  // Initial execution on DOM ready
  handleResponsiveSliders();

  // Debounced listener on window resize & orientationchange
  let resizeTimer = null;
  const onWindowResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResponsiveSliders, 120);
  };

  window.addEventListener('resize', onWindowResize, { passive: true });
  window.addEventListener('orientationchange', onWindowResize, { passive: true });

  // =========================================================================
  // 4. ACCESSIBLE SINGLE-OPEN FAQ ACCORDION
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
