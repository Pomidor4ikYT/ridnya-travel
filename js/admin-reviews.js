(function() {
  'use strict';

  const STORAGE_KEY = 'ridnya_reviews';
  let reviews = [];

  function loadData() {
    reviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }

  function renderReviews() {
    const tbody = document.getElementById('reviewsTableBody');
    if (!tbody) return;
    tbody.innerHTML = reviews.map(r => `
      <tr>
        <td>${r.id || ''}</td>
        <td>${escapeHtml(r.name)}</td>
        <td>${r.age}</td>
        <td>${escapeHtml(r.text)}</td>
        <td>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</td>
        <td><span class="status-badge ${r.approved ? 'status-approved' : 'status-pending'}">${r.approved ? 'Опубліковано' : 'На модерації'}</span></td>
        <td>
          <button class="action-btn approve" data-id="${r.id}">✓ Опублікувати</button>
          <button class="action-btn delete" data-id="${r.id}">🗑 Видалити</button>
        </td>
      </tr>
    `).join('');
    attachActions();
  }

  function attachActions() {
    document.querySelectorAll('.action-btn.approve').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const r = reviews.find(r => r.id == id);
        if (r) {
          r.approved = true;
          saveData();
          renderReviews();
        }
      };
    });
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
      btn.onclick = () => {
        if (confirm('Видалити відгук?')) {
          reviews = reviews.filter(r => r.id != btn.dataset.id);
          saveData();
          renderReviews();
        }
      };
    });
  }

  function addReview(name, age, text, rating) {
    reviews.push({
      id: Date.now().toString(),
      name: name.trim(),
      age: parseInt(age),
      text: text.trim(),
      rating: parseInt(rating),
      approved: false,
      createdAt: Date.now()
    });
    saveData();
    renderReviews();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m] || m));
  }

  function init() {
    // Перевірка прав адміністратора
    if (!window.isAdmin) {
      window.location.href = '../index.html';
      return;
    }
    loadData();
    renderReviews();

    const form = document.getElementById('addReviewForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewName').value.trim();
        const age = document.getElementById('reviewAge').value.trim();
        const text = document.getElementById('reviewText').value.trim();
        const rating = document.getElementById('reviewRating').value;
        if (!name || !age || !text) {
          alert('Заповніть усі поля');
          return;
        }
        addReview(name, age, text, rating);
        form.reset();
        alert('Відгук додано! Після публікації він з\'явиться на сайті.');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();