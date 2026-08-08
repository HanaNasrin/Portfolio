const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let width = 0;
let height = 0;
let particles = [];
let pointer = { x: null, y: null, radius: 140 };

const resize = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = Array.from({ length: Math.min(80, Math.floor(width / 18)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    size: Math.random() * 2 + 1
  }));
};

const draw = () => {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = '#810681';
    ctx.fill();

    for (let j = index + 1; j < particles.length; j += 1) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(129, 6, 129, ${0.2 - distance / 600})`;
        ctx.stroke();
      }
    }

    if (pointer.x !== null) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < pointer.radius) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.strokeStyle = `rgba(255,255,255,${0.08 - distance / 1800})`;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(draw);
};

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});
window.addEventListener('mouseleave', () => {
  pointer.x = null;
  pointer.y = null;
});

resize();
draw();