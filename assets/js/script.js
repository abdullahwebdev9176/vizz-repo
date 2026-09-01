/**
 * Vizz Web - Custom Web Development
 * Interactive Script: FAQ Accordion & Form Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion Logic
  const faqButtons = document.querySelectorAll('.faq-question-btn');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.closest('.faq-item');
      const isCurrentlyActive = faqItem.classList.contains('active');

      // Close all other FAQ items for a clean single-open accordion
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const btn = item.querySelector('.faq-question-btn');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
        }
      });

      // If clicked item was closed, open it
      if (!isCurrentlyActive) {
        faqItem.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Smooth scroll handler for all lead form triggers
  const leadTriggers = document.querySelectorAll('a[href^="#lead-form"]');
  leadTriggers.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetElement = document.getElementById('lead-form');
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        // Focus first input for enhanced accessibility and conversion
        const firstInput = targetElement.querySelector('input');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 600);
        }
      }
    });
  });

  // =========================================================================
  // RESPONSIVE SPLIDE SLIDERS (ACTIVE <= 991px, DESTROYED ON DESKTOP > 991px)
  // =========================================================================
  let techSplide = null;
  let industriesSplide = null;

  function initResponsiveSplides() {
    const isMobileOrTablet = window.innerWidth <= 991;

    // 1. Tech Stack Slider (Under 991px: 2 cards; <= 576px: 1 card)
    const techEl = document.getElementById('tech-stack-slider');
    if (techEl && typeof Splide !== 'undefined') {
      if (isMobileOrTablet) {
        if (!techSplide) {
          techSplide = new Splide('#tech-stack-slider', {
            type: 'slide',
            perPage: 2,
            gap: '20px',
            arrows: false,
            pagination: true,
            speed: 500,
            breakpoints: {
              576: {
                perPage: 1,
                gap: '14px',
              }
            }
          });
          techSplide.mount();
        }
      } else {
        if (techSplide) {
          techSplide.destroy();
          techSplide = null;
        }
      }
    }

    // 2. Canadian Industries Slider (Under 991px: 2 cards; <= 576px: 1 card)
    const industriesEl = document.getElementById('industries-slider');
    if (industriesEl && typeof Splide !== 'undefined') {
      if (isMobileOrTablet) {
        if (!industriesSplide) {
          industriesSplide = new Splide('#industries-slider', {
            type: 'slide',
            perPage: 2,
            gap: '20px',
            arrows: false,
            pagination: true,
            speed: 500,
            breakpoints: {
              576: {
                perPage: 1,
                gap: '14px',
              }
            }
          });
          industriesSplide.mount();
        }
      } else {
        if (industriesSplide) {
          industriesSplide.destroy();
          industriesSplide = null;
        }
      }
    }
  }

  // Initial call on DOM ready
  initResponsiveSplides();

  // Re-check and toggle on window resize with debounce
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initResponsiveSplides, 150);
  });
});