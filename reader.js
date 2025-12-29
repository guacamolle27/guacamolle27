let startX = 0;
let isMoving = false;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isMoving = true;
});

document.addEventListener("touchmove", e => {
  // Verhindert, dass Safari scrollt
  if (isMoving) e.preventDefault();
}, { passive: false });

document.addEventListener("touchend", e => {
  if (!isMoving) return;
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  // Swipe Threshold
  if (diff > 50) next();       // Finger nach rechts → nächste Seite
  else if (diff < -50) prev(); // Finger nach links → vorherige Seite

  isMoving = false;
});
