# Performance and resilience audit

Date: 2026-10-07

## Production image weight

Measured from the production `dist/` directory, including credentials and favicon assets:

| | Image bytes |
| --- | ---: |
| Before | 12,009,275 |
| After | 4,900,392 |
| Saved | 7,108,883 (59.2%) |

The resulting production image set contains 29 WebP responsive photo variants, 6 credential JPEGs, 5 PNG assets, and 1 ICO. Original photo files are retained as source assets outside `public`, so they are not copied into production. Credential originals remain available in the document gallery.

## Loading and resilience

- The selected hero photo is retained and exported as responsive WebP variants at 480, 768, 960, and 1280px. It uses `srcSet`/`sizes`, is preloaded from `index.html`, and has eager loading, high fetch priority, and async decoding.
- Services, agency, and leader photos use responsive variants with lazy loading and async decoding. The leader portrait uses the same approved original; only encoded variants are added.
- `SafeImage` reserves a stable frame, exposes descriptive alt text, and switches to the brand mark fallback on image failure. Browser QA forced hero, service, and leader image failures; all fallbacks rendered inside stable frames.
- Logo-derived favicon, 16/32px PNGs, ICO, Apple touch icon, Android icons, and web manifest return HTTP 200 in local production preview.
- Inter and Playfair Display remain external Google Fonts with `display=swap` and preconnect hints. No font files or new runtime dependencies were added.

## Bundle and checks

Production bundle: CSS 37,916 bytes (7.20 KB gzip); JavaScript 270,063 bytes (85.41 KB gzip). A throttled 3G browser run decoded the eager hero image without changing its reserved 659 × 512px frame. Browser QA also verified reduced motion, form input editing, once-only scroll reveals, no horizontal overflow, header fit, and Home navigation.

Responsive production preview captures and machine-readable QA evidence are in `qa/hero-trust-*.png` and `qa/technical-after/system-polish-results.json`. The strict viewport checks at 1440, 1024, 768, and 390px report matching viewport/document widths.
