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
// (initialize after DOMContentLoaded to ensure elements exist)
// ==============================
document.addEventListener('DOMContentLoaded', () => {
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
});

// ==============================
// Parallax effect for images
// Initialize after DOMContentLoaded so elements exist
// ==============================
document.addEventListener('DOMContentLoaded', () => {
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
  }, { passive: true });
});

// ==============================
// Smooth scroll behavior & special anchors
// - ignore bare "#" links
// - open chapters panel when href="#chapters"
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Ignore bare anchors used as JS hooks
    if (!href || href === '#') return;

    // Special case: open chapters panel
    if (href === '#chapters') {
      const panel = document.getElementById('chaptersPanel');
      if (panel) {
        e.preventDefault();
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
      }
      return;
    }

    // Otherwise attempt to scroll to an element matching the href
    try {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      // If href isn't a valid selector, fail silently
      // (avoids exceptions for malformed/edge-case hrefs)
      // console.debug('smooth-scroll: invalid selector', href, err);
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
// Chapters panel toggle & navigation
// ==============================
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('chaptersToggle');
    const panel = document.getElementById('chaptersPanel');
    const closeBtn = document.getElementById('chaptersClose');

    if (!toggle || !panel) return; // nothing to do

    function openPanel() {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    }

    function closePanel() {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (panel.classList.contains('open')) closePanel(); else openPanel();
    });

    if (closeBtn) closeBtn.addEventListener('click', closePanel);

    // Close when clicking outside
    panel.addEventListener('click', (e) => {
      if (e.target === panel) closePanel();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });

    // chapter links (scroll to .chapter-divider by index)
    panel.querySelectorAll('[data-chapter]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = Number(link.getAttribute('data-chapter')) - 1;
        const chapters = document.querySelectorAll('.chapter-divider');
        if (chapters && chapters[idx]) {
          chapters[idx].scrollIntoView({ behavior: 'smooth' });
        }
        closePanel();
      });
    });
  });
})();

// ==============================
// Falling Hearts Animation for Poem Section ❤️
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