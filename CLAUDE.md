@AGENTS.md

# Chief Landing Page

Standalone Next.js marketing site. NOT part of the Chief product app (`~/works/chief/app/`).

Codebase: `~/works/chief/landing-page/`
Stack: Next.js 16, Tailwind v4, Framer Motion
Runs on: localhost:3000

## Hard Rules

1. **NEVER take browser screenshots.** BreathingGrid canvas animation causes Playwright timeouts. Use `take_snapshot` (DOM) only.
2. **NEVER load Chief product context files** (ROUTER.md, OPERATING.md, DESIGN-SPEC, V1-SPEC, etc). This is a marketing site.
3. **NEVER pull session transcripts** via memory_read for context. Read STATUS.md instead.
4. **NEVER do scroll/opacity measurement loops.** Make the edit, move on. Sayem will report visual issues.
5. **Read once, edit, don't re-read to verify.** Edit tool confirms success.
6. **Batch changes per file.** Multiple edits to the same file in one Edit call.
7. **Targeted git diffs only.** `git diff <file>` not `git diff` (whole repo).
8. **Only load tools you need.** For code work: no screenshot, no memory_search, no memory_read.

## Architecture

- `src/app/page.tsx` - main page, section order
- `src/app/globals.css` - theme vars, body styles
- `src/components/` - all sections: Hero, Demo, Problem, Traceability, Anchor, FooterCTA, Header, SectionNav, ScrollCue, BreathingGrid, PostDemoCTA, TeamViewsMobile
- `src/components/demo/` - phone frame screens: CaptureScreen, ProcessingScreen, ReviewScreen, ConfirmScreen, TeamViews, PhoneFrame

## Key Mechanics

- Hero is `position: fixed` with scroll-linked opacity fade
- Demo uses Framer Motion `useScroll` with a tall container (500vh), sticky inner div, scroll-driven beat transitions
- ScrollRevealSection reveals text word-by-word tied to scroll offset
- BreathingGrid is a persistent full-page canvas backdrop (fixed, z-0)
- Sections either paint over BreathingGrid (opaqueBg) or let it show through
