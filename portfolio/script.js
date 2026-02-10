/* ------- SIMPLE MOVING DOTS BACKGROUND ------- */

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const NUM_PARTICLES = 70; // increase/decrease number of dots
let particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;             // dot size
    this.speedX = (Math.random() * 0.4) - 0.2;     // -0.2 to 0.2
    this.speedY = (Math.random() * 0.4) - 0.2;
    this.alpha = 0.4 + Math.random() * 0.6;        // 0.4–1.0
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // bounce at edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "rgba(56, 189, 248, 1)"; // blue
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

initParticles();
animate();

