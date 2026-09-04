# 🎨 TransHub Design Inspiration & Technical Guidelines (for Vizz Web Pages)

> **Document Purpose**: Complete design-wise inspiration breakdown based on the **TransHub React/Next.js Design System** and visual layout patterns from reference screenshots.
> 
> **Core Rule**: All visual structures, micro-interactions, collage layouts, floating badges, and step-by-step process timelines are adopted from this inspiration, while **STRICTLY preserving the Colors Palette and Poppins Typography used in `healthcare.html` / `vizz-file.md`**.

---

## 1. Design Philosophy & Visual DNA

The inspiration layout combines **bold enterprise authority**, **asymmetrical modern grids**, and **conversion-focused visual hierarchy**:

| Design Aspect | Inspiration Concept (TransHub) | Vizz Web Implementation (`healthcare.html` Palette) |
| :--- | :--- | :--- |
| **Typography** | Modern sans-serif, bold punchy headings | **Google Font: Poppins** (Weights: 400, 500, 600, 700, 800) |
| **Primary Brand Color** | Blue / Cyan interactive primary | **`--btn-color: #248fce;` / `--btn-primary-hover: #006ed4;`** |
| **Accent & Highlight** | Vibrant Coral / Orange accent | **`--accent-coral: #ff6b4a;`** (Used for category tags, step numbers, badge rings, icons) |
| **Dark Sections** | Deep navy / slate backgrounds | **`--bg-dark: #07152b;` / `--bg-dark-card: #0e2246;` / `--bg-dark-card-alt: #132b57;`** |
| **Light Sections** | Crisp white and soft icy blue-white | **`--bg-light: #ffffff;` / `--bg-light-alt: #f4f8fc;` / `--bg-light-card: #edf4fb;`** |
| **UI Shapes & Radii** | Rounded modern cards & pill badges | **Cards: 16px / Sub-cards: 12px / Buttons: 10px / Badges: 50px pill** |
| **Floating Badges** | Glassmorphism & drop shadow metrics | **Stat badges with icons, metric numbers, and soft elevated shadows** |

---

## 2. Core Color Tokens & CSS Variables (Exact Healthcare Match)

```css
/* ==========================================================================
   VIZZ WEB SOLUTIONS - INSPIRATION DESIGN TOKENS
   Source: healthcare.html / vizz-file.md
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
  --accent-coral: #ff6b4a;

  /* 🌌 Background Colors */
  --bg-dark: #07152b;
  --bg-dark-card: #0e2246;
  --bg-dark-card-alt: #132b57;
  --bg-dark-alt: #051022;
  --bg-dark-deep: #030b17;
  --bg-light: #ffffff;
  --bg-light-alt: #f4f8fc;
  --bg-light-card: #edf4fb;

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
  --border-cyan-glow: rgba(0, 180, 216, 0.4);

  /* Shadows */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.05);
  --shadow-card-elevated: 0 16px 36px rgba(0, 0, 0, 0.22);
  --shadow-btn: 0 8px 25px rgba(0, 136, 255, 0.35);

  /* Layout Spacing */
  --max-width-container: calc(100% - 20%);
}
```

---

## 3. Section-by-Section Design Patterns (Inspired by TransHub)

### Pattern 1: Hero Section with Asymmetrical Visual & Stat Floatings
```
+-----------------------------------------------------------------------+
|  // CATEGORY TAG (Coral Accent)                                       |
|  Bold Catchy Title with Cyan Span                     [ HERO IMAGE ]  |
|  Descriptive paragraph text explaining solutions.      +------------+ |
|                                                        | [Stat 1]   | |
|  [ Primary Pill CTA ]   (Phone/Chat Button)            | 10k+ Done  | |
|                                                        +------------+ |
|  (Avatar Group) 1,000+ Happy Enterprise Clients                       |
+-----------------------------------------------------------------------+
```
- **Eyebrow**: Uppercase category tag with subtle decorative lines (`// RETAIL & E-COMMERCE TECH`).
- **Heading**: Large fluid `<h1>` (44px - 50px desktop) with selective highlight span (`text-highlight-cyan`).
- **CTA Group**: Primary button (`.btn-primary-pill`) alongside a secondary call/consultation link with icon.
- **Visual**: Right-column hero image with 1–2 floating glassmorphism stat cards (e.g. `99.9% Cloud Uptime`, `10M+ Daily Orders`).

---

### Pattern 2: Asymmetric Advantage / Overview (Image Collage + Features)
```
+------------------------------------+----------------------------------+
|  [ IMAGE COLLAGE ]                 |  // THE ADVANTAGES               |
|  +-------------------------------+ |  Building Scalable Omnichannel   |
|  | Main Vertical Image           | |  High-converting platforms...    |
|  |                               | |                                  |
|  | +-----------+   +-----------+ | |  +------------+  +------------+  |
|  | | Badge 1   |   | Sub Image | | |  | [Icon]     |  | [Icon]     |  |
|  | | 100k+ SKUs|   |           | | |  | Feature 1  |  | Feature 2  |  |
|  | +-----------+   +-----------+ | |  +------------+  +------------+  |
|  +-------------------------------+ |  [ Primary CTA ]   (Call Us)     |
+------------------------------------+----------------------------------+
```
- **Collage Layout**: A 2-photo or 3-photo asymmetrical stack with overlapping borders and rounded corners (`border-radius: 16px`).
- **Overlaid Badges**: Accent floating badge pinned to the corner with a metric counter (e.g. `30+ ERP Integrations`).
- **Feature Cards**: Two small side-by-side light-grey boxes (`--bg-light-card: #edf4fb;`) with coral/cyan vector icons.

---

### Pattern 3: Specialized Capabilities Card Slider (TransHub Transport Card Style)
```
+-----------------------------------------------------------------------+
|  // OUR CAPABILITIES                                     [ < ]  [ > ] |
|  Specialized Digital Retail Solutions                                 |
+-----------------------------------------------------------------------+
| +--------------------+ +--------------------+ +--------------------+   |
| | [Icon] Card Title  | | [Icon] Card Title  | | [Icon] Card Title  |   |
| | +----------------+ | | +----------------+ | | +----------------+ |   |
| | | Image Banner   | | | | Image Banner   | | | | Image Banner   | |   |
| | +----------------+ | | +----------------+ | | +----------------+ |   |
| | Summary Text...    | | Summary Text...    | | Summary Text...    |   |
| | [ Read More v ]    | | [ Read More v ]    | | [ Read More v ]    |   |
| +--------------------+ +--------------------+ +--------------------+   |
+-----------------------------------------------------------------------+
```
- **Card Header**: Rounded icon container with `--accent-coral` icon + `<h3>` card title.
- **Card Image**: Centered image thumbnail with `140px` fixed height and `10px` border-radius.
- **Card Content**: Paragraph with inline anchor tags.
- **Interactive Read More**:
  - *Desktop*: Expands individual card to `max-height: 300px; overflow-y: auto;`.
  - *Mobile*: Expands all cards to full height.

---

### Pattern 4: Step-by-Step Process Timeline (Horizontal Connected Workflow)
```
+-----------------------------------------------------------------------+
|  // HOW WE WORK                                                       |
|  Step-by-Step E-Commerce Development Process                          |
|                                                                       |
|      ( 01 )              ( 02 )              ( 03 )            ( 04 ) |
|    +--------+   --->   +--------+   --->   +--------+   ---> +--------+|
|    | Circular|         | Circular|         | Circular|       |Circular||
|    | Image   |         | Image   |         | Image   |       | Image  ||
|    +--------+          +--------+          +--------+        +--------+|
|     Discovery            Design              Build             Deploy |
|    Requirements...      Wireframes...       Clean Code...     Scaling |
+-----------------------------------------------------------------------+
```
- **Numbered Steps**: Floating number badges (`01`, `02`, `03`, `04`) with coral background.
- **Circular Thumbnails**: High-res circular photo with double border ring (`4px solid #ffffff`, outer glow).
- **Connecting Line**: Curved or dashed line with directional arrows connecting the step nodes.

---

### Pattern 5: High-Impact Vertical Showcase Gallery
```
+-----------------------------------------------------------------------+
|  // SHOWCASE & PROJECTS                                               |
|  Transforming Modern Retail Experiences                               |
|                                                                       |
|  +--------------+  +--------------+  +--------------+  +------------+ |
|  |              |  |              |  |              |  |            | |
|  | Full-Bleed   |  | Full-Bleed   |  | Full-Bleed   |  | Full-Bleed | |
|  | Image        |  | Image        |  | Image        |  | Image      | |
|  |              |  |              |  |              |  |            | |
|  | +----------+ |  | +----------+ |  | +----------+ |  |+----------+| |
|  | | [Tag]    | |  | | [Tag]    | |  | | [Tag]    | |  || [Tag]    || |
|  | | Title    | |  | | Title    | |  | | Title    | |  || Title    || |
|  | +----------+ |  | +----------+ |  | +----------+ |  |+----------+| |
|  +--------------+  +--------------+  +--------------+  +------------+ |
+-----------------------------------------------------------------------+
```
- **Vertical Cards**: Aspect ratio ~ 3:4 with full background photo.
- **Bottom Caption Box**: White rounded floating container at the bottom of the card holding a category badge (`--accent-coral`) and project title.
- **Hover Micro-interaction**: Image subtly scales up (`transform: scale(1.05)`), caption box translates upward.

---

### Pattern 6: Interactive Cost Estimator / Calculation Widget Card
```
+-----------------------------------------------------------------------+
|  [ DARK THEMED BACKGROUND SECTION ]                                   |
|                                                                       |
|  +------------------------------------------------------------------+ |
|  | [ TAB 1: Quick Estimate ]   [ TAB 2: Custom Enterprise Scope ]   | |
|  |                                                                  | |
|  | [ Store Type v ]    [ Product Range v ]    [ Integrations v ]    | |
|  |                                                                  | |
|  | [ Calculate Estimate Button ]            ( Estimated ROI Badge ) | |
|  +------------------------------------------------------------------+ |
+-----------------------------------------------------------------------+
```
- **Container**: White or dark elevated widget card placed over high-contrast background.
- **Form Controls**: Rounded inputs (`border-radius: 8px`), custom select arrows, clean labels.
- **Action**: Primary CTA button that smoothly triggers lead form consultation.

---

### Pattern 7: Customer Reviews & Social Proof Split
```
+------------------------------------+----------------------------------+
|  // CLIENT FEEDBACK                |  [ FEATURED CLIENT/STORE IMAGE ] |
|  What Our Retail Partners Say      |  +-----------------------------+ |
|                                    |  | Modern Retail Showcase Photo| |
|  +-------------------------------+ |  |                             | |
|  | ★★★★★                         | |  | +-------------------------+ | |
|  | "Vizz Web revamped our store  | |  | | 99.8% On-Time Delivery  | | |
|  | and sales jumped 180%..."     | |  | +-------------------------+ | |
|  | (Avatar) Jane Doe, Fashion D2C| |  +-----------------------------+ |
|  +-------------------------------+ |                                  |
+------------------------------------+----------------------------------+
```
- **Star Rating**: 5 gold/coral stars.
- **Avatar + Metadata**: Circular author avatar, name, and company designation.
- **Image Side**: Large crisp store/warehouse photo with floating satisfaction metrics.

---

### Pattern 8: Magazine-Style Blog & Insights Grid
```
+-----------------------------------------------------------------------+
|  // LATEST INSIGHTS                                                   |
|  Read Our Retail & E-Commerce Engineering Articles                    |
|                                                                       |
|  +--------------------+  +--------------------+  +--------------------+
|  | [ Image ]          |  | [ Image ]          |  | [ Image ]          |
|  | [Tag] 04 Sep 2026  |  | [Tag] 04 Sep 2026  |  | [Tag] 04 Sep 2026  |
|  | Headless Commerce  |  | AI Recommenders    |  | POS Synchronization|
|  | Architecture Guide |  | for 3x AOV Growth  |  | in Omni-Retail     |
|  | Read Article ->    |  | Read Article ->    |  | Read Article ->    |
|  +--------------------+  +--------------------+  +--------------------+
+-----------------------------------------------------------------------+
```
- **Blog Cards**: White cards with 16px radius, rounded top image (`border-radius: 12px`), date badge, bold title, and inline arrow link (`Read Article ->`).

---

## 4. Reusable CSS Classes & Component Dictionary

```css
/* Eyebrow Category Tag */
.section-eyebrow {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent-coral);
  margin-bottom: 12px;
}

/* Primary Pill CTA */
.btn-primary-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 30px !important;
  border-radius: var(--border-radius-pill) !important;
  background: var(--btn-color);
  border: 1px solid var(--btn-color);
  color: var(--white-color) !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  font-family: var(--font-family) !important;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary-pill:hover {
  background: var(--btn-color-hover);
  border: 1px solid var(--btn-color);
  color: var(--btn-color) !important;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 136, 255, 0.5);
}

/* Floating Stat Badges */
.floating-stat-badge {
  position: absolute;
  background: #ffffff;
  padding: 12px 18px;
  border-radius: 12px;
  box-shadow: var(--shadow-card-elevated);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 5;
  border: 1px solid var(--border-light);
}

.floating-stat-number {
  font-size: 22px;
  font-weight: 800;
  color: var(--btn-primary);
  line-height: 1;
}

.floating-stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted-light);
  line-height: 1.2;
}

/* TransHub Style Capabilities Card */
.transport-style-card {
  background: var(--bg-light);
  border-radius: var(--border-radius-card);
  padding: 24px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.transport-style-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card-elevated);
  border-color: var(--btn-primary);
}

/* Step Process Node */
.process-step-node {
  text-align: center;
  position: relative;
}

.process-step-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 18px;
  overflow: hidden;
  border: 4px solid #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  position: relative;
}

.process-step-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.process-step-number {
  position: absolute;
  top: -8px;
  right: calc(50% - 60px);
  background: var(--accent-coral);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
}
```

---

## 5. Responsive Behavior & Slider Rules

1. **Desktop Viewports (`>= 992px`)**:
   - Native CSS Grid layouts for multi-card sections (`grid-template-columns: repeat(3, 1fr)` or `repeat(4, 1fr)`).
   - Splide sliders are automatically destroyed via JavaScript (`splide.destroy(true)`).
2. **Mobile & Tablet Viewports (`<= 991px`)**:
   - Multi-card sections turn into smooth touch-swipable Splide.js carousels with drag, autoplay, and bullet pagination.
3. **Card Read More Functionality**:
   - **Desktop**: Expands only the clicked card to `max-height: 300px` with custom scrollable content.
   - **Mobile**: Expands all cards to full height simultaneously.

---

## 6. Checklist for Developing New Pages

- [x] Use Google Font **Poppins** across all text elements.
- [x] Use exact color palette from `healthcare.html` (`#248fce`, `#ff6b4a`, `#07152b`, `#0e2246`, `#f4f8fc`, `#ffffff`).
- [x] Strictly ONE `<h1>` in the Hero section.
- [x] Multi-image collages with floating metric badges.
- [x] Step-by-step process flow with numbered circular nodes and connecting arrows.
- [x] TransHub-style cards with icons, image banners, and interactive read-more toggles.
- [x] Single-open accessible FAQ accordion.
- [x] High-converting lead form with smooth-scroll triggers (`#lead-form`).
- [x] Conclude every completed task with: `"Sab Kuch Ok Hai Jigar"`.
