# 🎮 Game Development Services Page — Complete Design & Technical Instructions

> **Document Purpose**: Comprehensive instructions, design guidelines, SEO standards, responsive architecture, and implementation blueprint for building the Game Development landing page (`game-development.html`) with a dedicated isolated stylesheet (`assets/css/game-development-style.css`) and dedicated JavaScript controller (`assets/js/game-development.js`).

---

## 1. Project Scope & Architecture Rules

1. **Dedicated Isolated Stylesheet**:
   - All styling for the Game Development page MUST be contained in `assets/css/game-development-style.css`.
   - Do NOT mix or pollute `assets/css/style.css` or other page stylesheets with game-dev-specific classes.
   - The stylesheet must be completely modular, clean, and self-contained.
   - Keep only what is necessary (Base tokens, resets, typography, container, buttons, and Hero section). All non-hero section styles are removed until those sections are actively constructed.

2. **Dedicated JavaScript Controller**:
   - All interactive logic for the Game Development page MUST reside in `assets/js/game-development.js`.
   - Script should be linked with `defer` at the bottom of the body:
     ```html
     <script src="./assets/js/game-development.js" defer></script>
     ```

3. **Page Markup Scope (No Global Header & No Global Footer)**:
   - Header and Footer are global components managed outside the page body.
   - The markup inside `game-development.html` must be wrapped strictly inside:
     ```html
     <main id="main-content" role="main">
       <!-- All Page Sections Go Here -->
     </main>
     ```

4. **Container Width & Layout**:
   - Standard fluid responsive container matching `index.html` and `saskatoon.html`:
     ```css
     --max-width-container: calc(100% - 20%);
     ```
   - Container class: `.vizz-container` with standard responsive padding (`padding-left: var(--container-padding); padding-right: var(--container-padding); margin: 0 auto;`).

---

## 2. Core Color Palette & CSS Variables

Use the exact same color system and design tokens from the Vizz Web design system:

```css
/* ==========================================================================
   VIZZ WEB - GAME DEVELOPMENT DESIGN SYSTEM (game-development-style.css)
   ========================================================================== */

:root {
  /* 🔤 Typography & Font Family */
  --font-family: 'Poppins', sans-serif;

  /* 🔘 Brand, Accent & Interactive Colors */
  --btn-primary: #248fce;
  --btn-primary-hover: #006ed4;
  --btn-cyan: #248fce;
  --btn-color: #248fce;
  --btn-color-hover: #ffffff;
  --white-color: #ffffff;
  --color-cyan-light: #38bdf8;

  /* 🌌 Background Colors */
  --bg-dark: #07152b;
  --bg-dark-card: #0e2246;
  --bg-light: #ffffff;
  --bg-light-alt: #f4f8fc;

  /* ✍️ Font / Text Colors */
  --text-white: #ffffff;
  --text-dark: #0b1a30;
  --text-muted-dark: #cbd5e1;
  --text-muted-light: #4a5568;
  --text-cyan: #248fce;

  /* UI Borders & Radii */
  --border-radius-pill: 10px;
  --border-radius-card: 16px;
  --border-radius-card-sm: 12px;
  --border-radius-input: 8px;
  --border-light: #e2e8f0;
  --border-dark: #1b3252;

  /* Shadows */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.05);
  --shadow-card-elevated: 0 16px 36px rgba(0, 0, 0, 0.22);
  --shadow-btn: 0 8px 25px rgba(0, 136, 255, 0.35);

  /* Layout Spacing (Mobile-First) */
  --container-padding: 16px;
  --section-padding: 60px 0;
  --max-width-container: 100%;
}
```

---

## 3. Typography & Font Family

- **Font Family**: Google Font **Poppins** (Weights: 300, 400, 500, 600, 700, 800).
- **Global Reset**:
  ```css
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: var(--font-family);
  }
  ```

### Typography Scale & Hierarchy:
| Element | Desktop Size | Mobile Size | Weight | Line Height | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `<h1>` | **44px - 50px** | **26px - 32px** | **700 - 800** | 1.22 | **Strictly ONE per page in Hero** |
| `<h2>` | **32px - 38px** | **24px - 28px** | **700** | 1.25 | Primary Section Headings & Form Card Title |
| `<h3>` | **20px - 24px** | **18px - 20px** | **600** | 1.35 | Sub-sections, Cards & Blocks |
| `<h4>` | **16px - 18px** | **15px - 16px** | **600** | 1.4 | Inner card items & micro-features |
| `<p>` | **15px - 16px** | **14px - 15px** | **400** | 1.65 - 1.75 | Body text & descriptions |

---

## 4. Hero Section Specifications

### Layout:
- **Background**: `var(--bg-dark)` with modern subtle radial glow (`::before` & `::after`) and optional dark gaming/tech overlay.
- **2-Column Split Layout (`.hero-section-flex`)**:
  - **Left Column (`.hero-col-1`)**:
    - Strictly ONE `<h1>` with gradient highlight span (`.text-highlight-cyan`):
      `<h1>Custom Game Development Services for <span class="text-highlight-cyan">Immersive Experiences</span></h1>`
    - Engaging lead paragraph with an accessible inline Read More button toggle (`#hero-read-more-btn`).
    - Expandable content container (`#hero-more-content`) with smooth CSS fade-in animation.
    - Primary Pill CTA Button (`.btn-primary-pill`) linking to `#lead-form`.
  - **Right Column (`.hero-col-2.hero-form-card`)**:
    - Elevated glassmorphic lead capture card container (`var(--bg-dark-card)` with `backdrop-filter: blur(10px)`).
    - Form title: `<h2>Get Started Today</h2>` with descriptive subtitle.
    - Responsive 2-column input row for First Name (`fname`) & Last Name (`lname`).
    - Work Email (`email`), Phone Number (`phone`), and Project Details (`comments`).
    - Full-width CTA submit button (`.btn-primary-pill.w-100`).
    - Privacy guarantee tag: `🔒 Your information is 100% confidential and secure.`

---

## 5. Strict SEO & Heading Hierarchy Rules

1. **Single `<h1>` Tag**:
   - The page must have strictly **ONE `<h1>`** located in the Hero Section.
   - Never duplicate `<h1>` anywhere on the page.
2. **Sequential Heading Hierarchy**:
   - `<h1>` (Hero) &rarr; `<h2>` (Main Sections / Form Card) &rarr; `<h3>` (Cards / Categories) &rarr; `<h4>` (Inner features).
   - Skipping heading levels (e.g. `<h1>` &rarr; `<h3>`) is strictly prohibited.
3. **Semantic HTML5 Tags**:
   - Use `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<form>`, `<label>`, `<input>`, `<textarea>`, `<button>`.

---

## 6. Accessibility & ARIA Label Standards

1. **Anchor Tags (`<a>`)**:
   - Every link MUST have descriptive `aria-label` and `title` attributes.
   - Example: `<a href="#lead-form" class="btn-primary-pill" aria-label="Request a custom game development consultation" title="Request A Free Quote">Request A Free Quote</a>`
   - Never wrap block elements inside `<a>`. Always wrap `<a>` inside the block element.
2. **Buttons & Form Controls**:
   - All buttons must have `aria-label` and `title`.
   - All inputs and textarea elements must have matching `<label for="...">` elements.
   - Required fields marked with `<span class="required-star" aria-hidden="true">*</span>` and `aria-required="true"`.
3. **Section Labels**:
   - Every `<section>` tag must have an explicit `aria-label` attribute summarizing its purpose.

---

## 7. Image Standards & Asset Specifications

1. **Realistic & Modern Gaming Tech**:
   - Assets must reflect high-end 2D/3D game graphics, Unreal Engine, Unity workflows, concept art, and gameplay mechanics.
2. **Clean & Unbranded (Zero Watermarks)**:
   - All images must be free of third-party stock watermarks or logos.
3. **Format & Performance**:
   - High-quality **WebP** format (`.webp`).
   - Include explicit `width`, `height`, and `loading="lazy"` attributes on all images.
4. **Descriptive `alt` Text**:
   - Every `<img>` must contain context-rich descriptive text.

---

## 8. Game Development Section Roadmap (Planned Architecture)

| # | Section Name | Background Theme | Heading Level | Description / Key Focus |
| :-: | :--- | :--- | :-: | :--- |
| **1** | **Hero Section** | Dark (`--bg-dark`) | `<h1>` | Custom Game Development + High-Conversion Lead Capture Form |
| **2** | **From Concept to Global Launch** | Light (`--bg-light-alt`) | `<h2>` / `<h3>` / `<h4>` | End-to-End Game Production & 13 Core Capabilities Grid |
| **3** | **Building Next-Level Mobile Games** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | 16 Mobile Game Development Services Splide Slider (Active on Both Screens) |
| **4** | **What Kind of Game to Build? (Genres)** | Light (`--bg-light-alt`) | `<h2>` / `<h3>` | 10 Mobile Game Genres & Categories Splide Slider (Active on Both Screens) |
| **5** | **Develop Cross-Platform Mobile Games** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | 4 Key Platforms (iOS, Android, Cross-Platform, Mobile + Web) |
| **6** | **Game Dev Process** | Light (`--bg-light`) | `<h2>` / `<h3>` | Pre-production &rarr; Prototyping &rarr; Production &rarr; QA &rarr; Launch |
| **7** | **Frequently Asked Questions (FAQ)** | Light (`--bg-light`) | `<h2>` / `<h3>` | Accessible accordion answering game dev timelines, IP ownership, costs |
| **8** | **Bottom Consultation & Contact** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | Direct contact channels & tailored proposal form |

---

## 9. QA & Pre-Launch Validation Checklist

- [ ] **CSS Separation**: All styles reside exclusively in `assets/css/game-development-style.css`.
- [ ] **Clean Styles**: Only base tokens, resets, typography, container, buttons, and Hero styles included (non-hero styles removed).
- [ ] **JS Separation**: Interactivity encapsulated in `assets/js/game-development.js`.
- [ ] **Typography**: Poppins font applied across all elements.
- [ ] **Container**: Max width set to `calc(100% - 20%)` on desktop with `.vizz-container`.
- [ ] **Hero Layout**: 2-column split with Lead Form on the right.
- [ ] **Single H1**: Strictly one `<h1>` in the Hero section.
- [ ] **Heading Order**: Strictly `h1` &rarr; `h2` &rarr; `h3` &rarr; `h4`.
- [ ] **Accessibility**: All `<a>` and `<button>` have `aria-label` and `title`. All `<section>` tags have `aria-label`.
- [ ] **No Header/Footer**: Only `<main id="main-content" role="main">` content included.
