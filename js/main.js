(function () {
  "use strict";

  // ─── GLOBAL STATE ─────────────────────────────────────────────
  const body = document.body;
  let clickedLink = false;

  // ─── MOBILE NAVIGATION & SCROLL TO TOP ───────────────────────
  const toggleBtn = document.querySelector(".toggle-menu");
  const navUl = document.querySelector("#main-nav-list");
  const closeBtn = document.querySelector(".close-nav-btn");
  const navLinks = document.querySelectorAll("#main-nav-list a");

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

  toggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    navUl?.classList.contains("open") ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMenu();
  });

  // ─── SCROLL TO TOP BUTTON ────────────────────────────────────
  const scrollBtn = document.querySelector(".scroll-top-btn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("visible", window.scrollY > 400);
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ─── ACTIVE LINK + SMOOTH SCROLL ─────────────────────────────
  function setActiveLink(activeLink) {
    navLinks.forEach((l) => l.classList.remove("active"));
    activeLink?.classList.add("active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");

      if (hash && hash.startsWith("#")) {
        e.preventDefault();

        const target = document.querySelector(hash);
        if (!target) return;

        clickedLink = true;

        setActiveLink(this);

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        history.pushState(null, null, hash);

        setTimeout(() => {
          clickedLink = false;
        }, 800);
      }
    });
  });

  // ─── IMAGE SLIDER ────────────────────────────────────────────
  class ImageSlider {
    constructor(options) {
      this.landing = document.querySelector(options.container);
      this.nextBtn = document.querySelector(options.nextBtn);
      this.prevBtn = document.querySelector(options.prevBtn);
      this.bullets = document.querySelectorAll(options.bullets);
      this.images = options.images;
      this.index = 0;
      this.timer = null;

      if (!this.landing || !this.images.length) return;

      this.init();
    }

    init() {
      this.setBg(0);
      this.start();

      this.nextBtn?.addEventListener("click", () => this.next());
      this.prevBtn?.addEventListener("click", () => this.prev());

      this.bullets.forEach((b, i) =>
        b.addEventListener("click", () => this.setBg(i))
      );
    }

    setBg(i) {
      this.index = i;
      this.landing.style.backgroundImage = `url(${this.images[i]})`;

      this.bullets.forEach((b, idx) =>
        b.classList.toggle("active", idx === i)
      );

      this.reset();
    }

    next() {
      this.setBg((this.index + 1) % this.images.length);
    }

    prev() {
      this.setBg(
        (this.index - 1 + this.images.length) % this.images.length
      );
    }

    start() {
      this.timer = setInterval(() => this.next(), 4000);
    }

    reset() {
      clearInterval(this.timer);
      this.start();
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
    });
  }

  // ─── STATS ANIMATION ─────────────────────────────────────────
  const statSection = document.querySelector(".stat");
  const priceSection = document.querySelector(".pricing");

  function animateNumbers(elements) {
    elements.forEach((el) => {
      const goal = +el.dataset.goal;
      let count = 0;
      const step = Math.ceil(goal / 50);

      const interval = setInterval(() => {
        count += step;

        if (count >= goal) {
          el.textContent = goal;
          clearInterval(interval);
        } else {
          el.textContent = count;
        }
      }, 25);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === statSection) {
          animateNumbers(document.querySelectorAll(".stat .number"));
        }

        if (entry.target === priceSection) {
          animateNumbers(document.querySelectorAll(".rich"));
        }
      }
    });
  }, { threshold: 0.3 });

  statSection && observer.observe(statSection);
  priceSection && observer.observe(priceSection);

  // ─── SKILLS BAR ───────────────────────────────────────────────
  const skillSection = document.querySelector(".our-skills");
  const bars = document.querySelectorAll(".prog span");

  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bars.forEach((b) => (b.style.width = b.dataset.prog));
    }
  }, { threshold: 0.4 });

  skillSection && skillObserver.observe(skillSection);

})();

// ─── DESIGN ANIMATION ──────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const designSection = document.querySelector(".design");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        designSection?.classList.add("show");
      }
    });
  }, { threshold: 0.3 });

  designSection && observer.observe(designSection);
});

// ─── PORTFOLIO FILTER (FIXED) ──────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".shuffle li");
  const boxes = document.querySelectorAll(".content-portfolio .box");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("filter clicked:", btn.dataset.filter);

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      boxes.forEach((box) => {
        const cat = box.dataset.category;

        if (filter === "all" || cat === filter) {
          box.classList.remove("hide");
        } else {
          box.classList.add("hide");
        }
      });
    });
  });
});