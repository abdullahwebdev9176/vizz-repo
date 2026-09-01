# 📋 Frontend Design & SEO Rules (vizz-file)

> **Scope**: Standard guidelines and instructions for designing and coding any new page body. (Header and Footer are excluded and should not be created).

---

## 1. Core Color Palette & CSS Variables

Sirf zaroori aur selected colors use karne hain:

```css
:root {
  /* 🔘 Button & Accent Colors */
  --btn-primary: #0088ff;
  --btn-primary-hover: #006ed4;
  --btn-cyan: #00b4d8;
  --btn-color: #17a1fe;
  --btn-color-hover: #ffffff;

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
  --white-color: #ffffff;

  /* UI Borders & Radii */
  --border-radius-pill: 50px;
  --border-radius-card: 12px;
  --border-radius-input: 8px;
  --border-light: #e2e8f0;
  --border-dark: #1b3252;

  /* 🔤 Typography & Font Family */
  --font-family: 'Poppins', sans-serif;

  /* Container */
  --max-width-container: 1240px;
}
```

---

## 2. Typography & Font Family

Tamam pages par **Poppins** font family use karni hai:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  font-family: "Poppins", sans-serif;
  color: var(--text-muted-light);
  line-height: 1.65;
}
```

### Heading Scale & Weights:
* `<h1>`: **44px - 50px** (Desktop) / **30px - 34px** (Mobile) | Weight: **800** | Line Height: **1.2** *(Strictly ONE per page in Hero)*
* `<h2>`: **32px - 38px** (Desktop) / **26px - 28px** (Mobile) | Weight: **700** | Line Height: **1.25** *(Section Headings)*
* `<h3>`: **20px - 24px** (Desktop) / **18px - 20px** (Mobile) | Weight: **600** *(Card / Sub-headings)*
* `<h4>`: **16px - 18px** | Weight: **600**
* `<p>`: **15px - 16px** | Weight: **400** | Line Height: **1.7**

---

## 3. Button Standards & Styling

### 3.1. Primary Pill CTA Button (Mandatory)
```css
.btn-primary-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px !important;
  padding-right: 30px !important;
  padding-bottom: 10px !important;
  padding-left: 30px !important;
  border-radius: 10px !important;
  background: var(--btn-color);
  border:1px solid var(--btn-color);
  color: var(--white-color) !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  font-family: 'Poppins', sans-serif !important;
}

.btn-primary-pill:hover {
  background: var(--btn-color-hover);
  border: 1px solid var(--btn-color);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 136, 255, 0.5);
  color: var(--btn-color);
}

.btn-primary-pill:active {
  transform: translateY(0);
}
```

### 3.2. Secondary Pill CTA Button (Mandatory)
```css
.btn-secondary-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px !important;
  padding-right: 30px !important;
  padding-bottom: 10px !important;
  padding-left: 30px !important;
  border-radius: 10px !important;
  background: var(--white-color);
  border:1px solid var(--btn-color);
  color: var(--btn-color) !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  font-family: 'Poppins', sans-serif !important;
}

.btn-secondary-pill:hover {
  background: var(--btn-color-hover);
  border: 1px solid var(--btn-color);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 136, 255, 0.5);
  color: var(--btn-color);
}

.btn-secondary-pill:active {
  transform: translateY(0);
}
```


---

## 4. Page Section Architecture (Rhythm & Layouts)

1. **Hero Section (`var(--bg-dark)`)**:
   * Page ka **single `<h1>`** yahan aayega.
   * 2-column split (Left: Headline & CTA, Right: Lead Form Card).
2. **Alternating Sections**:
   * **Light Section (`var(--bg-light)` / `var(--bg-light-alt)`)**: White ya light background, dark text (`var(--text-dark)`), light cards.
   * **Dark Section (`var(--bg-dark)`)**: Dark background, white text (`var(--text-white)`), dark cards (`var(--bg-dark-card)`).
3. **Card Grids**:
   * Responsive 2-column ya 3-column grids (`grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`).

---

## 5. Strict SEO & Heading Hierarchy Rules

1. **Single `<h1>` Rule**:
   * Har page par strictly **aik `<h1>`** hoga jo sirf Hero Section me aayega.
   * Kisi doosri jagah `<h1>` use karna strictly prohibited hai.
2. **Heading Level Sequence**:
   * `<h1>` -> `<h2>` -> `<h3>` -> `<h4>`
   * Kabhi bhi heading levels ko skip nahi karna (e.g. `<h1>` ke foran baad `<h3>` lagana SEO error hai).

---

## 6. Semantic HTML5 Requirements

* Page body ko hamesha `<main id="main-content" role="main">` me wrap karein.
* Standard semantic tags use karein: `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<form>`, `<label>`, `<input>`, `<textarea>`, `<button>`.
* Header aur Footer ka markup **nahi** banana.

---

## 7. Accessibility (ARIA & Alt Text Rules)

1. **Descriptive `alt` Text on All Images**:
   * Har `<img>` tag me descriptive aur contextual `alt` attribute lazmi hoga.
   * Khali `alt=""` ya generic `alt="image"` bilkul manaa hai.
2. **ARIA Labels on Links and Buttons**:
   * Har `<a>` aur `<button>` par explicit `aria-label` aur `title` attribute lazmi hoga.
3. **Form Controls**:
   * Har input/textarea ke liye matching `<label for="id">` hona lazmi hai.

---

## 8. Anchor Tag & Linking Standards

1. **No Block-Level Inside `<a>`**:
   * Kabhi bhi inline `<a>` ke andar `<p>`, `<div>`, `<h1>`-`<h6>` tags wrap na karein.
   * Hamesha `<h3><a href="..." aria-label="..." title="...">Title</a></h3>` format use karein.
2. **Placeholder Links**:
   * Khali `href=""` ya `href="#"` ki jagah hamesha `href="javascript:void(0)"` use karein.
3. **Fancybox Links**:
   * Agar `data-fancybox` attribute ho to `href` remove kar ke `data-src` use karein.

---

## 9. QA & Pre-Launch Checklist

- [ ] Poppins font family `@import` aur `font-family: "Poppins", sans-serif;` applied.
- [ ] Exactly one `<h1>` in Hero Section.
- [ ] Heading hierarchy (`h1` -> `h2` -> `h3` -> `h4`) followed without skips.
- [ ] All `<img>` tags have descriptive `alt` text.
- [ ] All `<a>` and `<button>` have `aria-label` and `title`.
- [ ] No header and footer in page markup.
- [ ] Placeholder links use `href="javascript:void(0)"`.
