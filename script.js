/* =========================================================
   JAVA LAB RECORD  |  script.js
   1. Staggered scroll reveal for the heading and week cards.
   2. Pointer-following spotlight on cards.
   3. Gold "S" badge if assets/logo.png is missing.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Scroll reveal ---------- */
  var items = [].slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      var n = 0;                                   // stagger cards that appear together
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--d", n++ * 90 + "ms");
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 2. Card spotlight ---------- */
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  /* ---------- 3. Logo fallback ---------- */
  var logo = document.querySelector(".logo");
  function useBadge() {
    var badge = document.createElement("span");
    badge.className = "logo--fallback";
    badge.setAttribute("role", "img");
    badge.setAttribute("aria-label", logo.alt);
    badge.textContent = "S";
    logo.replaceWith(badge);
  }
  if (logo) {
    if (logo.complete && logo.naturalWidth === 0) useBadge();
    else logo.addEventListener("error", useBadge);
  }
})();
