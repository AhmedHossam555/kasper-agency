





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
