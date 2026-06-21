/* ===========================================================
   PandaDash AAC — main.js
   1) Drop in the YouTube video ID below once it's live.
   2) Everything else is a light scroll-reveal, nothing fancy.
   =========================================================== */

// STEP TO DO LATER: paste your YouTube video ID between the quotes,
// e.g. const INTRO_VIDEO_ID = "dQw4w9WgXcQ";
const INTRO_VIDEO_ID = "";

(function setUpIntroVideo() {
  const frame = document.getElementById("video-frame");
  if (!frame) return;

  if (INTRO_VIDEO_ID) {
    frame.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${INTRO_VIDEO_ID}?rel=0&modestbranding=1"
      title="PandaDash AAC — intro video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"></iframe>`;
  }
  // If no ID is set yet, the static fallback already in the HTML is shown.
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
