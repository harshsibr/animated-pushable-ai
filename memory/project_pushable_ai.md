---
name: Project — Pushable AI landing
description: Next.js App Router (JS) demo landing for manager review; light theme, landscape hero bg, red CTAs, reference site at animated-pushable-ai.vercel.app
type: project
---

Pushable AI is a workflow-automation product. The landing page is a manager-review demo built in `c:\animated-pushable-ai`.

**Why:** Pivoted from an initial dark/futuristic theme to a light/white theme after the user shared the existing reference site at https://animated-pushable-ai.vercel.app/ and the official Pushable logo (black rounded-square P + black wordmark with red dot).

**How to apply:**
- Theme is **light/white**, not dark. Body bg `bg-canvas-50`, ink-900 text. Tokens live in [tailwind.config.js](../tailwind.config.js).
- Primary CTA color is **brand-red (#EF4444)**, not purple. Purple is reserved for secondary AI/gradient flourishes.
- Hero uses a **landscape background image** at `/public/hero-bg.jpg` (user provides their own) with a CSS gradient fallback class `.hero-bg-fallback`.
- Logo is an inline SVG approximation in [src/components/Logo.js](../src/components/Logo.js) — user may swap for a real asset.
- Brand-mark approximations for the trusted-by marquee live in [src/components/BrandLogos.js](../src/components/BrandLogos.js); replace with official SVGs when supplied.
- Headings use Fraunces (serif) — set in [layout.js](../src/app/layout.js), accessed via `.heading-display` class.
