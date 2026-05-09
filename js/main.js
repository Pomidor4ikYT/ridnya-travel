(function() {
  'use strict';

  // Мобільне меню
  function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // Анімація появи блоків при скролі
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
  }

  // Лічильники статистики
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;
          const update = () => {
            current += step;
            if (current < target) {
              el.textContent = Math.floor(current);
              requestAnimationFrame(update);
            } else {
              el.textContent = target;
            }
          };
          update();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => observer.observe(el));
  }

  // FAQ акордеон
  function initFaq() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        item.classList.toggle('open');
        const icon = btn.querySelector('i:last-child');
        if (icon) {
          icon.classList.toggle('fa-chevron-down');
          icon.classList.toggle('fa-chevron-up');
        }
      });
    });
  }

  // Плавний скрол до якорів
  function initSmoothScroll() {
    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:') || href.includes('.html')) return;
      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {}
    });
  }

function initBgCollage() {
  const configs = {
    'page-home': [
      { src: 'images/img8.jpg', top: '5%', left: '2%', width: '16vw', transform: 'rotate(-3deg)' },
      { src: 'images/img4.jpg', top: '50%', right: '3%', width: '15vw', transform: 'rotate(2deg)' },
      { src: 'images/img1.jpg', bottom: '8%', left: '4%', width: '17vw', transform: 'rotate(1deg)' },
      { src: 'images/img6.jpg', top: '15%', right: '6%', width: '14vw', transform: 'rotate(-4deg)' },
      { src: 'images/img11.jpg', bottom: '30%', right: '10%', width: '13vw', transform: 'rotate(3deg)' },
      { src: 'images/img9.jpg', top: '70%', left: '8%', width: '15vw', transform: 'rotate(-2deg)' }
    ],
    'page-trips': [
      { src: 'images/img8.jpg', top: '8%', left: '1%', width: '15vw', transform: 'rotate(2deg)' },
      { src: 'images/img9.jpg', bottom: '5%', right: '2%', width: '16vw', transform: 'rotate(-1deg)' },
      { src: 'images/img2.jpg', top: '55%', left: '3%', width: '14vw', transform: 'rotate(4deg)' },
      { src: 'images/img10.jpg', top: '20%', right: '8%', width: '13vw', transform: 'rotate(-3deg)' },
      { src: 'images/img5.jpg', bottom: '40%', left: '10%', width: '15vw', transform: 'rotate(2deg)' },
      { src: 'images/img7.jpg', top: '80%', right: '12%', width: '14vw', transform: 'rotate(-2deg)' }
    ],
    'page-blog': [
      { src: 'images/img10.jpg', top: '10%', right: '2%', width: '15vw', transform: 'rotate(-3deg)' },
      { src: 'images/img11.jpg', top: '45%', left: '1%', width: '16vw', transform: 'rotate(1deg)' },
      { src: 'images/img5.jpg', bottom: '8%', right: '4%', width: '14vw', transform: 'rotate(-2deg)' },
      { src: 'images/img3.jpg', top: '70%', left: '6%', width: '13vw', transform: 'rotate(3deg)' },
      { src: 'images/img1.jpg', bottom: '50%', right: '10%', width: '15vw', transform: 'rotate(-1deg)' },
      { src: 'images/img6.jpg', top: '25%', left: '12%', width: '14vw', transform: 'rotate(2deg)' }
    ],
    'page-gallery': [
      { src: 'images/img11.jpg', top: '12%', left: '3%', width: '15vw', transform: 'rotate(1deg)' },
      { src: 'images/img1.jpg', top: '55%', right: '2%', width: '16vw', transform: 'rotate(-2deg)' },
      { src: 'images/img7.jpg', bottom: '15%', left: '5%', width: '14vw', transform: 'rotate(3deg)' },
      { src: 'images/img9.jpg', top: '30%', right: '8%', width: '13vw', transform: 'rotate(-3deg)' },
      { src: 'images/img4.jpg', bottom: '45%', right: '12%', width: '15vw', transform: 'rotate(2deg)' },
      { src: 'images/img2.jpg', top: '85%', left: '10%', width: '14vw', transform: 'rotate(-1deg)' }
    ],
    'page-contacts': [
      { src: 'images/img1.jpg', top: '8%', right: '3%', width: '15vw', transform: 'rotate(-2deg)' },
      { src: 'images/img4.jpg', top: '50%', left: '2%', width: '16vw', transform: 'rotate(1deg)' },
      { src: 'images/img6.jpg', bottom: '10%', right: '5%', width: '14vw', transform: 'rotate(-3deg)' },
      { src: 'images/img8.jpg', top: '70%', left: '8%', width: '13vw', transform: 'rotate(2deg)' },
      { src: 'images/img10.jpg', bottom: '35%', left: '12%', width: '15vw', transform: 'rotate(-2deg)' },
      { src: 'images/img3.jpg', top: '25%', right: '15%', width: '14vw', transform: 'rotate(3deg)' }
    ],
    'page-faq': [
      { src: 'images/img2.jpg', top: '10%', left: '3%', width: '15vw', transform: 'rotate(2deg)' },
      { src: 'images/img5.jpg', bottom: '20%', right: '2%', width: '16vw', transform: 'rotate(-1deg)' },
      { src: 'images/img9.jpg', top: '55%', left: '5%', width: '14vw', transform: 'rotate(4deg)' },
      { src: 'images/img11.jpg', top: '30%', right: '9%', width: '13vw', transform: 'rotate(-3deg)' },
      { src: 'images/img7.jpg', bottom: '55%', left: '11%', width: '15vw', transform: 'rotate(1deg)' },
      { src: 'images/img1.jpg', top: '85%', right: '7%', width: '14vw', transform: 'rotate(-2deg)' }
    ],
    'page-reviews': [
      { src: 'images/img4.jpg', top: '5%', right: '2%', width: '15vw', transform: 'rotate(-3deg)' },
      { src: 'images/img7.jpg', top: '48%', left: '1%', width: '16vw', transform: 'rotate(2deg)' },
      { src: 'images/img10.jpg', bottom: '8%', right: '4%', width: '14vw', transform: 'rotate(-2deg)' },
      { src: 'images/img8.jpg', top: '75%', left: '9%', width: '13vw', transform: 'rotate(3deg)' },
      { src: 'images/img5.jpg', bottom: '30%', left: '14%', width: '15vw', transform: 'rotate(-1deg)' },
      { src: 'images/img2.jpg', top: '20%', right: '13%', width: '14vw', transform: 'rotate(2deg)' }
    ],
    'page-gear': [
      { src: 'images/img6.jpg', top: '12%', left: '2%', width: '15vw', transform: 'rotate(1deg)' },
      { src: 'images/img3.jpg', top: '55%', right: '1%', width: '16vw', transform: 'rotate(-2deg)' },
      { src: 'images/img8.jpg', bottom: '12%', left: '5%', width: '14vw', transform: 'rotate(3deg)' },
      { src: 'images/img11.jpg', top: '35%', right: '10%', width: '13vw', transform: 'rotate(-3deg)' },
      { src: 'images/img9.jpg', bottom: '45%', right: '14%', width: '15vw', transform: 'rotate(2deg)' },
      { src: 'images/img1.jpg', top: '80%', left: '11%', width: '14vw', transform: 'rotate(-1deg)' }
    ]
  };

  const pageClass = Array.from(document.body.classList).find(c => c.startsWith('page-'));
  if (!pageClass || !configs[pageClass]) return;

  const images = configs[pageClass];
  const collage = document.createElement('div');
  collage.id = 'bgCollage';

  images.forEach((cfg, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'collage-img';
    if (cfg.top) wrapper.style.top = cfg.top;
    if (cfg.left) wrapper.style.left = cfg.left;
    if (cfg.right) wrapper.style.right = cfg.right;
    if (cfg.bottom) wrapper.style.bottom = cfg.bottom;
    wrapper.style.width = cfg.width;
    wrapper.style.animationDelay = (index * 0.5) + 's'; // швидша поява

    const img = document.createElement('img');
    img.src = cfg.src;
    img.alt = '';
    img.loading = 'lazy';
    img.style.transform = cfg.transform;

    wrapper.appendChild(img);
    collage.appendChild(wrapper);
  });

  document.body.insertBefore(collage, document.body.firstChild);
}

  // Запуск усього
  document.addEventListener('DOMContentLoaded', () => {
    initBgCollage();
    initMobileMenu();
    initScrollReveal();
    animateStats();
    initFaq();
    initSmoothScroll();
  });
})();