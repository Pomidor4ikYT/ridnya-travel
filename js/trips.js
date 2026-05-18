// js/trips.js
(function() {
  'use strict';

  // ========== КОНСТАНТИ ТА ДАНІ ==========
  const STORAGE_KEY = 'ridnya_trips';
  const MEMBERS_KEY = 'ridnya_members';
  const TRIP_APPS_KEY = 'ridnya_trip_applications';
  const LEADER_APPS_KEY = 'ridnya_leader_applications';

  const defaultTrips = [
    { id: '1', title: "г.Маківка 958 м. (з заходом на г.\"Захар Беркут\")", date: "2026-01-01", distance: "8 км", difficulty: "легка", duration: "1 день", guide: "Петро Маковський", report: "виконано", mapUrl: null, notes: "", image: "https://vidviday.ua/storage/media/tour/1321/162495238960dace458b87e-1200x1200.jpg", isTraditional: false },
    { id: '2', title: "г. Пікуй 1408,3 м (старт з с.Білосовиця, або с.Гусне)", date: "2026-02-01", distance: "10 км", difficulty: "легка", duration: "1 день", guide: "Валерій Бурлака", report: "виконано", mapUrl: "https://uk.mapy.cz/s/gurefacuro", notes: "", image: "https://alp.com.ua/content/uploads/images/pkui-2.jpeg", isTraditional: false },
    { id: '3', title: "г.Лопата 1210,9м., г.Кудрявець 1242м. (старт з м.Сколе)", date: "2026-02-15", distance: "16 км", difficulty: "легка", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/pubadohabo", notes: "", image: "https://skolebeskydy-park.in.ua/wp-content/uploads/2023/01/SAM_4941-scaled.jpg", isTraditional: true },
    { id: '4', title: "Навколо Славського (Рожанка - В.Верх)", date: "2026-03-01", distance: "21 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "", mapUrl: "https://mapy.cz/s/dobojobozu", notes: "", image: "https://mashapasha.com/wp-content/uploads/2014/11/slavskoe_peshkom_2.jpg", isTraditional: false },
    { id: '5', title: "г.Кукул, г.Велика Козьмеська, г.Говерла (старт с.Завоєля)", date: "18-19.04.2026", distance: "35 км", difficulty: "середня", duration: "2-3 дні", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/celemebeze", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e9a7a5897607f1f82ebbdb0a2b775a64c0557823/%D0%B3%D0%BE%D0%B2%D0%B5%D1%80%D0%BB%D0%B0-%D0%B3%D0%BE%D1%80%D0%B0.jpeg", isTraditional: false },
    { id: '6', title: "Цицька, Великий Верх (старт і фініш смт. Воловець)", date: "02-03.05.2026", distance: "24 км", difficulty: "легка", duration: "1-2 дні", guide: "Олег Дашко", report: "", mapUrl: "https://mapy.com/s/cahucugobe", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb01NIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5333777e4ca98cbb8a305bc015cd6a4f0264a9c6/%D0%B2%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B8%CC%86%20%D0%B2%D0%B5%D1%80%D1%85.jpeg", isTraditional: false },
    { id: '7', title: "г.Ключ 929 м. (старт з с.Труханів)", date: "2026-06-01", distance: "10-12 км", difficulty: "легка", duration: "1 день", guide: "Василь Дмитришин", report: "виконано", mapUrl: null, notes: "багато варіантів", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Kljucmontenegro.jpg", isTraditional: false },
    { id: '8', title: "г. Велика Сивуля 1836,6 м, г. Ігровець (старт с.Стара Гута)", date: "19-21.06.2026", distance: "40 км", difficulty: "вище середньої", duration: "2-3 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/nesopepumu", notes: "", image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/%D0%94%D0%BE%D1%80%D0%BE%D0%B3%D0%B0_%D0%BD%D0%B0_%D0%A1%D0%B8%D0%B2%D1%83%D0%BB%D1%96.jpg", isTraditional: false },
    { id: '9', title: "г.Яворина 1131 м. (Похід \"Горами нашої слави\")", date: "11-12.07.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: "https://uk.mapy.cz/s/badepupuvu", notes: "масове сходження", image: "https://vpohid.com.ua/static/photos/5111.jpg", isTraditional: true },
    { id: '10', title: "Кичера 2025. (через водоспад Гуркало)", date: "", distance: "15-16 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: null, notes: "багато варіантів", image: "https://hatarizba.com.ua/wp-content/uploads/2018/01/biloberizka-gora-kychera-3.jpg", isTraditional: true },
    { id: '11', title: "Похід на Близниці (старт і фініш с.Кваси)", date: "01-02.08.2026", distance: "28 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.com/s/badopogohu", notes: "", image: "https://karpaty.love/uploads/posts/2018-02/1519386501_blyznytsia-22.jpg", isTraditional: false },
    { id: '12', title: "г.Яйко-Ілемське 1680 м. (старт з с.Мислівка)", date: "15-16.08.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://uk.mapy.cz/s/bohevajodo", notes: "", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Yaiko-Ilemske_RB.jpg", isTraditional: false },
    { id: '13', title: "Скельні масиви Сколівських Бескидів", date: "26-27.09.2026", distance: "27,5 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "виконано", mapUrl: "https://uk.mapy.cz/s/galezadaku", notes: "", image: "https://kuluarpohod.com/wp-content/uploads/2024/05/800x_mg_8988rer-800x600.jpg", isTraditional: false },
    { id: '14', title: "Пікуяна (старт і фініш - в.Гусне)", date: "", distance: "20 км", difficulty: "легка", duration: "1 день", guide: "Лука Павлюк", report: "", mapUrl: "https://uk.mapy.cz/s/komerovuse", notes: "масове сходження", image: "https://tourinform.org.ua/wp-content/uploads/2018/05/borzava.jpg", isTraditional: false },
    { id: '15', title: "г.Менчул 1501 м (з с.Лумшори)", date: "2026-10-10", distance: "18 км", difficulty: "середня", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: null, notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c65672302195e2a6e189640c86537f701723caaf/menchul.jpg", isTraditional: false },
    { id: '16', title: "хр.Писаний Камінь (з с.Буковець)", date: "2026-11-01", distance: "22 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.cz/s/abcdef", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaE1HIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e6822aedcc48f9d43803b6128544171730e1f7dd/%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%BD%D0%B8%D0%B8%CC%86-%D0%BA%D0%B0%D0%BC%D1%96%D0%BD%D1%8C.jpeg", isTraditional: false },
    { id: '17', title: "г.Петрос 2020 м (з с.Кваси)", date: "2026-12-05", distance: "26 км", difficulty: "вище середньої", duration: "2 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/ghijkl", notes: "", image: "https://we.org.ua/wp-content/uploads/2015/03/211.jpg", isTraditional: false }
  ];

  const uniqueGuides = [...new Map(defaultTrips.map(t => [t.guide, { name: t.guide, rating: 4 }])).values()];
  const defaultMembers = uniqueGuides.map((guide, idx) => ({ id: 'm' + (idx + 1), name: guide.name, rating: guide.rating }));

  let trips = [];
  let members = [];
  let editingTripId = null;
  let currentSort = 'date';
  let sortAscending = true;
  let selectedDate = null;
  let flatpickrInstance = null;

  // ========== ДОПОМІЖНІ ФУНКЦІЇ ==========
  function getAllTripDates() {
    const dates = [];
    trips.forEach(trip => {
      if (!trip.date) return;
      const tripDate = trip.date.trim();
      const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;
      if (yyyyMmDd.test(tripDate)) {
        dates.push(tripDate);
      } else {
        const rangePattern = /^(\d{1,2})-(\d{1,2})\.(\d{2})\.(\d{4})$/;
        const match = tripDate.match(rangePattern);
        if (match) {
          let day1 = parseInt(match[1]);
          let day2 = parseInt(match[2]);
          let month = parseInt(match[3]);
          let year = parseInt(match[4]);
          for (let d = day1; d <= day2; d++) {
            let dateStr = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            dates.push(dateStr);
          }
        }
      }
    });
    return [...new Set(dates)];
  }

  function isTripOnDate(trip, dateStr) {
    if (!dateStr) return true;
    if (!trip.date) return false;
    const tripDate = trip.date.trim();
    const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;
    if (yyyyMmDd.test(tripDate)) {
      return tripDate === dateStr;
    }
    const rangePattern = /^(\d{1,2})-(\d{1,2})\.(\d{2})\.(\d{4})$/;
    const match = tripDate.match(rangePattern);
    if (match) {
      let day1 = parseInt(match[1]);
      let day2 = parseInt(match[2]);
      let month = parseInt(match[3]);
      let year = parseInt(match[4]);
      let selected = new Date(dateStr);
      selected.setHours(0,0,0,0);
      let start = new Date(year, month-1, day1);
      let end = new Date(year, month-1, day2);
      start.setHours(0,0,0,0);
      end.setHours(0,0,0,0);
      return selected >= start && selected <= end;
    }
    return false;
  }

  function showNotification(message, isSuccess = true) {
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${escapeHtml(message)}</p>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3500);
  }

  function loadData() {
    try { trips = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : [...defaultTrips]; } catch { trips = [...defaultTrips]; }
    try { members = localStorage.getItem(MEMBERS_KEY) ? JSON.parse(localStorage.getItem(MEMBERS_KEY)) : [...defaultMembers]; } catch { members = [...defaultMembers]; }
  }
  function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(trips)); }
  function saveMembers() { localStorage.setItem(MEMBERS_KEY, JSON.stringify(members)); }

  function sortTrips(tripsArray, sortType, ascending) {
    const sorted = [...tripsArray];
    if (sortType === 'date') {
      sorted.sort((a, b) => {
        const da = a.date || '9999-12-31';
        const db = b.date || '9999-12-31';
        return ascending ? da.localeCompare(db) : db.localeCompare(da);
      });
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

  function initFlatpickr() {
    const input = document.getElementById('dateFilterInput');
    if (!input) return;
    if (typeof flatpickr === 'undefined') {
      setTimeout(initFlatpickr, 500);
      return;
    }
    if (flatpickrInstance) flatpickrInstance.destroy();
    flatpickrInstance = flatpickr(input, {
      dateFormat: "Y-m-d",
      allowInput: false,
      disableMobile: true,
      locale: "uk",
      onChange: function(selectedDates, dateStr) {
        selectedDate = dateStr;
        renderTrips();
      },
      onDayCreate: function(dObj, dStr, fp, dayElem) {
        let year, month, day;
        if (dObj instanceof Date) {
          year = dObj.getFullYear();
          month = String(dObj.getMonth() + 1).padStart(2, '0');
          day = String(dObj.getDate()).padStart(2, '0');
        } else if (dayElem && dayElem.dateObj && dayElem.dateObj instanceof Date) {
          year = dayElem.dateObj.getFullYear();
          month = String(dayElem.dateObj.getMonth() + 1).padStart(2, '0');
          day = String(dayElem.dateObj.getDate()).padStart(2, '0');
        } else {
          return;
        }
        const dateKey = `${year}-${month}-${day}`;
        const allDates = getAllTripDates();
        if (allDates.includes(dateKey)) {
          dayElem.classList.add('has-trip');
        }
      }
    });
    const icon = document.querySelector('.date-filter i');
    if (icon) icon.addEventListener('click', () => flatpickrInstance.open());
  }

  function renderTrips() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    let filtered = [...trips];
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || (t.guide && t.guide.toLowerCase().includes(q)));
    }
    if (selectedDate) {
      filtered = filtered.filter(t => isTripOnDate(t, selectedDate));
    }
    if (currentSort !== 'default') {
      filtered = sortTrips(filtered, currentSort, sortAscending);
    }
    const countSpan = document.getElementById('visibleCount');
    if (countSpan) countSpan.textContent = filtered.length;
    if (!filtered.length) {
      container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-map-signs" style="font-size:3rem; opacity:0.4;"></i><p>Немає маршрутів</p></div>';
      return;
    }
    container.innerHTML = filtered.map(trip => {
      const isCompleted = trip.report && trip.report.includes('виконано');
      const diffClass = `difficulty-${trip.difficulty === 'легка' ? 'легка' : trip.difficulty === 'середня' ? 'середня' : 'вище-середньої'}`;
      const imageUrl = trip.image && trip.image.trim() !== '' ? trip.image : 'https://placehold.co/600x400?text=Немає+фото';
      const mapLink = trip.mapUrl ? `<a href="${trip.mapUrl}" target="_blank" rel="noopener" class="route-link"><i class="fas fa-map-location-dot"></i> Маршрут на карті</a>` : '';
      let mainTitle = trip.title;
      let subTitle = '';
      const parenMatch = trip.title.match(/^(.*?)(\([^)]+\))$/);
      if (parenMatch) {
        mainTitle = parenMatch[1].trim();
        subTitle = parenMatch[2].trim();
      }
      const actionButton = isCompleted
        ? `<span class="completed-badge"><i class="fas fa-check-circle"></i> Вже пройдено</span>`
        : `<button class="join-trip-btn" data-id="${trip.id}" data-title="${escapeHtml(trip.title)}"><i class="fas fa-user-plus"></i> Записатись</button>`;
      const adminButtons = window.isAdmin ? `
        <button class="edit-btn" data-id="${trip.id}"><i class="fas fa-pen"></i></button>
        <button class="delete-btn" data-id="${trip.id}"><i class="fas fa-trash"></i></button>
      ` : '';
      return `
        <div class="trip-card" data-id="${trip.id}">
          <div class="card-image" style="background-image:url('${imageUrl}');"></div>
          <div class="card-content">
            <div class="card-header"><div class="title-main">${escapeHtml(mainTitle)}</div><div class="difficulty-badge ${diffClass}">${trip.difficulty}</div></div>
            ${subTitle ? `<div class="title-sub">${escapeHtml(subTitle)}</div>` : ''}
            <div class="meta-grid"><span><i class="far fa-calendar"></i> ${trip.date || '—'}</span><span><i class="fas fa-arrows-left-right"></i> ${trip.distance}</span><span><i class="far fa-clock"></i> ${trip.duration}</span></div>
            ${mapLink}
            <div class="card-footer"><div class="guide"><i class="fas fa-user-hiking"></i> ${escapeHtml(trip.guide)}</div><div class="card-actions">${actionButton}${adminButtons}</div></div>
          </div>
        </div>`;
    }).join('');
    attachTripEvents();
  }

  function attachTripEvents() {
    // Кнопка "Записатись"
    document.querySelectorAll('.join-trip-btn').forEach(btn => {
      btn.removeEventListener('click', handleJoinClick);
      btn.addEventListener('click', handleJoinClick);
    });
    // Кнопки для адміна
    if (window.isAdmin) {
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.removeEventListener('click', handleEditClick);
        btn.addEventListener('click', handleEditClick);
      });
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.removeEventListener('click', handleDeleteClick);
        btn.addEventListener('click', handleDeleteClick);
      });
    }
  }

  function handleJoinClick(e) {
    e.stopPropagation();
    const btn = e.currentTarget;
    openTripApplyModal(btn.dataset.id, btn.dataset.title);
  }

  function handleEditClick(e) {
    e.stopPropagation();
    openTripModal(e.currentTarget.dataset.id);
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    if (confirm('Видалити маршрут?')) {
      trips = trips.filter(t => t.id !== e.currentTarget.dataset.id);
      saveData();
      renderTrips();
    }
  }

  function openTripApplyModal(tripId, tripTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal" style="max-width: 480px;">
        <div class="modal-header"><h2><i class="fas fa-hiking"></i> Запис на похід</h2><button class="modal-close">&times;</button></div>
        <div class="modal-body" style="padding: 24px;"><p style="margin-bottom: 16px;"><strong>${escapeHtml(tripTitle)}</strong></p>
        <form id="applyTripForm"><div class="form-group"><label>Ім'я та прізвище *</label><input type="text" id="applyName" required placeholder="Іван Петренко"></div>
        <div class="form-group"><label>Телефон *</label><input type="tel" id="applyPhone" required placeholder="+380 50 123 45 67"></div>
        <div class="form-group"><label>Коментар</label><textarea id="applyComment" rows="2"></textarea></div>
        <div class="modal-footer"><button type="button" class="btn-cancel" id="cancelApplyBtn">Скасувати</button><button type="submit" class="btn-submit"><i class="fas fa-paper-plane"></i> Надіслати</button></div></form></div></div>`;
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
      if (!name || !phone) {
        showNotification('Будь ласка, заповніть ім\'я та телефон', false);
        return;
      }
      const apps = JSON.parse(localStorage.getItem(TRIP_APPS_KEY) || '[]');
      apps.push({ id: Date.now(), tripId, tripTitle, userName: name, phone, comment, date: new Date().toLocaleString(), status: 'pending' });
      localStorage.setItem(TRIP_APPS_KEY, JSON.stringify(apps));
      showNotification('✅ Вашу заявку прийнято! Очікуйте зворотного зв\'язку на пошту або телефон.', true);
      closeModal();
    });
  }

  function openLeaderApplyModal(leaderId, leaderName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal" style="max-width: 480px;">
        <div class="modal-header"><h2><i class="fas fa-users"></i> Записатись до лідера</h2><button class="modal-close">&times;</button></div>
        <div class="modal-body" style="padding: 24px;"><p style="margin-bottom: 16px;">Лідер: <strong>${escapeHtml(leaderName)}</strong></p>
        <form id="applyLeaderForm"><div class="form-group"><label>Ім'я та прізвище *</label><input type="text" id="applyLeaderName" required placeholder="Іван Петренко"></div>
        <div class="form-group"><label>Телефон *</label><input type="tel" id="applyLeaderPhone" required placeholder="+380 50 123 45 67"></div>
        <div class="form-group"><label>Коментар</label><textarea id="applyLeaderComment" rows="2"></textarea></div>
        <div class="modal-footer"><button type="button" class="btn-cancel" id="cancelLeaderBtn">Скасувати</button><button type="submit" class="btn-submit">Надіслати</button></div></form></div></div>`;
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
      if (!name || !phone) {
        showNotification('Будь ласка, заповніть ім\'я та телефон', false);
        return;
      }
      const apps = JSON.parse(localStorage.getItem(LEADER_APPS_KEY) || '[]');
      apps.push({ id: Date.now(), leaderId, leaderName, userName: name, phone, comment, date: new Date().toLocaleString(), status: 'pending' });
      localStorage.setItem(LEADER_APPS_KEY, JSON.stringify(apps));
      showNotification('✅ Вашу заявку прийнято! Очікуйте зворотного зв\'язку від лідера.', true);
      closeModal();
    });
  }

  function renderMembers() {
    const container = document.getElementById('membersContainer');
    if (!container) return;
    container.innerHTML = members.map(m => `
      <div class="member-card"><div class="member-name">${escapeHtml(m.name)}</div>
      <div class="member-rating">${'★'.repeat(m.rating)}${'☆'.repeat(5-m.rating)}</div>
      <button class="rating-edit admin-only" data-id="${m.id}" style="${window.isAdmin ? '' : 'display:none'}"><i class="fas fa-star"></i> Змінити рейтинг</button>
      <button class="btn-join-leader" data-id="${m.id}" data-name="${escapeHtml(m.name)}"><i class="fas fa-hand-peace"></i> Записатись до лідера</button></div>
    `).join('');
    if (window.isAdmin) {
      document.querySelectorAll('.rating-edit').forEach(btn => {
        btn.removeEventListener('click', handleRatingEdit);
        btn.addEventListener('click', handleRatingEdit);
      });
    }
    document.querySelectorAll('.btn-join-leader').forEach(btn => {
      btn.removeEventListener('click', handleLeaderJoin);
      btn.addEventListener('click', handleLeaderJoin);
    });
  }

  function handleRatingEdit(e) {
    const newRating = prompt('Новий рейтинг (1-5):');
    if (newRating && newRating >= 1 && newRating <= 5) {
      const member = members.find(m => m.id === e.currentTarget.dataset.id);
      if (member) member.rating = parseInt(newRating);
      saveMembers();
      renderMembers();
    }
  }

  function handleLeaderJoin(e) {
    const btn = e.currentTarget;
    openLeaderApplyModal(btn.dataset.id, btn.dataset.name);
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

  function resetAll() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = '';
      const clearBtn = document.getElementById('clearSearch');
      if (clearBtn) clearBtn.style.display = 'none';
    }
    if (flatpickrInstance) {
      flatpickrInstance.clear();
      selectedDate = null;
    }
    currentSort = 'date';
    sortAscending = true;
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'date';
    const sortDirBtn = document.getElementById('sortDirectionBtn');
    if (sortDirBtn) {
      const icon = sortDirBtn.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-arrow-up-wide-short';
        icon.title = 'За зростанням';
      }
    }
    renderTrips();
  }

  function init() {
    loadData();
    renderTrips();
    renderMembers();
    initFlatpickr();

    if (window.isAdmin) {
      document.getElementById('addTripBtn')?.addEventListener('click', () => openTripModal());
    }
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
        image: document.getElementById('tripImage').value, isTraditional: document.getElementById('tripIsTraditional').checked
      };
      if (editingTripId) { const idx = trips.findIndex(t => t.id === editingTripId); if (idx !== -1) trips[idx] = { ...trips[idx], ...data }; }
      else { trips.push({ id: Date.now().toString(), ...data }); }
      saveData(); renderTrips(); closeTripModal();
    });

    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    if (searchInput) {
      searchInput.addEventListener('input', () => { if (clearSearch) clearSearch.style.display = searchInput.value ? 'flex' : 'none'; renderTrips(); });
    }
    if (clearSearch) clearSearch.addEventListener('click', () => { searchInput.value = ''; clearSearch.style.display = 'none'; renderTrips(); });

    const sortSelect = document.getElementById('sortSelect');
    const sortDirBtn = document.getElementById('sortDirectionBtn');
    if (sortSelect) { sortSelect.addEventListener('change', (e) => { currentSort = e.target.value; renderTrips(); }); }
    if (sortDirBtn) {
      sortDirBtn.addEventListener('click', () => {
        sortAscending = !sortAscending;
        const icon = sortDirBtn.querySelector('i');
        if (sortAscending) { icon.className = 'fas fa-arrow-up-wide-short'; icon.title = 'За зростанням'; }
        else { icon.className = 'fas fa-arrow-down-wide-short'; icon.title = 'За спаданням'; }
        renderTrips();
      });
    }

    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetAll);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m));
  }

  document.addEventListener('DOMContentLoaded', init);
})();