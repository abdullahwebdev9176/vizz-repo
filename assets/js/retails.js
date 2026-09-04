/**
 * Vizz Web Solutions - Retail & E-Commerce Page Dedicated Responsive Controller
 * Page: retails.html
 * Functionality:
 * 1. Auto-moving showcase cards slider (#retail-showcase-slider) showing cards with autoplay loop.
 * 2. Activates Splide.js sliders on mobile & tablet (<= 991px) for grid sections.
 * 3. Automatically destroys responsive sliders on desktop (> 991px) to preserve native CSS grids.
 * 4. Card Read More button mechanics (Individual scrollable 300px max-height on desktop, expands all on mobile).
 * 5. Smooth-scrolling lead form triggers with auto input focus.
 * 6. Accessible Single-Open FAQ Accordion with ARIA state management.
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
  // 2. AUTO-MOVING SHOWCASE CARDS SLIDERS (Continuous Autoplay Loop)
  // =========================================================================
  const autoMovingSliders = ['retail-showcase-slider', 'omnichannel-showcase-slider', 'showcase-cards-slider'];

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
      id: 'retail-workflows-slider',
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
      id: 'connected-retail-slider',
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
      id: 'retail-sectors-slider',
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
        // Initialize slider only if not currently mounted
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
              arrows: true,
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
        // Destroy slider on desktop (>= 992px) to restore native grid
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

  // Initial call on page load
  handleResponsiveSliders();

  // Debounced resize listener
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      handleResponsiveSliders();
    }, 150);
  });

  // =========================================================================
  // 4. CARD READ MORE / EXPAND TOGGLE CONTROLLER
  // =========================================================================
  const readMoreButtons = document.querySelectorAll('.transport-read-more-btn');

  readMoreButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMobile = window.innerWidth <= 991;
      const currentCard = button.closest('.transport-style-card');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (isMobile) {
        // Mobile Mode: Expand / Collapse all cards
        const willExpand = !isExpanded;
        const allCards = document.querySelectorAll('.transport-style-card');

        allCards.forEach((card) => {
          const btn = card.querySelector('.transport-read-more-btn');
          const contentBox = card.querySelector('.transport-content-box');
          const moreContent = card.querySelector('.transport-more-content');

          if (willExpand) {
            card.classList.add('is-expanded');
            if (btn) {
              btn.setAttribute('aria-expanded', 'true');
              const textSpan = btn.querySelector('.read-more-text');
              if (textSpan) textSpan.textContent = 'Read Less';
            }
            if (contentBox) contentBox.classList.add('expanded');
            if (moreContent) moreContent.classList.add('show');
          } else {
            card.classList.remove('is-expanded');
            if (btn) {
              btn.setAttribute('aria-expanded', 'false');
              const textSpan = btn.querySelector('.read-more-text');
              if (textSpan) textSpan.textContent = 'Read More';
            }
            if (contentBox) contentBox.classList.remove('expanded');
            if (moreContent) moreContent.classList.remove('show');
          }
        });
      } else {
        // Desktop Mode: Toggle only this card; content becomes scrollable with max-height: 300px
        if (currentCard) {
          const contentBox = currentCard.querySelector('.transport-content-box');
          const moreContent = currentCard.querySelector('.transport-more-content');
          const textSpan = button.querySelector('.read-more-text');

          if (!isExpanded) {
            currentCard.classList.add('is-expanded');
            button.setAttribute('aria-expanded', 'true');
            if (textSpan) textSpan.textContent = 'Read Less';
            if (contentBox) contentBox.classList.add('expanded');
            if (moreContent) moreContent.classList.add('show');
          } else {
            currentCard.classList.remove('is-expanded');
            button.setAttribute('aria-expanded', 'false');
            if (textSpan) textSpan.textContent = 'Read More';
            if (contentBox) contentBox.classList.remove('expanded');
            if (moreContent) moreContent.classList.remove('show');
          }
        }
      }
    });
  });

  // =========================================================================
  // 5. ACCESSIBLE SINGLE-OPEN FAQ ACCORDION CONTROLLER
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-accordion-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-accordion-trigger');
    const content = item.querySelector('.faq-accordion-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other open items (Single-Open accordion)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-accordion-trigger');
          const otherContent = otherItem.querySelector('.faq-accordion-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle clicked item
      if (isOpen) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // =========================================================================
  // 6. AI INNOVATION THEATER INTERACTIVE HOVER / TAB CONTROLLER
  // =========================================================================
  const theaterContainer = document.getElementById('ai-theater-container');
  if (theaterContainer) {
    const navCards = theaterContainer.querySelectorAll('.ai-nav-card');
    const stageImg = document.getElementById('ai-stage-active-img');
    const stageTag = document.getElementById('ai-stage-tag');
    const stageTitlePreview = document.getElementById('ai-stage-title-preview');

    if (navCards.length > 0 && stageImg) {
      navCards.forEach((card) => {
        const activateCard = () => {
          if (card.classList.contains('active')) return;

          // Update active state on all cards
          navCards.forEach((c) => {
            c.classList.remove('active');
            c.setAttribute('aria-selected', 'false');
          });
          card.classList.add('active');
          card.setAttribute('aria-selected', 'true');

          const newSrc = card.getAttribute('data-img-src');
          const newAlt = card.getAttribute('data-img-alt') || '';
          const newTag = card.getAttribute('data-tag') || 'AGENTIC COMMERCE';
          const newTitle = card.getAttribute('data-title') || '';

          // Smooth Stage Update
          if (stageTag) {
            stageTag.textContent = newTag;
          }
          if (stageTitlePreview) {
            stageTitlePreview.innerHTML = newTitle;
          }

          if (newSrc && stageImg.src !== newSrc) {
            stageImg.style.opacity = '0.35';
            stageImg.style.transform = 'scale(0.96)';

            setTimeout(() => {
              stageImg.src = newSrc;
              stageImg.alt = newAlt;
              stageImg.style.opacity = '1';
              stageImg.style.transform = 'scale(1)';
            }, 120);
          }
        };

        // Desktop Mouse Hover
        card.addEventListener('mouseenter', activateCard);

        // Keyboard Navigation (Enter or Space)
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activateCard();
          }
        });

        // Click / Touch for Mobile & Tablet
        card.addEventListener('click', activateCard);
      });
    }
  }
});


