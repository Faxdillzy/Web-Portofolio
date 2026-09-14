# Portfolio Website - Fadillah Aryaseto

Personal portfolio for **Fadillah Aryaseto**, Informatics Engineering student and Junior Front-End Developer.

Built as a single-page site with semantic HTML5, modern CSS3, and vanilla JavaScript. No frameworks, no build step.

## Features

- Dark mode by default with a light mode toggle (saved to localStorage)
- Fixed navbar with blur on scroll
- Mobile menu with hamburger, overlay, and keyboard support
- Scrollspy active link highlighting
- Smooth scrolling with fixed-header offset
- Scroll reveal animations (respects `prefers-reduced-motion`)
- Animated stat counters
- Inline contact form validation with loading and success states
- Back to top button
- Semantic, accessible markup with ARIA labels and focus states
- SEO meta tags and JSON-LD structured data

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, CSS variables, animations)
- Vanilla JavaScript (IntersectionObserver, localStorage, rAF)
- Font Awesome 6 (icons)
- Google Fonts: Space Grotesk (display), Outfit (body), JetBrains Mono (code)

## Project Structure

```
website-portofolio/
├── index.html           # Single page, all sections
├── css/
│   └── style.css        # Design tokens + all component styles
├── js/
│   └── script.js        # Theme, nav, menu, reveal, counters, form, lightbox
├── assets/
│   ├── images/          # Put project screenshots here
│   └── icons/           # Additional icons
├── img/                 # Existing photos and screenshots
└── README.md
```

## Sections

1. Navbar
2. Hero
3. About (with stats)
4. Skills / Tech Stack
5. Featured Projects
6. Experience & Education (timeline)
7. Development Process
8. Services
9. Contact (info + form)
10. Footer

### Certificate

Inside the Experience section, a "Certifications" block shows all certificates
from the `img/` folder: a featured Huawei ICT card with full details plus a
grid where every other certificate also gets a detailed card (framed image
with full-size lightbox, credential badge, issuer, issue date, credential ID,
status, description and verify button). All placeholders (title, issuer, date,
credential ID, verification URL) are marked with `<!-- TODO -->` comments in
the HTML so they can be replaced with real data.

## Getting Started

1. Download or clone this repository
2. Open `index.html` in your browser
3. No build process required

## Customization

### Personal info and links

Edit `index.html`:
- Social links in the hero, mobile menu, and footer
- Contact email, GitHub, and LinkedIn in the contact section
- Project titles, descriptions, and links

### Colors

Edit the CSS variables at the top of `css/style.css`. Dark values live in `:root`, light values in `body.light-mode`. The accent color is `--accent`.

### Project images

Project cards currently use gradient placeholders. To use real screenshots:

1. Add images to `assets/images/`
2. In `index.html`, replace each `.project-thumb` block with an `<img>` tag
3. Remove the placeholder icon inside it

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Keyboard navigation and screen reader friendly

## License

All rights reserved (c) 2026 Fadillah Aryaseto

## Contact

- Email: fadillaharyaseto1401@gmail.com
- GitHub: github.com/Faxdillzy
- LinkedIn: https://www.linkedin.com/in/fadillah-aryaseto-64a0373a5
  
