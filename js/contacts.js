(function() {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Дякуємо! Ми зв\'яжемося з вами.');
        form.reset();
      });
    }
  });
})();