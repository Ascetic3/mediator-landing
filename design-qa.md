# Design QA

**Final result: passed**

No actionable P0/P1/P2 visual findings remain at the requested desktop, tablet, and mobile widths. The mobile leader card remains in the vertical layout from the prior feedback; the temporary portrait and page copy were left unchanged as requested.

## Source and rendered evidence

- Source visual truth: [provided responsive design reference](C:\Users\986C~1\AppData\Local\Temp\codex-clipboard-ea92aebe-1b5a-44cb-9b54-1c66a768a7b2.png), 1536 × 1024 px composite. Its desktop, tablet, and mobile artboards represent 1440 px, 768 px, and 375 px CSS widths.
- Desktop: [qa/desktop.png](qa/desktop.png), full-page PNG, 1440 × 3576 px; CSS viewport 1440 × 1000 px; device scale factor 1.
- Tablet: [qa/tablet.png](qa/tablet.png), full-page PNG, 768 × 3734 px; CSS viewport 768 × 1000 px; device scale factor 1.
- Mobile: [qa/mobile.png](qa/mobile.png), full-page PNG, 390 × 5454 px; CSS viewport 390 × 1000 px; device scale factor 1. Compared against the 375 px reference artboard with a 1.04 width normalization.
- Captures were made from `http://127.0.0.1:5173/` using Playwright and the installed Chrome browser. Images were loaded and decoded before full-page capture; all eight page images reported loaded at all three widths.
- The source composite and three full-page captures were opened together for comparison. Focused review covered the header and hero, service cards, process steps, about image/text split, and leader profile/quote. The source has no FAQ or form artwork to compare against; those sections were checked for responsive layout and usable controls.

## Required fidelity surfaces

- **Fonts and typography:** Playfair Display headings and Inter UI/body text render with the intended hierarchy. At 390 px, the hero title, service names, leader name, FAQ questions, and controls wrap without clipping.
- **Spacing and layout:** The desktop service cards and work steps use four columns; the tablet layout uses two columns where space requires it; mobile stacks services and the leader card. No horizontal overflow was found at 1440, 768, or 390 px (`scrollWidth` equals the viewport width for every capture).
- **Colors and tokens:** Cream backgrounds, pale beige surfaces, dark brown text, rust actions, borders, and card radii remain consistent with the supplied palette.
- **Image quality and asset fidelity:** The original brand mark is used in the header. All page images loaded and their aspect ratios remain intact. Photos are intentionally temporary and should be replaced with approved assets before publication; the temporary leader portrait was not changed.
- **Copy and content:** Existing approved copy remains intact. The design reference includes “в Екатеринбурге” in the hero title and contact details that are not in the current approved content. Those differences were left as supplied; no contact information or claims were invented.

## Findings

- No P0/P1/P2 visual mismatches remain in the inspected regions at the three requested widths.

## P3 follow-up

- Replace temporary generated photos, including the leader portrait, with approved original photography when available.
- The hero title and header contact details differ from the reference because current approved content does not provide the city phrase or confirmed phone number. Update only after content is approved.
- Chrome reports a 404 for `/favicon.ico`; this does not affect the page layout or captured screenshots.

## Interactions and browser diagnostics

- Mobile menu opens, its services link navigates and closes the menu, and the FAQ disclosure expands.
- Form submit displays the existing notice that the frontend-only form does not send data.
- No page-level JavaScript errors were reported. One missing `/favicon.ico` request returned 404; all eight page images loaded successfully.
- A first full-page mobile capture omitted the below-fold lazy office image. The capture was repeated after all images had loaded and decoded; the final `qa/mobile.png` contains the office image. No code or visual changes were made for this capture artifact.

## Leader block and credentials gallery QA (2026-10-06)

**Final result: passed** — no P0/P1/P2 findings remain in the updated leader block or credentials gallery.

- Source visual truth for the leader block: [provided leader reference](C:\Users\986C~1\AppData\Local\Temp\codex-clipboard-8f0a7ad7-f325-4fb0-bb1d-9c2ac1b885e0.png), 934 × 573 px. Direct desktop comparison was captured at 934 × 573 CSS px; the focused component capture is [qa/leader-934-reference-viewport.png](qa/leader-934-reference-viewport.png). The page viewport capture is [qa/leader-934-viewport.png](qa/leader-934-viewport.png); the component is taller than the viewport and therefore the focused capture is the cleaner comparison.
- Responsive focused captures: [qa/leader-desktop.png](qa/leader-desktop.png) at 1440 px, [qa/leader-tablet.png](qa/leader-tablet.png) at 768 px, and [qa/leader-mobile.png](qa/leader-mobile.png) at 390 px. All have matching document `scrollWidth` and viewport width.
- Comparison covered layout, typography, colors/tokens, image crop/quality, and content hierarchy. The desktop two-column arrangement, portrait scale, heading and credentials rows align with the supplied block reference. Mobile orders the portrait, profile text, credentials and CTA vertically without clipping.
- The gallery has no supplied modal screenshot reference. Its styling was reviewed against the existing palette and component, and interaction/fit were checked directly. [qa/credentials-desktop.png](qa/credentials-desktop.png), [qa/credentials-mobile.png](qa/credentials-mobile.png), and [qa/credentials-mobile-portrait.png](qa/credentials-mobile-portrait.png) capture the gallery. The tall third document fits inside the 390 × 844 viewport; the dialog bounds are x=8..382 and y≈101..743, with no horizontal page overflow.
- Interaction checks passed: close button and overlay, Escape, focus placement/trap/return, body scroll lock/restore, inert background, previous/next navigation and wraparound. All six local credential images decoded. No page errors or failed HTTP responses were recorded in the latest mobile gallery check.

## Follow-up status

- The leader portrait is now the downloaded original at `/legacy-assets/IMG_0816.jpeg`; the earlier P3 to replace the temporary leader portrait is resolved. Other temporary page photography remains a separate future asset-replacement item.
- Earlier full-page QA still records a 404 for `/favicon.ico`; this is outside the leader/gallery scope and does not affect rendering.

final result: passed
