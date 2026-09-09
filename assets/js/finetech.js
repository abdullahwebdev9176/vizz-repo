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
  // 2. SECTION 4: FULL SPLIDE SLIDER (Desktop & Mobile)
  // =========================================================================
  const solutionsSliderEl = document.getElementById('fintech-solutions-slider');
  if (solutionsSliderEl && typeof Splide !== 'undefined') {
    try {
      const solutionsSplide = new Splide('#fintech-solutions-slider', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '24px',
        autoplay: true,
        interval: 3500,
        speed: 700,
        pauseOnHover: true,
        pauseOnFocus: true,
        drag: true,
        arrows: true,
        pagination: true,
        breakpoints: {
          1200: {
            perPage: 3,
            gap: '20px',
          },
          991: {
            perPage: 2,
            gap: '18px',
          },
          767: {
            perPage: 1,
            gap: '14px',
            arrows: false,
          },
          575: {
            perPage: 1,
            gap: '12px',
            arrows: false,
          },
        },
      });

      solutionsSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #fintech-solutions-slider:', err);
    }
  }

  // =========================================================================
  // 3. RESPONSIVE SPLIDE SLIDER MANAGER (Active <= 991px for Advantages Section)
  // =========================================================================
  const activeSplideInstances = {};

  const responsiveSliderConfigs = [
    {
      id: 'fintech-advantages-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
      extraBreakpoints: {
        767: {
          perPage: 1,
          gap: '14px',
        },
      },
    },
  ];

  function handleResponsiveSliders() {
    const isMobileOrTablet = window.innerWidth <= 991;

    responsiveSliderConfigs.forEach((config) => {
      const sliderElement = document.getElementById(config.id);
      if (!sliderElement || typeof Splide === 'undefined') {
        return;
      }

      if (isMobileOrTablet) {
        sliderElement.classList.remove('is-rendered');
        if (!activeSplideInstances[config.id]) {
          try {
            const breakpointsObj = {
              767: {
                perPage: config.perPageMobile,
                gap: config.gapMobile,
              },
            };

            if (config.extraBreakpoints) {
              Object.assign(breakpointsObj, config.extraBreakpoints);
            }

            const instance = new Splide(`#${config.id}`, {
              type: 'slide',
              perPage: config.perPageTablet,
              gap: config.gapTablet,
              arrows: false,
              pagination: true,
              drag: true,
              speed: 400,
              breakpoints: breakpointsObj,
            });

            instance.mount();
            activeSplideInstances[config.id] = instance;
          } catch (err) {
            console.warn(`[Splide] Error initializing #${config.id}:`, err);
          }
        }
      } else {
        sliderElement.classList.add('is-rendered');
        if (activeSplideInstances[config.id]) {
          try {
            activeSplideInstances[config.id].destroy(true);
          } catch (err) {
            console.warn(`[Splide] Error destroying #${config.id}:`, err);
          }
          delete activeSplideInstances[config.id];
          sliderElement.classList.add('is-rendered');
        }
      }
    });
  }

  handleResponsiveSliders();

  let resizeDebounceTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounceTimer);
    resizeDebounceTimer = setTimeout(() => {
      handleResponsiveSliders();
    }, 150);
  });
});
