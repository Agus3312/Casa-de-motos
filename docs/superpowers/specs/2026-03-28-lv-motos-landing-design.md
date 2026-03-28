# LV Motos — Landing Page Design Spec

## Resumen

Landing page premium para **LV Motos**, casa de repuestos y accesorios de motos ubicada en Santa Julia 1125. El objetivo es generar contactos por WhatsApp para consultas de repuestos y turnos de service. Estética dark, animaciones moderadas estilo Awwwards, powered by GSAP + ScrollTrigger.

---

## Stack Técnico

| Tecnología | Propósito |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 (custom properties, grid, flexbox) | Estilos, responsive, animaciones base |
| GSAP 3 + ScrollTrigger (CDN) | Animaciones de scroll, parallax, timelines |
| Google Fonts (Syncopate + Inter) | Tipografía |

**Sin frameworks CSS ni bundlers.** Archivos servidos directamente.

### Estructura de archivos

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js          (nuevo)
└── img/
    └── hero-bg.jpg       (foto panorámica del local)
```

### Estrategia de animación (Progressive Enhancement)

- CSS define el estado final de cada elemento (visible, posicionado)
- JS (GSAP) aplica el estado inicial (opacity: 0, translateY, etc.) y anima hacia el estado final
- Si JS falla o no carga, todo el contenido es visible y funcional
- Animaciones desactivadas si el usuario tiene `prefers-reduced-motion: reduce`

### Responsive

- Mobile-first en CSS
- Breakpoints: 768px (tablet), 1024px (desktop)

---

## Design Tokens (ya definidos en CSS)

| Token | Valor | Uso |
|---|---|---|
| `--bg-main` | `#0B0B0E` | Fondo principal |
| `--bg-surface` | `#15151A` | Cards, footer |
| `--bg-surface-light` | `#22222A` | Hover states |
| `--accent-red` | `#E61919` | CTAs, acentos |
| `--accent-red-hover` | `#FF3333` | Hover de CTAs |
| `--accent-chrome` | `#C5C6C7` | Texto secundario premium |
| `--text-primary` | `#FFFFFF` | Texto principal |
| `--text-secondary` | `#9CA3AF` | Texto muted |
| `--font-heading` | Syncopate 700 | Títulos, logo |
| `--font-body` | Inter 400/500/600 | Body, botones |
| `--transition-smooth` | `0.4s cubic-bezier(0.16, 1, 0.3, 1)` | Transiciones suaves |

---

## Sección 1: Header (Sticky + Glassmorphism)

### Estructura

- `position: fixed`, `width: 100%`, `z-index: 1000`
- Logo izquierda: "LV" en rojo + "MOTOS" en blanco (Syncopate)
- Nav centrado: Inicio, Servicios, Marcas, Catálogo, Contacto
- CTA derecha: botón "Agendar Service" en rojo

### Comportamiento

- **Estado inicial:** fondo transparente, sobre el hero
- **Al scrollear > 80px:** clase `.scrolled` via JS (scroll listener, no GSAP)
  - `backdrop-filter: blur(12px)`
  - `background: rgba(11, 11, 14, 0.7)`
  - Transición suave (0.3s)

### Nav links

- Hover: underline animado con `::after` + `transform: scaleX(0→1)` desde la izquierda
- Link activo: detectado por Intersection Observer según sección visible en viewport

### Mobile (< 768px)

- Hamburger menu (3 líneas → X animado)
- Panel lateral desde la derecha, entrada animada con GSAP
- Links en stack vertical, fondo `--bg-surface` con blur

---

## Sección 2: Hero (Parallax + Foto del Local)

### Fondo

- Foto panorámica del local como `background-image`
- `background-size: cover`, `background-position: center`
- Parallax real con GSAP ScrollTrigger (fondo se mueve más lento que el contenido)
- Overlay: `linear-gradient(to bottom, rgba(11,11,14,0.6), rgba(11,11,14,0.9))`

### Copy

- Subtítulo: `REPUESTOS · ACCESORIOS · SERVICE`
- Título: `TODO PARA TU MOTO.` / `EN UN SOLO LUGAR.` (2 líneas, Syncopate)
- Descripción: "Las mejores marcas en repuestos y accesorios para tu moto. Service con turno. Estamos en Santa Julia 1125."
- Botones: "Consultar por WhatsApp" (btn-primary) + "Ver Catálogo" (btn-outline)

### Animación de entrada (GSAP timeline, ~1.5s total)

1. Subtítulo: fade-in + slide desde arriba (0.6s)
2. Título línea 1: fade + slide desde abajo (0.6s, stagger 0.2s entre líneas)
3. Título línea 2: fade + slide desde abajo
4. Descripción: fade-in (0.5s, delay)
5. Botones: fade + slide desde abajo (0.5s, ambos juntos)
6. Ease: `power3.out`

### Dimensiones

- Desktop: `height: 100vh`
- Mobile: `height: 100svh`

---

## Sección 3: Marquee de Marcas

### Marcas

Wirtz, Circuit, Castrol, Motul, Kage, Hawk, ProTaper, Wonder, Standard

### Comportamiento

- Desplazamiento horizontal infinito hacia la izquierda
- Animación CSS pura: `@keyframes marquee` con `translateX(-50%)`
- Contenido duplicado en el DOM para loop sin cortes
- Duración: ~30s por ciclo
- Hover: pausa la animación

### Estilo

- Fondo: `--bg-surface`
- Texto: `--accent-chrome`, Syncopate, uppercase
- Separador: punto medio (·) entre marcas
- Bordes: `1px solid rgba(255,255,255,0.05)` superior e inferior
- Label arriba: "Trabajamos con las mejores marcas"

---

## Sección 4: Servicios — "LO QUE OFRECEMOS" (Bento Grid)

### Heading

- Título: "LO QUE OFRECEMOS"
- Subtítulo: "Soluciones integrales para tu moto."
- Animación: fade-in antes que las cards

### Layout (Bento Grid)

**Desktop (2 columnas, 2 filas):**

```
┌─────────────────┬──────────────┐
│                 │  Service     │
│  Repuestos y    │  Especializ. │
│  Accesorios     ├──────────────┤
│  (2 filas)      │  Turnos y    │
│                 │  Urgencias   │
│                 │  (bg rojo)   │
└─────────────────┴──────────────┘
```

**Tablet:** 2 columnas iguales, card 1 ocupa ancho completo arriba
**Mobile:** stack vertical

### Cards

- Fondo: `--bg-surface`
- Borde: `1px solid rgba(255,255,255,0.06)`
- Border-radius: `--radius-lg` (16px)
- Hover: borde se ilumina + `transform: scale(1.02)`
- Card roja (Turnos): fondo `--accent-red`, texto negro, botón negro "Reservar"

### Contenido de las cards

**Card 1 — Repuestos y Accesorios (grande):**
"Catálogo inmenso de piezas para potenciar o reparar tu máquina. Trabajamos primeras marcas."

**Card 2 — Service Especializado:**
"Mecánica rápida y reparaciones profundas con herramientas de precisión."

**Card 3 — Turnos y Urgencias (roja):**
"Atendemos doble turno: 9:30 a 14:30 y 16:30 a 19:30."
Botón: "Reservar" → link a #contacto

### Animación GSAP

- ScrollTrigger: dispara al 20% del viewport
- Cards entran escalonadas (stagger 0.15s) con fade + slide desde abajo

---

## Sección 5: Catálogo — "DESTACADOS"

### Categorías (4 cards)

1. **Cascos** — Hawk, otros
2. **Lubricantes** — Castrol, Motul
3. **Accesorios** — Grips, maniguetas, fundas (Wirtz, Circuit)
4. **Transmisión** — Cadenas, coronas, piñones

### Layout

- **Desktop:** Grid 4 columnas iguales
- **Mobile:** Carrusel horizontal con `scroll-snap-type: x mandatory`
  - Indicadores de scroll (dots)

### Cada card

- Fondo: `--bg-surface`
- Border-radius: `--radius-lg`
- Espacio superior para imagen/ícono (placeholder inicial)
- Nombre de categoría (Syncopate)
- Descripción breve (1 línea)
- Botón "Consultar" → `https://wa.me/numero?text=Hola, quiero consultar por [categoría]`
- Hover: borde rojo sutil + leve elevación (`translateY(-4px)`)

### Animación GSAP

- Desktop: cards entran escalonadas (stagger 0.15s) con fade + slide desde abajo
- Mobile: solo el heading se anima, el carrusel aparece sin animación

---

## Sección 6: Contacto — "ENCONTRANOS"

### Layout

- **Desktop:** 2 columnas — info izquierda, mapa derecha
- **Mobile:** stack vertical, info arriba, mapa abajo

### Columna izquierda

- Título: "ENCONTRANOS"
- Descripción: "Vení al local, te asesoramos."
- Lista:
  - Dirección: Santa Julia 1125
  - Horario: Lun - Sáb | 9:30 - 14:30 y 16:30 - 19:30
  - Teléfono: [placeholder — el cliente debe proveerlo]
- Botón: "Cómo llegar" → abre Google Maps en nueva pestaña

### Columna derecha

- Iframe de Google Maps (placeholder hasta que se configure Google Business Profile)
- Filtro CSS dark: `filter: invert(90%) hue-rotate(180deg)`
- Border-radius: `--radius-lg`
- Borde sutil

### Animación GSAP

- Info entra desde la izquierda, mapa desde la derecha
- ScrollTrigger al 20% del viewport

---

## Sección 7: Footer

- Fondo: `--bg-surface`
- Borde superior sutil
- Logo: "LV MOTOS"
- Tagline: "Todo para tu moto."
- Copyright: "© 2026 LV Motos. Todos los derechos reservados."
- Sin navegación duplicada
- Sin animación GSAP

---

## Sección 8: WhatsApp Flotante

- `position: fixed`, esquina inferior derecha, 24px de margen
- Ícono SVG de WhatsApp inline, color blanco sobre fondo circular `#25D366`
- Tamaño: 56px
- Animación: pulso CSS infinito — `box-shadow` que se expande y desvanece cada 2s
- Hover: `transform: scale(1.1)`
- `z-index: 999`
- Link: `https://wa.me/numero?text=Hola, quiero hacer una consulta`
- Sin tooltip, sin expansión

---

## Modificaciones al HTML existente

El `index.html` actual usa "LB CORTAMOTOS" como nombre. Se debe reemplazar por "LV MOTOS" en:
- Logo del header
- Tag `<title>`
- Meta description
- Footer
- Cualquier otra referencia

Además:
- Agregar tags `<script>` para GSAP y ScrollTrigger (CDN) antes del cierre de `</body>`
- Actualizar el marquee de marcas con las marcas reales del local
- Reemplazar el placeholder del catálogo con las 4 cards de categorías
- Actualizar copy del hero con el nuevo texto aprobado
- Agregar SVG de WhatsApp en el botón flotante
- Agregar hamburger menu para mobile

---

## Accesibilidad

- `prefers-reduced-motion: reduce` → desactivar todas las animaciones GSAP y CSS
- Contraste mínimo AA en todos los textos
- `aria-label` en el botón de WhatsApp y hamburger menu
- Links con `focus-visible` styling
- Semántica HTML correcta (ya existente)
