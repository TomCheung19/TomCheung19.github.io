const body = document.body;
body.classList.add("has-js");

const researchTabs = Array.from(document.querySelectorAll("[data-research-target]"));
const researchPanels = Array.from(document.querySelectorAll("[data-research-panel]"));

function activateResearchPanel(panelName) {
  researchTabs.forEach((tab) => {
    const isActive = tab.dataset.researchTarget === panelName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  researchPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.researchPanel === panelName);
  });
}

researchTabs.forEach((tab) => {
  tab.setAttribute("role", "tab");
  tab.addEventListener("click", () => activateResearchPanel(tab.dataset.researchTarget));
});

activateResearchPanel("dependency");

const revealTargets = document.querySelectorAll(
  ".education-card, .section-heading, .research-panel, .publication-list li, .timeline-entry, .methods-grid > div, .contact, .hobby-copy"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
}
