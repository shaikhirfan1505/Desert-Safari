// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
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
const flipButtons = document.querySelectorAll('.flip-btn');
flipButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.flip-card');
    card.classList.toggle('flipped');
  });
});
