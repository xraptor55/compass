const needle = document.getElementById("needle");

let currentAngle = 0;

document.body.addEventListener("pointerdown", (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  const dx = e.clientX - cx;
  const dy = cy - e.clientY;

  // kot 0–360 (0 = gor, 90 = desno)
  let targetAngle = Math.atan2(dx, dy) * (180 / Math.PI);
  if (targetAngle < 0) targetAngle += 360;

  spinTo(targetAngle);
});

function spinTo(target) {
  const start = currentAngle;

  // več obratov + cilj
  const spins = 3;
  const totalRotation = (360 * spins) + (target - start);

  const duration = 2500;
  const startTime = performance.now();

  function animate(time) {
    let t = (time - startTime) / duration;
    if (t > 1) t = 1;

    // easing (počasno ustavljanje)
    const ease = 1 - Math.pow(1 - t, 3);

    // “tavanje” / iskanje smeri
    const wobble = Math.sin(t * 20 * Math.PI) * (1 - t) * 15;

    const angle = start + totalRotation * ease + wobble;

    needle.style.transform =
      `translate(-50%, -100%) rotate(${angle}deg)`;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      currentAngle = target;

      needle.style.transform =
        `translate(-50%, -100%) rotate(${target}deg)`;

      // vibracija ob ustavitvi
      if (navigator.vibrate) {
        navigator.vibrate([30, 50, 80]);
      }
    }
  }

  requestAnimationFrame(animate);
}
