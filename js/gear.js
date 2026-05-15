(function() {
  'use strict';
  const ADMIN_PASSWORD = 'ridnya2026';
  const STORAGE_KEY = 'ridnya_gear';
  const defaultGear = [
    { id: 'g1', title: 'Намет Mountain Hardwear Strato', date: '20.04.2026', text: 'Легкий двомісний намет для весняних походів. Вага всього 1.8 кг. Чудова вентиляція та захист від дощу. Ідеальний варіант для трекінгу в Карпатах.', image: 'https://propohody.com/wp-content/uploads/2025/02/%D0%97%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D0%BA%D0%BE%D0%BF%D1%96%D1%8F3.jpg' },
    { id: 'g2', title: 'Трекінгові палиці Black Diamond Trail', date: '15.04.2026', text: 'Складані, алюмінієві, з пробковою ручкою. Забезпечують надійну опору на складних ділянках маршруту. Регулюються по висоті, комплектуються зимовими кільцями.', image: 'https://propohody.com/wp-content/uploads/2017/07/20170718_171603.jpg' },
    { id: 'g3', title: 'Рюкзак Osprey Kestrel 48L', date: '10.04.2026', text: 'Універсальний туристичний рюкзак об\'ємом 48 літрів. Має систему регулювання спини, безліч кишень та міцну тканину. Витримує тривалі походи.', image: 'https://propohody.com/wp-content/uploads/2019/06/IMG_20190602_155742.jpg' }
  ];

  let gearItems = [];
  let editingGearId = null;

  function loadData() { try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : [...defaultGear]; } catch { return [...defaultGear]; } }
  function saveData() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(gearItems)); } catch(e){} }
  function checkAdmin() { return prompt('Введіть пароль адміністратора:') === ADMIN_PASSWORD; }
  function escapeHtml(str) { if (!str) return ''; return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m)); }

  function renderGear() {
    const container = document.getElementById('gearContainer');
    if (!container) return;
    if (!gearItems.length) {
      container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-campground" style="font-size:3rem; opacity:0.4; display:block; margin-bottom:16px;"></i><p>Немає записів</p></div>';
      return;
    }
    container.innerHTML = gearItems.map(item => `
      <article class="blog-card" data-id="${item.id}">
        <div class="blog-card-actions">
          <button class="edit-btn" data-id="${item.id}"><i class="fas fa-pen"></i></button>
          <button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
        </div>
        ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : '<div class="blog-card-img"><i class="fas fa-campground"></i></div>'}
        <div class="blog-card-body">
          <span class="blog-date">${item.date || ''}</span>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.text || '')}</p>
        </div>
      </article>
    `).join('');
    document.querySelectorAll('#gearContainer .edit-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin()) openGearModal(btn.dataset.id); }));
    document.querySelectorAll('#gearContainer .delete-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin() && confirm('Видалити запис?')) { gearItems = gearItems.filter(p => p.id !== btn.dataset.id); saveData(); renderGear(); } }));
  }

  function openGearModal(id = null) {
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

  function closeGearModal() { document.getElementById('gearModalOverlay').classList.remove('active'); editingGearId = null; }

  function init() {
    gearItems = loadData();
    renderGear();
    document.getElementById('addGearBtn')?.addEventListener('click', () => { if (checkAdmin()) openGearModal(); });
    document.getElementById('closeGearModalBtn')?.addEventListener('click', closeGearModal);
    document.getElementById('cancelGearBtn')?.addEventListener('click', closeGearModal);
    document.getElementById('gearModalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeGearModal(); });
    document.getElementById('addGearForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('gearTitle').value.trim();
      if (!title) { alert('Назва обовʼязкова'); return; }
      const data = {
        title,
        date: document.getElementById('gearDate').value.trim(),
        text: document.getElementById('gearText').value.trim(),
        image: document.getElementById('gearImage').value.trim()
      };
      if (editingGearId) {
        const idx = gearItems.findIndex(p => p.id === editingGearId);
        if (idx !== -1) gearItems[idx] = { ...gearItems[idx], ...data };
      } else {
        gearItems.push({ id: 'g' + Date.now(), ...data });
      }
      saveData();
      renderGear();
      closeGearModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();