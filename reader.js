const pages = [
  "pages/page1.webp",
  "pages/page2.webp",
  "pages/page3.webp",
  "pages/page4.webp",
  "pages/page5.webp",
  "pages/page6.webp",
  "pages/page7.webp"
];

let current = 0;
const img = document.getElementById("page");

/* PRELOAD */
pages.forEach(src => {
  const i = new Image();
  i.src = src;
});

/* TASTATUR */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") next();
  if (e.key === "ArrowRight") prev();
});

function next() {
  if (current < pages.length - 1) {
    current++;
    img.src = pages[current];
  }
}

function prev() {
  if (current > 0) {
    current--;
    img.src = pages[current];
  }
}

/* TOUCH / SWIPE */
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (endX - startX > 50) next();

  if (startX - endX > 50) prev();
});
