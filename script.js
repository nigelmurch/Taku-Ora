// ==============================
// CONTENT WARNING MODAL
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contentWarningModal');
  const exitButton = document.getElementById('exitButton');
  const returnToGoogleButton = document.getElementById('returnToGoogleButton');

  // Only show once per session
  if (!sessionStorage.getItem('contentWarningShown')) {
    modal.classList.add('active');
  }

  exitButton.addEventListener('click', () => {
    modal.classList.remove('active');
    sessionStorage.setItem('contentWarningShown', 'true');
  });

  returnToGoogleButton.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
});

// ==============================
// Intersection Observer for fade-in effects
// ==============================
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.text-content, .image-container, .grid-item, .full-width-content h2, .finale h2')
  .forEach(el => observer.observe(el));

// ==============================
// Parallax effect for images
// ==============================
const parallaxImages = document.querySelectorAll('.parallax-image');

window.addEventListener('scroll', () => {
  parallaxImages.forEach(img => {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
      const translateY = (scrollPercent - 0.5) * 50;
      img.style.transform = `translateY(${translateY}px)`;
    }
  });
});

// ==============================
// Smooth scroll behavior
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==============================
// Floating Particle Generator for Hero Section
// ==============================
(function () {
  const glow = document.querySelector('.hero__glow');
  if (!glow) return;

  const PARTICLE_COUNT = 25;
  const COLORS = [
    'rgba(255,220,200,0.9)',
    'rgba(255,200,170,0.8)',
    'rgba(255,240,230,0.6)'
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'hero-particle';
    const size = Math.random() * 10 + 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `${-Math.random() * 20}px`;
    p.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    p.style.opacity = (0.2 + Math.random() * 0.6).toFixed(2);
    const duration = 12 + Math.random() * 18;
    const delay = Math.random() * -20;
    p.style.animation = `rise ${duration}s linear ${delay}s infinite, floatX ${(5 + Math.random() * 5)}s ease-in-out ${delay}s infinite alternate`;
    glow.appendChild(p);
  }
})();

// ==============================
// Falling Hearts Animation for my Poem Section ❤️
// ==============================
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.querySelector('.falling-hearts-container');
    if (!heartsContainer) return; // Exit gracefully if poem section not present

    function createHeart() {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.textContent = '❤';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = 3 + Math.random() * 3 + 's';
      heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
      heartsContainer.appendChild(heart);

      // Remove heart after its animation ends
      setTimeout(() => heart.remove(), 6000);
    }

    // Generate hearts continuously
    setInterval(createHeart, 300);
  });
})();
