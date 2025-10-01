// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', (e) => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
  e.stopPropagation(); // prevent immediate document click from closing
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Slider setup
const slides = Array.from(document.querySelectorAll('.slide'));
const titleEn = document.querySelector('.hero-title .en');
const titleAr = document.querySelector('.hero-title .ar');
const cta = document.querySelector('.hero-cta');
let current = 0;

// Update caption function
const updateCaption = (i) => {
  const s = slides[i];
  titleEn.textContent = s.dataset.titleEn || '';
  titleAr.textContent = s.dataset.titleAr || '';
  cta.textContent = s.dataset.cta || 'Book Now';
  cta.setAttribute('href', s.dataset.ctaLink || '#contact');
};

// Show slide function
const showSlide = (i) => {
  slides[current].classList.remove('is-active');
  current = (i + slides.length) % slides.length;

  const slide = slides[current];
  const video = slide.querySelector('video');

  // If it's a video, restart it
  if (video) {
    video.muted = true;
    video.currentTime = 0;
    video.play();
  }

  slides[current].classList.add('is-active');
  updateCaption(current);
};

// Initialize
updateCaption(current);

// Auto-slide: first video 8s, then images 3s each
const slideDurations = slides.map(slide => slide.querySelector('video') ? 6000 : 3000);
let slideTimeout;

const scheduleNextSlide = () => {
  slideTimeout = setTimeout(() => {
    showSlide(current + 1);
    scheduleNextSlide();
  }, slideDurations[current]);
};

// Start slider
scheduleNextSlide();

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Card flipping
document.querySelectorAll('.flip-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const flipCard = this.closest('.flip-card');
    flipCard.classList.toggle('flipped');
  });
});
// Handle mobile dropdowns for all dropdowns
document.querySelectorAll('.nav-list .dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  toggle.addEventListener('click', (e) => {
    // Only allow toggle if mobile nav is open
    if (nav.classList.contains('open')) {
      e.preventDefault();            // prevent default anchor jump
      menu.classList.toggle('open'); // toggle submenu
    }
  });
});
