/**
 * Vizz Web Solutions - Healthcare Page Script
 * Page: healthcare.html
 * Functionality:
 * 1. Responsive Splide.js slider for healthcare services on mobile & tablet (<= 991px).
 * 2. Smooth-scrolling lead form triggers with auto input focus.
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
            breakpoints: {
              767: {
                perPage: 1,
                gap: '16px',
              },
            },
          });

          servicesSplideInstance.mount();
        } catch (err) {
          console.warn('Healthcare services Splide initialization error:', err);
        }
      }
    } else {
      if (servicesSplideInstance) {
        try {
          servicesSplideInstance.destroy(true);
        } catch (err) {
          console.warn('Healthcare services Splide destroy error:', err);
        }
        servicesSplideInstance = null;
      }
    }
  }

  // Initial check
  handleResponsiveServicesSlider();

  // Debounced resize listener
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResponsiveServicesSlider, 150);
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
