/**
 * Vizz Web - Game Development Dedicated Interactive Scripts
 * Page: game-development.html
 * Functionality:
 * 1. Smooth-scrolling lead form triggers with auto input focus.
 * 2. Hero Section inline Read More / Read Less toggle with accessible ARIA management.
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
  // 2. HERO SECTION INLINE READ MORE / READ LESS TOGGLE
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
        // Collapse content
        heroDesc1.appendChild(heroReadMoreBtn);
        heroMoreContent.style.display = 'none';
        heroReadMoreBtn.setAttribute('aria-expanded', 'false');
        if (textSpan) textSpan.textContent = 'Read More';
      } else {
        // Expand content
        heroMoreContent.style.display = 'block';
        heroDesc2.appendChild(heroReadMoreBtn);
        heroReadMoreBtn.setAttribute('aria-expanded', 'true');
        if (textSpan) textSpan.textContent = 'Read Less';
      }
    });
  }

  // =========================================================================
  // 3. GAME SERVICES SPLIDE SLIDER (ACTIVE ON BOTH SCREENS)
  // =========================================================================
  const servicesSliderElement = document.getElementById('game-services-slider');
  if (servicesSliderElement && typeof Splide !== 'undefined') {
    try {
      const servicesSplide = new Splide('#game-services-slider', {
        type: 'slide',
        perPage: 3,
        perMove: 1,
        gap: '24px',
        arrows: true,
        pagination: true,
        speed: 500,
        drag: true,
        snap: true,
        flickPower: 400,
        keyboard: true,
        breakpoints: {
          1200: {
            perPage: 3,
            gap: '20px',
          },
          991: {
            perPage: 2,
            gap: '18px',
          },
          640: {
            perPage: 1,
            gap: '14px',
          },
        },
      });

      servicesSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #game-services-slider:', err);
    }
  }

  // =========================================================================
  // 4. GAME GENRES SPLIDE SLIDER (ACTIVE ON BOTH SCREENS)
  // =========================================================================
  const genresSliderElement = document.getElementById('game-genres-slider');
  if (genresSliderElement && typeof Splide !== 'undefined') {
    try {
      const genresSplide = new Splide('#game-genres-slider', {
        type: 'slide',
        perPage: 3,
        perMove: 1,
        gap: '24px',
        arrows: true,
        pagination: true,
        speed: 500,
        drag: true,
        snap: true,
        flickPower: 400,
        keyboard: true,
        breakpoints: {
          1200: {
            perPage: 3,
            gap: '20px',
          },
          991: {
            perPage: 2,
            gap: '18px',
          },
          640: {
            perPage: 1,
            gap: '14px',
          },
        },
      });

      genresSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #game-genres-slider:', err);
    }
  }

  // =========================================================================
  // 5. INTERACTIVE MONETIZATION ENGINE CONSOLE CONTROLLER
  // =========================================================================
  const monetizationEngine = document.getElementById('monetization-engine');

  if (monetizationEngine) {
    const tabs = Array.from(monetizationEngine.querySelectorAll('.monetization-tab'));
    const panels = Array.from(monetizationEngine.querySelectorAll('.monetization-stage-panel'));
    const prevBtns = monetizationEngine.querySelectorAll('.stage-nav-btn.btn-prev');
    const nextBtns = monetizationEngine.querySelectorAll('.stage-nav-btn.btn-next');
    let currentIndex = 0;

    function activateIndex(index) {
      if (index < 0) index = tabs.length - 1;
      if (index >= tabs.length) index = 0;
      currentIndex = index;

      // Update Tabs
      tabs.forEach((tab, i) => {
        const isActive = i === currentIndex;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive && window.innerWidth < 992) {
          tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });

      // Update Stage Panels
      panels.forEach((panel, i) => {
        const isActive = i === currentIndex;
        if (isActive) {
          panel.removeAttribute('hidden');
          panel.classList.add('is-active');
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('is-active');
        }
      });
    }

    // Tab Clicks & Hover Option
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        activateIndex(i);
      });

      // Accessible Keyboard Navigation
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          activateIndex(currentIndex + 1);
          tabs[currentIndex]?.focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          activateIndex(currentIndex - 1);
          tabs[currentIndex]?.focus();
        }
      });
    });

    // Prev / Next Buttons
    prevBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activateIndex(currentIndex - 1);
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activateIndex(currentIndex + 1);
      });
    });
  }
});


