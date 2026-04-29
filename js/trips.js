(function() {
  'use strict';

  const ADMIN_PASSWORD = 'ridnya2026';
  const STORAGE_KEY = 'ridnya_trips';

const defaultTrips = [
  { id: '1', title: "г.Маківка 958 м. (з заходом на г.\"Захар Беркут\")", date: "2026-01-01", distance: "8 км", difficulty: "легка", duration: "1 день", guide: "Петро Маковський", report: "виконано", mapUrl: null, notes: "", image: "https://vidviday.ua/storage/media/tour/1321/162495238960dace458b87e-1200x1200.jpg", isTraditional: false },
  { id: '2', title: "г. Пікуй 1408,3 м (старт з с.Білосовиця, або с.Гусне)", date: "2026-02-01", distance: "10 км", difficulty: "легка", duration: "1 день", guide: "Валерій Бурлака", report: "виконано", mapUrl: "https://uk.mapy.cz/s/gurefacuro", notes: "", image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/%D0%9F%D1%96%D1%81%D0%BB%D1%8F_%D0%B3%D1%80%D0%BE%D0%B7%D0%B8.jpg", isTraditional: false },
  { id: '3', title: "г.Лопата 1210,9м., г.Кудрявець 1242м. (старт з м.Сколе)", date: "2026-02-15", distance: "16 км", difficulty: "легка", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/pubadohabo", notes: "", image: "https://vidviday.ua/storage/media/tour/10897/hora-lopata.jpg", isTraditional: true },
  { id: '4', title: "Навколо Славського (Рожанка - В.Верх)", date: "2026-03-01", distance: "21 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "", mapUrl: "https://mapy.cz/s/dobojobozu", notes: "", image: "images/img7.jpg", isTraditional: false },
  { id: '5', title: "г.Кукул, г.Велика Козьмеська, г.Говерла (старт с.Завоєля)", date: "18-19.04.2026", distance: "35 км", difficulty: "середня", duration: "2-3 дні", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/celemebeze", notes: "", image: "images/img8.jpg", isTraditional: false },
  { id: '6', title: "Цицька, Великий Верх (старт і фініш смт. Воловець)", date: "02-03.05.2026", distance: "24 км", difficulty: "легка", duration: "1-2 дні", guide: "Олег Дашко", report: "", mapUrl: "https://mapy.com/s/cahucugobe", notes: "", image: "images/img9.jpg", isTraditional: false },
  { id: '7', title: "г.Ключ 929 м. (старт з с.Труханів)", date: "2026-06-01", distance: "10-12 км", difficulty: "легка", duration: "1 день", guide: "Василь Дмитришин", report: "виконано", mapUrl: null, notes: "багато варіантів", image: "images/img10.jpg", isTraditional: false },
  { id: '8', title: "г. Велика Сивуля 1836,6 м, г. Ігровець (старт с.Стара Гута)", date: "19-21.06.2026", distance: "40 км", difficulty: "вище середньої", duration: "2-3 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/nesopepumu", notes: "", image: "images/img11.jpg", isTraditional: false },
  { id: '9', title: "г.Яворина 1131 м. (Похід \"Горами нашої слави\")", date: "11-12.07.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: "https://uk.mapy.cz/s/badepupuvu", notes: "масове сходження", image: "images/img2.jpg", isTraditional: true },
  { id: '10', title: "Кичера 2025. (через водоспад Гуркало)", date: "", distance: "15-16 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: null, notes: "багато варіантів", image: "images/img3.jpg", isTraditional: true },
  { id: '11', title: "Похід на Близниці (старт і фініш с.Кваси)", date: "01-02.08.2026", distance: "28 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.com/s/badopogohu", notes: "", image: "images/img4.jpg", isTraditional: false },
  { id: '12', title: "г.Яйко-Ілемське 1680 м. (старт з с.Мислівка)", date: "15-16.08.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://uk.mapy.cz/s/bohevajodo", notes: "", image: "images/img5.jpg", isTraditional: false },
  { id: '13', title: "Скельні масиви Сколівських Бескидів", date: "26-27.09.2026", distance: "27,5 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "виконано", mapUrl: "https://uk.mapy.cz/s/galezadaku", notes: "", image: "images/img6.jpg", isTraditional: false },
  { id: '14', title: "Пікуяна (старт і фініш - в.Гусне)", date: "", distance: "20 км", difficulty: "легка", duration: "1 день", guide: "Лука Павлюк", report: "", mapUrl: "https://uk.mapy.cz/s/komerovuse", notes: "масове сходження", image: "images/img7.jpg", isTraditional: false },
  { id: '15', title: "г.Менчул 1501 м (з с.Лумшори)", date: "2026-10-10", distance: "18 км", difficulty: "середня", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: null, notes: "", image: "images/img8.jpg", isTraditional: false },
  { id: '16', title: "хр.Писаний Камінь (з с.Буковець)", date: "2026-11-01", distance: "22 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.cz/s/abcdef", notes: "", image: "images/img9.jpg", isTraditional: false },
  { id: '17', title: "г.Петрос 2020 м (з с.Кваси)", date: "2026-12-05", distance: "26 км", difficulty: "вище середньої", duration: "2 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/ghijkl", notes: "", image: "images/img10.jpg", isTraditional: false }
];

  let trips = [];
  let currentFilter = 'all';
  let editingTripId = null;

  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [...defaultTrips];
    } catch {
      return [...defaultTrips];
    }
  }

  function saveData() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(trips)); } catch (e) {}
  }

  function checkAdmin() {
    return prompt('Введіть пароль адміністратора:') === ADMIN_PASSWORD;
  }

  function renderTrips() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    let filtered = trips.filter(t => currentFilter === 'all' || t.difficulty === currentFilter);
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || (t.guide && t.guide.toLowerCase().includes(q)));
    }
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
      if (sortBy.value === 'date') filtered.sort((a,b) => (a.date||'').localeCompare(b.date||''));
      else if (sortBy.value === 'difficulty') {
        const order = { 'легка':1, 'середня':2, 'вище середньої':3 };
        filtered.sort((a,b) => (order[a.difficulty]||0) - (order[b.difficulty]||0));
      } else if (sortBy.value === 'distance') filtered.sort((a,b) => parseFloat(a.distance) - parseFloat(b.distance));
    }
    const countSpan = document.getElementById('visibleCount');
    if (countSpan) countSpan.textContent = filtered.length;
    if (!filtered.length) {
      container.innerHTML = '<div style="text-align:center; padding:50px; color:var(--blue)"><i class="fas fa-map-signs" style="font-size:3rem; opacity:0.4; display:block; margin-bottom:16px;"></i><p>Немає маршрутів</p></div>';
      return;
    }
    let html = '';
    filtered.forEach(trip => {
      const dateFormatted = trip.date || '—';
      const diffClass = `difficulty-${trip.difficulty === 'легка' ? 'легка' : trip.difficulty === 'середня' ? 'середня' : 'вище'}`;
      const isCompleted = trip.report && trip.report.includes('виконано');
      const mapLink = trip.mapUrl ? `<a href="${trip.mapUrl}" target="_blank" rel="noopener" class="route-link"><i class="fas fa-map-location-dot"></i> mapy.cz</a>` : '';
      const titleParts = trip.title.match(/^(.*?)(\(.*\))$/);
      const mainTitle = titleParts ? titleParts[1].trim() : trip.title;
      const subTitle = titleParts ? titleParts[2].trim() : '';
      const noteHtml = trip.notes ? `<span class="note-icon"><i class="fas fa-info-circle"></i><span class="tooltip-text">${trip.notes}</span></span>` : '';
      html += `
        <div class="trip-card" data-id="${trip.id}">
          <div class="card-image" style="background-image:url('${trip.image}');">${!trip.image ? '<i class="fas fa-mountain fallback-icon"></i>' : ''}</div>
          <div class="card-content">
            <div class="card-header">
              <div style="flex:1;">
                <div class="title-main">${mainTitle}</div>
                ${subTitle ? `<div class="title-sub">${subTitle}</div>` : ''}
              </div>
              <div class="difficulty-badge ${diffClass}">${trip.difficulty}</div>
            </div>
            <div class="meta-grid">
              <span><i class="far fa-calendar"></i> ${dateFormatted}</span>
              <span><i class="fas fa-arrows-left-right"></i> ${trip.distance}</span>
              <span><i class="far fa-clock"></i> ${trip.duration}</span>
            </div>
            ${mapLink}
  <div class="card-footer">
    <div class="guide"><i class="fas fa-user-hiking"></i> ${trip.guide}</div>
    <div class="badges-container">
      ${isCompleted ? '<span class="completed-badge"><i class="fas fa-check-circle"></i> виконано</span>' : ''}
      ${trip.isTraditional ? '<span class="traditional-badge"><i class="fas fa-leaf"></i> традиційний</span>' : ''}
      ${noteHtml}
    </div>
    <span class="card-actions">
      <button class="edit-btn" data-id="${trip.id}"><i class="fas fa-pen"></i></button>
      <button class="delete-btn" data-id="${trip.id}"><i class="fas fa-trash"></i></button>
    </span>
  </div>
            </div>
          </div>
        </div>`;
    });
    container.innerHTML = html;
    attachTripEvents();
  }

  function attachTripEvents() {
    document.querySelectorAll('#cardsContainer .edit-btn').forEach(btn => btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (checkAdmin()) openTripModal(btn.dataset.id);
    }));
    document.querySelectorAll('#cardsContainer .delete-btn').forEach(btn => btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (checkAdmin() && confirm('Видалити маршрут?')) {
        trips = trips.filter(t => t.id !== btn.dataset.id);
        saveData();
        renderTrips();
      }
    }));
  }

  function openTripModal(id = null) {
    const form = document.getElementById('addTripForm');
    const modal = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    if (!form || !modal) return;
    if (id) {
      const trip = trips.find(t => t.id === id);
      if (!trip) return;
      editingTripId = id;
      modalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати маршрут';
      document.getElementById('title').value = trip.title;
      document.getElementById('date').value = trip.date || '';
      document.getElementById('distance').value = trip.distance || '';
      document.getElementById('difficulty').value = trip.difficulty || 'легка';
      document.getElementById('duration').value = trip.duration || '';
      document.getElementById('guide').value = trip.guide || '';
      document.getElementById('mapUrl').value = trip.mapUrl || '';
      document.getElementById('notes').value = trip.notes || '';
      document.getElementById('image').value = trip.image || '';
      document.getElementById('isCompleted').checked = trip.report && trip.report.includes('виконано');
      document.getElementById('isTraditional').checked = trip.isTraditional || false;
    } else {
      editingTripId = null;
      modalTitle.innerHTML = '<i class="fas fa-mountain"></i> Новий маршрут';
      form.reset();
      document.getElementById('difficulty').value = 'легка';
    }
    modal.classList.add('active');
  }

  function closeTripModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    editingTripId = null;
  }

  function init() {
    trips = loadData();
    renderTrips();

    document.getElementById('addTripBtn')?.addEventListener('click', () => { if (checkAdmin()) openTripModal(); });
    document.getElementById('closeModalBtn')?.addEventListener('click', closeTripModal);
    document.getElementById('cancelBtn')?.addEventListener('click', closeTripModal);
    document.getElementById('modalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeTripModal(); });

    document.getElementById('addTripForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      if (!title) { alert('Назва обовʼязкова'); return; }
      const data = {
        title,
        date: document.getElementById('date').value.trim(),
        distance: document.getElementById('distance').value.trim() || '? км',
        difficulty: document.getElementById('difficulty').value,
        duration: document.getElementById('duration').value.trim() || '1 день',
        guide: document.getElementById('guide').value.trim() || '—',
        report: document.getElementById('isCompleted').checked ? 'виконано' : '',
        mapUrl: document.getElementById('mapUrl').value.trim() || null,
        notes: document.getElementById('notes').value.trim(),
        image: document.getElementById('image').value.trim() || '',
        isTraditional: document.getElementById('isTraditional').checked
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

    document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTrips();
    }));

    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        clearSearch.style.display = searchInput.value ? 'flex' : 'none';
        renderTrips();
      });
    }
    if (clearSearch) clearSearch.addEventListener('click', () => { searchInput.value = ''; clearSearch.style.display = 'none'; renderTrips(); });
    const sortBy = document.getElementById('sortBy');
    if (sortBy) sortBy.addEventListener('change', renderTrips);
  }

  document.addEventListener('DOMContentLoaded', init);
})();