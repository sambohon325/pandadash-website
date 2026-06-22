/* ===========================================================
   PandaDash AAC — main.js
   1) The demo video and both background videos are self-hosted
      <video> tags now — see index.html. No JS needed to set them up.
   2) Everything else is a light scroll-reveal, nothing fancy.
   =========================================================== */

/* ---------- Nav: transparent over the hero video, solid once scrolled ---------- */
(function navScrollState() {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  function update() {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
})();

/* ---------- Background videos: self-hosted, native <video>, no JS sizing needed
   (object-fit: cover handles that in CSS). Just respect reduced-motion. ---------- */
(function setUpBackgroundVideos() {
  const videos = document.querySelectorAll("video[data-autoplay]");
  if (!videos.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  videos.forEach((video) => {
    if (prefersReduced) {
      // Leave it paused on its first frame — no motion, just a still backdrop.
      return;
    }
    video.play().catch(() => {
      // Autoplay can still be blocked in some contexts; the static first frame
      // (or fallback background-color) is a fine fallback either way.
    });
  });
})();

(function scrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(
    ".feature-row, .plan-card, .section-head, .hero-float, .community"
  );

  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
})();
