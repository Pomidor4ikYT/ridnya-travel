(function() {
  'use strict';

  // --- Початкові дані (якщо localStorage порожній) ---
  const defaultTrips = [
    { id: '1', title:"г.Маківка 958 м. (з заходом на г.\"Захар Беркут\")", date:"2026-01-01", distance:"8 км", difficulty:"легка", duration:"1 день", guide:"Петро Маковський", report:"виконано", mapUrl:null, notes:"", image:"https://images.unsplash.com/photo-1589561458506-5d1e0e2c9d3b?w=400&h=250&fit=crop", isTraditional: false },
    { id: '2', title:"г. Пікуй 1408,3 м (старт з с.Білосовиця, або с.Гусне)", date:"2026-02-01", distance:"10 км", difficulty:"легка", duration:"1 день", guide:"Валерій Бурлака", report:"виконано", mapUrl:"https://uk.mapy.cz/s/gurefacuro", notes:"", image:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=250&fit=crop", isTraditional: false },
    { id: '3', title:"г.Лопата 1210,9м., г.Кудрявець 1242м., г.Шаробялка, г.Зелемінь, г.Плішка, г.Даниловець (старт з м.Сколе)", date:"2026-02-15", distance:"16 км", difficulty:"легка", duration:"1 день", guide:"Олег Дашко", report:"", mapUrl:"https://uk.mapy.cz/s/pubadohabo", notes:"", image:"https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=250&fit=crop", isTraditional: true },
    { id: '4', title:"Навколо Славського (Рожанка - В.Верх, Товстий Жолоб- Чорна Ріпа- Дехтовець)", date:"2026-03-01", distance:"21 км", difficulty:"легка", duration:"1-2 дні", guide:"Володимир Коколюс", report:"", mapUrl:"https://mapy.cz/s/dobojobozu", notes:"", image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop", isTraditional: false },
    { id: '5', title:"г.Кукул, г.Велика Козьмеська, г.Говерла, с. Козьмещик, г.Кукул (старт,фініш с.Завоєля)", date:"18-19.04.2026", distance:"35 км", difficulty:"середня", duration:"2-3 дні", guide:"Олег Дашко", report:"", mapUrl:"https://uk.mapy.cz/s/celemebeze", notes:"", image:"https://images.unsplash.com/photo-1542223530-2e2f7b9c1f2b?w=400&h=250&fit=crop", isTraditional: false },
    { id: '6', title:"Цицька, Великий Верх (старт і фініш смт. Воловець)", date:"02-03.05.2026", distance:"24 км", difficulty:"легка", duration:"1-2 дні", guide:"Олег Дашко", report:"", mapUrl:"https://mapy.com/s/cahucugobe", notes:"", image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop", isTraditional: false },
    { id: '7', title:"г.Ключ 929 м. (старт з с.Труханів, або з с.Кам'янка з заходом на о.Журавлине)", date:"2026-06-01", distance:"10-12 км", difficulty:"легка", duration:"1 день", guide:"Василь Дмитришин", report:"виконано", mapUrl:null, notes:"багато варіантів", image:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop", isTraditional: false },
    { id: '8', title:"г. Велика Сивуля 1836,6 м, г. Ігровець 1804,3 м., г. Висока 1803,6 м. (старт з с.Стара Гута)", date:"19-21.06.2026", distance:"40 км", difficulty:"вище середньої", duration:"2-3 дні", guide:"Петро Маковський", report:"", mapUrl:"https://uk.mapy.cz/s/nesopepumu", notes:"", image:"https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=400&h=250&fit=crop", isTraditional: false },
    { id: '9', title:"г.Яворина 1131 м.(старт з с.Липа, Похід \"Горами нашої слави\")", date:"11-12.07.2026", distance:"30 км", difficulty:"середня", duration:"2 дні", guide:"Богдан Сидорак", report:"", mapUrl:"https://uk.mapy.cz/s/badepupuvu", notes:"масове сходження", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop", isTraditional: true },
    { id: '10', title:"Кичера 2025. (старт з с.Коростів, або м.Сколе, або с.Корчин через водоспад Гуркало, могилу Стрийка, через бункер ГОСП)", date:"", distance:"15-16 км", difficulty:"середня", duration:"2 дні", guide:"Богдан Сидорак", report:"", mapUrl:null, notes:"багато варіантів", image:"https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=250&fit=crop", isTraditional: true },
    { id: '11', title:"Похід на Близниці (старт і фініш с.Кваси)", date:"01-02.08.2026", distance:"28 км", difficulty:"середня", duration:"2 дні", guide:"Валерій Бурлака", report:"", mapUrl:"https://mapy.com/s/badopogohu", notes:"", image:"https://images.unsplash.com/photo-1536081311645-5b2d5f3b3c9b?w=400&h=250&fit=crop", isTraditional: false },
    { id: '12', title:"г.Яйко-Ілемське 1680 м. через г.Ґорґан-Ілемський 1587 м.(старт з с.Мислівка)", date:"15-16.08.2026", distance:"30 км", difficulty:"середня", duration:"2 дні", guide:"Валерій Бурлака", report:"", mapUrl:"https://uk.mapy.cz/s/bohevajodo", notes:"", image:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&h=250&fit=crop", isTraditional: false },
    { id: '13', title:"Похід по скельних масивах Сколівських Бескидів", date:"26-27.09.2026", distance:"27,5 км", difficulty:"легка", duration:"1-2 дні", guide:"Володимир Коколюс", report:"виконано", mapUrl:"https://uk.mapy.cz/s/galezadaku", notes:"", image:"https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop", isTraditional: false },
    { id: '14', title:"Пікуяна (старт і фініш - в.Гусне)", date:"", distance:"20 км", difficulty:"легка", duration:"1 день", guide:"Лука Павлюк", report:"", mapUrl:"https://uk.mapy.cz/s/komerovuse", notes:"масове сходження", image:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=250&fit=crop", isTraditional: false },
    { id: '15', title:"Боржава (старт - Воловець, фініш - Міжгір'я)", date:"", distance:"42 км", difficulty:"середня", duration:"2-3 дні", guide:"Надія Рудик", report:"", mapUrl:"https://uk.mapy.cz/s/hanapetude", notes:"", image:"https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=250&fit=crop", isTraditional: false },
    { id: '16', title:"Похід Вододільним хребтом (старт-Сянки, фініш - Біласовиця)", date:"", distance:"38 км", difficulty:"середня", duration:"2-3 дні", guide:"Надія Рудик", report:"", mapUrl:"https://mapy.cz/s/pacamapepe", notes:"", image:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop", isTraditional: false },
    { id: '17', title:"хребтом Укерня + Аршиця (старт і фініш с.Мислівка)", date:"", distance:"44 км", difficulty:"середня", duration:"2-3 дні", guide:"Надія Рудик", report:"", mapUrl:"https://uk.mapy.cz/s/cekuvecocu", notes:"", image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop", isTraditional: false }
  ];

  // --- Ініціалізація даних у localStorage ---
  let trips = [];
  const STORAGE_KEY = 'ridnya_trips';
  let editingId = null; // ID маршруту, що редагується

  function loadTrips() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      trips = JSON.parse(stored);
    } else {
      trips = [...defaultTrips];
      saveTrips();
    }
  }

  function saveTrips() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }

  // --- DOM елементи ---
  const container = document.getElementById('cardsContainer');
  const visibleSpan = document.getElementById('visibleCount');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const addTripBtn = document.getElementById('addTripBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('addTripForm');
  const modalTitle = document.querySelector('.modal-header h2');

  // Поля форми
  const titleInput = document.getElementById('title');
  const dateInput = document.getElementById('date');
  const distanceInput = document.getElementById('distance');
  const difficultySelect = document.getElementById('difficulty');
  const durationInput = document.getElementById('duration');
  const guideInput = document.getElementById('guide');
  const mapUrlInput = document.getElementById('mapUrl');
  const notesInput = document.getElementById('notes');
  const imageInput = document.getElementById('image');
  const isCompletedCheck = document.getElementById('isCompleted');
  const isTraditionalCheck = document.getElementById('isTraditional');

  // Мобільне меню
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  }

  // --- Функції форматування ---
  function formatDate(dateStr) {
    if (!dateStr) return '—';
    let formatted = dateStr.replace(/\//g, '.');
    if (formatted.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const parts = formatted.split('-');
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return formatted;
  }

  function parseTitle(fullTitle) {
    const match = fullTitle.match(/^(.*?)\s*\((.*?)\)\s*$/);
    if (match) {
      return { main: match[1].trim(), sub: match[2].trim() };
    }
    return { main: fullTitle, sub: '' };
  }

  // --- Рендер карток ---
  let currentFilter = 'all';

  function renderCards() {
    const filtered = trips.filter(t => {
      if (currentFilter === 'all') return true;
      return t.difficulty === currentFilter;
    });

    visibleSpan.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#2e5e2e;"><i class="fas fa-map-signs" style="font-size:2.5rem; opacity:0.6; margin-bottom:12px;"></i><p>Немає маршрутів</p></div>`;
      return;
    }

    let html = '';
    filtered.forEach(trip => {
      const dateFormatted = formatDate(trip.date);
      const diffClass = trip.difficulty === 'легка' ? 'difficulty-легка' : (trip.difficulty === 'середня' ? 'difficulty-середня' : 'difficulty-вище');
      const isCompleted = trip.report && trip.report.includes('виконано');
      const mapLink = trip.mapUrl ? `<a href="${trip.mapUrl}" target="_blank" class="route-link"><i class="fas fa-map-location-dot"></i> mapy.cz</a>` : '';
      
      const { main, sub } = parseTitle(trip.title);
      
      const noteHtml = trip.notes ? `
        <span class="note-icon">
          <i class="fas fa-exclamation"></i>
          <span class="tooltip-text">${trip.notes}</span>
        </span>
      ` : '';

      const imageUrl = trip.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop';

      html += `
        <div class="trip-card" data-id="${trip.id}">
          <div class="card-image" style="background-image: url('${imageUrl}');"></div>
          <div class="card-content">
            <div class="card-header">
              <div style="flex:1;">
                <div class="title-main">${main}</div>
                ${sub ? `<div class="title-sub">${sub}</div>` : ''}
              </div>
              <div class="difficulty-badge ${diffClass}">${trip.difficulty}</div>
            </div>
            <div class="meta-grid">
              <div class="meta-item"><i class="far fa-calendar"></i> ${dateFormatted}</div>
              <div class="meta-item"><i class="fas fa-arrows-left-right"></i> ${trip.distance}</div>
              <div class="meta-item"><i class="far fa-clock"></i> ${trip.duration}</div>
            </div>
            ${mapLink}
            <div class="card-footer">
              <div class="guide"><i class="fas fa-user-hiking"></i> ${trip.guide}</div>
              <div style="display:flex; align-items:center;">
                ${isCompleted ? '<span class="completed-badge"><i class="fas fa-check-circle"></i> виконано</span>' : ''}
                ${trip.isTraditional ? '<span class="traditional-badge"><i class="fas fa-leaf"></i> традиційний</span>' : ''}
                ${noteHtml}
                <div class="card-actions">
                  <button class="edit-btn" data-id="${trip.id}" title="Редагувати"><i class="fas fa-pen"></i></button>
                  <button class="delete-btn" data-id="${trip.id}" title="Видалити"><i class="fas fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Додаємо обробники подій для кнопок редагування та видалення
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        openEditModal(id);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        deleteTrip(id);
      });
    });
  }

  // --- Відкриття модалки для редагування ---
  function openEditModal(id) {
    const trip = trips.find(t => t.id === id);
    if (!trip) return;

    editingId = id;
    modalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати маршрут';
    
    // Заповнюємо форму
    titleInput.value = trip.title || '';
    dateInput.value = trip.date || '';
    distanceInput.value = trip.distance || '';
    difficultySelect.value = trip.difficulty || 'легка';
    durationInput.value = trip.duration || '';
    guideInput.value = trip.guide || '';
    mapUrlInput.value = trip.mapUrl || '';
    notesInput.value = trip.notes || '';
    imageInput.value = trip.image || '';
    isCompletedCheck.checked = trip.report && trip.report.includes('виконано');
    isTraditionalCheck.checked = trip.isTraditional || false;

    modalOverlay.classList.add('active');
  }

  // --- Видалення маршруту ---
  function deleteTrip(id) {
    if (confirm('Ви впевнені, що хочете видалити цей маршрут?')) {
      trips = trips.filter(t => t.id !== id);
      saveTrips();
      renderCards();
    }
  }

  // --- Фільтрація ---
  function setActiveFilter(activeBtn) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
    currentFilter = activeBtn.dataset.filter;
    renderCards();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() { setActiveFilter(this); });
  });

  // --- Модальне вікно ---
  function openAddModal() {
    editingId = null;
    modalTitle.innerHTML = '<i class="fas fa-mountain"></i> Новий маршрут';
    form.reset();
    difficultySelect.value = 'легка';
    modalOverlay.classList.add('active');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    editingId = null;
  }

  addTripBtn.addEventListener('click', openAddModal);
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // --- Збереження (додавання або оновлення) ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    if (!title) {
      alert('Назва маршруту обовʼязкова');
      return;
    }

    const tripData = {
      title: title,
      date: dateInput.value.trim(),
      distance: distanceInput.value.trim() || '? км',
      difficulty: difficultySelect.value,
      duration: durationInput.value.trim() || '1 день',
      guide: guideInput.value.trim() || '—',
      report: isCompletedCheck.checked ? 'виконано' : '',
      mapUrl: mapUrlInput.value.trim() || null,
      notes: notesInput.value.trim(),
      image: imageInput.value.trim() || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop',
      isTraditional: isTraditionalCheck.checked
    };

    if (editingId) {
      // Оновлення існуючого
      const index = trips.findIndex(t => t.id === editingId);
      if (index !== -1) {
        trips[index] = { ...trips[index], ...tripData };
      }
    } else {
      // Новий маршрут
      const newTrip = {
        id: Date.now().toString(),
        ...tripData
      };
      trips.push(newTrip);
    }

    saveTrips();
    renderCards();
    closeModal();
  });

  // --- Ініціалізація ---
  loadTrips();
  renderCards();
})();