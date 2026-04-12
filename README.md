# Kasper – Creative Digital Agency

A modern, responsive landing page for a creative agency. Built with semantic HTML5, CSS3, and vanilla JavaScript. Features a full-screen carousel, dynamic portfolio filter, animated counters, skill progress bars, pricing tables, contact form, and mobile-first navigation.

## Live Demo

You can open the `index.html` file directly in any modern browser.

## Features

- Fully responsive design (mobile, tablet, desktop)
- Accessible navigation with skip link and ARIA labels
- Dynamic background carousel for the hero section
- Portfolio gallery with category filtering (All, App, Photo, Web, Print)
- Animated statistics counters (Intersection Observer)
- Skill progress bars that fill on scroll
- Pricing section with smooth numeric animation
- Video background section with custom overlay
- Newsletter subscription form & contact form (demo alerts)
- Scroll-to-top button
- Semantic HTML & CSS Grid / Flexbox layouts
- Clean, maintainable vanilla JavaScript

## File Structure
kasper-agency/
├── index.html # Main HTML file (includes all styles & scripts inline)
├── README.md # Project documentation
└── (optional assets) # Images, videos, or fonts (external placeholders used)

text

> **Note:** The project uses placeholder images from `picsum.photos`, `randomuser.me`, and a sample video from MDN. For production, replace with your own assets.

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, custom properties, transitions)
- JavaScript (ES6+)
- Google Fonts (Open Sans)
- Intersection Observer API

## Setup & Usage

1. Clone or download the repository.
2. Open `index.html` in your browser.
3. No build steps or dependencies required – it runs out-of-the-box.

### Customization

- **Change images:** Replace the `src` attributes in the `.landing`, `.design`, `.portfolio .box img`, and `.stat` background URLs.
- **Modify portfolio items:** Edit the `portfolioItems` array inside the `<script>` tag.
- **Update pricing numbers:** Change `data-goal` attributes on `.rich` spans.
- **Replace video source:** Update the `<video>` `src` attribute.

## Browser Support

Latest versions of Chrome, Firefox, Safari, Edge. Also works on iOS and Android.

## Accessibility

- Skip to main content link
- ARIA labels for interactive elements
- High contrast and focus states
- Semantic headings and landmarks

## Performance

- Lazy loading for images (`loading="lazy"`)
- CSS transitions optimized
- JavaScript runs after DOM content loaded (inline at bottom)

## Credits

- Design inspired by modern agency layouts
- Icons from Material Design (SVG paths)
- Placeholder images from [Picsum](https://picsum.photos/) & [RandomUser](https://randomuser.me/)
- Sample video from [MDN](https://developer.mozilla.org/)

## License

This project is free for personal and commercial use. Attribution is appreciated but not required.

---

**Kasper** – *We make art and technology work together.*