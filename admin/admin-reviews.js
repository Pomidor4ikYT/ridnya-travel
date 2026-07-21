// admin/admin-reviews.js
(function() {
  const ENTITY = 'reviews';
  let reviews = [];
  let editingId = null;
  let currentFilter = 'all';

  function loadReviews() {
    Utils.fetchData(ENTITY).then(data => {
      reviews = Array.isArray(data) ? data : [];
      renderReviews();
    });
  }

  function saveReviews() { Utils.saveData(ENTITY, reviews); }

  function renderReviews() {
    const container = document.getElementById('reviewsList');
    if (!container) return;
    let filtered = reviews;
    if (currentFilter === 'approved') filtered = reviews.filter(r => r.approved === true);
    else if (currentFilter === 'pending') filtered = reviews.filter(r => r.approved !== true);
    if (!filtered.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-comment-slash"></i><p>Немає відгуків</p></div>';
      return;
    }
    container.innerHTML = filtered.map(r => `
      <div class="review-admin-card" data-id="${r.id}">
        <div class="review-card-header">
          <div class="review-author-info">
            <span class="review-name">${Utils.escapeHtml(r.name)}</span>
            <span class="review-age">${r.age} років</span>
          </div>
          <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        </div>
        <div class="review-text">${Utils.escapeHtml(r.text)}</div>
        <div class="review-status ${r.approved ? 'approved' : 'pending'}">${r.approved ? 'Опубліковано' : 'На модерації'}</div>
        <div class="review-card-actions">
          ${!r.approved ? `<button class="action-btn approve-review" data-id="${r.id}"><i class="fas fa-check"></i> Опублікувати</button>` : ''}
          <button class="action-btn edit-review" data-id="${r.id}"><i class="fas fa-pen"></i> Редагувати</button>
          <button class="action-btn delete-review" data-id="${r.id}"><i class="fas fa-trash"></i> Видалити</button>
        </div>
      </div>
    `).join('');
    document.querySelectorAll('.approve-review').forEach(btn => btn.addEventListener('click', () => { const rev = reviews.find(r => r.id == btn.dataset.id); if (rev) { rev.approved = true; saveReviews(); renderReviews(); } }));
    document.querySelectorAll('.edit-review').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.id)));
    document.querySelectorAll('.delete-review').forEach(btn => btn.addEventListener('click', () => { if (confirm('Видалити відгук?')) { reviews = reviews.filter(r => r.id != btn.dataset.id); saveReviews(); renderReviews(); } }));
  }

  function openModal(id = null) {
    editingId = id;
    const modal = document.getElementById('reviewModal');
    const title = document.getElementById('modalTitle');
    if (id) {
      const rev = reviews.find(r => r.id == id);
      if (!rev) return;
      title.innerHTML = '<i class="fas fa-pen"></i> Редагувати відгук';
      document.getElementById('reviewName').value = rev.name;
      document.getElementById('reviewAge').value = rev.age;
      document.getElementById('reviewText').value = rev.text;
      document.getElementById('reviewRating').value = rev.rating;
      document.getElementById('reviewStatus').value = rev.approved ? 'approved' : 'pending';
    } else {
      title.innerHTML = '<i class="fas fa-plus-circle"></i> Новий відгук';
      document.getElementById('reviewName').value = '';
      document.getElementById('reviewAge').value = '';
      document.getElementById('reviewText').value = '';
      document.getElementById('reviewRating').value = '5';
      document.getElementById('reviewStatus').value = 'pending';
    }
    modal.style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('reviewModal').style.display = 'none';
    editingId = null;
  }

  function saveReview() {
    const name = document.getElementById('reviewName').value.trim();
    const age = parseInt(document.getElementById('reviewAge').value);
    const text = document.getElementById('reviewText').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const approved = document.getElementById('reviewStatus').value === 'approved';
    if (!name || !text || isNaN(age)) { alert('Заповніть ім\'я, вік та текст'); return; }
    if (editingId) {
      const idx = reviews.findIndex(r => r.id === editingId);
      if (idx !== -1) { reviews[idx].name = name; reviews[idx].age = age; reviews[idx].text = text; reviews[idx].rating = rating; reviews[idx].approved = approved; }
    } else {
      reviews.push({ id: Date.now().toString(), name, age, text, rating, approved, createdAt: Date.now() });
    }
    saveReviews();
    renderReviews();
    closeModal();
  }

  function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.review-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.review-filter-btn[data-filter="${filter}"]`).classList.add('active');
    renderReviews();
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (!window.isAdmin) { window.location.href = '../index.html'; return; }
    loadReviews();
    document.getElementById('addReviewBtn').addEventListener('click', () => openModal());
    document.getElementById('saveReviewBtn').addEventListener('click', saveReview);
    document.getElementById('cancelReviewModal').addEventListener('click', closeModal);
    document.getElementById('reviewModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
    document.getElementById('logoutBtn').addEventListener('click', () => window.signOut && window.signOut());
    document.querySelectorAll('.review-filter-btn').forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
  });
})();