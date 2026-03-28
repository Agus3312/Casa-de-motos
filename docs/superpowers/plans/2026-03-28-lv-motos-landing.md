# LV Motos Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium dark-themed landing page for LV Motos (motorcycle parts & accessories shop) with GSAP-powered scroll animations, parallax hero, and WhatsApp-driven conversion flow.

**Architecture:** Static site (no bundler). HTML structure already exists with placeholder content. CSS has design tokens defined but no section styles. We'll update the HTML (fix name, update copy, add CDN scripts, restructure sections), write all CSS section styles mobile-first, then wire up GSAP animations and interactivity in a new `js/main.js`.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), GSAP 3 + ScrollTrigger (CDN), Google Fonts (Syncopate + Inter)

**Spec:** `docs/superpowers/specs/2026-03-28-lv-motos-landing-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `index.html` | Modify | Fix name to LV Motos, update hero copy, add GSAP CDN scripts, restructure brands marquee, replace catalog placeholder with cards, add hamburger button, add WhatsApp SVG |
| `css/styles.css` | Modify | All section styles (header, hero, brands, services, catalog, contact, footer, WhatsApp), responsive breakpoints, CSS animations (marquee, pulse), hover states |
| `js/main.js` | Create | GSAP timeline for hero entrance, ScrollTrigger for section animations, header glassmorphism on scroll, active nav link detection, mobile hamburger menu, reduced motion check |
| `img/hero-bg.jpg` | Create | Optimized panoramic photo of the shop (provided by client) |

---

### Task 1: Update HTML Foundation

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Fix all name references from "LB CORTAMOTOS" to "LV MOTOS"**

Replace every instance:
- Line 8: `<title>LV Motos | Repuestos y Accesorios de Motos</title>`
- Line 7: `<meta name="description" content="LV Motos - Repuestos, accesorios y service de motos en Santa Julia 1125.">`
- Line 24: `<span class="logo-red">LV</span> MOTOS`
- Line 153: `<h3>LV MOTOS</h3>`
- Line 154: `<p>Todo para tu moto.</p>`
- Line 155: `&copy; 2026 LV Motos. Todos los derechos reservados.`

- [ ] **Step 2: Update hero section copy**

Replace the hero content (lines 47-55) with:

```html
<div class="hero-text-wrapper">
    <p class="hero-subtitle">REPUESTOS · ACCESORIOS · SERVICE</p>
    <h1 class="hero-title">TODO PARA TU MOTO.<br><span class="text-accent">EN UN SOLO LUGAR.</span></h1>
    <p class="hero-description">
        Las mejores marcas en repuestos y accesorios para tu moto. Service con turno. Estamos en Santa Julia 1125.
    </p>
    <div class="hero-buttons">
        <a href="https://wa.me/numero?text=Hola,%20quiero%20hacer%20una%20consulta" class="btn btn-primary btn-large">Consultar por WhatsApp</a>
        <a href="#catalogo" class="btn btn-outline btn-large">Ver Catálogo</a>
    </div>
</div>
```

- [ ] **Step 3: Update brands marquee with duplicated content for infinite loop**

Replace the brands section inner content (lines 63-71) with:

```html
<div class="container container-brands">
    <p class="brands-label">Trabajamos con las mejores marcas</p>
</div>
<div class="brands-track-wrapper">
    <div class="brands-track">
        <span class="brand-item">WIRTZ</span>
        <span class="brand-item">CIRCUIT</span>
        <span class="brand-item">CASTROL</span>
        <span class="brand-item">MOTUL</span>
        <span class="brand-item">KAGE</span>
        <span class="brand-item">HAWK</span>
        <span class="brand-item">PROTAPER</span>
        <span class="brand-item">WONDER</span>
        <span class="brand-item">STANDARD</span>
        <!-- Duplicado para loop infinito -->
        <span class="brand-item">WIRTZ</span>
        <span class="brand-item">CIRCUIT</span>
        <span class="brand-item">CASTROL</span>
        <span class="brand-item">MOTUL</span>
        <span class="brand-item">KAGE</span>
        <span class="brand-item">HAWK</span>
        <span class="brand-item">PROTAPER</span>
        <span class="brand-item">WONDER</span>
        <span class="brand-item">STANDARD</span>
    </div>
</div>
```

- [ ] **Step 4: Update services section heading**

Replace "NUESTROS SERVICIOS" with "LO QUE OFRECEMOS" on line 79:

```html
<h2 class="section-title">LO QUE OFRECEMOS</h2>
<p class="section-subtitle">Soluciones integrales para tu moto.</p>
```

- [ ] **Step 5: Replace catalog placeholder with category cards**

Replace the catalog-placeholder div (lines 117-120) with:

```html
<div class="catalog-grid">
    <div class="catalog-card">
        <div class="catalog-card-img">
            <div class="catalog-icon-placeholder">🪖</div>
        </div>
        <h3 class="catalog-card-title">Cascos</h3>
        <p class="catalog-card-desc">Hawk y más. Seguridad con estilo.</p>
        <a href="https://wa.me/numero?text=Hola,%20quiero%20consultar%20por%20cascos" class="btn btn-primary">Consultar</a>
    </div>
    <div class="catalog-card">
        <div class="catalog-card-img">
            <div class="catalog-icon-placeholder">🛢️</div>
        </div>
        <h3 class="catalog-card-title">Lubricantes</h3>
        <p class="catalog-card-desc">Castrol, Motul. Las mejores marcas.</p>
        <a href="https://wa.me/numero?text=Hola,%20quiero%20consultar%20por%20lubricantes" class="btn btn-primary">Consultar</a>
    </div>
    <div class="catalog-card">
        <div class="catalog-card-img">
            <div class="catalog-icon-placeholder">🔧</div>
        </div>
        <h3 class="catalog-card-title">Accesorios</h3>
        <p class="catalog-card-desc">Grips, maniguetas, fundas. Wirtz, Circuit.</p>
        <a href="https://wa.me/numero?text=Hola,%20quiero%20consultar%20por%20accesorios" class="btn btn-primary">Consultar</a>
    </div>
    <div class="catalog-card">
        <div class="catalog-card-img">
            <div class="catalog-icon-placeholder">⚙️</div>
        </div>
        <h3 class="catalog-card-title">Transmisión</h3>
        <p class="catalog-card-desc">Cadenas, coronas, piñones.</p>
        <a href="https://wa.me/numero?text=Hola,%20quiero%20consultar%20por%20transmision" class="btn btn-primary">Consultar</a>
    </div>
</div>
```

- [ ] **Step 6: Update contact section copy**

Replace "ENCUÉNTRANOS" with "ENCONTRANOS" on line 128. Replace description on line 129:

```html
<h2 class="section-title">ENCONTRANOS</h2>
<p>Vení al local, te asesoramos.</p>
```

Add "Cómo llegar" button after the contact-list `</ul>`:

```html
<a href="https://maps.google.com/?q=Santa+Julia+1125" target="_blank" rel="noopener" class="btn btn-outline btn-directions">Cómo llegar</a>
```

- [ ] **Step 7: Add hamburger menu button in header**

After the `header-actions` div (line 37), add:

```html
<button class="hamburger" id="hamburger" aria-label="Abrir menú">
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
</button>
```

- [ ] **Step 8: Replace WhatsApp placeholder with SVG icon**

Replace the floating-wa link content (lines 160-162) with:

```html
<a href="https://wa.me/numero?text=Hola,%20quiero%20hacer%20una%20consulta" class="floating-wa" aria-label="Chat en WhatsApp" target="_blank" rel="noopener">
    <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.742 3.047 9.379L1.054 31.25l6.1-1.953A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.32 22.608c-.39 1.1-1.932 2.012-3.156 2.278-.84.18-1.937.32-5.63-1.21-4.72-1.956-7.76-6.737-7.998-7.05-.226-.314-1.9-2.532-1.9-4.83s1.2-3.426 1.626-3.896c.39-.43.922-.608 1.227-.608.15 0 .286.008.408.014.428.02.642.042.924.716.354.84 1.216 2.968 1.322 3.182.108.214.214.502.068.802-.134.306-.254.5-.468.77-.214.268-.44.476-.654.77-.194.256-.414.53-.174.96.24.428 1.066 1.756 2.288 2.846 1.57 1.4 2.894 1.836 3.306 2.036.308.15.674.128.922-.136.316-.34.708-.904 1.106-1.462.284-.396.642-.446.982-.3.344.134 2.178 1.028 2.552 1.214.374.188.624.28.716.436.09.156.09.902-.3 2.002z"/>
    </svg>
</a>
```

- [ ] **Step 9: Add GSAP CDN scripts before closing body tag**

Before `<script src="js/main.js" defer></script>` add:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

- [ ] **Step 10: Verify in browser**

Open `index.html` in browser. All content should be visible (unstyled sections, but correct text). Verify:
- Name says "LV Motos" everywhere
- Hero copy is updated
- Brands list shows real brands (duplicated)
- Catalog shows 4 cards
- WhatsApp icon appears (unstyled)
- No console errors about missing GSAP

- [ ] **Step 11: Commit**

```bash
git add index.html
git commit -m "feat: update HTML foundation - fix name to LV Motos, update copy, add GSAP CDN, restructure sections"
```

---

### Task 2: CSS — Header Styles (Sticky + Glassmorphism)

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add header base styles**

Append to `styles.css`:

```css
/* ==========================================================================
   HEADER
   ========================================================================== */

.main-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 16px 0;
    transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

.main-header.scrolled {
    background: rgba(11, 11, 14, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    white-space: nowrap;
}

.logo-red {
    color: var(--accent-red);
}
```

- [ ] **Step 2: Add nav link styles with animated underline**

```css
.nav-list {
    display: flex;
    gap: var(--space-lg);
    align-items: center;
}

.nav-link {
    position: relative;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
    transition: color var(--transition-fast);
}

.nav-link:hover,
.nav-link.active {
    color: var(--text-primary);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent-red);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-smooth);
}

.nav-link:hover::after,
.nav-link.active::after {
    transform: scaleX(1);
}
```

- [ ] **Step 3: Add header actions and hamburger styles**

```css
.header-actions .btn {
    font-size: 0.8rem;
    padding: 10px 20px;
}

/* Hamburger - hidden on desktop */
.hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    z-index: 1001;
}

.hamburger-line {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    transition: all 0.3s ease;
}

.hamburger.active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active .hamburger-line:nth-child(2) {
    opacity: 0;
}

.hamburger.active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}
```

- [ ] **Step 4: Add mobile nav styles**

```css
/* Mobile nav */
@media (max-width: 767px) {
    .main-nav {
        position: fixed;
        top: 0;
        right: -100%;
        width: 75%;
        max-width: 320px;
        height: 100vh;
        background: rgba(21, 21, 26, 0.95);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: var(--space-xxl) var(--space-lg);
        transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1000;
    }

    .main-nav.open {
        right: 0;
    }

    .nav-list {
        flex-direction: column;
        gap: var(--space-lg);
        align-items: flex-start;
    }

    .nav-link {
        font-size: 1.1rem;
    }

    .header-actions {
        display: none;
    }

    .hamburger {
        display: flex;
    }
}
```

- [ ] **Step 5: Verify in browser**

Open in browser. Header should be transparent at top, nav links visible on desktop with hover underlines. On mobile viewport (< 768px), hamburger icon should appear (menu doesn't open yet — JS not done).

- [ ] **Step 6: Commit**

```bash
git add css/styles.css
git commit -m "feat: add header styles with glassmorphism, nav underlines, mobile layout"
```

---

### Task 3: CSS — Hero Section

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add hero section styles**

Append to `styles.css`:

```css
/* ==========================================================================
   HERO
   ========================================================================== */

.hero-section {
    position: relative;
    height: 100vh;
    height: 100svh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: url('../img/hero-bg.jpg') center/cover no-repeat;
}

.hero-background-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(11, 11, 14, 0.6), rgba(11, 11, 14, 0.9));
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
}

.hero-text-wrapper {
    max-width: 720px;
}

.hero-subtitle {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 3px;
    color: var(--accent-red);
    margin-bottom: var(--space-md);
}

.hero-title {
    font-size: clamp(2.2rem, 6vw, 4.5rem);
    line-height: 1.1;
    margin-bottom: var(--space-lg);
}

.hero-description {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 520px;
    margin-bottom: var(--space-xl);
}

.hero-buttons {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
}
```

- [ ] **Step 2: Verify in browser**

Hero should fill viewport with dark overlay (image placeholder if `hero-bg.jpg` doesn't exist yet — that's fine, the overlay + dark bg covers it). Text should be large and readable. Buttons side by side.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add hero section styles with overlay and responsive typography"
```

---

### Task 4: CSS — Brands Marquee

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add marquee styles and animation**

Append to `styles.css`:

```css
/* ==========================================================================
   BRANDS MARQUEE
   ========================================================================== */

.brands-section {
    background: var(--bg-surface);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: var(--space-lg) 0;
    overflow: hidden;
}

.container-brands {
    margin-bottom: var(--space-md);
}

.brands-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
}

.brands-track-wrapper {
    overflow: hidden;
    width: 100%;
}

.brands-track {
    display: flex;
    gap: var(--space-xl);
    white-space: nowrap;
    animation: marquee 30s linear infinite;
}

.brands-track:hover {
    animation-play-state: paused;
}

.brand-item {
    font-family: var(--font-heading);
    font-size: 1rem;
    color: var(--accent-chrome);
    text-transform: uppercase;
    letter-spacing: 2px;
    flex-shrink: 0;
}

.brand-item::after {
    content: ' ·';
    color: var(--text-secondary);
    margin-left: var(--space-xl);
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
```

- [ ] **Step 2: Verify in browser**

Brands should scroll infinitely left. Hovering pauses the animation. Text is chrome/grey on dark surface.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add brands marquee with infinite CSS animation"
```

---

### Task 5: CSS — Services Bento Grid

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add section heading styles (shared)**

Append to `styles.css`:

```css
/* ==========================================================================
   SECTION HEADINGS (shared)
   ========================================================================== */

.section-heading {
    margin-bottom: var(--space-xl);
}

.section-heading.text-center {
    text-align: center;
}

.section-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: var(--space-sm);
}

.section-subtitle {
    color: var(--text-secondary);
    font-size: 1rem;
}
```

- [ ] **Step 2: Add bento grid layout and card styles**

```css
/* ==========================================================================
   SERVICES — BENTO GRID
   ========================================================================== */

.bento-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-md);
}

@media (min-width: 768px) {
    .bento-grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
    }

    .card-large {
        grid-row: 1 / 3;
    }
}

.bento-card {
    background: var(--bg-surface);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    transition: border-color var(--transition-smooth), transform var(--transition-smooth);
}

.bento-card:hover {
    border-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.02);
}

.bento-card.bg-accent {
    background: var(--accent-red);
    border-color: var(--accent-red);
}

.bento-card.bg-accent:hover {
    border-color: var(--accent-red-hover);
}

.card-content h3 {
    font-size: 1.3rem;
    margin-bottom: var(--space-sm);
}

.card-content p {
    color: var(--text-secondary);
    line-height: 1.7;
}

.bento-card.bg-accent .card-content p {
    color: rgba(0, 0, 0, 0.7);
}

.mt-4 {
    margin-top: var(--space-lg);
}
```

- [ ] **Step 3: Verify in browser**

Desktop: 2-column bento layout. Card 1 spans 2 rows on the left. Red card has accent background. Hover scales cards subtly. Mobile: stacked vertically.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: add bento grid layout and card styles for services section"
```

---

### Task 6: CSS — Catalog Section

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add catalog grid and card styles**

Append to `styles.css`:

```css
/* ==========================================================================
   CATALOG — DESTACADOS
   ========================================================================== */

.catalog-section {
    background: var(--bg-main);
}

.catalog-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-md);
}

.catalog-card {
    background: var(--bg-surface);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    text-align: center;
    transition: border-color var(--transition-smooth), transform var(--transition-smooth);
}

.catalog-card:hover {
    border-color: var(--accent-red);
    transform: translateY(-4px);
}

.catalog-card-img {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-md);
}

.catalog-icon-placeholder {
    font-size: 2.5rem;
}

.catalog-card-title {
    font-size: 1rem;
    margin-bottom: var(--space-sm);
}

.catalog-card-desc {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: var(--space-lg);
}

.catalog-card .btn {
    width: 100%;
    font-size: 0.8rem;
    padding: 10px 16px;
}
```

- [ ] **Step 2: Add mobile carrusel styles**

```css
/* Catalog mobile carousel */
@media (max-width: 767px) {
    .catalog-grid {
        grid-template-columns: none;
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: var(--space-md);
        padding-bottom: var(--space-md);
        -webkit-overflow-scrolling: touch;
    }

    .catalog-card {
        min-width: 260px;
        flex-shrink: 0;
        scroll-snap-align: start;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .catalog-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

- [ ] **Step 3: Verify in browser**

Desktop: 4-column grid. Tablet: 2-column. Mobile: horizontal carrusel with snap scroll. Cards hover with red border and lift.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: add catalog grid with responsive carousel for mobile"
```

---

### Task 7: CSS — Contact Section

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add contact layout and styles**

Append to `styles.css`:

```css
/* ==========================================================================
   CONTACT
   ========================================================================== */

.contact-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-xl);
    align-items: start;
}

@media (min-width: 768px) {
    .contact-wrapper {
        grid-template-columns: 1fr 1fr;
    }
}

.contact-info p {
    color: var(--text-secondary);
    margin-top: var(--space-sm);
    margin-bottom: var(--space-lg);
}

.contact-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
}

.contact-list li {
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.contact-list li strong {
    color: var(--text-primary);
}

.btn-directions {
    font-size: 0.85rem;
}

.map-placeholder {
    background: var(--bg-surface);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--radius-lg);
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.9rem;
}
```

- [ ] **Step 2: Verify in browser**

Desktop: 2-column layout. Contact info left, map placeholder right. Mobile: stacked.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add contact section layout and styles"
```

---

### Task 8: CSS — Footer + WhatsApp Floating Button

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add footer styles**

Append to `styles.css`:

```css
/* ==========================================================================
   FOOTER
   ========================================================================== */

.main-footer {
    background: var(--bg-surface);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: var(--space-xl) 0;
}

.footer-content {
    text-align: center;
}

.footer-brand h3 {
    font-size: 1.2rem;
    margin-bottom: var(--space-sm);
}

.footer-brand p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: var(--space-lg);
}

.footer-bottom {
    color: var(--text-secondary);
    font-size: 0.8rem;
}
```

- [ ] **Step 2: Add WhatsApp floating button styles**

```css
/* ==========================================================================
   WHATSAPP FLOATING BUTTON
   ========================================================================== */

.floating-wa {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: transform var(--transition-fast);
    animation: wa-pulse 2s ease-in-out infinite;
}

.floating-wa:hover {
    transform: scale(1.1);
}

@keyframes wa-pulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
    }
    50% {
        box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
    }
}
```

- [ ] **Step 3: Verify in browser**

Footer shows centered content on dark surface. WhatsApp button is green circle in bottom-right with pulsing shadow effect. Hover enlarges it.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: add footer and WhatsApp floating button with pulse animation"
```

---

### Task 9: CSS — Reduced Motion + Focus Styles

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add accessibility styles**

Append to `styles.css`:

```css
/* ==========================================================================
   ACCESSIBILITY
   ========================================================================== */

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .brands-track {
        animation: none;
    }
}

/* Focus styles */
:focus-visible {
    outline: 2px solid var(--accent-red);
    outline-offset: 2px;
}

a:focus:not(:focus-visible),
button:focus:not(:focus-visible) {
    outline: none;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "feat: add reduced motion and focus-visible accessibility styles"
```

---

### Task 10: JS — Create main.js with Header Scroll + Active Nav

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create main.js with IIFE wrapper, reduced motion check, and header scroll**

Create `js/main.js`:

```javascript
(function () {
    'use strict';

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================================================
    // HEADER — Glassmorphism on scroll
    // ==========================================================================
    const header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ==========================================================================
    // ACTIVE NAV LINK — Intersection Observer
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -60% 0px' }
    );

    sections.forEach((section) => navObserver.observe(section));

    // ==========================================================================
    // MOBILE MENU
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('open');
        });

        // Close menu when clicking a link
        mainNav.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mainNav.classList.remove('open');
            });
        });
    }
})();
```

- [ ] **Step 2: Verify in browser**

- Scroll down: header gets glass background
- Scroll to different sections: corresponding nav link gets underline
- Mobile viewport: hamburger opens/closes side menu, clicking a link closes menu

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add header glassmorphism, active nav detection, and mobile menu"
```

---

### Task 11: JS — GSAP Hero Entrance Animation

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add GSAP hero timeline after the mobile menu block**

Add before the closing `})();`:

```javascript
    // ==========================================================================
    // GSAP — Register ScrollTrigger
    // ==========================================================================
    gsap.registerPlugin(ScrollTrigger);

    // Skip all GSAP animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    // ==========================================================================
    // GSAP — Hero entrance animation
    // ==========================================================================
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
        .from('.hero-subtitle', {
            opacity: 0,
            y: -30,
            duration: 0.6,
        })
        .from(
            '.hero-title',
            {
                opacity: 0,
                y: 50,
                duration: 0.6,
            },
            '-=0.3'
        )
        .from(
            '.hero-description',
            {
                opacity: 0,
                y: 30,
                duration: 0.5,
            },
            '-=0.2'
        )
        .from(
            '.hero-buttons',
            {
                opacity: 0,
                y: 30,
                duration: 0.5,
            },
            '-=0.2'
        );
```

- [ ] **Step 2: Verify in browser**

Reload page. Hero elements should animate in sequentially: subtitle drops from above, title slides up, description fades in, buttons slide up. Total ~1.5s. Smooth ease.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add GSAP hero entrance animation timeline"
```

---

### Task 12: JS — GSAP Hero Parallax

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add parallax ScrollTrigger after the hero timeline**

```javascript
    // ==========================================================================
    // GSAP — Hero parallax
    // ==========================================================================
    gsap.to('.hero-section', {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });
```

- [ ] **Step 2: Verify in browser**

Scroll down past the hero. Background image should move slower than content (parallax effect). Even without `hero-bg.jpg`, the overlay gradient shifting is visible.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add GSAP ScrollTrigger parallax to hero background"
```

---

### Task 13: JS — GSAP Scroll Animations for All Sections

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add services section scroll animation**

```javascript
    // ==========================================================================
    // GSAP — Services bento grid
    // ==========================================================================
    gsap.from('.section-heading', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
    });

    gsap.from('.bento-card', {
        scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
    });
```

- [ ] **Step 2: Add catalog section scroll animation**

```javascript
    // ==========================================================================
    // GSAP — Catalog cards
    // ==========================================================================
    gsap.from('.catalog-section .section-title', {
        scrollTrigger: {
            trigger: '.catalog-section',
            start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
    });

    // Only animate cards on desktop (mobile has carousel)
    if (window.innerWidth >= 768) {
        gsap.from('.catalog-card', {
            scrollTrigger: {
                trigger: '.catalog-grid',
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
        });
    }
```

- [ ] **Step 3: Add contact section scroll animation**

```javascript
    // ==========================================================================
    // GSAP — Contact section
    // ==========================================================================
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 0.6,
        ease: 'power3.out',
    });

    gsap.from('.contact-map', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        duration: 0.6,
        ease: 'power3.out',
    });
```

- [ ] **Step 4: Verify in browser**

Scroll through the entire page:
- Services: heading fades in, then 3 bento cards stagger in from below
- Catalog: title fades in, then 4 cards stagger in from below (desktop only)
- Contact: info slides from left, map slides from right

- [ ] **Step 5: Commit**

```bash
git add js/main.js
git commit -m "feat: add GSAP scroll animations for services, catalog, and contact sections"
```

---

### Task 14: Final Polish — Image Placeholder + Full Page Verification

**Files:**
- Create: `img/` directory (for hero-bg.jpg when available)

- [ ] **Step 1: Create img directory**

```bash
mkdir -p img
```

- [ ] **Step 2: Add a CSS fallback for missing hero image**

Add to the `.hero-section` rule in `css/styles.css`, modify the existing rule to include a fallback gradient:

```css
.hero-section {
    position: relative;
    height: 100vh;
    height: 100svh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--bg-main) url('../img/hero-bg.jpg') center/cover no-repeat;
}
```

The `var(--bg-main)` acts as fallback when the image doesn't exist.

- [ ] **Step 3: Full page verification**

Open in browser and verify the complete flow:
1. Page loads → hero animates in (subtitle, title, description, buttons)
2. Header is transparent over hero
3. Scroll down → header gains glass effect
4. Brands marquee scrolls continuously
5. Services cards animate in when scrolled to
6. Catalog cards animate in on desktop, carousel works on mobile
7. Contact info and map animate in from sides
8. WhatsApp button pulses in bottom-right corner
9. Nav links highlight based on current section
10. Mobile: hamburger menu opens/closes, links work

- [ ] **Step 4: Commit**

```bash
git add img/ css/styles.css
git commit -m "feat: add img directory and hero image fallback"
```

---

## Summary

| Task | Description | Files |
|---|---|---|
| 1 | HTML foundation — name, copy, structure | `index.html` |
| 2 | CSS — Header + glassmorphism + mobile nav | `css/styles.css` |
| 3 | CSS — Hero section | `css/styles.css` |
| 4 | CSS — Brands marquee | `css/styles.css` |
| 5 | CSS — Services bento grid | `css/styles.css` |
| 6 | CSS — Catalog grid + mobile carousel | `css/styles.css` |
| 7 | CSS — Contact section | `css/styles.css` |
| 8 | CSS — Footer + WhatsApp button | `css/styles.css` |
| 9 | CSS — Accessibility (reduced motion, focus) | `css/styles.css` |
| 10 | JS — Header scroll, active nav, mobile menu | `js/main.js` |
| 11 | JS — GSAP hero entrance animation | `js/main.js` |
| 12 | JS — GSAP hero parallax | `js/main.js` |
| 13 | JS — GSAP scroll animations (all sections) | `js/main.js` |
| 14 | Final polish — image fallback + full verification | `img/`, `css/styles.css` |
