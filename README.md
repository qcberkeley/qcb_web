# Quantum Computing at Berkeley : Official Website

The official website for **QC@B** (Quantum Computing at Berkeley), UC Berkeley's undergraduate quantum computing club. Founded in 2016, QCB bridges students, academia, and the quantum industry through research, education, and events.

**Live site: [qcb.berkeley.edu](https://qcb.berkeley.edu/)**

## Tech Stack

- **HTML5** with semantic markup and structured data (JSON-LD)
- **CSS** — custom design system via CSS custom properties + Tailwind utility classes
- **Vanilla JavaScript** — no frameworks, no build dependencies
- **SEO** — Open Graph, Twitter Cards, canonical URLs, sitemap, robots.txt, bot-aware rendering

## Project Structure

```
├── index.html            # Home — hero, news, about, team, alumni
├── education.html        # DeCal courses, library, articles, tutorials
├── research.html         # QUOR research program & completed projects
├── opportunities.html    # Quantum internships & job listings (Google Sheets-powered)
├── sponsor-us.html       # Sponsorship tiers & contact
├── fa26decal.html        # Current semester DeCal page
├── style.css             # Design system — tokens, components, animations
├── js/
│   ├── scroll.js         # IntersectionObserver scroll-reveal engine
│   └── sheets.js         # Lightweight Google Sheets CSV loader
├── images/               # Team photos, sponsor logos, event media
├── courseware/           # DeCal lecture slides, homework, labs
├── QUOR/                 # Research presentations & posters
└── syllabi/              # Historical DeCal syllabi
```

## Local Development

No build step required. Open any HTML file directly, or use a local server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

Then visit `http://localhost:8000`.

## License

© 2026 Quantum Computing at Berkeley. All rights reserved.
