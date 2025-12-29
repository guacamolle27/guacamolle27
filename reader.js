let startX = 0;
let isSwiping = false;

document.addEventListener("touchstart", e => {
  if(e.touches.length === 1) {  // nur ein Finger
    startX = e.touches[0].clientX;
    isSwiping = true;
  }
});

document.addEventListener("touchmove", e => {
  if(isSwiping) {
    e.preventDefault();  // verhindert Scrollen
  }
}, { passive: false });

document.addEventListener("touchend", e => {
  if(!isSwiping) return;

  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  const threshold = 50; // Mindestabstand für Swipe

  if(diff > threshold) {
    next();  // Finger nach rechts → nächste Seite
  } else if(diff < -threshold) {
    prev();  // Finger nach links → vorherige Seite
  }

  isSwiping = false;
});
