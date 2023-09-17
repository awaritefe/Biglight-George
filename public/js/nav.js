const header = document.querySelector(".header");
const mobileToggle = document.querySelector(".header-mobile-toggle");

mobileToggle.addEventListener("click", () => {
  const visibility = header.getAttribute("data-visible");

  if (visibility === "false") {
    header.setAttribute("data-visible", true);
    mobileToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    header.setAttribute("data-visible", false);
    mobileToggle.setAttribute("aria-expanded", false);
  }
});
