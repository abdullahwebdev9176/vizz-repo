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
  // 2.5 SECTION 2: END-TO-END CAPABILITIES IMAGE SLIDER (SPLIDE)
  // =========================================================================
  const expSliderElement = document.getElementById('game-experience-slider');
  if (expSliderElement && typeof Splide !== 'undefined') {
    try {
      const expSplide = new Splide('#game-experience-slider', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '24px',
        arrows: false,
        pagination: true,
        speed: 600,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        drag: true,
        snap: true,
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
          575: {
            perPage: 1,
            gap: '14px',
          },
        },
      });

      const prevBtn = document.getElementById('exp-slider-prev');
      const nextBtn = document.getElementById('exp-slider-next');
      const counterCurrent = document.querySelector('#exp-slider-counter .count-current');

      const updateCounter = (index) => {
        if (counterCurrent) {
          const totalSlides = 13;
          const slideNum = ((index % totalSlides) + totalSlides) % totalSlides + 1;
          counterCurrent.textContent = slideNum < 10 ? `0${slideNum}` : `${slideNum}`;
        }
      };

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          expSplide.go('<');
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          expSplide.go('>');
        });
      }

      expSplide.on('move', (newIndex) => {
        updateCounter(newIndex);
      });

      expSplide.mount();
      updateCounter(0);
    } catch (err) {
      console.warn('Game experience slider initialization warning:', err);
    }
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
  // 5. INTERACTIVE MONETIZATION ENGINE CONSOLE / ACCORDION CONTROLLER
  // =========================================================================
  const monetizationEngine = document.getElementById('monetization-engine');

  if (monetizationEngine) {
    const items = Array.from(monetizationEngine.querySelectorAll('.monetization-item'));
    const tabs = Array.from(monetizationEngine.querySelectorAll('.monetization-tab'));
    const panels = Array.from(monetizationEngine.querySelectorAll('.monetization-stage-panel'));
    const prevBtns = monetizationEngine.querySelectorAll('.stage-nav-btn.btn-prev');
    const nextBtns = monetizationEngine.querySelectorAll('.stage-nav-btn.btn-next');
    let currentIndex = 0;

    function activateIndex(index, allowToggle = false) {
      const isMobile = window.innerWidth <= 991;

      // On mobile accordion: toggle collapse if currently active item is clicked again
      if (isMobile && allowToggle && currentIndex === index) {
        const activeItem = items[index];
        const activeTab = tabs[index];
        const activePanel = panels[index];
        if (activeItem && activeItem.classList.contains('is-active')) {
          activeItem.classList.remove('is-active');
          if (activeTab) {
            activeTab.classList.remove('is-active');
            activeTab.setAttribute('aria-selected', 'false');
          }
          if (activePanel) {
            activePanel.classList.remove('is-active');
            activePanel.setAttribute('hidden', '');
          }
          currentIndex = -1;
          return;
        }
      }

      if (index < 0) index = tabs.length - 1;
      if (index >= tabs.length) index = 0;
      currentIndex = index;

      // Update Items
      items.forEach((item, i) => {
        item.classList.toggle('is-active', i === currentIndex);
      });

      // Update Tabs
      tabs.forEach((tab, i) => {
        const isActive = i === currentIndex;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive && !isMobile) {
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

      if (isMobile && currentIndex >= 0 && items[currentIndex]) {
        items[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Tab Clicks & Keyboard
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        activateIndex(i, true);
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
        const nextIdx = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
        activateIndex(nextIdx);
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextIdx = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
        activateIndex(nextIdx);
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

      const slideCards = Array.from(processSliderElement.querySelectorAll('.process-slide-card'));

      function updateProcessActiveCard(slideIndex) {
        slideCards.forEach((c, idx) => {
          c.classList.toggle('is-active', idx === slideIndex);
        });
      }

      // Sync on mount and move
      processSplide.on('mounted move', (newIndex) => {
        updateProcessActiveCard(typeof newIndex === 'number' ? newIndex : processSplide.index);
      });

      // Hover on card to focus
      slideCards.forEach((card, idx) => {
        card.addEventListener('mouseenter', () => {
          updateProcessActiveCard(idx);
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

      perksSplide.mount();
    } catch (err) {
      console.warn('[Splide] Error initializing #game-perks-slider:', err);
    }
  }



  // --------------------------------------------------------------------------
  // SECTION 6: ADVANCED AI TECHNOLOGIES (MOBILE GAME AI SIMULATOR ARENA)
  // --------------------------------------------------------------------------
  const aiSimSection = document.querySelector('.ai-games-section');
  if (aiSimSection) {
    const simChips = aiSimSection.querySelectorAll('.ai-sim-chip');
    const screenOverlays = aiSimSection.querySelectorAll('.game-screen-overlay');

    const activateSimChip = (chipNum) => {
      const chipNumStr = String(chipNum);

      // Update AI Chips state
      simChips.forEach((chip) => {
        const cNum = chip.getAttribute('data-chip');
        const isActive = cNum === chipNumStr;
        chip.classList.toggle('is-active', isActive);
        chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      // Update Game Screen Overlays
      screenOverlays.forEach((overlay) => {
        const overlayId = `game-overlay-${chipNumStr}`;
        const isActive = overlay.id === overlayId;
        overlay.classList.toggle('is-active', isActive);
        overlay.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
    };

    simChips.forEach((chip) => {
      const chipNum = chip.getAttribute('data-chip');

      // Click to activate
      chip.addEventListener('click', () => {
        if (chipNum) {
          activateSimChip(chipNum);
          if (window.innerWidth <= 991) {
            const phoneStage = aiSimSection.querySelector('.sim-phone-stage');
            if (phoneStage) {
              phoneStage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }
      });

      // Hover to activate on desktop
      chip.addEventListener('mouseenter', () => {
        if (chipNum && window.innerWidth > 991) {
          activateSimChip(chipNum);
        }
      });

      // Keyboard accessibility (Enter / Space)
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (chipNum) activateSimChip(chipNum);
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

  // =========================================================================
  // 14. MOBILE-ONLY SPLIDE SLIDERS (SECTIONS 14, 15, 16)
  // Mount on mobile/tablet (<= 991px), destroy completely on desktop (> 991px)
  // =========================================================================
  function initMobileSlider(selector, options) {
    const el = document.querySelector(selector);
    if (!el || typeof Splide === 'undefined') return;

    let instance = null;
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    function checkMedia(mq) {
      if (mq.matches) {
        if (!instance) {
          try {
            instance = new Splide(selector, options);
            instance.mount();
          } catch (err) {
            console.warn(`[Splide] Error initializing mobile slider for ${selector}:`, err);
          }
        }
      } else {
        if (instance) {
          try {
            instance.destroy(true);
          } catch (err) {
            console.warn(`[Splide] Error destroying mobile slider for ${selector}:`, err);
          }
          instance = null;
        }
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkMedia);
    } else {
      mediaQuery.addListener(checkMedia);
    }

    checkMedia(mediaQuery);
  }

  // Section 14: Partner Pillars Slider
  initMobileSlider('#partner-pillars-slider', {
    type: 'slide',
    perPage: 2,
    perMove: 1,
    gap: '20px',
    arrows: false,
    pagination: true,
    speed: 500,
    drag: true,
    breakpoints: {
      767: {
        perPage: 1,
        gap: '16px',
      },
    },
  });

  // Section 15: Game Tech Stack Slider
  initMobileSlider('#game-tech-slider', {
    type: 'slide',
    perPage: 2,
    perMove: 1,
    gap: '20px',
    arrows: false,
    pagination: true,
    speed: 500,
    drag: true,
    breakpoints: {
      767: {
        perPage: 1,
        gap: '16px',
      },
    },
  });

  // Section 16: Cost Factors Grid Slider
  initMobileSlider('#game-cost-slider', {
    type: 'slide',
    perPage: 2,
    perMove: 1,
    gap: '18px',
    arrows: false,
    pagination: true,
    speed: 500,
    drag: true,
    breakpoints: {
      767: {
        perPage: 1,
        gap: '14px',
      },
    },
  });
});

