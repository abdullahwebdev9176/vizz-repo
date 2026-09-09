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
  // 2.1 SECTION 11: COST DRIVERS SPLIDE SLIDER (Desktop & Mobile)
  // =========================================================================
  const costSliderEl = document.getElementById('fintech-cost-slider');
  if (costSliderEl && typeof Splide !== 'undefined') {
    try {
      const costSplide = new Splide('#fintech-cost-slider', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '24px',
        autoplay: true,
        interval: 4000,
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
            arrows: true,
          },
          575: {
            perPage: 1,
            gap: '12px',
            arrows: true,
          },
        },
      });

      costSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #fintech-cost-slider:', err);
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

  // =========================================================================
  // 4. SECTION 7: EXPANDING HORIZON DECK CONTROLLER (Desktop & Mobile)
  // =========================================================================
  const horizonPanels = document.querySelectorAll('.horizon-panel');
  const indicatorBtns = document.querySelectorAll('.deck-indicator-btn');
  let hoverIntentTimer = null;

  if (horizonPanels.length > 0) {
    function setActiveHorizonPanel(index) {
      if (index < 0 || index >= horizonPanels.length) return;

      horizonPanels.forEach((panel, i) => {
        if (i === index) {
          panel.classList.add('is-active');
          panel.setAttribute('aria-expanded', 'true');
        } else {
          panel.classList.remove('is-active');
          panel.setAttribute('aria-expanded', 'false');
        }
      });

      indicatorBtns.forEach((btn, i) => {
        if (i === index) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-selected', 'false');
        }
      });
    }

    // Panel interaction
    horizonPanels.forEach((panel, index) => {
      // Desktop smooth hover-intent (prevents rapid jumpy expansions when cursor moves across cards)
      panel.addEventListener('mouseenter', () => {
        if (window.innerWidth > 991) {
          clearTimeout(hoverIntentTimer);
          hoverIntentTimer = setTimeout(() => {
            setActiveHorizonPanel(index);
          }, 140); // 140ms dwell threshold ensures smooth deliberate intent
        }
      });

      panel.addEventListener('mouseleave', () => {
        clearTimeout(hoverIntentTimer);
      });

      // Immediate click activation without delay
      panel.addEventListener('click', () => {
        clearTimeout(hoverIntentTimer);
        setActiveHorizonPanel(index);
      });

      // Keyboard accessibility
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveHorizonPanel(index);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % horizonPanels.length;
          horizonPanels[nextIndex].focus();
          setActiveHorizonPanel(nextIndex);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + horizonPanels.length) % horizonPanels.length;
          horizonPanels[prevIndex].focus();
          setActiveHorizonPanel(prevIndex);
        }
      });
    });

    // Indicator Buttons interaction
    indicatorBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        clearTimeout(hoverIntentTimer);
        setActiveHorizonPanel(index);
      });
    });
  }

  // =========================================================================
  // 5. SECTION 9: TECH STACK INTERACTIVE CATEGORY FILTER
  // =========================================================================
  const techFilterBtns = document.querySelectorAll('.tech-filter-btn');
  const techCards = document.querySelectorAll('.techstack-card');

  if (techFilterBtns.length > 0 && techCards.length > 0) {
    techFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-filter');

        // Update active button state
        techFilterBtns.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        // Filter tech cards with smooth animation
        techCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');
          if (filterVal === 'all' || cardCategory === filterVal) {
            card.classList.remove('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
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
