/**
 * Vizz Web - Saskatoon Page Dedicated Responsive Sliders & Interactive Scripts
 * Page: saskatoon.html
 * Functionality:
 * 1. Smooth-scrolling lead form triggers with auto input focus.
 * 2. Activates Splide.js sliders on mobile & tablet (<= 991px) for grid sections.
 * 3. Automatically destroys sliders on desktop (> 991px) to preserve native CSS grid layouts.
 * 4. Accessible Single-Open FAQ Accordion with ARIA state management.
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
  // Slider configurations list for all 9 sections
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
      id: 'saskatoon-tech-slider',
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
      id: 'saskatoon-process-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'saskatoon-industries-slider',
      perPageTablet: 3,
      perPageMobile: 2,
      gapTablet: '16px',
      gapMobile: '12px',
      extraBreakpoints: {
        420: {
          perPage: 1,
          gap: '10px',
        },
      },
    },
    {
      id: 'cost-factors-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '20px',
      gapMobile: '14px',
    },
    {
      id: 'partner-slider',
      perPageTablet: 2,
      perPageMobile: 1,
      gapTablet: '18px',
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
              576: {
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

  // =========================================================================
  // 4. HERO SECTION INLINE READ MORE / READ LESS TOGGLE
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
        heroDesc1.appendChild(heroReadMoreBtn);
        heroMoreContent.style.display = 'none';
        heroReadMoreBtn.setAttribute('aria-expanded', 'false');
        if (textSpan) textSpan.textContent = 'Read More';
      } else {
        heroMoreContent.style.display = 'block';
        heroDesc2.appendChild(heroReadMoreBtn);
        heroReadMoreBtn.setAttribute('aria-expanded', 'true');
        if (textSpan) textSpan.textContent = 'Read Less';
      }
    });
  }

  // =========================================================================
  // 5. VIDEO SHOWCASE INTERACTIVE PLAY CONTROLLER
  // =========================================================================
  const videoPoster = document.getElementById('saskatoon-video-poster') || document.querySelector('.video-poster-overlay');
  const videoBox = document.getElementById('saskatoon-video-box') || document.querySelector('.video-player-box');
  const videoIframe = document.getElementById('saskatoon-video-iframe') || (videoBox ? videoBox.querySelector('iframe') : null);

  if (videoPoster && videoBox && videoIframe) {
    const playVideo = () => {
      videoBox.classList.add('is-playing');
      let currentSrc = videoIframe.getAttribute('src');
      if (currentSrc && !currentSrc.includes('autoplay=1')) {
        const separator = currentSrc.includes('?') ? '&' : '?';
        videoIframe.setAttribute('src', currentSrc + separator + 'autoplay=1');
      }
    };

    videoPoster.addEventListener('click', playVideo);
    videoPoster.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playVideo();
      }
    });
  }
});
