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

/* FUNKTIONEN */
function next() {
  if(current < pages.length - 1) {
    current++;
    img.src = pages[current];
  }
}

function prev() {
  if(current > 0) {
    current--;
    img.src = pages[current];
  }
}

/* TASTATUR – jetzt „rechts-nach-links“ */
document.addEventListener("keydown", e => {
  if(e.key === "ArrowLeft") next();   // links → nächste Seite
  if(e.key === "ArrowRight") prev();  // rechts → vorherige Seite
});

/* TOUCH / SWIPE für iPhone/iPad */
let startX = 0;
let isSwiping = false;

document.addEventListener("touchstart", e => {
  if(e.touches.length === 1) {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }
});

document.addEventListener("touchmove", e => {
  if(isSwiping) e.preventDefault(); // verhindert Scrollen
}, { passive: false });

document.addEventListener("touchend", e => {
  if(!isSwiping) return;
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  if(diff > 50) next();       // rechts → nächste Seite
  else if(diff < -50) prev(); // links → vorherige Seite

  isSwiping = false;
});
