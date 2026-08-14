// Scroll-reveal, reading progress, mobile menu, back-to-top. No dependencies.
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ——— Reveal on scroll ———
  var targets = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  // ——— Reading progress ———
  var bar = document.querySelector(".progress span");

  // ——— Back to top: appears once the end of the page is in reach ———
  var toTop = document.querySelector(".to-top");

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;

    if (bar) {
      bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    }
    if (toTop) {
      // Within one viewport of the bottom, and only on pages long enough to matter.
      var nearEnd = max > doc.clientHeight &&
                    max - doc.scrollTop < doc.clientHeight * 0.9;
      toTop.classList.toggle("is-visible", nearEnd);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  // ——— Mobile menu ———
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");

  if (toggle && panel) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      panel.classList.toggle("is-open", open);
      // Stop the page behind the panel from scrolling while it's open.
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close on link tap so the anchor jump lands on a visible page.
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Resizing up to the desktop layout hides the toggle — don't leave the
    // panel open and the body locked with no way to close it.
    window.addEventListener("resize", function () {
      if (panel.classList.contains("is-open") &&
          getComputedStyle(toggle).display === "none") {
        setMenu(false);
      }
    });
  }
})();
