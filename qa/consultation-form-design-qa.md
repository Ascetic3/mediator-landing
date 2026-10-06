# Consultation form visual QA

Scope: final consultation form block only. Captured the rendered section at 1440, 768, and 390 CSS pixels.

| Viewport | Result | Screenshot |
| --- | --- | --- |
| Desktop 1440 | Pass. Existing two-column composition is preserved; controls and consent fit without overflow. | [consultation-form-desktop.png](consultation-form-desktop.png) |
| Tablet 768 | Pass. Two-column form remains legible and within viewport. | [consultation-form-tablet.png](consultation-form-tablet.png) |
| Mobile 390 | Pass. Content stacks naturally; full-width fields and CTA fit, consent wraps cleanly. | [consultation-form-mobile.png](consultation-form-mobile.png) |

Interaction checks passed: empty and incomplete phones show the inline error; clipboard paste formats as `+7 (999) 123-45-67`; valid input shows the neutral local-only notice; the consent link does not submit; hero, service modal, and agency modal consultation CTAs reach the form and focus the name field. No horizontal overflow at the three viewports. No P0/P1/P2 findings.

Submission remains local-only. The CRM-shaped payload builder returns the requested ten fields, source/form defaults, current path, and URL UTM values; no endpoint or external transmission is configured.
