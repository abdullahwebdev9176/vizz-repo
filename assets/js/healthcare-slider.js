/**
 * Vizz Web Solutions - Healthcare Page Script
 * Page: healthcare.html
 * Functionality:
 * 1. Responsive Splide.js slider for healthcare services on mobile & tablet (<= 991px).
 * 2. Smooth-scrolling lead form triggers with auto input focus.
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
  // 2. RESPONSIVE SPLIDE SLIDER (Active <= 991px, Destroyed on Desktop > 991px)
  // =========================================================================
  let servicesSplideInstance = null;

  function handleResponsiveServicesSlider() {
    const isMobileOrTablet = window.innerWidth <= 991;
    const sliderElement = document.getElementById('healthcare-services-slider');

    if (!sliderElement || typeof Splide === 'undefined') {
      return;
    }

    if (isMobileOrTablet) {
      if (!servicesSplideInstance) {
        try {
          // Clean up any stray pagination elements before mounting
          const existingPaginations = sliderElement.querySelectorAll('.splide__pagination');
          existingPaginations.forEach((p) => p.remove());

          servicesSplideInstance = new Splide('#healthcare-services-slider', {
            type: 'slide',
            perPage: 2,
            gap: '20px',
            arrows: false,
            pagination: true,
            speed: 450,
            drag: true,
            snap: true,
            breakpoints: {
              576: {
                perPage: 1,
                gap: '14px',
              },
            },
          });

          servicesSplideInstance.mount();
        } catch (err) {
          console.warn('[Splide] Error mounting healthcare services slider:', err);
        }
      }
    } else {
      if (servicesSplideInstance) {
        try {
          servicesSplideInstance.destroy(true);
        } catch (err) {
          console.warn('[Splide] Error destroying healthcare services slider:', err);
        }
        servicesSplideInstance = null;
      }

      // Clean up stray paginations on desktop
      const strayPaginations = sliderElement.querySelectorAll('.splide__pagination');
      strayPaginations.forEach((p) => p.remove());
    }
  }

  // Initial call
  handleResponsiveServicesSlider();

  // Debounced listener on resize
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResponsiveServicesSlider, 120);
  }, { passive: true });
});
