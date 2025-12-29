// ----- Seiten definieren -----
const pages = [
  "pages/page1.webp",
  "pages/page2.webp",
  "pages/page3.webp",
  "pages/page4.webp",
  "pages/page5.webp",
  "pages/page6.webp",
  "pages/page7.webp"
];

// ----- Variablen -----
let current = 0;
const img = document.getElementById("page");

// ----- Preload aller Seiten -----
pages.forEach(src => {
  const i = new Image();
  i.src = src;
});

// ----- Funktionen -----
function next() {          // Nächste Seite
  if(current < pages.length - 1) {
    current++;
    img.src = pages[current];
  }
}

function prev() {          // Vorherige Seite
  if(current > 0) {
    current--;
    img.src = pages[current];
  }
}

// ----- Tastatursteuerung (rechts-nach-links Manga) -----
document.addEventListener("keydown", e => {
  if(e.key === "ArrowLeft") next();   // Linkspfeil → nächste Seite
  if(e.key === "ArrowRight") prev();  // Rechtspfeil → vorherige Seite
});

// ----- Touch / Swipe für iPhone/iPad -----
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
  const threshold = 50; // Mindestabstand für Swipe

  if(diff > threshold) next();       // Finger nach rechts → nächste Seite
  else if(diff < -threshold) prev(); // Finger nach links → vorherige Seite

  isSwiping = false;
});
