/* ------- SIMPLE MOVING DOTS BACKGROUND ------- */

const canvas = document.getElementById("particle-canvas");

if (canvas) {

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  const NUM_PARTICLES = 70;
  let particles = [];

  class Particle {

    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() * 0.4) - 0.2;
      this.speedY = (Math.random() * 0.4) - 0.2;
      this.alpha = 0.4 + Math.random() * 0.6;
    }

    update() {

      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) {
        this.speedX *= -1;
      }

      if (this.y < 0 || this.y > canvas.height) {
        this.speedY *= -1;
      }

    }

    draw() {

      ctx.beginPath();

      ctx.globalAlpha = this.alpha;

      ctx.fillStyle = "rgba(56, 189, 248, 1)";

      ctx.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );

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

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach(function(p) {

      p.update();
      p.draw();

    });

    requestAnimationFrame(animate);

  }


  initParticles();
  animate();

}

/* =========================================
   THEME DROPDOWN
========================================= */

const themeDropdown = document.querySelector(".theme-dropdown");
const themeDropdownBtn = document.getElementById("themeDropdownBtn");
const themeOptions = document.querySelectorAll(".theme-option");


/* Open / close dropdown */
themeDropdownBtn.addEventListener("click", function (event) {

  event.stopPropagation();

  const isOpen = themeDropdown.classList.toggle("open");

  themeDropdownBtn.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

});


/* Select theme */
themeOptions.forEach(function (option) {

  option.addEventListener("click", function () {

    const selectedTheme = this.dataset.theme;

   if (selectedTheme === "light") {

  document.body.classList.add("light-theme");

  localStorage.setItem(
    "portfolio-theme",
    "light"
  );

  themeDropdownBtn.childNodes[0].textContent = "Light Mode ";

} else {

  document.body.classList.remove("light-theme");

  localStorage.setItem(
    "portfolio-theme",
    "dark"
  );

  themeDropdownBtn.childNodes[0].textContent = "Dark Mode ";

}

    /* Close dropdown */
    themeDropdown.classList.remove("open");

    themeDropdownBtn.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* Close when clicking outside */
document.addEventListener("click", function (event) {

  if (!themeDropdown.contains(event.target)) {

    themeDropdown.classList.remove("open");

    themeDropdownBtn.setAttribute(
      "aria-expanded",
      "false"
    );

  }

});


/* Load saved theme */
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

  document.body.classList.add("light-theme");

  if (themeDropdownBtn) {
    themeDropdownBtn.childNodes[0].textContent = "Light Mode ";
  }

} else {

  document.body.classList.remove("light-theme");

  if (themeDropdownBtn) {
    themeDropdownBtn.childNodes[0].textContent = "Dark Mode ";
  }

}

/* =========================================================
   CERTIFICATE PDF VIEWER
   ========================================================= */

const certificateModal =
  document.getElementById("certificateModal");

const certificateModalPdf =
  document.getElementById("certificateModalPdf");

const certificateModalClose =
  document.getElementById("certificateModalClose");

const certificateModalOverlay =
  document.querySelector(".certificate-modal-overlay");

const certificateButtons =
  document.querySelectorAll(".certificate-view-btn");


/* Open certificate */

certificateButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const pdfPath =
      this.dataset.pdf;

    if (!pdfPath) {

      console.error(
        "Certificate PDF path is missing."
      );

      return;
    }

    console.log(
      "Opening certificate:",
      pdfPath
    );

    certificateModalPdf.src =
      pdfPath;

    certificateModal.classList.add("open");

    certificateModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  });

});


/* Close certificate */

function closeCertificateModal() {

  certificateModal.classList.remove(
    "open"
  );

  certificateModal.setAttribute(
    "aria-hidden",
    "true"
  );

  certificateModalPdf.src = "";

  document.body.style.overflow = "";

}


/* X button */

certificateModalClose.addEventListener(
  "click",
  closeCertificateModal
);


/* Click outside */

certificateModalOverlay.addEventListener(
  "click",
  closeCertificateModal
);


/* ESC key */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      certificateModal.classList.contains("open")
    ) {

      closeCertificateModal();

    }

  }
);
