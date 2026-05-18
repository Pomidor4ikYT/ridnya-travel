(function() {
  'use strict';
  const STORAGE_KEY = 'ridnya_reviews';

  const defaultReviews = [
    { id: 'r1', name: 'Олена', age: 28, text: 'Неймовірна атмосфера! Вперше пішла в гори і закохалася. Дякую «Рідні» за організацію та підтримку.', rating: 5, approved: true, createdAt: Date.now() - 86400000 * 10 },
    { id: 'r2', name: 'Андрій', age: 45, text: 'Ходимо з клубом уже два роки. Чудові маршрути, гарна компанія, а головне — спільна справа для перемоги.', rating: 5, approved: true, createdAt: Date.now() - 86400000 * 5 },
    { id: 'r3', name: 'Ігор', age: 33, text: 'Дізнався багато нового про історію УПА. Маршрути продумані, провідники — справжні професіонали.', rating: 5, approved: true, createdAt: Date.now() - 86400000 * 2 }
  ];

  let reviews = [];

  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      reviews = stored ? JSON.parse(stored) : [...defaultReviews];
    } catch {
      reviews = [...defaultReviews];
    }
    reviews.forEach(r => { if (!r.createdAt) r.createdAt = Date.now(); });
    saveData();
  }
  function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews)); }
  function getApprovedReviews() { return reviews.filter(r => r.approved === true); }
  function getLatestApprovedReviews(limit) { return getApprovedReviews().sort((a,b)=>b.createdAt-a.createdAt).slice(0,limit); }

  function renderHomeReviews() {
    const container = document.getElementById('homeReviewsGrid');
    if (!container) return;
    const latest = getLatestApprovedReviews(3);
    if (!latest.length) { container.innerHTML = '<div style="text-align:center; padding:20px;">Ще немає відгуків</div>'; return; }
    container.innerHTML = latest.map(r => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
        <p>«${escapeHtml(r.text)}»</p>
        <span class="testimonial-author">— ${escapeHtml(r.name)}, ${r.age} років</span>
      </div>
    `).join('');
  }

  function renderReviewsPage() {
    const container = document.querySelector('.reviews-grid');
    if (!container) return;
    const approved = getApprovedReviews();
    if (!approved.length) { container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-comment-dots" style="font-size:3rem; opacity:0.4;"></i><p>Немає відгуків</p></div>'; return; }
    container.innerHTML = approved.sort((a,b)=>b.createdAt-a.createdAt).map(r => `
      <div class="review-card glass-card">
        <div class="review-avatar"><i class="fas fa-user"></i></div>
        <div class="review-content">
          <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
          <p class="review-text">«${escapeHtml(r.text)}»</p>
          <span class="review-author">— ${escapeHtml(r.name)}, ${r.age} років</span>
        </div>
      </div>
    `).join('');
  }

  function escapeHtml(str) { if (!str) return ''; return str.replace(/[&<>]/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]||m)); }
  function init() {
    loadData();
    if (document.body.classList.contains('page-home')) renderHomeReviews();
    if (document.body.classList.contains('page-reviews')) renderReviewsPage();
  }
  document.addEventListener('DOMContentLoaded', init);
})();