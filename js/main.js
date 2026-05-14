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

  // Запуск всього
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initStatsCounter();
    initFaqAccordion();
  });
})();