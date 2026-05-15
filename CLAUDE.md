# Project: [The Dome Restaurant]

## Goal

Static website cloned from a WordPress template. Optimize for 95+ Lighthouse scores and top SEO.

## Stack

Next.js

## Performance rules

- All images must use WebP format with explicit width/height and loading="lazy"
- No render-blocking scripts — defer or async everything
- Critical CSS inlined in <head>, rest loaded async
- Self-hosted fonts only, font-display: swap

## SEO rules

- Every page needs: <title>, meta description, canonical URL, OG tags
- Use semantic HTML: one <h1> per page, proper heading hierarchy
- Add schema.org JSON-LD for page type (WebPage, Article, etc.)
- Internal links use descriptive anchor text, never "click here"

## Code style

- No frameworks unless already in the stack above
- Prefer native CSS over utility libraries
- Keep JS minimal — no jQuery, no large bundles
