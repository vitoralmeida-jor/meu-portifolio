const button = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");

if (button && navigation) {
  button.setAttribute("aria-expanded", "false");
  navigation.dataset.open = "false";

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    navigation.dataset.open = String(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      button.setAttribute("aria-expanded", "false");
      navigation.dataset.open = "false";
    }
  });
}

document.querySelectorAll("[data-filters]").forEach((filterGroup) => {
  const grid = filterGroup.closest(".listing")?.querySelector("[data-filter-grid]");
  const emptyState = filterGroup.closest(".listing")?.querySelector("[data-empty-state]");
  if (!grid) return;

  filterGroup.addEventListener("click", (event) => {
    const selected = event.target.closest("[data-filter]");
    if (!selected) return;

    const filter = selected.dataset.filter;
    let visible = 0;

    filterGroup.querySelectorAll("[data-filter]").forEach((button) => {
      const active = button === selected;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    grid.querySelectorAll(".filter-item").forEach((item) => {
      const matches = filter === "all" || item.dataset.categories.includes(filter);
      item.hidden = !matches;
      if (matches) visible += 1;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
  });
});
