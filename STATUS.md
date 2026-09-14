# Landing Page Status

Updated: 2026-09-14

## Git State

Branch: `main` (deployed to Vercel)
`feat/landing-restructure` was merged to main by CC audit session (Sep 9).
Branches: `main` (working) · `explainer` (old version, frozen)

## Uncommitted Changes (local only, not on Vercel yet)

- `src/components/Hero.tsx` - "Walk the site. / By the time you leave..." headline, clean subhead (no uppercase spans, no radial gradient)
- `src/components/Demo.tsx` - "Get early access" CTA added after step 4 (fades in at scroll 0.65-0.75)
- `CLAUDE.md` - restored 8 hard rules + architecture reference

## What's on Vercel (main, committed)

- Hero: "Everything your firm knows, now comes to you." headline
- Demo: scroll-driven 4-beat phone demo, identical to original Vercel version
- Section order: Hero → Demo → Problem → Traceability → FooterCTA
- SectionNav dot rail on left
- "Book a call" in header (top right)
- `/explainer` route removed from this branch

## Still Pending

1. Commit and push Hero + Demo CTA changes
2. "Book a call" CTA broken - no Calendly/form/email behind it
3. Background: CRE-focused footage (parked - do last)
4. Footer alignment check
5. Problem section heading (questioned whether needed)
