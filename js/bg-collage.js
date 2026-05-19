// js/bg-collage.js
(function() {
  'use strict';

  function initBackgroundCollage() {
    let container = document.getElementById('bgCollage');
    if (!container) {
      container = document.createElement('div');
      container.id = 'bgCollage';
      document.body.appendChild(container);
    } else {
      container.innerHTML = '';
    }

    // Всі зображення з папки images (1..11)
    const imagePaths = [];
    for (let i = 1; i <= 11; i++) {
      imagePaths.push(`images/img${i}.jpg`);
    }

    // Перемішуємо масив
    const shuffled = [...imagePaths];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Беремо по 3 фото для лівої та правої сторони
    const leftImages = shuffled.slice(0, 3);
    const rightImages = shuffled.slice(3, 6);

    // Функція створення елемента з ефектом старого фото
    function createPolaroid(src, isLeftSide, index, total) {
      const polaroid = document.createElement('div');
      polaroid.className = 'collage-polaroid';

      // Випадковий розмір (ширина від 260px до 380px)
      const width = Math.floor(Math.random() * (380 - 260 + 1) + 260);
      polaroid.style.width = `${width}px`;
      
      // Висота розраховується автоматично (зображення + біла рамка)

      // Випадковий поворот (від -6 до +6 градусів)
      const rotate = (Math.random() - 0.5) * 12;
      polaroid.style.transform = `rotate(${rotate}deg)`;

      // Випадковий зсув по вертикалі (рівномірно розподіляємо)
      let topPercent;
      if (total === 3) {
        // Три фото – приблизно на 20%, 50%, 80% висоти екрану
        const positions = [18, 48, 78];
        topPercent = positions[index] + (Math.random() - 0.5) * 6;
      } else {
        const positions = [30, 65];
        topPercent = positions[index] + (Math.random() - 0.5) * 8;
      }
      polaroid.style.top = `${topPercent}%`;

      // Розміщення ліворуч або праворуч
      if (isLeftSide) {
        polaroid.style.left = `${Math.random() * 8}%`; // ліворуч, відступ 0-8%
        polaroid.style.right = 'auto';
      } else {
        polaroid.style.right = `${Math.random() * 8}%`;
        polaroid.style.left = 'auto';
      }

      // Випадкова затримка анімації
      polaroid.style.animationDelay = `${Math.random() * 8}s`;

      // Випадкова прозорість (ефект накладання)
      polaroid.style.opacity = 0.65 + Math.random() * 0.25;

      // Додаємо зображення всередину
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'old photo';
      img.loading = 'lazy';
      polaroid.appendChild(img);

      return polaroid;
    }

    // Додаємо ліві фото
    leftImages.forEach((src, idx) => {
      container.appendChild(createPolaroid(src, true, idx, leftImages.length));
    });

    // Додаємо праві фото
    rightImages.forEach((src, idx) => {
      container.appendChild(createPolaroid(src, false, idx, rightImages.length));
    });
  }

  document.addEventListener('DOMContentLoaded', initBackgroundCollage);
})();