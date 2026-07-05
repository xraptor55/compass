const compass = document.getElementById("compass");

let current = 0;

document.body.addEventListener("pointerdown", (e) => {

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  const dx = e.clientX - cx;
  const dy = cy - e.clientY;

  let target = Math.atan2(dx, dy) * (180 / Math.PI);
  if (target < 0) target += 360;

  const direction = Math.random() < 0.5 ? -1 : 1;
  const spins = 2 + Math.floor(Math.random() * 5); // 2–6

  animateCompass(target, direction, spins);
});

function animateCompass(target, direction, spins) {

  const start = current;

  let delta = target - start;

  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;

  delta = (360 * spins + Math.abs(delta)) * direction;

  const duration = 5000;
  const startTime = performance.now();

  function easeOutElastic(t) {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) *
        Math.sin((t * 10 - 0.75) * c4) + 1;
  }

  function animate(time) {

    let t = (time - startTime) / duration;
    if (t > 1) t = 1;

    let motion = easeOutElastic(t);

    let wobble = Math.sin(t * 14 * Math.PI) * (1 - t) * 6;

    let angle = start + delta * motion + wobble;

    compass.style.transform = `rotate(${angle}deg)`;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      current = target;

      compass.style.transform = `rotate(${target}deg)`;

      if (navigator.vibrate) {
        navigator.vibrate([40, 60, 120]);
      }
    }
  }

  requestAnimationFrame(animate);
}
