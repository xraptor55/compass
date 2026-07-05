const compass = document.getElementById("compass");

let currentRotation = 0;

document.body.addEventListener("pointerdown", (e) => {

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  const dx = e.clientX - cx;
  const dy = cy - e.clientY;

  let targetAngle = Math.atan2(dx, dy) * (180 / Math.PI);
  if (targetAngle < 0) targetAngle += 360;

  spinCompass(targetAngle);
});

function spinCompass(target) {

  const start = currentRotation;

  const spins = 3;
  const total = (360 * spins) + (target - start);

  const duration = 2500;
  const startTime = performance.now();

  function animate(time) {

    let t = (time - startTime) / duration;
    if (t > 1) t = 1;

    const ease = 1 - Math.pow(1 - t, 3);

    const wobble = Math.sin(t * 20 * Math.PI) * (1 - t) * 10;

    const angle = start + total * ease + wobble;

    compass.style.transform = `rotate(${angle}deg)`;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      currentRotation = target;

      compass.style.transform = `rotate(${target}deg)`;

      if (navigator.vibrate) {
        navigator.vibrate([20, 40, 80]);
      }
    }
  }

  requestAnimationFrame(animate);
}
