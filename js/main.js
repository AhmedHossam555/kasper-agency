(function () {
  // ─── MOBILE NAVIGATION & SCROLL TO TOP ──────────────────────────────────────
  const toggleBtn = document.querySelector(".toggle-menu");
  const navUl = document.querySelector("#main-nav-list");
  const closeBtn = document.querySelector(".close-nav-btn");
  const navLinks = document.querySelectorAll("#main-nav-list a");
  const body = document.body;

  function openMenu() {
    if (!navUl) return;
    navUl.classList.add("open");
    toggleBtn?.setAttribute("aria-expanded", "true");
    body.classList.add("nav-open");
  }

  function closeMenu() {
    if (!navUl) return;
    navUl.classList.remove("open");
    toggleBtn?.setAttribute("aria-expanded", "false");
    body.classList.remove("nav-open");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navUl?.classList.contains("open")) closeMenu();
      else openMenu();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  navUl?.addEventListener("click", (e) => {
    if (e.target === navUl) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navUl?.classList.contains("open")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && navUl?.classList.contains("open"))
      closeMenu();
  });

  const scrollBtn = document.querySelector(".scroll-top-btn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) scrollBtn.classList.add("visible");
      else scrollBtn.classList.remove("visible");
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ─── ACTIVE LINK & SMOOTH SCROLL ────────────────────────────────────────────
  function setActiveLink(activeLink) {
    navLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");

      if (hash && hash.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(hash);

        if (targetElement) {
          setActiveLink(this);
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, null, hash);
        }
      } else {
        setActiveLink(this);
      }
    });
  });

  // ─── IMAGE SLIDER ───────────────────────────────────────────────────────────
  class ImageSlider {
    constructor(options) {
      this.autoplayInterval = options.autoplayInterval || 5000;
      this.landing = document.querySelector(options.container || ".landing");
      this.nextBtn = document.querySelector(options.nextBtn || ".fa-angle-right");
      this.prevBtn = document.querySelector(options.prevBtn || ".fa-angle-left");
      this.bullets = document.querySelectorAll(options.bullets || ".bullets li");
      this.images = options.images || [];
      this.currentIndex = 0;
      this.isTransitioning = false;
      this.autoplayTimer = null;

      if (!this.landing || this.images.length === 0) return;

      this.preloadImages();
      this.attachEvents();
      this.setBackground(0);
      this.startAutoplay();
      this.init();
    }

    init() {
      const firstImage = new Image();
      firstImage.src = this.images[0];

      firstImage.onload = () => {
        this.landing.style.backgroundImage = `url(${this.images[0]})`;
        this.updateBullets();
        this.preloadImages();
        this.attachEvents();
        this.startAutoplay();
      };
    }

    preloadImages() {
      this.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }

    setBackground(index) {
      if (this.isTransitioning || index === this.currentIndex) return;

      this.isTransitioning = true;
      this.currentIndex = index;

      this.landing.style.opacity = "0.7";

      setTimeout(() => {
        this.landing.style.backgroundImage = `url(${this.images[index]})`;
        this.landing.style.opacity = "1";
        this.updateBullets();
        this.isTransitioning = false;
      }, 300);

      this.restartAutoplay();
    }

    updateBullets() {
      this.bullets.forEach((b, i) => {
        b.classList.toggle("active", i === this.currentIndex);
        b.setAttribute("aria-current", i === this.currentIndex ? "true" : "false");
      });
    }

    nextSlide = () => {
      this.setBackground((this.currentIndex + 1) % this.images.length);
    };

    prevSlide = () => {
      this.setBackground(
        (this.currentIndex - 1 + this.images.length) % this.images.length
      );
    };

    goToSlide = (idx) => {
      if (idx >= 0 && idx < this.images.length) this.setBackground(idx);
    };

    startAutoplay() {
      this.autoplayTimer = setInterval(this.nextSlide, this.autoplayInterval);
    }

    restartAutoplay() {
      clearInterval(this.autoplayTimer);
      this.startAutoplay();
    }

    attachEvents() {
      this.nextBtn?.addEventListener("click", this.nextSlide);
      this.prevBtn?.addEventListener("click", this.prevSlide);

      this.bullets.forEach((bullet, idx) =>
        bullet.addEventListener("click", () => this.goToSlide(idx))
      );

      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") this.nextSlide();
        if (e.key === "ArrowLeft") this.prevSlide();
      });

      this.landing?.addEventListener("mouseenter", () =>
        clearInterval(this.autoplayTimer)
      );

      this.landing?.addEventListener("mouseleave", () =>
        this.startAutoplay()
      );
    }
  }

  if (document.querySelector(".landing")) {
    new ImageSlider({
      container: ".landing",
      nextBtn: ".fa-angle-right",
      prevBtn: ".fa-angle-left",
      bullets: ".bullets li",
      images: [
        "images/slider/blue-owl-branch-of-tree.webp",
        "images/slider/frogs.jpg",
        "images/slider/whale.jpg",
      ],
      autoplayInterval: 4000,
    });
  }

  // ─── STATS & PRICING ANIMATION ──────────────────────────────────────────────
  const statSection = document.querySelector(".stat");
  const priceSection = document.querySelector(".pricing");

  let countedStats = false,
    countedPrices = false;

  function animateNumbers(elements) {
    elements.forEach((el) => {
      const goal = parseInt(el.dataset.goal);
      if (isNaN(goal)) return;

      let current = 0;
      const increment = Math.ceil(goal / 55);

      const timer = setInterval(() => {
        current += increment;

        if (current >= goal) {
          el.textContent = goal;
          clearInterval(timer);
        } else {
          el.textContent = current;
        }
      }, 25);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === statSection && !countedStats) {
            countedStats = true;
            animateNumbers(document.querySelectorAll(".stat .number"));
          }

          if (entry.target === priceSection && !countedPrices) {
            countedPrices = true;
            animateNumbers(document.querySelectorAll(".rich"));
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  if (statSection) observer.observe(statSection);
  if (priceSection) observer.observe(priceSection);

  // ─── SKILLS PROGRESS BARS ───────────────────────────────────────────────────
  const skillSection = document.querySelector(".our-skills");
  const progressSpans = document.querySelectorAll(".prog span");

  let skillsAnimated = false;

  const skillObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        progressSpans.forEach((span) => {
          span.style.width = span.dataset.prog;
        });
      }
    },
    { threshold: 0.4 }
  );

  if (skillSection) skillObserver.observe(skillSection);

  // ─── SCROLL SPY (ACTIVE LINK ON SCROLL) ─────────────────────────────────────
  const sections = document.querySelectorAll("section[id], div[id]");

  function updateActiveOnScroll() {
    let scrollPos = window.scrollY + 150;
    let activeId = null;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height && id) {
        activeId = id;
      }
    });

    if (activeId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${activeId}`) {
          link.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("scroll", updateActiveOnScroll);
  updateActiveOnScroll();
})();

// ─── DESIGN SECTION ANIMATION ─────────────────────────────────────────────────
const designSection = document.querySelector(".design");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        designSection.classList.add("show");
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(designSection);


// ─── PORTFOLIO FILTER ─────────────────────────────────────────────
const filterButtons = document.querySelectorAll(".shuffle li");
const boxes = document.querySelectorAll(".content-portfolio .box");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove active
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    boxes.forEach((box) => {
      const category = box.dataset.category;

      if (filter === "all" || category === filter) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });
  });
});