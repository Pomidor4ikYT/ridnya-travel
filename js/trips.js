(function() {
  'use strict';

  const ADMIN_PASSWORD = 'ridnya2026';
  const STORAGE_KEY = 'ridnya_trips';
  const MEMBERS_KEY = 'ridnya_members';
  const TRIP_APPS_KEY = 'ridnya_trip_applications';
  const LEADER_APPS_KEY = 'ridnya_leader_applications';

  // 17 маршрутів із надійними локальними фото (images/img1.jpg тощо)
  const defaultTrips = [
    { id: '1', title: "г.Маківка 958 м. (з заходом на г.\"Захар Беркут\")", date: "2026-01-01", distance: "8 км", difficulty: "легка", duration: "1 день", guide: "Петро Маковський", report: "виконано", mapUrl: null, notes: "", image: "images/img1.jpg", isTraditional: false },
    { id: '2', title: "г. Пікуй 1408,3 м (старт з с.Білосовиця, або с.Гусне)", date: "2026-02-01", distance: "10 км", difficulty: "легка", duration: "1 день", guide: "Валерій Бурлака", report: "виконано", mapUrl: "https://uk.mapy.cz/s/gurefacuro", notes: "", image: "images/img2.jpg", isTraditional: false },
    { id: '3', title: "г.Лопата 1210,9м., г.Кудрявець 1242м. (старт з м.Сколе)", date: "2026-02-15", distance: "16 км", difficulty: "легка", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/pubadohabo", notes: "", image: "images/img3.jpg", isTraditional: true },
    { id: '4', title: "Навколо Славського (Рожанка - В.Верх)", date: "2026-03-01", distance: "21 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "", mapUrl: "https://mapy.cz/s/dobojobozu", notes: "", image: "images/img4.jpg", isTraditional: false },
    { id: '5', title: "г.Кукул, г.Велика Козьмеська, г.Говерла (старт с.Завоєля)", date: "18-19.04.2026", distance: "35 км", difficulty: "середня", duration: "2-3 дні", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/celemebeze", notes: "", image: "images/img5.jpg", isTraditional: false },
    { id: '6', title: "Цицька, Великий Верх (старт і фініш смт. Воловець)", date: "02-03.05.2026", distance: "24 км", difficulty: "легка", duration: "1-2 дні", guide: "Олег Дашко", report: "", mapUrl: "https://mapy.com/s/cahucugobe", notes: "", image: "images/img6.jpg", isTraditional: false },
    { id: '7', title: "г.Ключ 929 м. (старт з с.Труханів)", date: "2026-06-01", distance: "10-12 км", difficulty: "легка", duration: "1 день", guide: "Василь Дмитришин", report: "виконано", mapUrl: null, notes: "багато варіантів", image: "images/img7.jpg", isTraditional: false },
    { id: '8', title: "г. Велика Сивуля 1836,6 м, г. Ігровець (старт с.Стара Гута)", date: "19-21.06.2026", distance: "40 км", difficulty: "вище середньої", duration: "2-3 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/nesopepumu", notes: "", image: "images/img8.jpg", isTraditional: false },
    { id: '9', title: "г.Яворина 1131 м. (Похід \"Горами нашої слави\")", date: "11-12.07.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: "https://uk.mapy.cz/s/badepupuvu", notes: "масове сходження", image: "images/img9.jpg", isTraditional: true },
    { id: '10', title: "Кичера 2025. (через водоспад Гуркало)", date: "", distance: "15-16 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: null, notes: "багато варіантів", image: "images/img10.jpg", isTraditional: true },
    { id: '11', title: "Похід на Близниці (старт і фініш с.Кваси)", date: "01-02.08.2026", distance: "28 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.com/s/badopogohu", notes: "", image: "images/img11.jpg", isTraditional: false },
    { id: '12', title: "г.Яйко-Ілемське 1680 м. (старт з с.Мислівка)", date: "15-16.08.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://uk.mapy.cz/s/bohevajodo", notes: "", image: "images/img1.jpg", isTraditional: false },
    { id: '13', title: "Скельні масиви Сколівських Бескидів", date: "26-27.09.2026", distance: "27,5 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "виконано", mapUrl: "https://uk.mapy.cz/s/galezadaku", notes: "", image: "images/img2.jpg", isTraditional: false },
    { id: '14', title: "Пікуяна (старт і фініш - в.Гусне)", date: "", distance: "20 км", difficulty: "легка", duration: "1 день", guide: "Лука Павлюк", report: "", mapUrl: "https://uk.mapy.cz/s/komerovuse", notes: "масове сходження", image: "images/img3.jpg", isTraditional: false },
    { id: '15', title: "г.Менчул 1501 м (з с.Лумшори)", date: "2026-10-10", distance: "18 км", difficulty: "середня", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: null, notes: "", image: "images/img4.jpg", isTraditional: false },
    { id: '16', title: "хр.Писаний Камінь (з с.Буковець)", date: "2026-11-01", distance: "22 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.cz/s/abcdef", notes: "", image: "images/img5.jpg", isTraditional: false },
    { id: '17', title: "г.Петрос 2020 м (з с.Кваси)", date: "2026-12-05", distance: "26 км", difficulty: "вище середньої", duration: "2 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/ghijkl", notes: "", image: "images/img6.jpg", isTraditional: false }
  ];

  const defaultMembers = [
    { id: 'm1', name: 'Петро Маковський', rating: 5 },
    { id: 'm2', name: 'Валерій Бурлака', rating: 4 },
    { id: 'm3', name: 'Олег Дашко', rating: 5 },
    { id: 'm4', name: 'Володимир Коколюс', rating: 4 },
    { id: 'm5', name: 'Богдан Сидорак', rating: 3 }
  ];

  let trips = [];
  let members = [];
  let currentFilter = 'all';
  let editingTripId = null;

  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      trips = stored ? JSON.parse(stored) : [...defaultTrips];
    } catch { trips = [...defaultTrips]; }
    try {
      const storedMembers = localStorage.getItem(MEMBERS_KEY);
      members = storedMembers ? JSON.parse(storedMembers) : [...defaultMembers];
    } catch { members = [...defaultMembers]; }
  }
  function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(trips)); }
  function saveMembers() { localStorage.setItem(MEMBERS_KEY, JSON.stringify(members)); }
  function checkAdmin() { return prompt('Введіть пароль адміністратора:') === ADMIN_PASSWORD; }

  // Красива модалка для запису на похід
  function openTripApplyModal(tripId, tripTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal" style="max-width: 480px;">
        <div class="modal-header">
          <h2><i class="fas fa-hiking"></i> Запис на похід</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body" style="padding: 24px;">
          <p style="margin-bottom: 16px;"><strong>${escapeHtml(tripTitle)}</strong></p>
          <form id="applyTripForm">
            <div class="form-group"><label>Ваше ім'я та прізвище *</label><input type="text" id="applyName" required placeholder="Іван Петренко"></div>
            <div class="form-group"><label>Номер телефону *</label><input type="tel" id="applyPhone" required placeholder="+380 50 123 45 67"></div>
            <div class="form-group"><label>Коментар (необов'язково)</label><textarea id="applyComment" rows="2" placeholder="Додаткова інформація..."></textarea></div>
            <div class="modal-footer" style="margin-top: 20px;">
              <button type="button" class="btn-cancel" id="cancelApplyBtn">Скасувати</button>
              <button type="submit" class="btn-submit"><i class="fas fa-paper-plane"></i> Надіслати заявку</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.getElementById('cancelApplyBtn').addEventListener('click', closeModal);
    document.getElementById('applyTripForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('applyName').value.trim();
      const phone = document.getElementById('applyPhone').value.trim();
      const comment = document.getElementById('applyComment').value.trim();
      if (!name || !phone) { alert('Заповніть ім\'я та телефон'); return; }
      const apps = JSON.parse(localStorage.getItem(TRIP_APPS_KEY) || '[]');
      apps.push({ id: Date.now(), tripId, tripTitle, userName: name, phone, comment, date: new Date().toLocaleString() });
      localStorage.setItem(TRIP_APPS_KEY, JSON.stringify(apps));
      alert(`Дякуємо, ${name}! Вашу заявку на похід "${tripTitle}" передано адміністратору.`);
      closeModal();
    });
  }

  // Красива модалка для запису до лідера
  function openLeaderApplyModal(leaderId, leaderName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal" style="max-width: 480px;">
        <div class="modal-header">
          <h2><i class="fas fa-users"></i> Записатись до лідера</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body" style="padding: 24px;">
          <p style="margin-bottom: 16px;">Лідер: <strong>${escapeHtml(leaderName)}</strong></p>
          <form id="applyLeaderForm">
            <div class="form-group"><label>Ваше ім'я та прізвище *</label><input type="text" id="applyLeaderName" required placeholder="Іван Петренко"></div>
            <div class="form-group"><label>Номер телефону *</label><input type="tel" id="applyLeaderPhone" required placeholder="+380 50 123 45 67"></div>
            <div class="form-group"><label>Коментар (необов'язково)</label><textarea id="applyLeaderComment" rows="2" placeholder="Чому хочете приєднатись?"></textarea></div>
            <div class="modal-footer" style="margin-top: 20px;">
              <button type="button" class="btn-cancel" id="cancelLeaderBtn">Скасувати</button>
              <button type="submit" class="btn-submit"><i class="fas fa-paper-plane"></i> Надіслати заявку</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.getElementById('cancelLeaderBtn').addEventListener('click', closeModal);
    document.getElementById('applyLeaderForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('applyLeaderName').value.trim();
      const phone = document.getElementById('applyLeaderPhone').value.trim();
      const comment = document.getElementById('applyLeaderComment').value.trim();
      if (!name || !phone) { alert('Заповніть ім\'я та телефон'); return; }
      const apps = JSON.parse(localStorage.getItem(LEADER_APPS_KEY) || '[]');
      apps.push({ id: Date.now(), leaderId, leaderName, userName: name, phone, comment, date: new Date().toLocaleString() });
      localStorage.setItem(LEADER_APPS_KEY, JSON.stringify(apps));
      alert(`Дякуємо, ${name}! Вашу заявку до лідера "${leaderName}" передано адміністратору.`);
      closeModal();
    });
  }

  function renderTrips() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    let filtered = trips.filter(t => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'planned') return !(t.report && t.report.includes('виконано'));
      return t.difficulty === currentFilter;
    });
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || (t.guide && t.guide.toLowerCase().includes(q)));
    }
    const sortBy = document.getElementById('sortBy');
    if (sortBy && sortBy.value !== 'default') {
      if (sortBy.value === 'date') filtered.sort((a,b) => (a.date||'').localeCompare(b.date||''));
      else if (sortBy.value === 'difficulty') { const order = { 'легка':1, 'середня':2, 'вище середньої':3 }; filtered.sort((a,b) => (order[a.difficulty]||0) - (order[b.difficulty]||0)); }
      else if (sortBy.value === 'distance') filtered.sort((a,b) => parseFloat(a.distance) - parseFloat(b.distance));
    }
    const countSpan = document.getElementById('visibleCount');
    if (countSpan) countSpan.textContent = filtered.length;
    if (!filtered.length) {
      container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-map-signs" style="font-size:3rem; opacity:0.4;"></i><p>Немає маршрутів</p></div>';
      return;
    }
    container.innerHTML = filtered.map(trip => {
      const isCompleted = trip.report && trip.report.includes('виконано');
      const showJoinBtn = !isCompleted;
      const diffClass = `difficulty-${trip.difficulty === 'легка' ? 'легка' : trip.difficulty === 'середня' ? 'середня' : 'вище-середньої'}`;
      const imageUrl = trip.image && trip.image.trim() !== '' ? trip.image : 'https://placehold.co/600x400?text=Немає+фото';
      return `
        <div class="trip-card" data-id="${trip.id}">
          <div class="card-image" style="background-image:url('${imageUrl}');"></div>
          <div class="card-content">
            <div class="card-header">
              <div class="title-main">${escapeHtml(trip.title)}</div>
              <div class="difficulty-badge ${diffClass}">${trip.difficulty}</div>
            </div>
            <div class="meta-grid">
              <span><i class="far fa-calendar"></i> ${trip.date || '—'}</span>
              <span><i class="fas fa-arrows-left-right"></i> ${trip.distance}</span>
              <span><i class="far fa-clock"></i> ${trip.duration}</span>
            </div>
            <div class="card-footer">
              <div class="guide"><i class="fas fa-user-hiking"></i> ${escapeHtml(trip.guide)}</div>
              <div class="card-actions">
                ${showJoinBtn ? `<button class="join-trip-btn" data-id="${trip.id}" data-title="${escapeHtml(trip.title)}"><i class="fas fa-user-plus"></i> Записатись</button>` : ''}
                <button class="edit-btn" data-id="${trip.id}"><i class="fas fa-pen"></i></button>
                <button class="delete-btn" data-id="${trip.id}"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>`;
    }).join('');
    attachTripEvents();
  }

  function attachTripEvents() {
    document.querySelectorAll('.join-trip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTripApplyModal(btn.dataset.id, btn.dataset.title);
      });
    });
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (checkAdmin()) openTripModal(btn.dataset.id);
      });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (checkAdmin() && confirm('Видалити маршрут?')) {
          trips = trips.filter(t => t.id !== btn.dataset.id);
          saveData();
          renderTrips();
        }
      });
    });
  }

  function viewTripApplications() {
    if (!checkAdmin()) return;
    const apps = JSON.parse(localStorage.getItem(TRIP_APPS_KEY) || '[]');
    if (!apps.length) { alert('Немає заявок на походи.'); return; }
    let msg = 'ЗАЯВКИ НА ПОХОДИ:\n\n';
    apps.forEach((a, idx) => { msg += `${idx+1}. ${a.userName} (тел: ${a.phone})\n   Похід: ${a.tripTitle}\n   Коментар: ${a.comment || '—'}\n   Дата: ${a.date}\n\n`; });
    alert(msg);
  }

  function viewLeaderApplications() {
    if (!checkAdmin()) return;
    const apps = JSON.parse(localStorage.getItem(LEADER_APPS_KEY) || '[]');
    if (!apps.length) { alert('Немає заявок до лідерів.'); return; }
    let msg = 'ЗАЯВКИ ДО ЛІДЕРІВ:\n\n';
    apps.forEach((a, idx) => { msg += `${idx+1}. ${a.userName} (тел: ${a.phone})\n   Лідер: ${a.leaderName}\n   Коментар: ${a.comment || '—'}\n   Дата: ${a.date}\n\n`; });
    alert(msg);
  }

  function renderMembers() {
    const container = document.getElementById('membersContainer');
    if (!container) return;
    container.innerHTML = members.map(m => `
      <div class="member-card">
        <div class="member-name">${escapeHtml(m.name)}</div>
        <div class="member-rating">${'★'.repeat(m.rating)}${'☆'.repeat(5-m.rating)}</div>
        <button class="rating-edit" data-id="${m.id}"><i class="fas fa-star"></i> Змінити рейтинг</button>
        <button class="btn-join-leader" data-id="${m.id}" data-name="${escapeHtml(m.name)}"><i class="fas fa-hand-peace"></i> Записатись до лідера</button>
      </div>
    `).join('');
    document.querySelectorAll('.rating-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!checkAdmin()) return;
        const newRating = prompt('Новий рейтинг (1-5):');
        if (newRating && newRating >= 1 && newRating <= 5) {
          const member = members.find(m => m.id === btn.dataset.id);
          if (member) member.rating = parseInt(newRating);
          saveMembers();
          renderMembers();
        }
      });
    });
    document.querySelectorAll('.btn-join-leader').forEach(btn => {
      btn.addEventListener('click', () => {
        openLeaderApplyModal(btn.dataset.id, btn.dataset.name);
      });
    });
  }

  function openTripModal(id = null) {
    const modal = document.getElementById('tripModalOverlay');
    const titleElem = document.getElementById('tripModalTitle');
    const form = document.getElementById('addTripForm');
    if (!modal || !form) return;
    if (id) {
      const trip = trips.find(t => t.id === id);
      if (!trip) return;
      editingTripId = id;
      titleElem.innerHTML = '<i class="fas fa-pen"></i> Редагувати маршрут';
      document.getElementById('tripTitle').value = trip.title;
      document.getElementById('tripDate').value = trip.date || '';
      document.getElementById('tripDistance').value = trip.distance;
      document.getElementById('tripDifficulty').value = trip.difficulty;
      document.getElementById('tripDuration').value = trip.duration;
      document.getElementById('tripGuide').value = trip.guide;
      document.getElementById('tripMapUrl').value = trip.mapUrl || '';
      document.getElementById('tripNotes').value = trip.notes || '';
      document.getElementById('tripImage').value = trip.image || '';
      document.getElementById('tripIsCompleted').checked = trip.report && trip.report.includes('виконано');
      document.getElementById('tripIsTraditional').checked = trip.isTraditional || false;
    } else {
      editingTripId = null;
      titleElem.innerHTML = '<i class="fas fa-hiking"></i> Новий маршрут';
      form.reset();
    }
    modal.classList.add('active');
  }

  function closeTripModal() {
    document.getElementById('tripModalOverlay').classList.remove('active');
    editingTripId = null;
  }

  function init() {
    loadData();
    renderTrips();
    renderMembers();

    document.getElementById('addTripBtn')?.addEventListener('click', () => { if (checkAdmin()) openTripModal(); });
    document.getElementById('closeTripModalBtn')?.addEventListener('click', closeTripModal);
    document.getElementById('cancelTripBtn')?.addEventListener('click', closeTripModal);
    document.getElementById('tripModalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeTripModal(); });
    document.getElementById('addTripForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('tripTitle').value.trim();
      if (!title) { alert('Назва обов\'язкова'); return; }
      const data = {
        title,
        date: document.getElementById('tripDate').value,
        distance: document.getElementById('tripDistance').value || '? км',
        difficulty: document.getElementById('tripDifficulty').value,
        duration: document.getElementById('tripDuration').value || '1 день',
        guide: document.getElementById('tripGuide').value || '—',
        report: document.getElementById('tripIsCompleted').checked ? 'виконано' : '',
        mapUrl: document.getElementById('tripMapUrl').value || null,
        notes: document.getElementById('tripNotes').value,
        image: document.getElementById('tripImage').value,
        isTraditional: document.getElementById('tripIsTraditional').checked
      };
      if (editingTripId) {
        const idx = trips.findIndex(t => t.id === editingTripId);
        if (idx !== -1) trips[idx] = { ...trips[idx], ...data };
      } else {
        trips.push({ id: Date.now().toString(), ...data });
      }
      saveData();
      renderTrips();
      closeTripModal();
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTrips();
      });
    });

    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        if (clearSearch) clearSearch.style.display = searchInput.value ? 'flex' : 'none';
        renderTrips();
      });
    }
    if (clearSearch) clearSearch.addEventListener('click', () => {
      searchInput.value = '';
      clearSearch.style.display = 'none';
      renderTrips();
    });
    const sortBy = document.getElementById('sortBy');
    if (sortBy) sortBy.addEventListener('change', renderTrips);

    document.getElementById('viewTripAppsBtn')?.addEventListener('click', viewTripApplications);
    document.getElementById('viewLeaderAppsBtn')?.addEventListener('click', viewLeaderApplications);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();