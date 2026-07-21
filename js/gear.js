// js/gear.js
(function() {
  'use strict';

  const ENTITY = 'gear';
  let gearItems = [];
  let editingGearId = null;
  let currentPage = 1;
  const ITEMS_PER_PAGE = 9;

// js/gear.js – змініть createdAt на Date.now() - 60 * 86400000
const defaultGear = [
  { id: 'g1', title: 'Намет Mountain Hardwear Strato', date: '20.04.2026', text: 'Легкий двомісний намет...', image: 'https://propohody.com/wp-content/uploads/2025/02/%D0%97%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D0%BA%D0%BE%D0%BF%D1%96%D1%8F3.jpg', createdAt: Date.now() - 60 * 86400000 },
  { id: 'g2', title: 'Трекінгові палиці Black Diamond Trail', date: '15.04.2026', text: 'Складані, алюмінієві...', image: 'https://propohody.com/wp-content/uploads/2017/07/20170718_171603.jpg', createdAt: Date.now() - 60 * 86400000 },
  { id: 'g3', title: 'Рюкзак Osprey Kestrel 48L', date: '10.04.2026', text: 'Універсальний туристичний рюкзак...', image: 'https://propohody.com/wp-content/uploads/2019/06/IMG_20190602_155742.jpg', createdAt: Date.now() - 60 * 86400000 }
];

  function loadData() {
    Utils.fetchData(ENTITY).then(data => {
      gearItems = Array.isArray(data) && data.length ? data : defaultGear;
      renderGear();
    });
  }

  function saveData() { Utils.saveData(ENTITY, gearItems); }

  function parseDate(dateStr) {
    if (!dateStr) return null;
    let parts = dateStr.split('.');
    if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]);
    parts = dateStr.split('-');
    if (parts.length === 3) return new Date(parts[0], parts[1] - 1, parts[2]);
    return null;
  }

  function sortByDate(items) {
    return [...items].sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateB - dateA;
    });
  }

  function renderPagination(totalPages) {
    const container = document.getElementById('gearPagination');
    if (!container) return;
    if (totalPages <= 1) { container.innerHTML = ''; return; }
    let html = '<div class="pagination-wrapper"><button class="page-nav" id="prevPageBtn" ' + (currentPage === 1 ? 'disabled' : '') + '><i class="fas fa-chevron-left"></i></button><div class="page-numbers">';
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    html += `</div><button class="page-nav" id="nextPageBtn" ${currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button></div>`;
    container.innerHTML = html;
    document.getElementById('prevPageBtn')?.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderGear(); } });
    document.getElementById('nextPageBtn')?.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderGear(); } });
    document.querySelectorAll('.page-number').forEach(btn => {
      btn.addEventListener('click', () => { currentPage = parseInt(btn.dataset.page); renderGear(); });
    });
  }

  function attachGearEvents() {
    if (window.isAdmin) {
      document.querySelectorAll('#gearContainer .edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); openGearModal(btn.dataset.id); });
      });
      document.querySelectorAll('#gearContainer .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm('Видалити запис?')) {
            Utils.deleteItem(ENTITY, btn.dataset.id).then(() => loadData());
          }
        });
      });
    }
  }

  // ========== ОСНОВНА ФУНКЦІЯ РЕНДЕРИНГУ (ДОДАНО БЕЙДЖ "НОВИНКА") ==========
  function renderGear() {
    const container = document.getElementById('gearContainer');
    if (!container) return;
    const sorted = sortByDate(gearItems);
    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = sorted.slice(start, start + ITEMS_PER_PAGE);

    if (!pageItems.length) {
      container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-campground" style="font-size:3rem; opacity:0.4;"></i><p>Немає записів</p></div>';
      renderPagination(totalPages);
      return;
    }

    container.innerHTML = pageItems.map(item => {
      const isNew = (item.createdAt && (Date.now() - item.createdAt < 30 * 86400000));
      const adminButtons = window.isAdmin ? `<div class="blog-card-actions"><button class="edit-btn" data-id="${item.id}"><i class="fas fa-pen"></i></button><button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button></div>` : '';
      const newBadge = isNew ? '<span class="badge-new" style="font-size:0.6rem; background:#ffd700; padding:2px 8px; border-radius:20px; margin-left:8px; display:inline-block;">Новинка</span>' : '';
      return `
      <article class="blog-card" data-id="${item.id}">
        ${adminButtons}
        ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : '<div class="blog-card-img"><i class="fas fa-campground"></i></div>'}
        <div class="blog-card-body">
          <span class="blog-date">${item.date || ''}</span>
          <h4>${Utils.escapeHtml(item.title)} ${newBadge}</h4>
          <p>${Utils.escapeHtml(item.text || '')}</p>
        </div>
      </article>`;
    }).join('');

    attachGearEvents();
    renderPagination(totalPages);
  }

  function openGearModal(id = null) {
    if (!window.isAdmin) return;
    const form = document.getElementById('addGearForm');
    const modal = document.getElementById('gearModalOverlay');
    const modalTitle = document.getElementById('gearModalTitle');
    if (!form || !modal) return;
    if (id) {
      const item = gearItems.find(p => p.id === id);
      if (!item) return;
      editingGearId = id;
      modalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати запис';
      document.getElementById('gearTitle').value = item.title;
      document.getElementById('gearDate').value = item.date || '';
      document.getElementById('gearText').value = item.text || '';
      document.getElementById('gearImage').value = item.image || '';
    } else {
      editingGearId = null;
      modalTitle.innerHTML = '<i class="fas fa-campground"></i> Новий запис';
      form.reset();
    }
    modal.classList.add('active');
  }

  function closeGearModal() {
    document.getElementById('gearModalOverlay').classList.remove('active');
    editingGearId = null;
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (window.isAdmin) document.getElementById('addGearBtn')?.addEventListener('click', () => openGearModal());
    document.getElementById('closeGearModalBtn')?.addEventListener('click', closeGearModal);
    document.getElementById('cancelGearBtn')?.addEventListener('click', closeGearModal);
    document.getElementById('gearModalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeGearModal(); });
    document.getElementById('addGearForm')?.addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('gearTitle').value.trim();
      if (!title) { alert('Назва обовʼязкова'); return; }
      const data = {
        title,
        date: document.getElementById('gearDate').value.trim(),
        text: document.getElementById('gearText').value.trim(),
        image: document.getElementById('gearImage').value.trim(),
        createdAt: Date.now()
      };
      if (editingGearId) {
        Utils.updateItem(ENTITY, editingGearId, data).then(() => loadData());
      } else {
        Utils.addItem(ENTITY, data).then(() => loadData());
      }
      currentPage = 1;
      closeGearModal();
    });
    loadData();
  });
})();