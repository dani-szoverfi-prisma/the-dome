# DESIGN.md - Fidalgo Fine Dining System

## 1. Design Concept & "Vibe"

- **Aesthetic:** Luxury, refined, elegant, and contemporary.
- **Vibe:** A high-end fine dining or cocktail bar experience. It heavily leans on "dark mode" aesthetics to make high-quality food photography stand out.
- **Key Traits:** High contrast typography (large dramatic serifs paired with clean, readable sans-serifs), generous negative space, sophisticated copper/gold accent colors, and immersive full-screen imagery.
- **Layout Style:** Editorial. Uses split-screens, masonry galleries, offset image layouts, and minimal structural borders.

---

## 2. Color Palette (Tokens)

The site uses a warm, earthy, and moody color scheme to evoke a luxury dining atmosphere.

### Base Colors

- **Background (Primary):** `#090806` (Near Black) - _Use for primary page backgrounds._
- **Background (Secondary/Cards):** `#1A1918` (Slightly lighter dark gray/brown) - _For overlapping elements._
- **Text (Primary):** `#D7C8BA` (Light Sand / Off-White) - _Use for body copy and readable text over dark backgrounds._
- **Text (Muted):** `#999799` (Medium Gray) - _Use for secondary information, meta text, or dates._

### Brand & Accents (The "Gold/Copper" Range)

- **Primary Accent:** `#985333` (Rich Copper / Terracotta) - _Use for primary buttons, active links, and hover states._
- **Secondary Accent:** `#A48D6E` (Muted Gold) - _Use for decorative lines, small subheadings, and icons._
- **Deep Accent:** `#592311` (Deep Rust) - _Use for subtle gradients or dark accent overlays._
- **Olive Gold Accent:** `#5F4B2E` - _Use for borders or secondary interactive states._

---

## 3. Typography

The typography is heavily reliant on "fluid typography" (scaling smoothly from mobile to desktop) and a sharp Serif / Sans-Serif contrast.

- **Heading Font (Serif):** Elegant, high-contrast serif (e.g., _Playfair Display_, _Cormorant Garamond_, or _Cinzel_).
  - _Usage:_ `h1`, `h2`, `h3`, large blockquotes, hero text.
  - _Style:_ Often entirely uppercase or Title Case. Letter spacing is slightly tight.
- **Body Font (Sans-Serif):** Clean, geometric sans-serif (e.g., _Jost_, _Montserrat_, or _Inter_).
  - _Usage:_ Paragraphs, navigation menus, buttons, meta text.
  - _Style:_ Light font-weight (300/400). Small uppercase with wide letter-spacing (`0.1em` to `0.15em`) for overlines and subheadings.
- **Fluid Sizing (CSS Clamp):**
  - _H1 / Hero:_ `clamp(3rem, 6vw, 5rem)`
  - _Section Titles (H2):_ `clamp(2rem, 4vw, 3rem)`
  - _Body:_ `clamp(1rem, 1vw + 0.5rem, 1.125rem)`

---

## 4. Layout & Spacing

- **Container Width:** Max width is typically expansive (e.g., `1440px`), but many hero sections and galleries bleed to the edge (`100vw`).
- **Spacing Scale:** Uses very generous vertical padding between sections (often `120px` to `160px` on desktop, `80px` on mobile) to let the content breathe.
- **Grid:** 12-column grid. Often utilizes asymmetric layouts (e.g., a text block spanning 4 columns on the left, and an image spanning 7 columns on the right).
- **Dividers:** Use thin (`1px`), solid lines in `#5F4B2E` or `#676059` to separate sections like menus or footer columns.

---

## 5. Component Specifications

### 1. Navigation / Header

- **Structure:** Minimalist. Often a split header (Logo left/center, hamburger menu right).
- **Behavior:** Sticky header on scroll. Background transitions from transparent to solid `#090806` upon scrolling.
- **Full-Screen Menu:** Clicking the hamburger menu triggers a full-screen overlay (background `#090806`) with large, vertically stacked navigation links.

### 2. Buttons & CTAs

- **Primary Button:**
  - Background: Transparent.
  - Border: `1px solid #985333` (Copper) or `#A48D6E` (Gold).
  - Text: Uppercase, Sans-Serif, wide letter spacing, `#D7C8BA`.
  - Hover: Background fills with the border color, text changes to `#090806`.
- **"Book a Table" Form Elements:**
  - Inputs: No borders except a bottom border (`border-bottom: 1px solid #676059`). Background transparent.
  - Focus: Bottom border highlights to `#985333`.

### 3. Food Menus (Text Lists)

- **Layout:** Two or three columns.
- **Item Structure:**
  - **Title:** Serif, small (e.g., `1.2rem`), color `#D7C8BA`.
  - **Price:** Right-aligned, same font as Title, sometimes highlighted in `#A48D6E`.
  - **Description:** Sans-serif, small (`0.9rem`), italicized or muted color (`#999799`), positioned below the title.
  - _Separator:_ Often a delicate dotted or dashed line connects the title to the price.

### 4. Galleries & Imagery

- **Aspect Ratios:** Mix of portrait (4:5) for food photography and landscape (16:9) for restaurant ambiance.
- **Hover Effects:** Subtle zoom. Images are wrapped in an `overflow: hidden` container. On hover, the `<img>` scales to `1.05` over `0.6s` with an `ease-out` transition.

---

## 6. Animation & Motion

- **Page Load:** Staggered fade-ups. Text elements use subtle "reveal" animations (translating up from `Y: 20px` to `0` while fading in).
- **Scroll Animations:** Images parallax slightly. Sections fade in using intersection observers.
- **Feel:** Slow, deliberate, and smooth. Avoid fast, snappy animations (keep transitions around `0.4s - 0.6s`).
