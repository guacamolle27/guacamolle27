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

/* Funktionen */
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

/* TASTATUR */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
});

/* TOUCH / SWIPE – robust für iPhone/iPad */
let startX = 0;
let isMoving = false;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isMoving = true;
});

document.addEventListener("touchmove", e => {
  if (isMoving) e.preventDefault();
}, { passive: false });

document.addEventListener("touchend", e => {
  if (!isMoving) return;
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  if (diff > 50) next();       // Finger nach rechts → nächste Seite
  else if (diff < -50) prev(); // Finger nach links → vorherige Seite

  isMoving = false;
});
