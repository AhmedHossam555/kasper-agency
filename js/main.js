class ImageSlider {
  constructor(options = {}) {
    // Configuration
    this.autoplayInterval = options.autoplayInterval || 5000;
    this.enableKeyboard = options.enableKeyboard !== false;
    this.enableTouch = options.enableTouch !== false;
    this.transitionDuration = options.transitionDuration || 600;
    this.preloadImages = options.preloadImages !== false;

    // Elements
    this.landing = document.querySelector(options.container || ".landing");
    this.nextBtn = document.querySelector(options.nextBtn || ".fa-angle-right");
    this.prevBtn = document.querySelector(options.prevBtn || ".fa-angle-left");
    this.bullets = document.querySelectorAll(options.bullets || ".bullets li");
    this.images = options.images || [];

    // State
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.autoplayTimer = null;
    this.touchStartX = 0;

    // Initialize
    this.init();
  }

  init() {
    if (!this.landing || this.images.length === 0) {
      console.error("Slider: Missing required elements or images");
      return;
    }

    this.preloadImages && this.preloadAllImages();
    this.attachEventListeners();
    this.setBackground(this.currentIndex);
    this.startAutoplay();
    this.announceSlide();
  }

  // Preload images for smoother transitions
  preloadAllImages() {
    this.images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  // Set background with fade transition
  setBackground(index) {
    if (this.isTransitioning || index === this.currentIndex) return;

    this.isTransitioning = true;
    this.currentIndex = index;

    // Fade out
    this.landing.style.opacity = "0.7";

    setTimeout(() => {
      this.landing.style.backgroundImage = `url(${this.images[index]})`;
      this.landing.style.opacity = "1";
      this.updateBullets();
      this.announceSlide();
      this.isTransitioning = false;
    }, this.transitionDuration / 2);

    this.restartAutoplay();
  }

  // Update bullet indicators
  updateBullets() {
    this.bullets.forEach((bullet, idx) => {
      bullet.classList.toggle("active", idx === this.currentIndex);
      bullet.setAttribute("aria-current", idx === this.currentIndex ? "true" : "false");
    });
  }

  // Announce current slide for accessibility
  announceSlide() {
    const message = `Slide ${this.currentIndex + 1} of ${this.images.length}`;
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }

  // Navigation
  nextSlide = () => {
    const next = (this.currentIndex + 1) % this.images.length;
    this.setBackground(next);
  };

  prevSlide = () => {
    const prev = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.setBackground(prev);
  };

  goToSlide = (index) => {
    if (index >= 0 && index < this.images.length) {
      this.setBackground(index);
    }
  };

  // Autoplay management
  startAutoplay() {
    this.autoplayTimer = setInterval(this.nextSlide, this.autoplayInterval);
  }

  restartAutoplay() {
    clearInterval(this.autoplayTimer);
    this.startAutoplay();
  }

  stopAutoplay() {
    clearInterval(this.autoplayTimer);
  }

  // Event listeners
  attachEventListeners() {
    // Button clicks
    this.nextBtn?.addEventListener("click", this.nextSlide);
    this.prevBtn?.addEventListener("click", this.prevSlide);

    // Bullet clicks
    this.bullets.forEach((bullet, index) => {
      bullet.addEventListener("click", () => this.goToSlide(index));
      // Keyboard support for bullets
      bullet.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.goToSlide(index);
        }
      });
    });

    // Keyboard navigation
    if (this.enableKeyboard) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") this.nextSlide();
        if (e.key === "ArrowLeft") this.prevSlide();
      });
    }

    // Touch/swipe support
    if (this.enableTouch) {
      this.landing.addEventListener("touchstart", (e) => {
        this.touchStartX = e.touches[0].clientX;
      });

      this.landing.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = this.touchStartX - touchEndX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
          diff > 0 ? this.nextSlide() : this.prevSlide();
        }
      });
    }

    // Pause autoplay on hover
    this.landing.addEventListener("mouseenter", () => this.stopAutoplay());
    this.landing.addEventListener("mouseleave", () => this.startAutoplay());
  }

  // Cleanup
  destroy() {
    clearInterval(this.autoplayTimer);
    this.nextBtn?.removeEventListener("click", this.nextSlide);
    this.prevBtn?.removeEventListener("click", this.prevSlide);
  }
}

// Usage
const slider = new ImageSlider({
  container: ".landing",
  nextBtn: ".fa-angle-right",
  prevBtn: ".fa-angle-left",
  bullets: ".bullets li",
  images: [
    "images/slider/blue-owl-branch-of-tree.webp",
    "images/slider/frogs.jpg",
    "images/slider/whale.jpg"
  ],
  autoplayInterval: 5000,
  enableKeyboard: true,
  enableTouch: true,
  preloadImages: true
});



    (function () {
      const toggleBtn = document.querySelector(".toggle-menu");
      const navUl = document.querySelector("#main-nav-list");
      const closeBtn = document.querySelector(".close-nav-btn");
      function openMenu() { navUl.classList.add("open"); toggleBtn.setAttribute("aria-expanded", "true"); }
      function closeMenu() { navUl.classList.remove("open"); toggleBtn.setAttribute("aria-expanded", "false"); }
      if (toggleBtn) toggleBtn.addEventListener("click", openMenu);
      if (closeBtn) closeBtn.addEventListener("click", closeMenu);
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && navUl?.classList.contains("open")) closeMenu(); });

      const statSection = document.querySelector(".stat");
      const priceSection = document.querySelector(".pricing");
      let countedStats = false, countedPrices = false;
      function animateNumbers(elements) {
        elements.forEach((el) => {
          const goal = parseInt(el.dataset.goal);
          if (isNaN(goal)) return;
          let current = 0;
          const increment = Math.ceil(goal / 50);
          const timer = setInterval(() => {
            current += increment;
            if (current >= goal) { el.textContent = goal; clearInterval(timer); }
            else el.textContent = current;
          }, 25);
        });
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === statSection && !countedStats) { countedStats = true; animateNumbers(document.querySelectorAll(".stat .number")); }
            if (entry.target === priceSection && !countedPrices) { countedPrices = true; animateNumbers(document.querySelectorAll(".rich")); }
          }
        });
      }, { threshold: 0.3 });
      if (statSection) observer.observe(statSection);
      if (priceSection) observer.observe(priceSection);

      const skillSection = document.querySelector(".our-skills");
      const progressSpans = document.querySelectorAll(".prog span");
      let skillsAnimated = false;
      const skillObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !skillsAnimated) {
          skillsAnimated = true;
          progressSpans.forEach((span) => { span.style.width = span.dataset.prog; });
        }
      }, { threshold: 0.4 });
      if (skillSection) skillObserver.observe(skillSection);
    })();
