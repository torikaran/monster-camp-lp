const revealTargets = document.querySelectorAll(
  ".section:not(.voice-section):not(.target-section) > .section-inner, .voice-header, .target-section .section-label, .target-section h2, .monster-card, .flow-grid article, .voice-grid article, .next-card, .price-box, .venue-card, .number-callout"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => {
    target.classList.add("is-visible");
  });
}

// Animate recommendation rows separately, entering from alternate sides.
const targetItems = document.querySelectorAll(".target-grid > p");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const targetObserver = new IntersectionObserver((entries, observer) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry, index) => {
      entry.target.style.transitionDelay = `${Math.min(index, 3) * 90}ms`;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -24px 0px" });

  targetItems.forEach((item) => {
    item.classList.add("target-slide");
    targetObserver.observe(item);
  });

  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    targetObserver.disconnect();
    targetItems.forEach((item) => item.classList.add("is-visible"));
  });
}
