//   <!-- ===== SCRIPTS (kept minimal and inline) ===== -->
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    // Simple auto slider (no arrows)
    const slides = Array.from(document.querySelectorAll('.slide'));
    const titleEn = document.querySelector('.hero-title .en');
    const titleAr = document.querySelector('.hero-title .ar');
    const cta = document.querySelector('.hero-cta');

    let current = 0;
    const updateCaption = (i) => {
      const s = slides[i];
      titleEn.textContent = s.dataset.titleEn || '';
      titleAr.textContent = s.dataset.titleAr || '';
      cta.textContent = s.dataset.cta || 'Book Now';
      cta.setAttribute('href', s.dataset.ctaLink || '#contact');
    };

    const showSlide = (i) => {
      slides[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      updateCaption(current);
    };

    updateCaption(current);
    setInterval(() => showSlide(current + 1), 6000); // change every 6s

    // Current year
    document.getElementById('year').textContent = new Date().getFullYear();
