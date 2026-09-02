/**
 * Vizz Web - Saskatoon Page Dedicated Responsive Sliders
 * Activates Splide.js sliders on mobile & tablet (<= 991px)
 * Automatically destroys sliders on desktop (> 991px) to preserve native CSS grid layouts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Slider configurations list for all 7 sections
  const sliderConfigs = [
    {
      id: 'services-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'pillars-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'ai-advanced-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'tech-stack-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '18px',
      gapMobile: '14px',
    },
    {
      id: 'challenges-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'process-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
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
              breakpoints: {
                576: {
                  perPage: config.perPageMobile,
                  gap: config.gapMobile,
                },
              },
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
});
