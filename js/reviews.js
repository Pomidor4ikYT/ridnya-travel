// js/reviews.js
(function() {
  'use strict';
  const ENTITY = 'reviews';
  let reviews = [];

  const defaultReviews = [
    { id: 'r1', name: 'Олена', age: 28, text: 'Неймовірна атмосфера! Вперше пішла в гори і закохалася.', rating: 5, approved: true, createdAt: Date.now() - 86400000 * 10 },
    { id: 'r2', name: 'Андрій', age: 45, text: 'Ходимо з клубом уже два роки.', rating: 5, approved: true, createdAt: Date.now() - 86400000 * 5 },
    { id: 'r3', name: 'Ігор', age: 33, text: 'Дізнався багато нового про історію УПА.', rating: 5, approved: true, createdAt: Date.now() - 86400000 * 2 }
  ];

  function loadData() {
    Utils.fetchData(ENTITY).then(data => {
      reviews = Array.isArray(data) && data.length ? data : defaultReviews;
      reviews.forEach(r => { if (!r.createdAt) r.createdAt = Date.now(); if (r.approved === undefined) r.approved = true; });
      renderAll();
    });
  }

  function saveData() { Utils.saveData(ENTITY, reviews); }

  function getApprovedReviews() { return reviews.filter(r => r.approved === true); }
  function getLatestApprovedReviews(limit) { return getApprovedReviews().sort((a,b)=>b.createdAt-a.createdAt).slice(0,limit); }

  function renderHomeReviews() {
    const container = document.getElementById('homeReviewsGrid');
    if (!container) return;
    const latest = getLatestApprovedReviews(3);
    if (!latest.length) { container.innerHTML = '<div style="text-align:center; padding:20px;">Ще немає відгуків</div>'; return; }
    container.innerHTML = latest.map(r => `<div class="testimonial-card"><div class="testimonial-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><p>«${Utils.escapeHtml(r.text)}»</p><span class="testimonial-author">— ${Utils.escapeHtml(r.name)}, ${r.age} років</span></div>`).join('');
  }

  function renderReviewsPage() {
    const container = document.querySelector('.reviews-grid');
    if (!container) return;
    const approved = getApprovedReviews();
    if (!approved.length) { container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-comment-dots" style="font-size:3rem; opacity:0.4;"></i><p>Немає відгуків</p></div>'; return; }
    container.innerHTML = approved.sort((a,b)=>b.createdAt-a.createdAt).map(r => `<div class="review-card glass-card"><div class="review-avatar"><i class="fas fa-user"></i></div><div class="review-content"><div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><p class="review-text">«${Utils.escapeHtml(r.text)}»</p><span class="review-author">— ${Utils.escapeHtml(r.name)}, ${r.age} років</span></div></div>`).join('');
  }

  function renderAll() {
    if (document.body.classList.contains('page-home')) renderHomeReviews();
    if (document.body.classList.contains('page-reviews')) renderReviewsPage();
  }

  document.addEventListener('DOMContentLoaded', loadData);
})();