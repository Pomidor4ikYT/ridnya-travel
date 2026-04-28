(function() {
  'use strict';

  const ADMIN_PASSWORD = 'ridnya2026';
  function checkAdmin() {
    const pass = prompt('Введіть пароль адміністратора:');
    return pass === ADMIN_PASSWORD;
  }

  const STORAGE_TRIPS = 'ridnya_trips';
  const STORAGE_BLOG = 'ridnya_blog';
  const STORAGE_GEAR = 'ridnya_gear';
  const STORAGE_ALBUMS = 'ridnya_albums';

  // ========== ДАНІ ЗА ЗАМОВЧУВАННЯМ ==========
  const defaultTrips = [
    { id: '1', title:"г.Маківка 958 м. (з заходом на г.\"Захар Беркут\")", date:"2026-01-01", distance:"8 км", difficulty:"легка", duration:"1 день", guide:"Петро Маковський", report:"виконано", mapUrl:null, notes:"", image:"https://vidviday.ua/storage/media/tour/1321/162495238960dace458b87e-1200x1200.jpg", isTraditional: false },
    { id: '2', title:"г. Пікуй 1408,3 м (старт з с.Білосовиця, або с.Гусне)", date:"2026-02-01", distance:"10 км", difficulty:"легка", duration:"1 день", guide:"Валерій Бурлака", report:"виконано", mapUrl:"https://uk.mapy.cz/s/gurefacuro", notes:"", image:"https://upload.wikimedia.org/wikipedia/commons/0/0c/%D0%9F%D1%96%D1%81%D0%BB%D1%8F_%D0%B3%D1%80%D0%BE%D0%B7%D0%B8.jpg", isTraditional: false },
    { id: '3', title:"г.Лопата 1210,9м., г.Кудрявець 1242м., г.Шаробялка, г.Зелемінь, г.Плішка, г.Даниловець (старт з м.Сколе)", date:"2026-02-15", distance:"16 км", difficulty:"легка", duration:"1 день", guide:"Олег Дашко", report:"", mapUrl:"https://uk.mapy.cz/s/pubadohabo", notes:"", image:"https://vidviday.ua/storage/media/tour/10897/hora-lopata.jpg", isTraditional: true },
    { id: '4', title:"Навколо Славського (Рожанка - В.Верх, Товстий Жолоб- Чорна Ріпа- Дехтовець)", date:"2026-03-01", distance:"21 км", difficulty:"легка", duration:"1-2 дні", guide:"Володимир Коколюс", report:"", mapUrl:"https://mapy.cz/s/dobojobozu", notes:"", image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop", isTraditional: false },
    { id: '5', title:"г.Кукул, г.Велика Козьмеська, г.Говерла, с. Козьмещик, г.Кукул (старт,фініш с.Завоєля)", date:"18-19.04.2026", distance:"35 км", difficulty:"середня", duration:"2-3 дні", guide:"Олег Дашко", report:"", mapUrl:"https://uk.mapy.cz/s/celemebeze", notes:"", image:"https://images.unsplash.com/photo-1542223530-2e2f7b9c1f2b?w=400&h=250&fit=crop", isTraditional: false },
    { id: '6', title:"Цицька, Великий Верх (старт і фініш смт. Воловець)", date:"02-03.05.2026", distance:"24 км", difficulty:"легка", duration:"1-2 дні", guide:"Олег Дашко", report:"", mapUrl:"https://mapy.com/s/cahucugobe", notes:"", image:"https://mashapasha.com/wp-content/uploads/2014/07/progulka-v-karpatah_04.jpg", isTraditional: false },
    { id: '7', title:"г.Ключ 929 м. (старт з с.Труханів, або з с.Кам'янка з заходом на о.Журавлине)", date:"2026-06-01", distance:"10-12 км", difficulty:"легка", duration:"1 день", guide:"Василь Дмитришин", report:"виконано", mapUrl:null, notes:"багато варіантів", image:"https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcDhMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3d6dd0f17b78cba817814f22ed98a274ca5fc794/%D0%B3%D0%BE%D1%80%D0%B0%20%D1%86%D0%B8%D1%86%D1%8C%D0%BA%D0%B0.jpeg", isTraditional: false },
    { id: '8', title:"г. Велика Сивуля 1836,6 м, г. Ігровець 1804,3 м., г. Висока 1803,6 м. (старт з с.Стара Гута)", date:"19-21.06.2026", distance:"40 км", difficulty:"вище середньої", duration:"2-3 дні", guide:"Петро Маковський", report:"", mapUrl:"https://uk.mapy.cz/s/nesopepumu", notes:"", image:"https://upload.wikimedia.org/wikipedia/commons/8/8d/Kljucmontenegro.jpg", isTraditional: false },
    { id: '9', title:"г.Яворина 1131 м.(старт з с.Липа, Похід \"Горами нашої слави\")", date:"11-12.07.2026", distance:"30 км", difficulty:"середня", duration:"2 дні", guide:"Богдан Сидорак", report:"", mapUrl:"https://uk.mapy.cz/s/badepupuvu", notes:"масове сходження", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8qGob0pbOGcj6M4KNu3XszpplZjufAC07nQ&s", isTraditional: true },
    { id: '10', title:"Кичера 2025. (старт з с.Коростів, або м.Сколе, або с.Корчин через водоспад Гуркало, могилу Стрийка, через бункер ГОСП)", date:"", distance:"15-16 км", difficulty:"середня", duration:"2 дні", guide:"Богдан Сидорак", report:"", mapUrl:null, notes:"багато варіантів", image:"https://vpohid.com.ua/static/photos/5111.jpg", isTraditional: true },
    { id: '11', title:"Похід на Близниці (старт і фініш с.Кваси)", date:"01-02.08.2026", distance:"28 км", difficulty:"середня", duration:"2 дні", guide:"Валерій Бурлака", report:"", mapUrl:"https://mapy.com/s/badopogohu", notes:"", image:"https://verkhovyna.life/files/Entertainment/Kvadro_kruvopole/Tour_kuchera/verkhovynalife-kvadrobucoven-2.jpg", isTraditional: false },
    { id: '12', title:"г.Яйко-Ілемське 1680 м. через г.Ґорґан-Ілемський 1587 м.(старт з с.Мислівка)", date:"15-16.08.2026", distance:"30 км", difficulty:"середня", duration:"2 дні", guide:"Валерій Бурлака", report:"", mapUrl:"https://uk.mapy.cz/s/bohevajodo", notes:"", image:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Yaiko-Ilemske_RB.jpg", isTraditional: false },
    { id: '13', title:"Похід по скельних масивах Сколівських Бескидів", date:"26-27.09.2026", distance:"27,5 км", difficulty:"легка", duration:"1-2 дні", guide:"Володимир Коколюс", report:"виконано", mapUrl:"https://uk.mapy.cz/s/galezadaku", notes:"", image:"https://alp.com.ua/content/uploads/images/2021-07-18.jpg", isTraditional: false },
    { id: '14', title:"Пікуяна (старт і фініш - в.Гусне)", date:"", distance:"20 км", difficulty:"легка", duration:"1 день", guide:"Лука Павлюк", report:"", mapUrl:"https://uk.mapy.cz/s/komerovuse", notes:"масове сходження", image:"https://tourinform.org.ua/wp-content/uploads/2018/05/borzava.jpg", isTraditional: false },
    { id: '15', title:"Боржава (старт - Воловець, фініш - Міжгір'я)", date:"", distance:"42 км", difficulty:"середня", duration:"2-3 дні", guide:"Надія Рудик", report:"", mapUrl:"https://uk.mapy.cz/s/hanapetude", notes:"", image:"https://alp.com.ua/content/uploads/images/borzhava%281%29.jpg", isTraditional: false },
    { id: '16', title:"Похід Вододільним хребтом (старт-Сянки, фініш - Біласовиця)", date:"", distance:"38 км", difficulty:"середня", duration:"2-3 дні", guide:"Надія Рудик", report:"", mapUrl:"https://mapy.cz/s/pacamapepe", notes:"", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXO7wHWYN1J-SfJVymDTsTCH0dTAQoNw0Zbw&s", isTraditional: false },
    { id: '17', title:"хребтом Укерня + Аршиця (старт і фініш с.Мислівка)", date:"", distance:"44 км", difficulty:"середня", duration:"2-3 дні", guide:"Надія Рудик", report:"", mapUrl:"https://uk.mapy.cz/s/cekuvecocu", notes:"", image:"https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa3dMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--60e1f186c4456f0063117e98dbf5077fc79602c7/%D0%B0%D1%80%D1%88%D0%B8%D1%86%D1%8F.jpeg", isTraditional: false }
  ];

  const defaultBlog = [
    { id: 'b1', title: 'Як ми підкорили Говерлу взимку', date: '10.01.2026', text: 'Зимове сходження на найвищу точку України — це незабутньо.', image: '' },
    { id: 'b2', title: 'Місцями слави УПА: похід на Маківку', date: '22.02.2026', text: 'Історичний маршрут, який нагадує про героїчне минуле.', image: '' },
    { id: 'b3', title: 'Традиційний весняний похід на Лопату', date: '05.03.2026', text: 'Щороку ми відкриваємо сезон на горі Лопата.', image: '' }
  ];

  const defaultGear = [
    { id: 'g1', title: 'Новий намет Mountain Hardwear', date: '20.04.2026', text: 'Легкий двомісний намет для весняних походів.', image: '' },
    { id: 'g2', title: 'Трекінгові палиці Black Diamond', date: '15.04.2026', text: 'Складані, алюмінієві, з пробковою ручкою.', image: '' }
  ];

  const defaultAlbums = [
    {
      id: 'a1',
      title: 'Схід сонця на Говерлі',
      cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=400&fit=crop'
      ]
    },
    {
      id: 'a2',
      title: 'Привал біля озера',
      cover: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop'
      ]
    }
  ];

  let trips = [], blogPosts = [], gearItems = [], albums = [];
  let editingTripId = null, editingBlogId = null, editingGearId = null, editingAlbumId = null;

  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  }

  function loadData(key, fallback) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [...fallback];
  }
  function saveData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

  // ========== МАРШРУТИ ==========
  const container = document.getElementById('cardsContainer');
  const visibleSpan = document.getElementById('visibleCount');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const addTripBtn = document.getElementById('addTripBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('addTripForm');
  const modalTitle = document.getElementById('modalTitle');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const sortBy = document.getElementById('sortBy');
  let currentFilter = 'all';

  function renderCards() {
    if (!container) return;
    let filtered = trips.filter(t => currentFilter === 'all' || t.difficulty === currentFilter);
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || t.guide.toLowerCase().includes(q));
    }
    if (sortBy && sortBy.value === 'date') {
      filtered.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    } else if (sortBy && sortBy.value === 'difficulty') {
      const order = { 'легка': 1, 'середня': 2, 'вище середньої': 3 };
      filtered.sort((a, b) => (order[a.difficulty] || 0) - (order[b.difficulty] || 0));
    } else if (sortBy && sortBy.value === 'distance') {
      filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }
    if (visibleSpan) visibleSpan.textContent = filtered.length;
    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#0057b7;"><i class="fas fa-map-signs" style="font-size:2.5rem; opacity:0.6;"></i><p>Немає маршрутів</p></div>`;
      return;
    }

    let html = '';
    filtered.forEach(trip => {
      const dateFormatted = trip.date || '—';
      const diffClass = trip.difficulty === 'легка' ? 'difficulty-легка' : (trip.difficulty === 'середня' ? 'difficulty-середня' : 'difficulty-вище');
      const isCompleted = trip.report && trip.report.includes('виконано');
      const mapLink = trip.mapUrl ? `<a href="${trip.mapUrl}" target="_blank" class="route-link"><i class="fas fa-map-location-dot"></i> mapy.cz</a>` : '';
      const titleParsed = trip.title.match(/^(.*?)(\(.*\))$/);
      const mainTitle = titleParsed ? titleParsed[1].trim() : trip.title;
      const subTitle = titleParsed ? titleParsed[2].trim() : '';
      const noteHtml = trip.notes ? `<span class="note-icon"><i class="fas fa-exclamation-circle"></i><span class="tooltip-text">${trip.notes}</span></span>` : '';
      const imageUrl = trip.image || '';

      html += `
        <div class="trip-card" data-id="${trip.id}">
          <div class="card-image" style="background-image: url('${imageUrl}');">${!imageUrl ? '<i class="fas fa-mountain fallback-icon"></i>' : ''}</div>
          <div class="card-content">
            <div class="card-header">
              <div style="flex:1;"><div class="title-main">${mainTitle}</div>${subTitle ? `<div class="title-sub">${subTitle}</div>` : ''}</div>
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
              <div>
                ${isCompleted ? '<span class="completed-badge"><i class="fas fa-check-circle"></i> виконано</span>' : ''}
                ${trip.isTraditional ? '<span class="traditional-badge"><i class="fas fa-leaf"></i> традиційний</span>' : ''}
                ${noteHtml}
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
        saveData(STORAGE_TRIPS, trips);
        renderCards();
      }
    }));
  }

  function openTripModal(id = null) {
    if (id) {
      const trip = trips.find(t => t.id === id);
      if (!trip) return;
      editingTripId = id;
      modalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати маршрут';
      document.getElementById('title').value = trip.title || '';
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
    modalOverlay.classList.add('active');
  }

  function closeTripModal() { modalOverlay.classList.remove('active'); editingTripId = null; }

  if (addTripBtn) addTripBtn.addEventListener('click', () => { if (checkAdmin()) openTripModal(); });
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeTripModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeTripModal);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeTripModal(); });
  if (form) {
    form.addEventListener('submit', (e) => {
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
      saveData(STORAGE_TRIPS, trips);
      renderCards();
      closeTripModal();
    });
  }

  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderCards();
  }));
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearSearch.style.display = searchInput.value ? 'flex' : 'none';
      renderCards();
    });
  }
  if (clearSearch) clearSearch.addEventListener('click', () => { searchInput.value = ''; clearSearch.style.display = 'none'; renderCards(); });
  if (sortBy) sortBy.addEventListener('change', renderCards);

  // ========== БЛОГ ==========
  const blogContainer = document.getElementById('blogContainer');
  const addBlogBtn = document.getElementById('addBlogBtn');
  const blogModalOverlay = document.getElementById('blogModalOverlay');
  const closeBlogModalBtn = document.getElementById('closeBlogModalBtn');
  const cancelBlogBtn = document.getElementById('cancelBlogBtn');
  const blogForm = document.getElementById('addBlogForm');
  const blogModalTitle = document.getElementById('blogModalTitle');

  function renderBlog() {
    if (!blogContainer) return;
    if (blogPosts.length === 0) {
      blogContainer.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fas fa-newspaper" style="font-size:2.5rem;"></i><p>Немає статей</p></div>`;
      return;
    }
    blogContainer.innerHTML = blogPosts.map(post => `
      <article class="blog-card" data-id="${post.id}">
        <div class="blog-card-actions">
          <button class="edit-btn" data-id="${post.id}"><i class="fas fa-pen"></i></button>
          <button class="delete-btn" data-id="${post.id}"><i class="fas fa-trash"></i></button>
        </div>
        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : '<div class="blog-card-img"><i class="fas fa-image"></i></div>'}
        <div class="blog-card-body">
          <span class="blog-date">${post.date || ''}</span>
          <h4>${post.title}</h4>
          <p>${post.text}</p>
          <a href="#">Читати далі →</a>
        </div>
      </article>`).join('');
    document.querySelectorAll('#blogContainer .edit-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin()) openBlogModal(btn.dataset.id); }));
    document.querySelectorAll('#blogContainer .delete-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin() && confirm('Видалити статтю?')) { blogPosts = blogPosts.filter(p => p.id !== btn.dataset.id); saveData(STORAGE_BLOG, blogPosts); renderBlog(); } }));
  }

  function openBlogModal(id = null) {
    if (id) {
      const post = blogPosts.find(p => p.id === id);
      if (!post) return;
      editingBlogId = id;
      blogModalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати статтю';
      document.getElementById('blogTitle').value = post.title;
      document.getElementById('blogDate').value = post.date || '';
      document.getElementById('blogText').value = post.text || '';
      document.getElementById('blogImage').value = post.image || '';
    } else {
      editingBlogId = null;
      blogModalTitle.innerHTML = '<i class="fas fa-newspaper"></i> Нова стаття';
      blogForm.reset();
    }
    blogModalOverlay.classList.add('active');
  }

  function closeBlogModal() { blogModalOverlay.classList.remove('active'); editingBlogId = null; }

  if (addBlogBtn) addBlogBtn.addEventListener('click', () => { if (checkAdmin()) openBlogModal(); });
  if (closeBlogModalBtn) closeBlogModalBtn.addEventListener('click', closeBlogModal);
  if (cancelBlogBtn) cancelBlogBtn.addEventListener('click', closeBlogModal);
  if (blogModalOverlay) blogModalOverlay.addEventListener('click', (e) => { if (e.target === blogModalOverlay) closeBlogModal(); });
  if (blogForm) {
    blogForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('blogTitle').value.trim();
      if (!title) { alert('Заголовок обовʼязковий'); return; }
      const data = {
        title,
        date: document.getElementById('blogDate').value.trim(),
        text: document.getElementById('blogText').value.trim(),
        image: document.getElementById('blogImage').value.trim()
      };
      if (editingBlogId) {
        const idx = blogPosts.findIndex(p => p.id === editingBlogId);
        if (idx !== -1) blogPosts[idx] = { ...blogPosts[idx], ...data };
      } else {
        blogPosts.push({ id: 'b' + Date.now(), ...data });
      }
      saveData(STORAGE_BLOG, blogPosts);
      renderBlog();
      closeBlogModal();
    });
  }

  // ========== СПОРЯДЖЕННЯ (GEAR) ==========
  const gearContainer = document.getElementById('gearContainer');
  const addGearBtn = document.getElementById('addGearBtn');
  const gearModalOverlay = document.getElementById('gearModalOverlay');
  const closeGearModalBtn = document.getElementById('closeGearModalBtn');
  const cancelGearBtn = document.getElementById('cancelGearBtn');
  const gearForm = document.getElementById('addGearForm');
  const gearModalTitle = document.getElementById('gearModalTitle');

  function renderGear() {
    if (!gearContainer) return;
    if (gearItems.length === 0) {
      gearContainer.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fas fa-campground" style="font-size:2.5rem;"></i><p>Немає записів</p></div>`;
      return;
    }
    gearContainer.innerHTML = gearItems.map(item => `
      <article class="blog-card" data-id="${item.id}">
        <div class="blog-card-actions">
          <button class="edit-btn" data-id="${item.id}"><i class="fas fa-pen"></i></button>
          <button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
        </div>
        ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '<div class="blog-card-img"><i class="fas fa-campground"></i></div>'}
        <div class="blog-card-body">
          <span class="blog-date">${item.date || ''}</span>
          <h4>${item.title}</h4>
          <p>${item.text}</p>
        </div>
      </article>`).join('');
    document.querySelectorAll('#gearContainer .edit-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin()) openGearModal(btn.dataset.id); }));
    document.querySelectorAll('#gearContainer .delete-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin() && confirm('Видалити запис?')) { gearItems = gearItems.filter(p => p.id !== btn.dataset.id); saveData(STORAGE_GEAR, gearItems); renderGear(); } }));
  }

  function openGearModal(id = null) {
    if (id) {
      const item = gearItems.find(p => p.id === id);
      if (!item) return;
      editingGearId = id;
      gearModalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати запис';
      document.getElementById('gearTitle').value = item.title;
      document.getElementById('gearDate').value = item.date || '';
      document.getElementById('gearText').value = item.text || '';
      document.getElementById('gearImage').value = item.image || '';
    } else {
      editingGearId = null;
      gearModalTitle.innerHTML = '<i class="fas fa-campground"></i> Новий запис';
      gearForm.reset();
    }
    gearModalOverlay.classList.add('active');
  }

  function closeGearModal() { gearModalOverlay.classList.remove('active'); editingGearId = null; }

  if (addGearBtn) addGearBtn.addEventListener('click', () => { if (checkAdmin()) openGearModal(); });
  if (closeGearModalBtn) closeGearModalBtn.addEventListener('click', closeGearModal);
  if (cancelGearBtn) cancelGearBtn.addEventListener('click', closeGearModal);
  if (gearModalOverlay) gearModalOverlay.addEventListener('click', (e) => { if (e.target === gearModalOverlay) closeGearModal(); });
  if (gearForm) {
    gearForm.addEventListener('submit', (e) => {
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
      saveData(STORAGE_GEAR, gearItems);
      renderGear();
      closeGearModal();
    });
  }

  // ========== АЛЬБОМИ (ГАЛЕРЕЯ) ==========
  const albumContainer = document.getElementById('galleryContainer');
  const addAlbumBtn = document.getElementById('addAlbumBtn');
  const albumModalOverlay = document.getElementById('albumModalOverlay');
  const closeAlbumModalBtn = document.getElementById('closeAlbumModalBtn');
  const cancelAlbumBtn = document.getElementById('cancelAlbumBtn');
  const albumForm = document.getElementById('addAlbumForm');
  const albumModalTitle = document.getElementById('albumModalTitle');

  function renderAlbums() {
    if (!albumContainer) return;
    if (albums.length === 0) {
      albumContainer.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fas fa-folder-open" style="font-size:2.5rem; opacity:0.6;"></i><p>Немає альбомів</p></div>`;
      return;
    }
    albumContainer.innerHTML = albums.map(album => `
      <div class="album-card" data-id="${album.id}">
        <div class="album-cover" style="background-image: url('${album.cover || ''}');">
          ${!album.cover ? '<i class="fas fa-folder"></i>' : ''}
          <button class="delete-btn album-delete" data-id="${album.id}"><i class="fas fa-trash"></i></button>
        </div>
        <div class="album-info">
          <h4>${album.title}</h4>
          <span>${album.photos.length} фото</span>
        </div>
      </div>
    `).join('');

    // Відкриття альбому при кліку на картку (але не на кнопку видалення)
    document.querySelectorAll('.album-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.album-delete')) return;
        const id = card.dataset.id;
        openAlbumView(id);
      });
    });

    // Кнопка видалення альбому
    document.querySelectorAll('.album-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (checkAdmin() && confirm('Видалити альбом?')) {
          albums = albums.filter(a => a.id !== btn.dataset.id);
          saveData(STORAGE_ALBUMS, albums);
          renderAlbums();
        }
      });
    });
  }

  function openAlbumView(id) {
    const album = albums.find(a => a.id === id);
    if (!album) return;
    // Створюємо тимчасове модальне вікно для перегляду фото
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    overlay.innerHTML = `
      <div class="modal" style="max-width: 800px;">
        <div class="modal-header">
          <h2><i class="fas fa-images"></i> ${album.title}</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div style="padding: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          ${album.photos.map(photo => `<img src="${photo}" alt="${album.title}" loading="lazy" style="width: 100%; border-radius: var(--radius);">`).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  function openAlbumModal(id = null) {
    if (id) {
      const album = albums.find(a => a.id === id);
      if (!album) return;
      editingAlbumId = id;
      albumModalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати альбом';
      document.getElementById('albumTitle').value = album.title;
      document.getElementById('albumCover').value = album.cover || '';
      document.getElementById('albumPhotos').value = album.photos.join(', ');
    } else {
      editingAlbumId = null;
      albumModalTitle.innerHTML = '<i class="fas fa-folder"></i> Новий альбом';
      albumForm.reset();
    }
    albumModalOverlay.classList.add('active');
  }

  function closeAlbumModal() { albumModalOverlay.classList.remove('active'); editingAlbumId = null; }

  if (addAlbumBtn) addAlbumBtn.addEventListener('click', () => { if (checkAdmin()) openAlbumModal(); });
  if (closeAlbumModalBtn) closeAlbumModalBtn.addEventListener('click', closeAlbumModal);
  if (cancelAlbumBtn) cancelAlbumBtn.addEventListener('click', closeAlbumModal);
  if (albumModalOverlay) albumModalOverlay.addEventListener('click', (e) => { if (e.target === albumModalOverlay) closeAlbumModal(); });
  if (albumForm) {
    albumForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('albumTitle').value.trim();
      if (!title) { alert('Назва альбому обовʼязкова'); return; }
      const cover = document.getElementById('albumCover').value.trim();
      const photosStr = document.getElementById('albumPhotos').value.trim();
      const photos = photosStr ? photosStr.split(',').map(p => p.trim()).filter(p => p) : [];
      if (photos.length === 0 && !cover) {
        alert('Додайте хоча б одне фото або обкладинку');
        return;
      }
      const data = { title, cover, photos };
      if (editingAlbumId) {
        const idx = albums.findIndex(a => a.id === editingAlbumId);
        if (idx !== -1) albums[idx] = { ...albums[idx], ...data };
      } else {
        albums.push({ id: 'a' + Date.now(), ...data });
      }
      saveData(STORAGE_ALBUMS, albums);
      renderAlbums();
      closeAlbumModal();
    });
  }

  // FAQ акордеон
  document.querySelectorAll('.faq-question').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('open');
    const icon = btn.querySelector('i');
    if (icon) { icon.classList.toggle('fa-chevron-down'); icon.classList.toggle('fa-chevron-up'); }
  }));

  // Контактна форма
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Дякуємо! Ми зв’яжемося з вами.');
    contactForm.reset();
  });

  // Ініціалізація
  trips = loadData(STORAGE_TRIPS, defaultTrips);
  blogPosts = loadData(STORAGE_BLOG, defaultBlog);
  gearItems = loadData(STORAGE_GEAR, defaultGear);
  albums = loadData(STORAGE_ALBUMS, defaultAlbums);

  renderCards();
  renderBlog();
  renderGear();
  renderAlbums();
})();