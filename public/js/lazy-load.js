// LAZY LOAD
const lazyImages = document.querySelectorAll(".lazy");

function preloadImage(img) {
  const src = img.getAttribute("src");
  if (!src) {
    return;
  }
  img.src = src;
}

const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 300px 0px",
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

lazyImages.forEach((image) => {
  imgObserver.observe(image);
});
