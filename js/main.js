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

  // Анімація появи блоків
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

  // Плавний скрол до якорів
  function initSmoothScroll() {
    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Анімація лічильників статистики (тільки на головній)
  function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          let current = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current);
            }
          }, 20);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => observer.observe(el));
  }

  // FAQ акордеон
  function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (!faqQuestions.length) return;
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (item) {
          item.classList.toggle('open');
          const icon = btn.querySelector('i:last-child');
          if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
          }
        }
      });
    });
  }

function initBgCollage() {
  const configs = {
    'page-home': [
      { src: 'images/img8.jpg', left: '0%', top: '14vh', width: '14vw', rotate: '-4deg' },
      { src: 'images/img4.jpg', left: '3%', top: '42vh', width: '13vw', rotate: '3deg' },
      { src: 'images/img1.jpg', left: '1%', top: '70vh', width: '15vw', rotate: '2deg' },
      { src: 'images/img6.jpg', right: '0%', top: '18vh', width: '14vw', rotate: '3deg' },
      { src: 'images/img11.jpg', right: '3%', top: '50vh', width: '13vw', rotate: '-2deg' },
      { src: 'images/img9.jpg', right: '1%', top: '78vh', width: '14vw', rotate: '-3deg' },
      { src: 'images/img2.jpg', left: '8%', bottom: '8vh', width: '12vw', rotate: '5deg' }
    ],
    'page-trips': [
      { src: 'images/img8.jpg', left: '0%', top: '16vh', width: '14vw', rotate: '2deg' },
      { src: 'images/img9.jpg', left: '2%', top: '48vh', width: '13vw', rotate: '-3deg' },
      { src: 'images/img2.jpg', left: '1%', top: '75vh', width: '15vw', rotate: '4deg' },
      { src: 'images/img10.jpg', right: '0%', top: '22vh', width: '14vw', rotate: '-2deg' },
      { src: 'images/img5.jpg', right: '3%', top: '55vh', width: '13vw', rotate: '3deg' },
      { src: 'images/img7.jpg', right: '1%', top: '80vh', width: '14vw', rotate: '-4deg' },
      { src: 'images/img3.jpg', left: '7%', bottom: '10vh', width: '12vw', rotate: '-5deg' }
    ],
    'page-blog': [
      { src: 'images/img10.jpg', left: '0%', top: '12vh', width: '14vw', rotate: '-3deg' },
      { src: 'images/img11.jpg', left: '3%', top: '44vh', width: '13vw', rotate: '2deg' },
      { src: 'images/img5.jpg', left: '1%', top: '72vh', width: '15vw', rotate: '4deg' },
      { src: 'images/img3.jpg', right: '0%', top: '20vh', width: '14vw', rotate: '-2deg' },
      { src: 'images/img1.jpg', right: '3%', top: '52vh', width: '13vw', rotate: '3deg' },
      { src: 'images/img6.jpg', right: '1%', top: '82vh', width: '14vw', rotate: '-4deg' },
      { src: 'images/img8.jpg', left: '9%', bottom: '12vh', width: '12vw', rotate: '6deg' }
    ],
    'page-gallery': [
      { src: 'images/img11.jpg', left: '0%', top: '15vh', width: '14vw', rotate: '2deg' },
      { src: 'images/img1.jpg', left: '2%', top: '46vh', width: '13vw', rotate: '-3deg' },
      { src: 'images/img7.jpg', left: '1%', top: '74vh', width: '15vw', rotate: '4deg' },
      { src: 'images/img9.jpg', right: '0%', top: '24vh', width: '14vw', rotate: '-2deg' },
      { src: 'images/img4.jpg', right: '3%', top: '58vh', width: '13vw', rotate: '3deg' },
      { src: 'images/img2.jpg', right: '1%', top: '85vh', width: '14vw', rotate: '-4deg' },
      { src: 'images/img6.jpg', left: '8%', bottom: '9vh', width: '12vw', rotate: '-5deg' }
    ],
    'page-contacts': [
      { src: 'images/img1.jpg', left: '0%', top: '13vh', width: '14vw', rotate: '-3deg' },
      { src: 'images/img4.jpg', left: '3%', top: '40vh', width: '13vw', rotate: '2deg' },
      { src: 'images/img6.jpg', left: '1%', top: '68vh', width: '15vw', rotate: '4deg' },
      { src: 'images/img8.jpg', right: '0%', top: '17vh', width: '14vw', rotate: '-2deg' },
      { src: 'images/img10.jpg', right: '3%', top: '48vh', width: '13vw', rotate: '3deg' },
      { src: 'images/img3.jpg', right: '1%', top: '76vh', width: '14vw', rotate: '-4deg' },
      { src: 'images/img5.jpg', left: '7%', bottom: '11vh', width: '12vw', rotate: '5deg' }
    ],
    'page-faq': [
      { src: 'images/img2.jpg', left: '0%', top: '17vh', width: '14vw', rotate: '2deg' },
      { src: 'images/img5.jpg', left: '2%', top: '50vh', width: '13vw', rotate: '-3deg' },
      { src: 'images/img9.jpg', left: '1%', top: '73vh', width: '15vw', rotate: '4deg' },
      { src: 'images/img11.jpg', right: '0%', top: '21vh', width: '14vw', rotate: '-2deg' },
      { src: 'images/img7.jpg', right: '3%', top: '54vh', width: '13vw', rotate: '3deg' },
      { src: 'images/img1.jpg', right: '1%', top: '79vh', width: '14vw', rotate: '-4deg' },
      { src: 'images/img4.jpg', left: '9%', bottom: '13vh', width: '12vw', rotate: '-6deg' }
    ],
    'page-reviews': [
      { src: 'images/img4.jpg', left: '0%', top: '11vh', width: '14vw', rotate: '-3deg' },
      { src: 'images/img7.jpg', left: '3%', top: '43vh', width: '13vw', rotate: '2deg' },
      { src: 'images/img10.jpg', left: '1%', top: '71vh', width: '15vw', rotate: '4deg' },
      { src: 'images/img8.jpg', right: '0%', top: '19vh', width: '14vw', rotate: '-2deg' },
      { src: 'images/img5.jpg', right: '3%', top: '51vh', width: '13vw', rotate: '3deg' },
      { src: 'images/img2.jpg', right: '1%', top: '77vh', width: '14vw', rotate: '-4deg' },
      { src: 'images/img9.jpg', left: '8%', bottom: '14vh', width: '12vw', rotate: '5deg' }
    ],
    'page-gear': [
      { src: 'images/img6.jpg', left: '0%', top: '18vh', width: '14vw', rotate: '2deg' },
      { src: 'images/img3.jpg', left: '2%', top: '49vh', width: '13vw', rotate: '-3deg' },
      { src: 'images/img8.jpg', left: '1%', top: '76vh', width: '15vw', rotate: '4deg' },
      { src: 'images/img11.jpg', right: '0%', top: '23vh', width: '14vw', rotate: '-2deg' },
      { src: 'images/img9.jpg', right: '3%', top: '56vh', width: '13vw', rotate: '3deg' },
      { src: 'images/img1.jpg', right: '1%', top: '81vh', width: '14vw', rotate: '-4deg' },
      { src: 'images/img7.jpg', left: '7%', bottom: '15vh', width: '12vw', rotate: '-5deg' }
    ]
  };

  const pageClass = Array.from(document.body.classList).find(c => c.startsWith('page-'));
  if (!pageClass || !configs[pageClass]) return;
  if (document.getElementById('bgCollage')) return;

  const images = configs[pageClass];
  const collage = document.createElement('div');
  collage.id = 'bgCollage';

  images.forEach((cfg, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'collage-img';
    if (cfg.left) wrapper.style.left = cfg.left;
    if (cfg.right) wrapper.style.right = cfg.right;
    wrapper.style.top = cfg.top;
    if (cfg.bottom) wrapper.style.bottom = cfg.bottom;
    wrapper.style.width = cfg.width;
    wrapper.style.animationDelay = (index * 0.2) + 's';

    const img = document.createElement('img');
    img.src = cfg.src;
    img.alt = '';
    img.loading = 'lazy';
    img.style.transform = `rotate(${cfg.rotate})`;

    wrapper.appendChild(img);
    collage.appendChild(wrapper);
  });

  document.body.insertBefore(collage, document.body.firstChild);
}

  // Запуск всього
  document.addEventListener('DOMContentLoaded', () => {
    initBgCollage();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initStatsCounter();
    initFaqAccordion();
  });
})();