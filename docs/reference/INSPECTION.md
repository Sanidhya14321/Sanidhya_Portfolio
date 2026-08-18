# Reference Site Inspection — jasminegunarto.com

## Inspected Pages
All inspection performed on 2026-08-18. Screenshots and session recordings captured.

### Pages Inspected
1. **Home** — https://jasminegunarto.com
2. **Works** — https://jasminegunarto.com/works  
3. **Break** — https://jasminegunarto.com/break
4. **About** — https://jasminegunarto.com/about
5. **Project: Arizona Diamondbacks** — https://jasminegunarto.com/arizona-diamondbacks
6. **Project: Flow Studio Branding** — https://jasminegunarto.com/flow-studio-branding

---

## Design Tokens Extracted

### Colors
```
Background:       #E8E4DC  (cream/ecru — used on hero, works, about)
Dark Brown:       #2C1A0E  (footer CTA section)
Near-Black text:  #1A1A1A  (all body and heading text)
Muted text:       ~#6B6B6B (labels, timestamps, coordinates)
```

### Typography
```
Display font:  Barlow Condensed — weight 900 (ultra-compressed, uppercase)
Body font:     Barlow — weights 400, 500, 600
Hero size:     Full-viewport width (roughly clamp(8rem, 15vw, 18rem) on desktop)
Label size:    0.6875rem (11px) uppercase, letter-spacing 0.08em
```

### Spacing
```
Header height:   ~3rem (fixed)
Section padding: 2–3rem lateral
Grid gap:        0 (tiles flush against each other)
```

### Motion Tokens
```
Default ease:       cubic-bezier(0.19, 1, 0.22, 1)  — Expo out
Hero char stagger:  ~40–50ms per character
Marquee speed:      ~20–25s for one full loop
Loader duration:    ~1.6s count-up, fade out at ~1.8s
Hover scale:        1 → 1.04 over 0.7s
Scroll reveal:      translateY(40px→0) + opacity over 0.8s
```

---

## Layout Structure

### Header (Fixed)
```
LEFT:  ● CITY NAME, COUNTRY  HH:MM GMT±n  LAT° N, LON° E
RIGHT: HOME  WORKS  BREAK  ABOUT
```
- Transparent initially, becomes cream bg with blur on scroll

### Hero Section
```
[Giant name line 1 — full viewport width]
[Giant name line 2 — full viewport width]
[gap]
FIELD DESCRIPTOR   [CENTER BADGE]   ROLE/TITLE
[gap]
                 SCROLL DOWN ↓
```

### Dark Marquee Band (between Hero and Works)
```
█████ FIELD1  ·  FIELD2  ·  FIELD3  █████  (infinite loop, leftward)
```

### Featured Works Grid
```
┌─────────────┐ ┌─────────────┐
│  Project 1  │ │  Project 2  │
└─────────────┘ └─────────────┘
┌─────────────┐ ┌─────────────┐
│  Project 3  │ │  Project 4  │
└─────────────┘ └─────────────┘
```
On hover: dark overlay + name appears at bottom, image zooms 1.04×

### Footer
```
(FOLLOW)                      (NAVIGATION)
INSTAGRAM                         HOME
LINKEDIN                          WORKS
BEHANCE                           BREAK
EMAIL                             ABOUT

               BACK TO TOP ↑

████████████ LET'S TALK  LET'S TALK  ████████████  (dark brown bg)

● CITY  HH:MM GMT  LAT, LON                    ©YEAR ALL RIGHTS RESERVED
```

---

## Screenshots Reference

| File | Contents |
|------|----------|
| `home/home_hero.png` | Hero section with giant name |
| `home/home_hero_lower.png` | Second half of hero with subtitle |
| `home/home_works_grid.png` | Featured works 2×2 grid |
| `home/home_footer.png` | Footer with LET'S TALK marquee |
| `home/home_break_hover.png` | Hover state on break tiles |
| `works/works_top.png` | Works page index |
| `about/about_hero.png` | About page hero |
| `project-detail/arizona_hero.png` | Arizona Diamondbacks project hero |
| `project-detail/flow_hero.png` | Flow Studio project hero |

---

## Animation Observations

### Loader
- Full-screen black overlay
- Bottom-right corner: counting number 0 → 100
- Font: Barlow Condensed 900, ~16rem
- Fades out smoothly (~0.7s ease) after reaching 100

### Hero Name Animation
- Each character: `translateY(60px)` → `translateY(0)` + `skewY(3deg)` → `skewY(0)`
- Transition: 0.6s expo-out per char
- Stagger: ~50ms per character
- Triggered ~200ms after loader exit

### Marquee
- Two tracks duplicated for seamless loop
- No velocity reaction in CSS-only implementation (JS-based velocity would require Framer Motion/GSAP)
- Speed: approximately 25s for one full loop

### Scroll Reveals
- All sections: `opacity: 0; transform: translateY(40px)` → visible on IntersectionObserver
- Threshold: 10%
- Duration: 0.8s expo-out
