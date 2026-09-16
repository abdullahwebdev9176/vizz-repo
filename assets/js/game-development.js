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

  // =========================================================================
  // 6. LIVEOPS MISSION CONTROL HUB INTERACTIVE CONTROLLER
  // =========================================================================
  const liveopsHub = document.getElementById('liveops-control-hub');

  if (liveopsHub) {
    const nodes = Array.from(liveopsHub.querySelectorAll('.liveops-node'));
    const coreIcon = document.getElementById('liveops-core-icon');
    const coreIndex = document.getElementById('liveops-core-index');
    const coreTitle = document.getElementById('liveops-core-title');
    let activeNodeIndex = 0;
    let autoScanInterval = null;
    let isUserHovering = false;

    function setLiveopsNode(index) {
      if (index < 0 || index >= nodes.length) return;
      activeNodeIndex = index;
      const targetNode = nodes[index];

      // Update Node active classes
      nodes.forEach((node, i) => {
        node.classList.toggle('is-active', i === index);
      });

      // Update Center Core Display
      const nodeNum = targetNode.getAttribute('data-num') || `0${index + 1}`;
      const nodeTitleText = targetNode.getAttribute('data-title') || targetNode.querySelector('.node-title')?.textContent || '';
      const nodeSvg = targetNode.querySelector('.node-icon svg');

      if (coreIndex) {
        coreIndex.textContent = `PHASE ${nodeNum} / 12`;
      }
      if (coreTitle) {
        coreTitle.textContent = nodeTitleText;
      }
      if (coreIcon && nodeSvg) {
        coreIcon.innerHTML = nodeSvg.outerHTML;
        const iconSvg = coreIcon.querySelector('svg');
        if (iconSvg) {
          iconSvg.setAttribute('width', '38');
          iconSvg.setAttribute('height', '38');
        }
      }
    }

    // Node Event Listeners
    nodes.forEach((node, i) => {
      // Hover on desktop
      node.addEventListener('mouseenter', () => {
        setLiveopsNode(i);
      });

      // Tap / Click for mobile & touch
      node.addEventListener('click', () => {
        setLiveopsNode(i);
      });

      // Keyboard navigation (Enter / Space)
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setLiveopsNode(i);
        }
      });
    });

    // Auto-scanning radar cycle
    function startAutoScan() {
      if (autoScanInterval) clearInterval(autoScanInterval);
      autoScanInterval = setInterval(() => {
        if (!isUserHovering) {
          const nextIndex = (activeNodeIndex + 1) % nodes.length;
          setLiveopsNode(nextIndex);
        }
      }, 3500);
    }

    liveopsHub.addEventListener('mouseenter', () => {
      isUserHovering = true;
    });

    liveopsHub.addEventListener('mouseleave', () => {
      isUserHovering = false;
    });

    startAutoScan();
  }

  // =========================================================================
  // 7. GAME DEVELOPMENT PROCESS SPLIDE SLIDER & HUD CONTROLLER
  // =========================================================================
  const processSliderElement = document.getElementById('game-process-slider');

  if (processSliderElement && typeof Splide !== 'undefined') {
    try {
      const processSplide = new Splide('#game-process-slider', {
        type: 'slide',
        perPage: 3,
        perMove: 1,
        gap: '24px',
        arrows: true,
        pagination: true,
        speed: 550,
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

      const progressFill = document.getElementById('tracker-progress-fill');
      const currentName = document.getElementById('tracker-current-name');
      const levelBadge = document.getElementById('tracker-level-badge');
      const slideCards = Array.from(processSliderElement.querySelectorAll('.process-slide-card'));

      function updateProcessHUD(slideIndex) {
        const activeCard = slideCards[slideIndex];
        if (!activeCard) return;

        const step = parseInt(activeCard.getAttribute('data-step'), 10) || (slideIndex + 1);
        const title = activeCard.getAttribute('data-title') || '';
        const percent = activeCard.getAttribute('data-percent') || `${step * 10}`;

        if (progressFill) {
          progressFill.style.width = `${percent}%`;
        }
        if (currentName) {
          currentName.textContent = title;
        }
        if (levelBadge) {
          const formattedStep = step < 10 ? `0${step}` : `${step}`;
          levelBadge.textContent = `STAGE ${formattedStep} / 10`;
        }

        // Highlight active card
        slideCards.forEach((c, idx) => {
          c.classList.toggle('is-active', idx === slideIndex);
        });
      }

      // Sync on mount and move
      processSplide.on('mounted move', (newIndex) => {
        updateProcessHUD(typeof newIndex === 'number' ? newIndex : processSplide.index);
      });

      // Hover on card to focus & sync HUD
      slideCards.forEach((card, idx) => {
        card.addEventListener('mouseenter', () => {
          updateProcessHUD(idx);
        });
      });

      processSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #game-process-slider:', err);
    }
  }

  // =========================================================================
  // 8. SCALABLE MOBILE GAME DEVELOPMENT MODELS INTERACTIVE CONTROLLER
  // =========================================================================
  const modelsGrid = document.getElementById('models-showcase-grid');

  if (modelsGrid) {
    const modelCards = Array.from(modelsGrid.querySelectorAll('.model-card-item'));
    const portalModelTitle = document.getElementById('portal-active-model-title');
    const portalModelTag = document.getElementById('portal-active-model-tag');

    function activateModel(card) {
      const modelNum = card.getAttribute('data-model') || '1';
      const title = card.getAttribute('data-title') || '';

      // Update active card class
      modelCards.forEach((c) => {
        c.classList.toggle('is-active', c === card);
      });

      // Update Visual Portal Dock
      if (portalModelTitle) {
        portalModelTitle.textContent = title;
      }
      if (portalModelTag) {
        portalModelTag.textContent = `MODEL 0${modelNum} / 04`;
      }
    }

    modelCards.forEach((card) => {
      // Hover on desktop
      card.addEventListener('mouseenter', () => {
        activateModel(card);
      });

      // Tap / Click
      card.addEventListener('click', () => {
        activateModel(card);
      });

      // Keyboard focus & activation
      card.addEventListener('focus', () => {
        activateModel(card);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateModel(card);
        }
      });
    });
  }

  // =========================================================================
  // 9. MOBILE GAMES ACROSS INDUSTRIES SPLIDE SLIDER
  // =========================================================================
  const industriesSliderElement = document.getElementById('game-industries-slider');

  if (industriesSliderElement && typeof Splide !== 'undefined') {
    try {
      const industriesSplide = new Splide('#game-industries-slider', {
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

      industriesSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #game-industries-slider:', err);
    }
  }

  // --------------------------------------------------------------------------
  // 10. SECTION 13: PERKS OF WORKING WITH AN EXPERT GAME DEV COMPANY SLIDER
  // --------------------------------------------------------------------------
  const perksSliderEl = document.getElementById('game-perks-slider');
  const perksActiveTitleEl = document.getElementById('perks-active-title');
  const perksHudCounterEl = document.getElementById('perks-hud-counter');

  if (perksSliderEl && typeof Splide !== 'undefined') {
    try {
      const perksSplide = new Splide('#game-perks-slider', {
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

      // Update HUD telemetry readout on active slide change
      const updatePerksHud = (index) => {
        const slides = perksSliderEl.querySelectorAll('.splide__slide:not(.splide__slide--clone)');
        if (slides && slides[index]) {
          const card = slides[index].querySelector('.perk-module-card');
          if (card) {
            const title = card.getAttribute('data-title') || '';
            const rawIndex = card.getAttribute('data-index') || (index + 1);
            if (perksActiveTitleEl && title) {
              perksActiveTitleEl.textContent = title;
            }
            if (perksHudCounterEl) {
              perksHudCounterEl.textContent = `MODULE ${String(rawIndex).padStart(2, '0')} / 15`;
            }
          }
        }
      };

      perksSplide.on('mounted move', () => {
        updatePerksHud(perksSplide.index);
      });

      perksSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #game-perks-slider:', err);
    }
  }

  // --------------------------------------------------------------------------
  // 11. SECTION 14: TRUSTED PARTNER ARCHITECTURE CORE INTERACTIVITY
  // --------------------------------------------------------------------------
  const partnerSection = document.querySelector('.game-partner-section');
  if (partnerSection) {
    const cards = partnerSection.querySelectorAll('.partner-pillar-card');
    const coreIndexEl = document.getElementById('partner-core-index');
    const coreTitleEl = document.getElementById('partner-core-title');
    const coreDescEl = document.getElementById('partner-core-desc');

    const activatePillar = (index) => {
      const idxStr = String(index);

      // Update cards active state
      cards.forEach((card) => {
        const cIdx = card.getAttribute('data-index');
        if (cIdx === idxStr) {
          card.classList.add('is-active');
          const title = card.getAttribute('data-title') || '';
          const desc = card.getAttribute('data-desc') || '';

          if (coreIndexEl) {
            coreIndexEl.textContent = `PILLAR ${cIdx.padStart(2, '0')} / 06`;
          }
          if (coreTitleEl) {
            coreTitleEl.textContent = title;
          }
          if (coreDescEl) {
            coreDescEl.textContent = desc;
          }
        } else {
          card.classList.remove('is-active');
        }
      });
    };

    // Event listeners on cards (click & hover)
    cards.forEach((card) => {
      const idx = card.getAttribute('data-index');
      card.addEventListener('mouseenter', () => {
        if (idx) activatePillar(idx);
      });
      card.addEventListener('click', () => {
        if (idx) activatePillar(idx);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (idx) activatePillar(idx);
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. SECTION 15: 5-BLADE CYBER TECH SERVER DECK INTERACTIVITY
  // --------------------------------------------------------------------------
  const techSection = document.querySelector('.game-tech-section');
  if (techSection) {
    const blades = techSection.querySelectorAll('.tech-deck-blade');

    const activateBlade = (bladeNum) => {
      const numStr = String(bladeNum);
      blades.forEach((blade) => {
        const bNum = blade.getAttribute('data-blade');
        blade.classList.toggle('is-active', bNum === numStr);
      });
    };

    // Click and hover on blades
    blades.forEach((blade) => {
      const bNum = blade.getAttribute('data-blade');
      blade.addEventListener('mouseenter', () => {
        if (bNum) activateBlade(bNum);
      });
      blade.addEventListener('click', () => {
        if (bNum) activateBlade(bNum);
      });
      blade.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (bNum) activateBlade(bNum);
        }
      });
    });
  }

  // =========================================================================
  // 13. SECTION 17: ACCESSIBLE SINGLE-OPEN FAQ ACCORDION
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

