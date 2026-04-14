# Kasper - Creative Digital Agency Website

A modern, fully responsive, and accessibility-compliant creative digital agency website built with **HTML5, CSS3, and Vanilla JavaScript**. The project emphasizes performance optimization, clean user interface design, smooth animations, and scalable CSS architecture using the BEM (Block Element Modifier) methodology.

---

## Live Demo

> [View Live Preview](kasper-agency-eight.vercel.app)

---

## Project Overview

This professional portfolio website demonstrates expertise in modern front-end development with a focus on responsive design, performance optimization, and user experience excellence. The implementation showcases best practices in vanilla JavaScript architecture, CSS organization, and semantic HTML5 structure.

---

## Kasper Website

![Kasper Creative Digital Agency](images/screen/kaspar-website.png)

---

## Key Features

- **Responsive Design**: Mobile-first approach with full compatibility across all device sizes
- **Performance Optimized**: Lazy loading, optimized font delivery, and minimal DOM reflows
- **Interactive Components**:
  - Auto-playing image slider with manual controls
  - Animated statistics counters with scroll detection
  - Skills progress visualization
  - Filterable portfolio gallery
  - Full-width video integration
- **User Experience**: Smooth animations, testimonials section, pricing plans, contact form UI
- **Navigation**: Mobile-responsive menu with accessible toggle controls
- **Accessibility**: Comprehensive WCAG compliance including ARIA labels, skip links, and keyboard navigation
- **Architecture**: Modular JavaScript with IntersectionObserver-based animations and BEM CSS structure

---

## Technology Stack

| Technology            | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| **HTML5**             | Semantic markup and structure                              |
| **CSS3**              | Flexbox, Grid, custom properties, animations               |
| **JavaScript (ES6+)** | DOM manipulation, event handling, IntersectionObserver API |
| **SVG Icons**         | Scalable vector graphics                                   |
| **Google Fonts**      | Open Sans typography                                       |

---

## Project Structure

```
kasper-agency/
├── images/                 # Root directory for all visual assets
│   ├── portfolio/          # Images specific to the portfolio section
│   ├── screen/             # UI/UX screen captures or mockups
│   ├── slider/             # Images intended for a carousel or slider
│   ├── alonso-reyes.jpg
│   ├── amazing-under-water-life.mp4
│   ├── colorized-image.jpg
│   ├── devices-illustration.png
│   ├── diamond.jpg
│   ├── iphone_8_8_plus.webp
│   ├── kaspar-logo.png
│   ├── man-one.jpg
│   ├── man-two.jpg
│   ├── nebula-blue-space.jpg
│   └── purple-hd-2K-wallpaper-middle-size.jpg
├── js/                     # JavaScript logic
│   └── main.js             # Primary script file
├── styles/                 # CSS stylesheets
│   └── style.css           # Main styling file
├── index.html              # Main entry point for the website
└── README.md               # Project documentation and instructions
```

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation & Execution

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AhmedHossam555/kasper-agency.git
   cd kasper-agency
   ```

2. **Open in browser:**

   ```bash
   start index.html
   ```

   Or simply open `index.html` directly in your web browser.

---

## Component Features

### Image Slider Component

- Automatic background rotation with 4-second intervals
- Manual navigation controls (previous/next buttons)
- Visual slide indicators with bullet navigation

### Statistics Animation

- Real-time counter animations triggered on viewport entry
- Powered by IntersectionObserver API for optimal performance

### Skills Visualization

- Animated progress bars with scroll-triggered activation
- Smooth width transitions with CSS animations

### Portfolio Filtering System

- Category-based filtering (App, Web, Photo, Print)
- Dynamic DOM manipulation with efficient event delegation

### Mobile Navigation

- Full-screen slide-in menu for mobile devices
- Keyboard support (ESC key to close)
- Touch-friendly interface controls

### Performance Features

- Lazy loading for images (`loading="lazy"` attribute)
- Font preconnection for Google Fonts
- Optimized font loading strategy
- Minimal DOM reflows and repaints
- Efficient event delegation patterns

### Accessibility Implementation

- Skip-to-content navigation link
- ARIA labels and semantic HTML structure
- Keyboard navigation support
- Focus-visible styling for keyboard users
- WCAG 2.1 Level AA compliance

---

## Development Notes

This project serves as a professional portfolio demonstration of front-end development capabilities, emphasizing:

- Clean, maintainable code architecture
- Performance optimization techniques
- Modern CSS and JavaScript patterns
- Responsive design principles
- Accessibility best practices

---

## Author

**Ahmed Hossam**  
Frontend Developer  
[GitHub](https://github.com/AhmedHossam555)

---

## License

This project is licensed under the **MIT License** - see the LICENSE file for details.
