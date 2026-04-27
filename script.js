(function() {
  'use strict';

  // ===== Ключі localStorage =====
  const STORAGE_KEY_TRIPS = 'ridnya_trips';
  const STORAGE_KEY_BLOG = 'ridnya_blog';

  // ===== Дані маршрутів (за замовчуванням) =====
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
    {
      id: 'b1',
      title: 'Як ми підкорили Говерлу взимку',
      date: '10.01.2026',
      text: 'Зимове сходження на найвищу точку України — це незабутньо. Ділимось враженнями та порадами.',
      image: ''
    },
    {
      id: 'b2',
      title: 'Місцями слави УПА: похід на Маківку',
      date: '22.02.2026',
      text: 'Історичний маршрут, який нагадує про героїчне минуле. Фото та враження.',
      image: ''
    },
    {
      id: 'b3',
      title: 'Традиційний весняний похід на Лопату',
      date: '05.03.2026',
      text: 'Щороку ми відкриваємо сезон на горі Лопата. Приєднуйтесь!',
      image: ''
    }
  ];

  // ===== ЗМІННІ =====
  let trips = [];
  let blogPosts = [];
  let editingTripId = null;
  let editingBlogId = null;
  let currentFilter = 'all';

  // ===== DOM-елементи (загальні) =====
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  // ===== МОБІЛЬНЕ МЕНЮ =====
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (mainNav.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  }

  // ===== ЛОГІКА МАРШРУТІВ =====
  const container = document.getElementById('cardsContainer');
  const visibleSpan = document.getElementById('visibleCount');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const addTripBtn = document.getElementById('addTripBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('addTripForm');
  const modalTitle = document.getElementById('modalTitle');

  function loadTrips() {
    const stored = localStorage.getItem(STORAGE_KEY_TRIPS);
    trips = stored ? JSON.parse(stored) : [...defaultTrips];
    if (!stored) saveTrips();
  }

  function saveTrips() {
    localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(trips));
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    let formatted = dateStr.replace(/\//g, '.');
    if (formatted.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const parts = formatted.split('-');
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return formatted;
  }

  function renderCards() {
    if (!container) return;
    const filtered = trips.filter(t => currentFilter === 'all' || t.difficulty === currentFilter);
    if (visibleSpan) visibleSpan.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#0057b7;"><i class="fas fa-map-signs" style="font-size:2.5rem; opacity:0.6;"></i><p>Немає маршрутів</p></div>`;
      return;
    }

    let html = '';
    filtered.forEach(trip => {
      const dateFormatted = formatDate(trip.date);
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
          <div class="card-image" style="background-image: url('${imageUrl}');">
            ${!imageUrl ? '<i class="fas fa-mountain fallback-icon"></i>' : ''}
          </div>
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

    document.querySelectorAll('#cardsContainer .edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditTripModal(btn.dataset.id);
      });
    });

    document.querySelectorAll('#cardsContainer .delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Ви впевнені, що хочете видалити цей маршрут?')) {
          trips = trips.filter(t => t.id !== btn.dataset.id);
          saveTrips();
          renderCards();
        }
      });
    });
  }

  function openEditTripModal(id) {
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
    if (modalOverlay) modalOverlay.classList.add('active');
  }

  function openAddTripModal() {
    editingTripId = null;
    modalTitle.innerHTML = '<i class="fas fa-mountain"></i> Новий маршрут';
    if (form) form.reset();
    document.getElementById('difficulty').value = 'легка';
    if (modalOverlay) modalOverlay.classList.add('active');
  }

  function closeTripModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    editingTripId = null;
  }

  if (addTripBtn) addTripBtn.addEventListener('click', openAddTripModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeTripModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeTripModal);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeTripModal(); });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      if (!title) { alert('Назва маршруту обовʼязкова'); return; }

      const tripData = {
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
        const index = trips.findIndex(t => t.id === editingTripId);
        if (index !== -1) trips[index] = { ...trips[index], ...tripData };
      } else {
        trips.push({ id: Date.now().toString(), ...tripData });
      }
      saveTrips();
      renderCards();
      closeTripModal();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderCards();
    });
  });

  // ===== ЛОГІКА БЛОГУ =====
  const blogContainer = document.getElementById('blogContainer');
  const addBlogBtn = document.getElementById('addBlogBtn');
  const blogModalOverlay = document.getElementById('blogModalOverlay');
  const closeBlogModalBtn = document.getElementById('closeBlogModalBtn');
  const cancelBlogBtn = document.getElementById('cancelBlogBtn');
  const blogForm = document.getElementById('addBlogForm');
  const blogModalTitle = document.getElementById('blogModalTitle');

  function loadBlog() {
    const stored = localStorage.getItem(STORAGE_KEY_BLOG);
    blogPosts = stored ? JSON.parse(stored) : [...defaultBlog];
    if (!stored) saveBlog();
  }

  function saveBlog() {
    localStorage.setItem(STORAGE_KEY_BLOG, JSON.stringify(blogPosts));
  }

  function renderBlog() {
    if (!blogContainer) return;
    if (blogPosts.length === 0) {
      blogContainer.innerHTML = `<div style="text-align:center; padding:40px; color:#0057b7;"><i class="fas fa-newspaper" style="font-size:2.5rem; opacity:0.6;"></i><p>Немає статей</p></div>`;
      return;
    }

    let html = '';
    blogPosts.forEach(post => {
      const imageHtml = post.image
        ? `<img src="${post.image}" alt="${post.title}" style="width:100%; height:160px; object-fit:cover;">`
        : `<div class="blog-card-img"><i class="fas fa-image"></i></div>`;

      html += `
        <article class="blog-card" data-id="${post.id}">
          <div class="blog-card-actions">
            <button class="edit-btn" data-id="${post.id}" title="Редагувати"><i class="fas fa-pen"></i></button>
            <button class="delete-btn" data-id="${post.id}" title="Видалити"><i class="fas fa-trash"></i></button>
          </div>
          ${imageHtml}
          <div class="blog-card-body">
            <span class="blog-date">${post.date || ''}</span>
            <h4>${post.title}</h4>
            <p>${post.text}</p>
            <a href="#">Читати далі →</a>
          </div>
        </article>
      `;
    });

    blogContainer.innerHTML = html;

    document.querySelectorAll('#blogContainer .edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditBlogModal(btn.dataset.id);
      });
    });

    document.querySelectorAll('#blogContainer .delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Видалити цю статтю?')) {
          blogPosts = blogPosts.filter(p => p.id !== btn.dataset.id);
          saveBlog();
          renderBlog();
        }
      });
    });
  }

  function openAddBlogModal() {
    editingBlogId = null;
    blogModalTitle.innerHTML = '<i class="fas fa-newspaper"></i> Нова стаття';
    if (blogForm) blogForm.reset();
    if (blogModalOverlay) blogModalOverlay.classList.add('active');
  }

  function openEditBlogModal(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;
    editingBlogId = id;
    blogModalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати статтю';
    document.getElementById('blogTitle').value = post.title || '';
    document.getElementById('blogDate').value = post.date || '';
    document.getElementById('blogText').value = post.text || '';
    document.getElementById('blogImage').value = post.image || '';
    if (blogModalOverlay) blogModalOverlay.classList.add('active');
  }

  function closeBlogModal() {
    if (blogModalOverlay) blogModalOverlay.classList.remove('active');
    editingBlogId = null;
  }

  if (addBlogBtn) addBlogBtn.addEventListener('click', openAddBlogModal);
  if (closeBlogModalBtn) closeBlogModalBtn.addEventListener('click', closeBlogModal);
  if (cancelBlogBtn) cancelBlogBtn.addEventListener('click', closeBlogModal);
  if (blogModalOverlay) blogModalOverlay.addEventListener('click', (e) => { if (e.target === blogModalOverlay) closeBlogModal(); });
 
  // Закриття по Escape для обох модалок
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (blogModalOverlay && blogModalOverlay.classList.contains('active')) {
      closeBlogModal();
    } else if (modalOverlay && modalOverlay.classList.contains('active')) {
      closeTripModal();
    }
  }
});

  if (blogForm) {
    blogForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('blogTitle').value.trim();
      if (!title) { alert('Заголовок обовʼязковий'); return; }

      const postData = {
        title,
        date: document.getElementById('blogDate').value.trim(),
        text: document.getElementById('blogText').value.trim(),
        image: document.getElementById('blogImage').value.trim()
      };

      if (editingBlogId) {
        const index = blogPosts.findIndex(p => p.id === editingBlogId);
        if (index !== -1) blogPosts[index] = { ...blogPosts[index], ...postData };
      } else {
        blogPosts.push({ id: 'b' + Date.now().toString(), ...postData });
      }
      saveBlog();
      renderBlog();
      closeBlogModal();
    });
  }

  // ===== FAQ акордеон =====
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('open');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
      }
    });
  });

  // ===== Контактна форма =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Дякуємо! Ми зв’яжемося з вами найближчим часом.');
      contactForm.reset();
    });
  }

  // ===== ІНІЦІАЛІЗАЦІЯ =====
  loadTrips();
  renderCards();
  loadBlog();
  renderBlog();
})();