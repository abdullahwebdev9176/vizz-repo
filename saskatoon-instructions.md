# 🌾 Saskatoon Web Development Page — Complete Design & Technical Instructions

> **Document Purpose**: Comprehensive instructions, design guidelines, SEO standards, and architecture specification for building the Saskatoon landing page (`saskatoon.html`) with a dedicated isolated stylesheet (`assets/css/saskatoon-style.css`).

---

## 1. Project Scope & Architecture Rules

1. **Dedicated Isolated Stylesheet**:
   - All styling for the Saskatoon page MUST be contained in `assets/css/saskatoon-style.css`.
   - Do not mix or pollute `assets/css/style.css` with Saskatoon-specific classes.
   - The page must be completely self-contained and modular.
2. **Page Markup Scope (No Header & No Footer)**:
   - Header and Footer are global and managed outside the page body.
   - The markup inside `saskatoon.html` must be wrapped strictly inside:
     ```html
     <main id="main-content" role="main">
       <!-- All Sections Here -->
     </main>
     ```
3. **Container Width & Layout**:
   - Use the exact same container width as `index.html`:
     ```css
     --max-width-container: calc(100% - 20%);
     ```
   - Container class: `.vizz-container` with standard `padding-left: 20px; padding-right: 20px; margin: 0 auto;`.

---

## 2. Core Color Palette & CSS Variables

Use the exact same color system and design tokens from `index.html`:

```css
/* ==========================================================================
   VIZZ WEB - SASKATOON PAGE DESIGN SYSTEM (saskatoon-style.css)
   ========================================================================== */

:root {
  /* 🔤 Typography & Font Family */
  --font-family: 'Poppins', sans-serif;

  /* 🔘 Button & Accent Colors */
  --btn-primary: #17a1fe;
  --btn-primary-hover: #006ed4;
  --btn-cyan: #00b4d8;
  --btn-color: #17a1fe;
  --btn-color-hover: #ffffff;
  --white-color: #ffffff;

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
  --text-cyan: #00b4d8;

  /* UI Borders & Radii */
  --border-radius-pill: 10px;
  --border-radius-card: 16px;
  --border-radius-input: 8px;
  --border-light: #e2e8f0;
  --border-dark: #1b3252;

  /* Shadows */
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.05);
  --shadow-card-elevated: 0 20px 45px rgba(0, 0, 0, 0.28);
  --shadow-btn: 0 8px 25px rgba(0, 136, 255, 0.35);

  /* Layout */
  --max-width-container: calc(100% - 20%);
}
```

---

## 3. Typography & Font Family

- **Font Family**: Google Font **Poppins** (Weights: 300, 400, 500, 600, 700, 800, 900).
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
| `<h1>` | **44px - 50px** | **30px - 34px** | **800** | 1.2 | **Strictly ONE per page in Hero** |
| `<h2>` | **32px - 38px** | **26px - 28px** | **700** | 1.25 | Primary Section Headings |
| `<h3>` | **20px - 24px** | **18px - 20px** | **600** | 1.35 | Sub-sections, Cards & Blocks |
| `<h4>` | **16px - 18px** | **15px - 16px** | **600** | 1.4 | Inner card items & micro-features |
| `<p>` | **15px - 16px** | **14px - 15px** | **400** | 1.65 - 1.7 | Body text & descriptions |

---

## 4. Hero Section Specifications (Matching index.html Design)

### Layout:
- **Background**: `var(--bg-dark)` with modern subtle radial glow.
- **2-Column Split Layout (`.hero-section-flex`)**:
  - **Left Column (`.hero-col-1`)**:
    - Strictly ONE `<h1>` with gradient highlight span (`.text-highlight-cyan`):
      `<h1>Custom Web Development Company in <span class="text-highlight-cyan">Saskatoon</span></h1>`
    - Engaging lead paragraphs focusing on Saskatoon's business & tech growth.
    - Highlight checklist with checkmarks (`&#10003;`).
    - Primary Pill CTA Button (`.btn-primary-pill`) linking to `#lead-form`.
  - **Right Column (`.hero-col-2.hero-form-card`)**:
    - Lead capture card container (`var(--bg-dark-card)` or elevated card).
    - Form title: `<h2>Get Started Today</h2>` with subtitle.
    - Fields: First Name (`fname`), Last Name (`lname`), Work Email (`email`), Phone (`phone`), Comments (`comments`).
    - Submit Button: Full-width `.btn-primary-pill.w-100`.
    - Privacy guarantee tag: `🔒 Your information is 100% confidential and secure.`

---

## 5. Strict SEO & Heading Hierarchy Rules

1. **Single `<h1>` Tag**:
   - The page must have strictly **ONE `<h1>`** located in the Hero Section.
   - Never duplicate `<h1>` anywhere on the page.
2. **Sequential Heading Hierarchy**:
   - `<h1>` (Hero) &rarr; `<h2>` (Main Sections) &rarr; `<h3>` (Cards / Features / Accordion questions) &rarr; `<h4>` (Inner items).
   - Skipping heading levels (e.g. `<h1>` &rarr; `<h3>`) is strictly prohibited.
3. **Semantic HTML5 Tags**:
   - Use `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<form>`, `<label>`, `<input>`, `<textarea>`, `<button>` instead of generic `<div>` wrappers.

---

## 6. Accessibility & ARIA Label Standards

1. **Anchor Tags (`<a>`)**:
   - Every link MUST have descriptive `aria-label` and `title` attributes.
   - Example: `<a href="#lead-form" class="btn-primary-pill" aria-label="Request a custom quote for Saskatoon web development" title="Request A Free Quote">Request A Free Quote</a>`
   - Never wrap block elements (`<p>`, `<div>`, `<h3>`) inside `<a>`. Always wrap `<a>` inside the block element.
   - Empty/placeholder links must use `href="javascript:void(0)"`.
2. **Buttons & Form Controls**:
   - All buttons must have `aria-label` and `title`.
   - All input and textarea fields must have matching `<label for="...">` elements.
3. **Section Labels**:
   - Every `<section>` tag must have an explicit `aria-label` attribute summarizing its purpose.

---

## 7. Image Standards & Asset Specifications

1. **Realistic & Highly Relevant**:
   - Images must realistically represent modern Saskatoon industry verticals (AgTech, Mining/Energy, Healthcare, SaaS, Supply Chain & Logistics, Enterprise Tech).
2. **Clean & Unbranded (Zero Watermarks)**:
   - All images must be free of third-party stock watermarks, logo stamps, or distracting branding.
3. **Format & Performance**:
   - High-quality **WebP** format (`.webp`).
   - Include explicit `width`, `height`, and `loading="lazy"` attributes on all `<img>` tags.
4. **Descriptive `alt` Text**:
   - Every `<img>` must contain full descriptive, context-specific `alt` text. Generic values like `alt="image"` or empty `alt=""` are strictly forbidden.

---

## 8. Complete Page Section Architecture for Saskatoon

| # | Section Name | Background Theme | Heading Level | Description / Key Focus |
| :-: | :--- | :--- | :-: | :--- |
| **1** | **Hero Section** | Dark (`--bg-dark`) | `<h1>` | Saskatoon AI-Powered Custom Web Solutions + Lead Capture Form |
| **2** | **Digital Experience & Growth** | Light (`--bg-light`) | `<h2>` | Transforming Saskatoon business vision into scalable digital experiences |
| **3** | **Core Web Dev Services** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | Custom Website Development & Web Application Development |
| **4** | **Ecommerce & Enterprise** | Light (`--bg-light`) | `<h2>` / `<h3>` | Scalable Ecommerce & Enterprise Web Platforms for Saskatchewan |
| **5** | **API & System Integration** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | Connecting ERP, CRM, and cloud ecosystems for local enterprises |
| **6** | **Why Saskatoon Businesses Invest** | Light (`--bg-light`) | `<h2>` / `<h3>` | Competitive advantages, local digital expansion & ROI |
| **7** | **Mid-Page Call to Action** | Dark (`--bg-dark`) | `<h2>` | High-impact CTA banner to capture interested prospects |
| **8** | **Modern AI Tech Stack** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | Frontend, Backend, Databases, Cloud & AI Technologies (Splide on mobile) |
| **9** | **Saskatoon Industry Solutions** | Light (`--bg-light`) | `<h2>` / `<h3>` | AgTech, Mining/Natural Resources, HealthTech, Logistics, Retail, SaaS |
| **10** | **Trusted Partner & Pillars** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | Full-stack engineering excellence, speed (<200ms), security |
| **11** | **Agile 6-Step Development Process** | Light (`--bg-light`) | `<h2>` / `<h3>` | Discovery &rarr; UX &rarr; UI &rarr; AI Dev &rarr; Testing &rarr; Support |
| **12** | **Dedicated Developers & Case Studies** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | On-demand developers + Saskatchewan & North American case studies |
| **13** | **Frequently Asked Questions (FAQ)** | Light (`--bg-light`) | `<h2>` / `<h3>` | Accessible single-expand accordion with Saskatoon-specific questions |
| **14** | **Bottom Contact & Consultation** | Dark (`--bg-dark`) | `<h2>` / `<h3>` | Contact channels (Email, Phone, Office) + Consultation Form |

---

## 9. QA & Pre-Launch Validation Checklist

- [ ] **CSS Separation**: All styles reside in `assets/css/saskatoon-style.css`.
- [ ] **Typography**: Poppins font applied across all elements.
- [ ] **Colors**: Exact hex color tokens used (`#17a1fe`, `#07152b`, `#0e2246`, `#00b4d8`, etc.).
- [ ] **Container**: Max width set to `calc(100% - 20%)` with `.vizz-container`.
- [ ] **Hero Layout**: 2-column split with Lead Form on the right.
- [ ] **Single H1**: Strictly one `<h1>` in the Hero section.
- [ ] **Heading Order**: Strictly `h1` &rarr; `h2` &rarr; `h3` &rarr; `h4` with zero skipped levels.
- [ ] **Images**: Realistic, relevant, WebP format, unbranded, zero watermarks, descriptive `alt` tags.
- [ ] **Accessibility**: All `<a>` and `<button>` have `aria-label` and `title`. All `<section>` tags have `aria-label`.
- [ ] **Links**: Placeholder links use `href="javascript:void(0)"`.
- [ ] **No Header/Footer**: Only `<main id="main-content" role="main">` content included.
