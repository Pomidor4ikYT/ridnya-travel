// js/trips.js
(function() {
  'use strict';

  const STORAGE_KEY = 'ridnya_trips';
  const MEMBERS_KEY = 'ridnya_members';
  const TRIP_APPS_KEY = 'ridnya_trip_applications';
  const LEADER_APPS_KEY = 'ridnya_leader_applications';

  const defaultTrips = [
    { id: '1', title: "г.Маківка 958 м. (з заходом на г.\"Захар Беркут\")", date: "2026-01-01", distance: "8 км", difficulty: "легка", duration: "1 день", guide: "Петро Маковський", report: "виконано", mapUrl: null, notes: "", image: "https://vidviday.ua/storage/media/tour/1321/162495238960dace458b87e-1200x1200.jpg", isTraditional: false, createdAt: Date.now() - 60 * 86400000, history: "" },
    { id: '2', title: "г. Пікуй 1408,3 м (старт з с.Білосовиця, або с.Гусне)", date: "2026-02-01", distance: "10 км", difficulty: "легка", duration: "1 день", guide: "Валерій Бурлака", report: "виконано", mapUrl: "https://uk.mapy.cz/s/gurefacuro", notes: "", image: "https://alp.com.ua/content/uploads/images/pkui-2.jpeg", isTraditional: false, createdAt: Date.now() - 50 * 86400000, history: "" },
    { id: '3', title: "г.Лопата 1210,9м., г.Кудрявець 1242м. (старт з м.Сколе)", date: "2026-02-15", distance: "16 км", difficulty: "легка", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/pubadohabo", notes: "", image: "https://skolebeskydy-park.in.ua/wp-content/uploads/2023/01/SAM_4941-scaled.jpg", isTraditional: true, createdAt: Date.now() - 45 * 86400000, history: "" },
    { id: '4', title: "Навколо Славського (Рожанка - В.Верх)", date: "2026-03-01", distance: "21 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "", mapUrl: "https://mapy.cz/s/dobojobozu", notes: "", image: "https://mashapasha.com/wp-content/uploads/2014/11/slavskoe_peshkom_2.jpg", isTraditional: false, createdAt: Date.now() - 40 * 86400000, history: "" },
    { id: '5', title: "г.Кукул, г.Велика Козьмеська, г.Говерла (старт с.Завоєля)", date: "18-19.04.2026", distance: "35 км", difficulty: "середня", duration: "2-3 дні", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/celemebeze", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e9a7a5897607f1f82ebbdb0a2b775a64c0557823/%D0%B3%D0%BE%D0%B2%D0%B5%D1%80%D0%BB%D0%B0-%D0%B3%D0%BE%D1%80%D0%B0.jpeg", isTraditional: false, createdAt: Date.now() - 30 * 86400000, history: "" },
    { id: '6', title: "Цицька, Великий Верх (старт і фініш смт. Воловець)", date: "02-03.05.2026", distance: "24 км", difficulty: "легка", duration: "1-2 дні", guide: "Олег Дашко", report: "", mapUrl: "https://mapy.com/s/cahucugobe", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb01NIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5333777e4ca98cbb8a305bc015cd6a4f0264a9c6/%D0%B2%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B8%CC%86%20%D0%B2%D0%B5%D1%80%D1%85.jpeg", isTraditional: false, createdAt: Date.now() - 25 * 86400000, history: "" },
    { id: '7', title: "г.Ключ 929 м. (старт з с.Труханів)", date: "2026-06-01", distance: "10-12 км", difficulty: "легка", duration: "1 день", guide: "Василь Дмитришин", report: "", mapUrl: null, notes: "багато варіантів", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Kljucmontenegro.jpg", isTraditional: false, createdAt: Date.now() - 20 * 86400000, history: "" },
    { id: '8', title: "г. Велика Сивуля 1836,6 м, г. Ігровець (старт с.Стара Гута)", date: "19-21.06.2026", distance: "40 км", difficulty: "вище середньої", duration: "2-3 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/nesopepumu", notes: "", image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/%D0%94%D0%BE%D1%80%D0%BE%D0%B3%D0%B0_%D0%BD%D0%B0_%D0%A1%D0%B8%D0%B2%D1%83%D0%BB%D1%96.jpg", isTraditional: false, createdAt: Date.now() - 15 * 86400000, history: "" },
    { id: '9', title: "г.Яворина 1131 м. (Похід \"Горами нашої слави\")", date: "11-12.07.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: "https://uk.mapy.cz/s/badepupuvu", notes: "масове сходження", image: "https://vpohid.com.ua/static/photos/5111.jpg", isTraditional: true, createdAt: Date.now() - 10 * 86400000, history: "" },
    { id: '10', title: "Кичера 2025. (через водоспад Гуркало)", date: "", distance: "15-16 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: null, notes: "багато варіантів", image: "https://hatarizba.com.ua/wp-content/uploads/2018/01/biloberizka-gora-kychera-3.jpg", isTraditional: true, createdAt: Date.now() - 5 * 86400000, history: "" },
    { id: '11', title: "Похід на Близниці (старт і фініш с.Кваси)", date: "01-02.08.2026", distance: "28 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.com/s/badopogohu", notes: "", image: "https://karpaty.love/uploads/posts/2018-02/1519386501_blyznytsia-22.jpg", isTraditional: false, createdAt: Date.now(), history: "" },
    { id: '12', title: "г.Яйко-Ілемське 1680 м. (старт з с.Мислівка)", date: "15-16.08.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://uk.mapy.cz/s/bohevajodo", notes: "", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Yaiko-Ilemske_RB.jpg", isTraditional: false, createdAt: Date.now(), history: "" },
    { id: '13', title: "Скельні масиви Сколівських Бескидів", date: "26-27.09.2026", distance: "27,5 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "", mapUrl: "https://uk.mapy.cz/s/galezadaku", notes: "", image: "https://kuluarpohod.com/wp-content/uploads/2024/05/800x_mg_8988rer-800x600.jpg", isTraditional: false, createdAt: Date.now(), history: "" },
    { id: '14', title: "Пікуяна (старт і фініш - в.Гусне)", date: "", distance: "20 км", difficulty: "легка", duration: "1 день", guide: "Лука Павлюк", report: "", mapUrl: "https://uk.mapy.cz/s/komerovuse", notes: "масове сходження", image: "https://tourinform.org.ua/wp-content/uploads/2018/05/borzava.jpg", isTraditional: false, createdAt: Date.now(), history: "" },
    { id: '15', title: "г.Менчул 1501 м (з с.Лумшори)", date: "2026-10-10", distance: "18 км", difficulty: "середня", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: null, notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c65672302195e2a6e189640c86537f701723caaf/menchul.jpg", isTraditional: false, createdAt: Date.now(), history: "" },
    { id: '16', title: "хр.Писаний Камінь (з с.Буковець)", date: "2026-11-01", distance: "22 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.cz/s/abcdef", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaE1HIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e6822aedcc48f9d43803b6128544171730e1f7dd/%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%BD%D0%B8%D0%B8%CC%86-%D0%BA%D0%B0%D0%BC%D1%96%D0%BD%D1%8C.jpeg", isTraditional: false, createdAt: Date.now(), history: "" },
    { id: '17', title: "г.Петрос 2020 м (з с.Кваси)", date: "2026-12-05", distance: "26 км", difficulty: "вище середньої", duration: "2 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/ghijkl", notes: "", image: "https://we.org.ua/wp-content/uploads/2015/03/211.jpg", isTraditional: false, createdAt: Date.now(), history: "" }
  ];

  const uniqueGuides = [...new Map(defaultTrips.map(t => [t.guide, { name: t.guide, rating: 4 }])).values()];
  const defaultMembers = uniqueGuides.map((guide, idx) => ({ id: 'm' + (idx + 1), name: guide.name, rating: guide.rating }));

  let trips = [], members = [];
  let editingTripId = null;
  let currentSort = 'date', sortAscending = true;
  let selectedDate = null, flatpickrInstance = null;
  let currentTripIdForParticipants = null;

  // ========== ОСНОВНІ ФУНКЦІЇ РОБОТИ З ДАНИМИ ==========
  function loadData() {
    const storedTrips = Utils.getStorage(STORAGE_KEY);
    if (storedTrips && storedTrips.length) {
      const merged = [...storedTrips];
      defaultTrips.forEach(defTrip => {
        if (!merged.some(t => t.id === defTrip.id)) {
          merged.push(JSON.parse(JSON.stringify(defTrip)));
        } else {
          const existing = merged.find(t => t.id === defTrip.id);
          if (existing && existing.history === undefined) existing.history = '';
        }
      });
      trips = merged;
    } else {
      trips = JSON.parse(JSON.stringify(defaultTrips));
    }
    trips.forEach(t => { if (t.history === undefined) t.history = ''; });
    const storedMembers = Utils.getStorage(MEMBERS_KEY);
    if (storedMembers && storedMembers.length) {
      members = storedMembers;
    } else {
      members = JSON.parse(JSON.stringify(defaultMembers));
    }
  }
  function saveData() { Utils.setStorage(STORAGE_KEY, trips); }
  function saveMembers() { Utils.setStorage(MEMBERS_KEY, members); }

  // ========== УЧАСНИКИ ==========
  function getApprovedParticipantsForTrip(tripId) {
    const apps = Utils.getStorage(TRIP_APPS_KEY);
    return apps.filter(a => a.tripId == tripId && a.status === 'approved');
  }

  function renderParticipantsInModal(tripId) {
    const container = document.getElementById('participantsListContainer');
    if (!container) return;
    const participants = getApprovedParticipantsForTrip(tripId);
    if (!participants.length) {
      container.innerHTML = '<div style="text-align:center; padding:12px; color:var(--gray-500);">Ще немає підтверджених учасників</div>';
      return;
    }
container.innerHTML = participants.map(p => `
  <div class="participant-row" data-id="${p.id}" style="display:flex; justify-content:space-between; align-items:center; padding:8px; border-bottom:1px solid var(--gray-200);">
    <div>
      <strong>${Utils.escapeHtml(p.userName)}</strong>
      ${p.phone ? `<br><span style="font-size:0.8rem;">${Utils.escapeHtml(p.phone)}</span>` : ''}
    </div>
    <button class="remove-participant-btn" data-id="${p.id}" style="background:var(--red); color:white; border:none; border-radius:30px; padding:4px 12px; cursor:pointer;"><i class="fas fa-trash"></i></button>
  </div>
`).join('');
    document.querySelectorAll('.remove-participant-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        if (confirm('Видалити учасника з цього походу?')) {
          removeParticipantFromTrip(btn.dataset.id, tripId);
        }
      };
    });
  }

  function removeParticipantFromTrip(applicationId, tripId) {
    let apps = Utils.getStorage(TRIP_APPS_KEY);
    apps = apps.filter(a => a.id != applicationId);
    Utils.setStorage(TRIP_APPS_KEY, apps);
    renderParticipantsInModal(tripId);
    // Оновлюємо модалку історії, якщо вона відкрита
    const historyModal = document.getElementById('tripHistoryModal');
    if (historyModal && historyModal.classList.contains('active')) {
      openTripHistoryModal(tripId);
    }
  }

function addParticipantToTrip(tripId, tripTitle, name, phone) {
  if (!name.trim()) {
    Utils.showNotification('Введіть ім\'я учасника', false);
    return false;
  }
  const apps = Utils.getStorage(TRIP_APPS_KEY);
  if (apps.some(a => a.tripId == tripId && a.userName === name.trim())) {
    Utils.showNotification('Такий учасник вже доданий до цього походу', false);
    return false;
  }
  apps.push({
    id: Date.now(),
    tripId: tripId,
    tripTitle: tripTitle,
    userName: name.trim(),
    phone: phone ? phone.trim() : '',   // телефон може бути порожнім
    comment: 'Додано адміністратором',
    date: new Date().toLocaleString(),
    status: 'approved'
  });
  Utils.setStorage(TRIP_APPS_KEY, apps);
  renderParticipantsInModal(tripId);
  const historyModal = document.getElementById('tripHistoryModal');
  if (historyModal && historyModal.classList.contains('active')) {
    openTripHistoryModal(tripId);
  }
  Utils.showNotification('Учасника додано', true);
  return true;
}

  function getTripParticipants(tripId) {
    const apps = Utils.getStorage(TRIP_APPS_KEY);
    return apps.filter(a => a.tripId == tripId && a.status === 'approved');
  }

  // ========== ДОПОМІЖНІ ФУНКЦІЇ ДЛЯ МАРШРУТІВ ==========
  function parseDate(dateStr) {
    if (!dateStr) return null;
    let parts = dateStr.split('.');
    if (parts.length === 3) return new Date(parts[2], parts[1]-1, parts[0]);
    parts = dateStr.split('-');
    if (parts.length === 3) return new Date(parts[0], parts[1]-1, parts[2]);
    return null;
  }

  function isTripCompleted(trip) {
    if (trip.report === 'виконано') return true;
    if (!trip.date) return false;
    const tripDate = parseDate(trip.date);
    if (!tripDate) return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    return tripDate < today;
  }

  function isUpcomingSoon(trip) {
    if (isTripCompleted(trip)) return false;
    if (!trip.date) return false;
    const tripDate = parseDate(trip.date);
    if (!tripDate) return false;
    const now = new Date();
    const diffDays = (tripDate - now) / (1000 * 3600 * 24);
    return diffDays > 0 && diffDays <= 30;
  }

  function isTripOnDate(trip, dateStr) {
    if (!dateStr) return true;
    if (!trip.date) return false;
    const tripDate = trip.date.trim();
    const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;
    if (yyyyMmDd.test(tripDate)) return tripDate === dateStr;
    const rangePattern = /^(\d{1,2})-(\d{1,2})\.(\d{2})\.(\d{4})$/;
    const match = tripDate.match(rangePattern);
    if (match) {
      let day1 = parseInt(match[1]), day2 = parseInt(match[2]), month = parseInt(match[3]), year = parseInt(match[4]);
      let selected = new Date(dateStr);
      selected.setHours(0,0,0,0);
      let start = new Date(year, month-1, day1);
      let end = new Date(year, month-1, day2);
      start.setHours(0,0,0,0); end.setHours(0,0,0,0);
      return selected >= start && selected <= end;
    }
    return false;
  }

  function getAllTripDates() {
    const dates = [];
    trips.forEach(trip => {
      if (!trip.date) return;
      const tripDate = trip.date.trim();
      const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;
      if (yyyyMmDd.test(tripDate)) dates.push(tripDate);
      else {
        const rangePattern = /^(\d{1,2})-(\d{1,2})\.(\d{2})\.(\d{4})$/;
        const match = tripDate.match(rangePattern);
        if (match) {
          let day1 = parseInt(match[1]), day2 = parseInt(match[2]), month = parseInt(match[3]), year = parseInt(match[4]);
          for (let d = day1; d <= day2; d++) dates.push(`${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
        }
      }
    });
    return [...new Set(dates)];
  }

  function initFlatpickr() {
    const input = document.getElementById('dateFilterInput');
    if (!input) return;
    if (typeof flatpickr === 'undefined') { setTimeout(initFlatpickr, 500); return; }
    if (flatpickrInstance) flatpickrInstance.destroy();
    flatpickrInstance = flatpickr(input, {
      dateFormat: "Y-m-d", allowInput: false, disableMobile: true, locale: "uk",
      onChange: (selectedDates, dateStr) => { selectedDate = dateStr; renderTrips(); },
      onDayCreate: (dObj, dStr, fp, dayElem) => {
        let year, month, day;
        if (dObj instanceof Date) { year = dObj.getFullYear(); month = String(dObj.getMonth() + 1).padStart(2, '0'); day = String(dObj.getDate()).padStart(2, '0'); }
        else if (dayElem && dayElem.dateObj && dayElem.dateObj instanceof Date) { year = dayElem.dateObj.getFullYear(); month = String(dayElem.dateObj.getMonth() + 1).padStart(2, '0'); day = String(dayElem.dateObj.getDate()).padStart(2, '0'); }
        else return;
        const dateKey = `${year}-${month}-${day}`;
        if (getAllTripDates().includes(dateKey)) dayElem.classList.add('has-trip');
      }
    });
    const icon = document.querySelector('.date-filter i');
    if (icon) icon.addEventListener('click', () => flatpickrInstance.open());
  }

  function sortTrips(tripsArray, sortType, ascending) {
    const sorted = [...tripsArray];
    if (sortType === 'date') {
      const future = [];
      const past = [];
      const noDate = [];
      const today = new Date();
      today.setHours(0,0,0,0);
      sorted.forEach(trip => {
        const dateObj = parseDate(trip.date);
        if (!dateObj) {
          noDate.push(trip);
        } else if (dateObj >= today) {
          future.push(trip);
        } else {
          past.push(trip);
        }
      });
      const sortByDate = (a, b) => (parseDate(a.date) || 0) - (parseDate(b.date) || 0);
      future.sort(sortByDate);
      past.sort(sortByDate);
      const result = [...future, ...past, ...noDate];
      if (!ascending) result.reverse();
      return result;
    } else if (sortType === 'difficulty') {
      const order = { 'легка': 1, 'середня': 2, 'вище середньої': 3 };
      sorted.sort((a, b) => (order[a.difficulty]||0) - (order[b.difficulty]||0));
      if (!ascending) sorted.reverse();
    } else if (sortType === 'distance') {
      sorted.sort((a, b) => (parseFloat(a.distance)||0) - (parseFloat(b.distance)||0));
      if (!ascending) sorted.reverse();
    }
    return sorted;
  }

  // ========== ВІДОБРАЖЕННЯ МАРШРУТІВ ==========
  function renderTrips() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    let filtered = [...trips];
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || (t.guide && t.guide.toLowerCase().includes(q)));
    }
    if (selectedDate) filtered = filtered.filter(t => isTripOnDate(t, selectedDate));
    if (currentSort !== 'default') filtered = sortTrips(filtered, currentSort, sortAscending);
    document.getElementById('visibleCount').textContent = filtered.length;
    if (!filtered.length) {
      container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-map-signs" style="font-size:3rem; opacity:0.4;"></i><p>Немає маршрутів</p></div>';
      return;
    }
    container.innerHTML = filtered.map(trip => {
      const isCompleted = isTripCompleted(trip);
      const diffClass = `difficulty-${trip.difficulty === 'легка' ? 'легка' : trip.difficulty === 'середня' ? 'середня' : 'вище-середньої'}`;
      const imageUrl = trip.image && trip.image.trim() !== '' ? trip.image : 'https://placehold.co/600x400?text=Немає+фото';
      let mainTitle = trip.title, subTitle = '';
      const parenMatch = trip.title.match(/^(.*?)(\([^)]+\))$/);
      if (parenMatch) { mainTitle = parenMatch[1].trim(); subTitle = parenMatch[2].trim(); }
      let badgeHtml = '';
      if (!isCompleted && isUpcomingSoon(trip)) {
        badgeHtml = '<span class="trip-badge upcoming">Скоро буде</span>';
      }
      let actionButton;
      if (isCompleted) {
        actionButton = `<span class="completed-badge"><i class="fas fa-check-circle"></i> Вже пройдено</span>`;
      } else {
        actionButton = `<button class="join-trip-btn" data-id="${trip.id}" data-title="${Utils.escapeHtml(trip.title)}"><i class="fas fa-user-plus"></i> Записатись</button>`;
      }
      const adminButtons = window.isAdmin ? `<button class="edit-btn" data-id="${trip.id}"><i class="fas fa-pen"></i></button><button class="delete-btn" data-id="${trip.id}"><i class="fas fa-trash"></i></button>` : '';
      return `
        <div class="trip-card" data-id="${trip.id}">
          <div class="card-image" style="background-image:url('${imageUrl}');">
            ${badgeHtml}
          </div>
          <div class="card-content">
            <div class="card-header"><div class="title-main">${Utils.escapeHtml(mainTitle)}</div><div class="difficulty-badge ${diffClass}">${trip.difficulty}</div></div>
            ${subTitle ? `<div class="title-sub">${Utils.escapeHtml(subTitle)}</div>` : ''}
            <div class="meta-grid"><span><i class="far fa-calendar"></i> ${trip.date || '—'}</span><span><i class="fas fa-arrows-left-right"></i> ${trip.distance}</span><span><i class="far fa-clock"></i> ${trip.duration}</span></div>
            ${trip.mapUrl ? `<a href="${trip.mapUrl}" target="_blank" class="route-link"><i class="fas fa-map-location-dot"></i> Маршрут на карті</a>` : ''}
            <div class="card-footer"><div class="guide"><i class="fas fa-user-hiking"></i> ${Utils.escapeHtml(trip.guide)}</div><div class="card-actions">${actionButton}${adminButtons}</div></div>
          </div>
        </div>`;
    }).join('');
    attachTripEvents();
  }

  // ========== МОДАЛЬНЕ ВІКНО ІСТОРІЇ З МОЖЛИВІСТЮ ДОДАВАННЯ УЧАСНИКІВ ==========
  function openTripHistoryModal(tripId) {
    const trip = trips.find(t => t.id == tripId);
    if (!trip) return;
    const participants = getTripParticipants(tripId);
    const modal = document.getElementById('tripHistoryModal');
    const title = document.getElementById('historyModalTitle');
    const body = document.getElementById('historyModalBody');
    title.innerHTML = `<i class="fas fa-history"></i> Історія походу: ${Utils.escapeHtml(trip.title)}`;
    
    let html = `<div class="history-detail"><strong>📅 Дата походу:</strong> ${trip.date || 'не вказана'}</div>`;
    if (trip.history && trip.history.trim()) {
      html += `<div class="history-detail"><strong>📖 Розповідь про похід:</strong><div class="trip-history-content">${trip.history}</div></div>`;
    }
    html += `<div class="history-detail"><strong>👥 Учасники (${participants.length}):</strong>`;
    if (participants.length === 0) html += '<p>Немає підтверджених учасників</p>';
    else {
      html += '<ul class="participants-list">';
      participants.forEach(p => {
        let phoneDisplay = p.phone ? ` (тел: ${Utils.escapeHtml(p.phone)})` : '';
html += `<li>${Utils.escapeHtml(p.userName)}${phoneDisplay}`;
        if (window.isAdmin) {
          html += ` <button class="remove-participant-from-history" data-id="${p.id}" style="background:var(--red); color:white; border:none; border-radius:30px; padding:2px 8px; margin-left:10px; cursor:pointer;"><i class="fas fa-trash"></i></button>`;
        }
        html += `</li>`;
      });
      html += '</ul>';
    }
    html += `</div>`;
    
if (window.isAdmin) {
  html += `
    <div class="history-detail" style="margin-top:20px; border-top:1px solid var(--gray-200); padding-top:16px;">
      <strong><i class="fas fa-user-plus"></i> Додати учасника до цього походу</strong>
      <div style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
        <input type="text" id="historyParticipantName" placeholder="Ім'я учасника *" style="flex:2; min-width: 140px; padding: 8px 12px; border-radius: 30px; border: 1px solid var(--gray-300);">
        <input type="tel" id="historyParticipantPhone" placeholder="Телефон (необов'язково)" style="flex:2; min-width: 140px; padding: 8px 12px; border-radius: 30px; border: 1px solid var(--gray-300);">
        <button id="addParticipantFromHistoryBtn" data-trip-id="${tripId}" data-trip-title="${Utils.escapeHtml(trip.title)}" class="add-trip-btn" style="background: var(--blue); color: white; padding: 8px 16px;"><i class="fas fa-plus"></i> Додати</button>
      </div>
    </div>
  `;
}
    
    body.innerHTML = html;
    modal.classList.add('active');
    
    if (window.isAdmin) {
      document.querySelectorAll('.remove-participant-from-history').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm('Видалити учасника з цього походу?')) {
            removeParticipantFromTrip(btn.dataset.id, tripId);
          }
        });
      });
      
const addBtn = document.getElementById('addParticipantFromHistoryBtn');
if (addBtn) {
  addBtn.addEventListener('click', () => {
    const name = document.getElementById('historyParticipantName').value.trim();
    const phone = document.getElementById('historyParticipantPhone').value.trim();
    const tripIdAttr = addBtn.dataset.tripId;
    const tripTitle = addBtn.dataset.tripTitle;
    if (addParticipantToTrip(tripIdAttr, tripTitle, name, phone)) {
      document.getElementById('historyParticipantName').value = '';
      document.getElementById('historyParticipantPhone').value = '';
    }
  });
}
    }
  }
  
  function closeHistoryModal() { document.getElementById('tripHistoryModal').classList.remove('active'); }

  function openLeaderTripsModal(leaderName) {
    const leaderTrips = trips.filter(t => t.guide === leaderName && t.date);
    leaderTrips.sort((a,b) => (parseDate(a.date)||0) - (parseDate(b.date)||0));
    const modal = document.getElementById('leaderTripsModal');
    const title = document.getElementById('leaderTripsTitle');
    const body = document.getElementById('leaderTripsBody');
    title.innerHTML = `<i class="fas fa-user-hiking"></i> Маршрути лідера: ${Utils.escapeHtml(leaderName)}`;
    if (!leaderTrips.length) body.innerHTML = '<p>Цей лідер поки не проводив походів.</p>';
    else {
      let html = '<div class="leader-trips-list">';
      leaderTrips.forEach(t => { html += `<div class="leader-trip-item"><strong>${Utils.escapeHtml(t.title)}</strong> — ${t.date || 'дата не вказана'}</div>`; });
      html += '</div>';
      body.innerHTML = html;
    }
    modal.classList.add('active');
  }
  function closeLeaderTripsModal() { document.getElementById('leaderTripsModal').classList.remove('active'); }

function openTripApplyModal(tripId, tripTitle) {
  // Відкриваємо Google Форму для заявок на маршрути
  window.open('https://forms.gle/Npww8bQjRfMKT3s68', '_blank');
  Utils.showNotification('📋 Ви переходите до Google Форми. Будь ласка, заповніть її, щоб записатися на похід.', true);
}

function openLeaderApplyModal(leaderId, leaderName) {
  // Відкриваємо Google Форму для заявок до лідера
  window.open('https://forms.gle/tjNqxMC7Dfi8g78u8', '_blank');
  Utils.showNotification('👨‍🏫 Ви переходите до Google Форми. Будь ласка, заповніть її, щоб записатися до лідера.', true);
}

  // ========== РОБОТА З ЛІДЕРАМИ ==========
  function populateGuideSelect() {
    const select = document.getElementById('tripGuideSelect');
    if (!select) return;
    const currentGuide = document.getElementById('tripGuide').value;
    select.innerHTML = '<option value="">— Оберіть провідника —</option>' + members.map(m => `<option value="${Utils.escapeHtml(m.name)}" ${m.name === currentGuide ? 'selected' : ''}>${Utils.escapeHtml(m.name)} (⭐ ${m.rating})</option>`).join('');
    select.onchange = () => { document.getElementById('tripGuide').value = select.value; };
  }

  function addNewLeaderFromModal(callback) {
    const name = document.getElementById('leaderName').value.trim();
    const rating = parseInt(document.getElementById('leaderRating').value);
    if (!name) { Utils.showNotification('Введіть ім\'я лідера', false); return false; }
    if (members.some(m => m.name.toLowerCase() === name.toLowerCase())) { Utils.showNotification('Такий лідер вже існує', false); return false; }
    const newLeader = { id: 'm' + Date.now(), name: name, rating: rating };
    members.push(newLeader);
    saveMembers();
    renderMembers();
    if (callback) callback(newLeader);
    return true;
  }

  function editLeader(id) {
    const member = members.find(m => m.id === id);
    if (!member) return;
    const newName = prompt('Нове ім\'я лідера:', member.name);
    if (!newName || newName.trim() === '') return;
    const oldName = member.name;
    if (newName.trim() !== oldName && members.some(m => m.name === newName.trim())) {
      Utils.showNotification('Лідер з таким ім\'ям вже існує', false);
      return;
    }
    member.name = newName.trim();
    trips.forEach(t => { if (t.guide === oldName) t.guide = member.name; });
    saveMembers();
    saveData();
    renderMembers();
    renderTrips();
    Utils.showNotification(`Лідера перейменовано на ${member.name}`, true);
  }

  function deleteLeader(id) {
    const member = members.find(m => m.id === id);
    if (!member) return;
    const linkedTrips = trips.filter(t => t.guide === member.name);
    if (linkedTrips.length > 0) {
      Utils.showNotification(`Неможливо видалити: лідер веде ${linkedTrips.length} маршрут(ів). Спочатку змініть провідника в цих маршрутах.`, false);
      return;
    }
    if (confirm(`Видалити лідера "${member.name}"?`)) {
      members = members.filter(m => m.id !== id);
      saveMembers();
      renderMembers();
      Utils.showNotification(`Лідера ${member.name} видалено`, true);
    }
  }

  function renderMembers() {
    const container = document.getElementById('membersContainer');
    if (!container) return;
    container.innerHTML = members.map(m => `
      <div class="member-card">
        <div class="member-name leader-name" data-name="${Utils.escapeHtml(m.name)}">${Utils.escapeHtml(m.name)}</div>
        <div class="member-rating">${'★'.repeat(m.rating)}${'☆'.repeat(5-m.rating)}</div>
        <div class="member-actions admin-only" style="${window.isAdmin ? '' : 'display:none'}">
          <button class="rating-edit" data-id="${m.id}"><i class="fas fa-star"></i> Рейтинг</button>
          <button class="edit-leader-name" data-id="${m.id}"><i class="fas fa-pen"></i> Змінити ім'я</button>
          <button class="delete-leader" data-id="${m.id}"><i class="fas fa-trash"></i> Видалити</button>
        </div>
        <button class="btn-join-leader" data-id="${m.id}" data-name="${Utils.escapeHtml(m.name)}"><i class="fas fa-hand-peace"></i> Записатись до лідера</button>
      </div>
    `).join('');
    document.querySelectorAll('.leader-name').forEach(el => { el.addEventListener('click', () => openLeaderTripsModal(el.dataset.name)); });
    if (window.isAdmin) {
      document.querySelectorAll('.rating-edit').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); const newRating = prompt('Новий рейтинг (1-5):'); if (newRating && newRating >= 1 && newRating <= 5) { const member = members.find(m => m.id === btn.dataset.id); if (member) member.rating = parseInt(newRating); saveMembers(); renderMembers(); } }));
      document.querySelectorAll('.edit-leader-name').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); editLeader(btn.dataset.id); }));
      document.querySelectorAll('.delete-leader').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); deleteLeader(btn.dataset.id); }));
    }
    document.querySelectorAll('.btn-join-leader').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); openLeaderApplyModal(btn.dataset.id, btn.dataset.name); }));
  }

  function handleJoinClick(e) { e.stopPropagation(); const btn = e.currentTarget; openTripApplyModal(btn.dataset.id, btn.dataset.title); }
  function handleEditClick(e) { e.stopPropagation(); openTripModal(e.currentTarget.dataset.id); }
  function handleDeleteClick(e) { e.stopPropagation(); if (confirm('Видалити маршрут?')) { trips = trips.filter(t => t.id !== e.currentTarget.dataset.id); saveData(); renderTrips(); } }

  function attachTripEvents() {
    document.querySelectorAll('.join-trip-btn').forEach(btn => btn.removeEventListener('click', handleJoinClick));
    document.querySelectorAll('.join-trip-btn').forEach(btn => btn.addEventListener('click', handleJoinClick));
    if (window.isAdmin) {
      document.querySelectorAll('.edit-btn').forEach(btn => btn.removeEventListener('click', handleEditClick));
      document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', handleEditClick));
      document.querySelectorAll('.delete-btn').forEach(btn => btn.removeEventListener('click', handleDeleteClick));
      document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleDeleteClick));
    }
    document.querySelectorAll('.trip-card').forEach(card => {
      card.removeEventListener('click', card._clickHandler);
      const handler = (e) => {
        if (e.target.closest('.join-trip-btn') || e.target.closest('.edit-btn') || e.target.closest('.delete-btn')) return;
        openTripHistoryModal(card.dataset.id);
      };
      card._clickHandler = handler;
      card.addEventListener('click', handler);
    });
  }

  function openTripModal(id = null) {
    if (!window.isAdmin) return;
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
      document.getElementById('tripGuide').value = trip.guide || '';
      document.getElementById('tripMapUrl').value = trip.mapUrl || '';
      document.getElementById('tripNotes').value = trip.notes || '';
      document.getElementById('tripHistory').value = trip.history || '';
      document.getElementById('tripImage').value = trip.image || '';
      document.getElementById('tripIsCompleted').checked = trip.report === 'виконано';
      document.getElementById('tripIsTraditional').checked = trip.isTraditional || false;
      populateGuideSelect();
      currentTripIdForParticipants = id;
      renderParticipantsInModal(id);
    } else {
      editingTripId = null;
      titleElem.innerHTML = '<i class="fas fa-hiking"></i> Новий маршрут';
      form.reset();
      document.getElementById('tripGuide').value = '';
      document.getElementById('tripHistory').value = '';
      populateGuideSelect();
      currentTripIdForParticipants = null;
      const participantsContainer = document.getElementById('participantsListContainer');
      if (participantsContainer) participantsContainer.innerHTML = '<div style="text-align:center; padding:12px;">Спочатку збережіть маршрут</div>';
      document.getElementById('newParticipantName').value = '';
      document.getElementById('newParticipantPhone').value = '';
    }
    modal.classList.add('active');
  }

  function closeTripModal() {
    document.getElementById('tripModalOverlay').classList.remove('active');
    editingTripId = null;
    currentTripIdForParticipants = null;
  }

  function openAddLeaderModal() {
    const modal = document.getElementById('leaderModalOverlay');
    if (modal) { document.getElementById('leaderName').value = ''; document.getElementById('leaderRating').value = '4'; modal.classList.add('active'); }
  }
  function closeLeaderModal() { document.getElementById('leaderModalOverlay').classList.remove('active'); }

  function resetAll() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) { searchInput.value = ''; const clearBtn = document.getElementById('clearSearch'); if (clearBtn) clearBtn.style.display = 'none'; }
    if (flatpickrInstance) { flatpickrInstance.clear(); selectedDate = null; }
    currentSort = 'date'; sortAscending = true;
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'date';
    const sortDirBtn = document.getElementById('sortDirectionBtn');
    if (sortDirBtn) { const icon = sortDirBtn.querySelector('i'); if (icon) { icon.className = 'fas fa-arrow-up-wide-short'; icon.title = 'За зростанням'; } }
    renderTrips();
  }

  // ========== ІНІЦІАЛІЗАЦІЯ ==========
  function init() {
    loadData();
    renderTrips();
    renderMembers();
    initFlatpickr();
    if (window.isAdmin) document.getElementById('addTripBtn')?.addEventListener('click', () => openTripModal());
    document.getElementById('closeTripModalBtn')?.addEventListener('click', closeTripModal);
    document.getElementById('cancelTripBtn')?.addEventListener('click', closeTripModal);
    document.getElementById('tripModalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeTripModal(); });
    document.getElementById('addTripForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('tripTitle').value.trim();
      if (!title) { alert('Назва обов\'язкова'); return; }
      const data = {
        title, date: document.getElementById('tripDate').value, distance: document.getElementById('tripDistance').value || '? км',
        difficulty: document.getElementById('tripDifficulty').value, duration: document.getElementById('tripDuration').value || '1 день',
        guide: document.getElementById('tripGuide').value || '—', report: document.getElementById('tripIsCompleted').checked ? 'виконано' : '',
        mapUrl: document.getElementById('tripMapUrl').value || null, notes: document.getElementById('tripNotes').value,
        history: document.getElementById('tripHistory').value,
        image: document.getElementById('tripImage').value, isTraditional: document.getElementById('tripIsTraditional').checked,
        createdAt: Date.now()
      };
      if (editingTripId) {
        const idx = trips.findIndex(t => t.id === editingTripId);
        if (idx !== -1) trips[idx] = { ...trips[idx], ...data };
        if (currentTripIdForParticipants) renderParticipantsInModal(currentTripIdForParticipants);
      } else {
        const newId = Date.now().toString();
        trips.push({ id: newId, ...data });
        currentTripIdForParticipants = newId;
        renderParticipantsInModal(currentTripIdForParticipants);
      }
      saveData(); renderTrips(); closeTripModal();
    });
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    if (searchInput) searchInput.addEventListener('input', () => { if (clearSearch) clearSearch.style.display = searchInput.value ? 'flex' : 'none'; renderTrips(); });
    if (clearSearch) clearSearch.addEventListener('click', () => { searchInput.value = ''; clearSearch.style.display = 'none'; renderTrips(); });
    const sortSelect = document.getElementById('sortSelect');
    const sortDirBtn = document.getElementById('sortDirectionBtn');
    if (sortSelect) sortSelect.addEventListener('change', (e) => { currentSort = e.target.value; renderTrips(); });
    if (sortDirBtn) sortDirBtn.addEventListener('click', () => { sortAscending = !sortAscending; const icon = sortDirBtn.querySelector('i'); if (sortAscending) { icon.className = 'fas fa-arrow-up-wide-short'; icon.title = 'За зростанням'; } else { icon.className = 'fas fa-arrow-down-wide-short'; icon.title = 'За спаданням'; } renderTrips(); });
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetAll);
    const addLeaderBtn = document.getElementById('addLeaderBtn');
    if (addLeaderBtn) addLeaderBtn.addEventListener('click', openAddLeaderModal);
    document.getElementById('closeLeaderModalBtn')?.addEventListener('click', closeLeaderModal);
    document.getElementById('cancelLeaderBtn')?.addEventListener('click', closeLeaderModal);
    document.getElementById('leaderModalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeLeaderModal(); });
    document.getElementById('addLeaderForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (addNewLeaderFromModal()) {
        closeLeaderModal();
        renderTrips();
        if (document.getElementById('tripModalOverlay').classList.contains('active')) populateGuideSelect();
      }
    });
    document.getElementById('quickAddLeaderBtn')?.addEventListener('click', openAddLeaderModal);
    document.getElementById('closeHistoryModal')?.addEventListener('click', closeHistoryModal);
    document.getElementById('closeHistoryFooter')?.addEventListener('click', closeHistoryModal);
    document.getElementById('tripHistoryModal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeHistoryModal(); });
    document.getElementById('closeLeaderTripsModal')?.addEventListener('click', closeLeaderTripsModal);
    document.getElementById('closeLeaderTripsFooter')?.addEventListener('click', closeLeaderTripsModal);
    document.getElementById('leaderTripsModal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeLeaderTripsModal(); });
    
    const addParticipantBtn = document.getElementById('addParticipantBtn');
    if (addParticipantBtn) {
      addParticipantBtn.addEventListener('click', () => {
        if (!currentTripIdForParticipants) {
          Utils.showNotification('Спочатку збережіть маршрут', false);
          return;
        }
        const trip = trips.find(t => t.id == currentTripIdForParticipants);
        if (!trip) return;
        const name = document.getElementById('newParticipantName').value.trim();
        const phone = document.getElementById('newParticipantPhone').value.trim();
        if (addParticipantToTrip(currentTripIdForParticipants, trip.title, name, phone)) {
          document.getElementById('newParticipantName').value = '';
          document.getElementById('newParticipantPhone').value = '';
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();