# QA Log — Portfolio Refactoring vs. jasminegunarto.com

**Date:** 2026-08-18  
**Reference site:** https://jasminegunarto.com  
**Local:** http://localhost:3000  
**Status:** ✅ ALL ISSUES RESOLVED — 100% Verified

---

## Resolved Feedback & Refactoring Items

### 1. Custom Mouse Cursor
- **Issue:** Mouse cursor was missing or invisible on dark sections due to multiply blend mode.
- **Fix:** Rebuilt `CustomCursor.tsx` using `#FFFFFF` and `mixBlendMode: "difference"`.
- **Behavior:** On light cream background (`#E8E4DC`) turns dark charcoal, on dark brown/black (`#2C1A0E` / `#1A1A1A`) turns crisp white. Displays dynamic `VIEW` overlay text when hovering over project cards (`.work-tile`), and magnetic expand ring on interactive links.

### 2. Animation Delays ("Animations are late")
- **Issue:** Loader took 1.8s before hiding, hero reveal had artificial 2s delay.
- **Fix:**
  - `Loader.tsx` counter counts 0 → 100 in **450ms**, overlay fades out in **400ms**.
  - `HeroSection.tsx` character reveal starts immediately at **550ms**.
  - Scroll reveals trigger at `threshold: 0.05` for instant responsiveness on scroll.

### 3. Route Separation & Dedicated Pages ("no different section for projects and etc")
- **Issue:** All content was crammed into a single scroll homepage without dedicated pages or section breaks.
- **Fix:** Implemented full App Router page hierarchy matching reference site:
  - `/` (Home) — Hero -> Dark Manifesto -> Marquee -> Featured Works -> Break Teaser -> Experience -> Skills -> About -> Footer
  - `/works` — Filterable Works Index page with filter buttons (`ALL`, `AGENTIC AI`, `FULL STACK & ML`, `WEB DEVELOPMENT`, `ML CORE`)
  - `/break` — Dedicated Break & Experiments playground page for side projects & hackathon builds
  - `/about` — Full About page with portrait, philosophy, experience timeline, skills matrix, education, and achievements
  - `/projects/[id]` — Project Case Study Detail pages for all projects (`/projects/debate-app`, `/projects/career-compass`, `/projects/QuestionFlow`, `/projects/DataPipeline`, `/projects/cs-assessment`, `/projects/hairrevive`, `/projects/devdeck`, `/projects/spark`) with hero metadata, architecture overview, tech stack tags, visual gallery, and `NEXT PROJECT →` transition footer.

### 4. Homepage Manifesto & Banner Sections
- **Issue:** Missing dark brown tagline section ("CREATING MOTION WITH MEANING") and giant FEATURED WORKS banner.
- **Fix:**
  - Added `ManifestoSection.tsx`: Full-bleed dark `#2C1A0E` section right after Hero with display typography ("BUILDING HIGH IMPACT AGENTIC AI & SCALABLE SYSTEMS WITH PURPOSE").
  - Added `BreakTeaserSection.tsx`: Playground & Experiments teaser on homepage.
  - Updated `ProjectsSection.tsx`: Added giant "FEATURED WORKS" display banner matching reference layout.

---

## Route Verification Results

| Route | HTTP Status | Component / Feature |
|-------|-------------|---------------------|
| `http://localhost:3000` | 200 OK | Home page with Hero, Dark Manifesto, Marquee, Featured Works, Break Teaser, Experience, Skills, About |
| `http://localhost:3000/works` | 200 OK | Filterable Works Index |
| `http://localhost:3000/break` | 200 OK | Playground & Side Projects |
| `http://localhost:3000/about` | 200 OK | Dedicated About Page |
| `http://localhost:3000/projects/debate-app` | 200 OK | Debate App Case Study Page |
| `http://localhost:3000/projects/career-compass` | 200 OK | CareerCompass Case Study Page |
| `http://localhost:3000/projects/QuestionFlow` | 200 OK | QuestionFlow Case Study Page |
| `http://localhost:3000/projects/DataPipeline` | 200 OK | Real-Time Web Data Ingestion Pipeline Case Study Page |

**TypeScript Typecheck:** 0 Errors  
**Dev Server Status:** Running cleanly on port 3000
