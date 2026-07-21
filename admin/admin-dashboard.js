// admin/admin-dashboard.js
(function() {
  'use strict';

  // ========== СТАН ==========
  let currentTab = 'dashboard';
  let trips = [], blog = [], gear = [], albums = [], reviews = [], faq = [];
  let tripApps = [], leaderApps = [], teamApps = [];
  let editingId = null, editingEntity = null;
  let currentAppTab = 'trip', appStatusFilter = 'all';
  let reviewFilter = 'all';

  // ========== DOM-ЕЛЕМЕНТИ ==========
  const tabs = document.querySelectorAll('[data-tab]');
  const tabContents = document.querySelectorAll('.tab-content');
  const pageTitle = document.getElementById('pageTitle');
  const addBtn = document.getElementById('addBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalSave = document.getElementById('modalSave');
  const modalCancel = document.getElementById('modalCancel');
  const modalClose = document.getElementById('modalClose');

  // ========== ДОПОМІЖНІ ФУНКЦІЇ ==========
  function getEntity(tab) {
    const map = {
      trips: 'trips',
      blog: 'blog',
      gear: 'gear',
      gallery: 'albums',
      reviews: 'reviews',
      faq: 'faq',
      applications: 'trip_applications' // за замовчуванням, але для заявок окремо
    };
    return map[tab] || tab;
  }

  function loadData() {
    Promise.all([
      Utils.fetchData('trips'),
      Utils.fetchData('blog'),
      Utils.fetchData('gear'),
      Utils.fetchData('albums'),
      Utils.fetchData('reviews'),
      Utils.fetchData('faq'),
      Utils.fetchData('trip_applications'),
      Utils.fetchData('leader_applications'),
      Utils.fetchData('team_applications')
    ]).then(([t, b, g, a, r, f, ta, la, tea]) => {
      trips = Array.isArray(t) ? t : [];
      blog = Array.isArray(b) ? b : [];
      gear = Array.isArray(g) ? g : [];
      albums = Array.isArray(a) ? a : [];
      reviews = Array.isArray(r) ? r : [];
      faq = Array.isArray(f) ? f : [];
      tripApps = Array.isArray(ta) ? ta : [];
      leaderApps = Array.isArray(la) ? la : [];
      teamApps = Array.isArray(tea) ? tea : [];
      renderCurrentTab();
      updateStats();
    }).catch(err => {
      console.error('Помилка завантаження даних:', err);
      Utils.showNotification('Помилка завантаження даних', false);
    });
  }

  function updateStats() {
    document.getElementById('statTrips').textContent = trips.length;
    document.getElementById('statBlog').textContent = blog.length;
    document.getElementById('statGallery').textContent = albums.length;
    document.getElementById('statReviews').textContent = reviews.filter(r => r.approved).length;
    document.getElementById('statApplications').textContent = tripApps.length + leaderApps.length + teamApps.length;
  }

  // ========== ПЕРЕМИКАННЯ ВКЛАДОК ==========
  function switchTab(tabId) {
    currentTab = tabId;
    tabs.forEach(el => el.classList.toggle('active', el.dataset.tab === tabId));
    tabContents.forEach(el => el.classList.toggle('active', el.id === 'tab-' + tabId));

    const titles = {
      dashboard: 'Огляд',
      trips: 'Маршрути',
      blog: 'Блог',
      gear: 'Спорядження',
      gallery: 'Галерея',
      reviews: 'Відгуки',
      faq: 'FAQ',
      applications: 'Заявки'
    };
    pageTitle.innerHTML = `<i class="fas fa-${tabId === 'dashboard' ? 'th-large' : tabId === 'trips' ? 'hiking' : tabId === 'blog' ? 'newspaper' : tabId === 'gear' ? 'campground' : tabId === 'gallery' ? 'images' : tabId === 'reviews' ? 'star' : tabId === 'faq' ? 'question-circle' : 'clipboard-list'}"></i> ${titles[tabId] || 'Огляд'}`;
    
    // Показати/сховати кнопку "Додати"
    const showAdd = ['trips', 'blog', 'gear', 'gallery', 'reviews', 'faq'].includes(tabId);
    addBtn.style.display = showAdd ? 'inline-flex' : 'none';
    if (showAdd) {
      addBtn.textContent = ' Додати';
      addBtn.innerHTML = `<i class="fas fa-plus"></i> Додати`;
      addBtn.onclick = () => openAddModal(tabId);
    }

    renderCurrentTab();
  }

  // ========== РЕНДЕРИНГ ==========
  function renderCurrentTab() {
    switch (currentTab) {
      case 'dashboard': break;
      case 'trips': renderTrips(); break;
      case 'blog': renderBlog(); break;
      case 'gear': renderGear(); break;
      case 'gallery': renderGallery(); break;
      case 'reviews': renderReviews(); break;
      case 'faq': renderFaq(); break;
      case 'applications': renderApplications(); break;
    }
  }

  // ========== МАРШРУТИ ==========
  function renderTrips() {
    const container = document.getElementById('tripsList');
    if (!trips.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-hiking"></i>Немає маршрутів</div>';
      return;
    }
    container.innerHTML = trips.map(t => `
      <div class="admin-trip-card">
        <div class="title">${Utils.escapeHtml(t.title)}</div>
        <div class="meta">
          <span>${t.date || '—'}</span>
          <span>${t.difficulty || '—'}</span>
          <span>${t.guide || '—'}</span>
        </div>
        <div class="actions">
          <button class="edit" data-id="${t.id}" data-entity="trips">✏️ Редагувати</button>
          <button class="delete" data-id="${t.id}" data-entity="trips">🗑️ Видалити</button>
        </div>
      </div>
    `).join('');
    container.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', () => openEditModal('trips', btn.dataset.id)));
    container.querySelectorAll('.delete').forEach(btn => btn.addEventListener('click', () => deleteItem('trips', btn.dataset.id)));
  }

  // ========== БЛОГ ==========
  function renderBlog() {
    const container = document.getElementById('blogList');
    if (!blog.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-newspaper"></i>Немає статей</div>';
      return;
    }
    container.innerHTML = blog.map(b => `
      <div class="admin-trip-card">
        <div class="title">${Utils.escapeHtml(b.title)}</div>
        <div class="meta"><span>${b.date || '—'}</span></div>
        <div class="actions">
          <button class="edit" data-id="${b.id}" data-entity="blog">✏️ Редагувати</button>
          <button class="delete" data-id="${b.id}" data-entity="blog">🗑️ Видалити</button>
        </div>
      </div>
    `).join('');
    container.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', () => openEditModal('blog', btn.dataset.id)));
    container.querySelectorAll('.delete').forEach(btn => btn.addEventListener('click', () => deleteItem('blog', btn.dataset.id)));
  }

  // ========== СПОРЯДЖЕННЯ ==========
  function renderGear() {
    const container = document.getElementById('gearList');
    if (!gear.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-campground"></i>Немає записів</div>';
      return;
    }
    container.innerHTML = gear.map(g => `
      <div class="admin-trip-card">
        <div class="title">${Utils.escapeHtml(g.title)}</div>
        <div class="meta"><span>${g.date || '—'}</span></div>
        <div class="actions">
          <button class="edit" data-id="${g.id}" data-entity="gear">✏️ Редагувати</button>
          <button class="delete" data-id="${g.id}" data-entity="gear">🗑️ Видалити</button>
        </div>
      </div>
    `).join('');
    container.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', () => openEditModal('gear', btn.dataset.id)));
    container.querySelectorAll('.delete').forEach(btn => btn.addEventListener('click', () => deleteItem('gear', btn.dataset.id)));
  }

  // ========== ГАЛЕРЕЯ ==========
  function renderGallery() {
    const container = document.getElementById('galleryList');
    if (!albums.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-images"></i>Немає альбомів</div>';
      return;
    }
    container.innerHTML = albums.map(a => `
      <div class="admin-trip-card">
        <div class="title">${Utils.escapeHtml(a.title)}</div>
        <div class="meta"><span>${a.photos ? a.photos.length : 0} фото</span></div>
        <div class="actions">
          <button class="edit" data-id="${a.id}" data-entity="albums">✏️ Редагувати</button>
          <button class="delete" data-id="${a.id}" data-entity="albums">🗑️ Видалити</button>
        </div>
      </div>
    `).join('');
    container.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', () => openEditModal('albums', btn.dataset.id)));
    container.querySelectorAll('.delete').forEach(btn => btn.addEventListener('click', () => deleteItem('albums', btn.dataset.id)));
  }

  // ========== ВІДГУКИ ==========
  function renderReviews() {
    const container = document.getElementById('reviewsList');
    let filtered = reviews;
    if (reviewFilter === 'approved') filtered = reviews.filter(r => r.approved);
    else if (reviewFilter === 'pending') filtered = reviews.filter(r => !r.approved);
    if (!filtered.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-star"></i>Немає відгуків</div>';
      return;
    }
    container.innerHTML = filtered.map(r => `
      <div class="admin-trip-card">
        <div class="title">${Utils.escapeHtml(r.name)} (${r.age} років)</div>
        <div class="meta">
          <span>⭐ ${r.rating}/5</span>
          <span>${r.approved ? '✅ Опубліковано' : '⏳ На модерації'}</span>
        </div>
        <div class="actions">
          ${!r.approved ? `<button class="approve" data-id="${r.id}">✅ Опублікувати</button>` : ''}
          <button class="edit" data-id="${r.id}" data-entity="reviews">✏️ Редагувати</button>
          <button class="delete" data-id="${r.id}" data-entity="reviews">🗑️ Видалити</button>
        </div>
      </div>
    `).join('');
    container.querySelectorAll('.approve').forEach(btn => btn.addEventListener('click', () => approveReview(btn.dataset.id)));
    container.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', () => openEditModal('reviews', btn.dataset.id)));
    container.querySelectorAll('.delete').forEach(btn => btn.addEventListener('click', () => deleteItem('reviews', btn.dataset.id)));
  }

  function approveReview(id) {
    const rev = reviews.find(r => r.id == id);
    if (rev) { rev.approved = true; Utils.saveData('reviews', reviews).then(() => { renderReviews(); updateStats(); }); }
  }

  // ========== FAQ ==========
  function renderFaq() {
    const container = document.getElementById('faqList');
    if (!faq.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-question-circle"></i>Немає питань</div>';
      return;
    }
    container.innerHTML = faq.map(f => `
      <div class="card" style="padding:16px 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
          <strong>${Utils.escapeHtml(f.question)}</strong>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline edit" data-id="${f.id}" data-entity="faq" style="padding:4px 12px;">✏️</button>
            <button class="btn btn-outline delete" data-id="${f.id}" data-entity="faq" style="padding:4px 12px; color:var(--admin-danger);">🗑️</button>
          </div>
        </div>
        <div style="margin-top:8px; font-size:0.9rem; color:#4b5563; background:#f9fafb; padding:12px; border-radius:12px;">${f.answer}</div>
      </div>
    `).join('');
    container.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', () => openEditModal('faq', btn.dataset.id)));
    container.querySelectorAll('.delete').forEach(btn => btn.addEventListener('click', () => deleteItem('faq', btn.dataset.id)));
  }

  // ========== ЗАЯВКИ ==========
  function renderApplications() {
    const container = document.getElementById('applicationsList');
    let apps = [];
    if (currentAppTab === 'trip') apps = tripApps;
    else if (currentAppTab === 'leader') apps = leaderApps;
    else apps = teamApps;

    if (appStatusFilter !== 'all') apps = apps.filter(a => a.status === appStatusFilter);

    if (!apps.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i>Немає заявок</div>';
      document.getElementById('appPagination').innerHTML = '';
      return;
    }

    container.innerHTML = apps.map(app => `
      <div class="app-card">
        <div class="app-card-header">
          <div class="app-card-title">${currentAppTab === 'trip' ? Utils.escapeHtml(app.tripTitle) : currentAppTab === 'leader' ? Utils.escapeHtml(app.leaderName) : 'Заявка в команду'}</div>
          <span class="app-status ${app.status}">${app.status === 'approved' ? 'Прийнято' : app.status === 'rejected' ? 'Відхилено' : 'Очікування'}</span>
        </div>
        <div class="app-card-info">
          <div class="info-line"><i class="fas fa-user"></i> ${Utils.escapeHtml(app.userName)}</div>
          <div class="info-line"><i class="fas fa-phone"></i> ${Utils.escapeHtml(app.phone || app.email || '')}</div>
          <div class="info-line"><i class="far fa-calendar-alt"></i> ${app.date || '—'}</div>
        </div>
        <div class="app-card-actions">
          ${app.status !== 'approved' ? `<button class="action-btn approve" data-id="${app.id}" data-type="${currentAppTab}"><i class="fas fa-check"></i> Прийняти</button>` : ''}
          ${app.status !== 'rejected' ? `<button class="action-btn reject" data-id="${app.id}" data-type="${currentAppTab}"><i class="fas fa-times"></i> Відхилити</button>` : ''}
          <button class="action-btn delete" data-id="${app.id}" data-type="${currentAppTab}"><i class="fas fa-trash"></i> Видалити</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.action-btn.approve').forEach(btn => btn.addEventListener('click', () => updateAppStatus(btn.dataset.type, btn.dataset.id, 'approved')));
    container.querySelectorAll('.action-btn.reject').forEach(btn => btn.addEventListener('click', () => updateAppStatus(btn.dataset.type, btn.dataset.id, 'rejected')));
    container.querySelectorAll('.action-btn.delete').forEach(btn => btn.addEventListener('click', () => deleteApp(btn.dataset.type, btn.dataset.id)));
  }

  function updateAppStatus(type, id, status) {
    let apps = type === 'trip' ? tripApps : type === 'leader' ? leaderApps : teamApps;
    const app = apps.find(a => a.id == id);
    if (app) { app.status = status; Utils.saveData(type === 'trip' ? 'trip_applications' : type === 'leader' ? 'leader_applications' : 'team_applications', apps).then(() => renderApplications()); }
  }

  function deleteApp(type, id) {
    if (!confirm('Видалити заявку?')) return;
    let apps = type === 'trip' ? tripApps : type === 'leader' ? leaderApps : teamApps;
    apps = apps.filter(a => a.id != id);
    Utils.saveData(type === 'trip' ? 'trip_applications' : type === 'leader' ? 'leader_applications' : 'team_applications', apps).then(() => renderApplications());
  }

  // ========== ЗАГАЛЬНІ ОПЕРАЦІЇ ==========
  function deleteItem(entity, id) {
    if (!confirm('Видалити запис?')) return;
    Utils.deleteItem(entity, id).then(() => {
      loadData();
      Utils.showNotification('Видалено', true);
    });
  }

  // ========== ВІДКРИТТЯ МОДАЛЬНИХ ВІКОН ==========
  function openAddModal(tab) {
    editingId = null;
    editingEntity = getEntity(tab);
    let html = '', title = '';
    switch (tab) {
      case 'trips':
        title = 'Новий маршрут';
        html = `
          <div class="form-group"><label>Назва *</label><input type="text" id="f_title" placeholder="Назва маршруту"></div>
          <div class="form-group"><label>Дата</label><input type="date" id="f_date"></div>
          <div class="form-group"><label>Протяжність</label><input type="text" id="f_distance" placeholder="8 км"></div>
          <div class="form-group"><label>Складність</label><select id="f_difficulty"><option value="легка">Легка</option><option value="середня">Середня</option><option value="вище середньої">Вище середньої</option></select></div>
          <div class="form-group"><label>Тривалість</label><input type="text" id="f_duration" placeholder="1 день"></div>
          <div class="form-group"><label>Провідник</label><input type="text" id="f_guide" placeholder="Ім'я провідника"></div>
          <div class="form-group"><label>URL карти</label><input type="url" id="f_mapUrl" placeholder="https://mapy.cz/..."></div>
          <div class="form-group"><label>Примітки</label><textarea id="f_notes" rows="2"></textarea></div>
          <div class="form-group"><label>Історія (HTML)</label><textarea id="f_history" rows="4"></textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" placeholder="https://..."></div>
          <div class="checkbox-group" style="display:flex; gap:16px; flex-wrap:wrap;">
            <label><input type="checkbox" id="f_completed"> Виконано</label>
            <label><input type="checkbox" id="f_traditional"> Традиційний</label>
          </div>
        `;
        break;
      case 'blog':
        title = 'Нова стаття';
        html = `
          <div class="form-group"><label>Заголовок *</label><input type="text" id="f_title" placeholder="Заголовок"></div>
          <div class="form-group"><label>Дата</label><input type="text" id="f_date" placeholder="22.02.2026"></div>
          <div class="form-group"><label>Текст</label><textarea id="f_text" rows="5"></textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" placeholder="https://..."></div>
        `;
        break;
      case 'gear':
        title = 'Новий запис спорядження';
        html = `
          <div class="form-group"><label>Назва *</label><input type="text" id="f_title" placeholder="Назва"></div>
          <div class="form-group"><label>Дата</label><input type="text" id="f_date" placeholder="22.02.2026"></div>
          <div class="form-group"><label>Опис</label><textarea id="f_text" rows="4"></textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" placeholder="https://..."></div>
        `;
        break;
      case 'gallery':
        title = 'Новий альбом';
        html = `
          <div class="form-group"><label>Назва *</label><input type="text" id="f_title" placeholder="Назва альбому"></div>
          <div class="form-group"><label>Обкладинка (URL)</label><input type="url" id="f_cover" placeholder="https://..."></div>
          <div class="form-group"><label>Фото (URL через кому)</label><textarea id="f_photos" rows="3" placeholder="url1, url2, url3..."></textarea></div>
        `;
        break;
      case 'reviews':
        title = 'Новий відгук';
        html = `
          <div class="form-group"><label>Ім'я *</label><input type="text" id="f_name" placeholder="Ім'я"></div>
          <div class="form-group"><label>Вік</label><input type="number" id="f_age" placeholder="28"></div>
          <div class="form-group"><label>Текст *</label><textarea id="f_text" rows="4"></textarea></div>
          <div class="form-group"><label>Рейтинг</label><select id="f_rating"><option value="5">5 зірок</option><option value="4">4 зірки</option><option value="3">3 зірки</option><option value="2">2 зірки</option><option value="1">1 зірка</option></select></div>
          <div class="form-group"><label>Статус</label><select id="f_status"><option value="pending">На модерації</option><option value="approved">Опубліковано</option></select></div>
        `;
        break;
      case 'faq':
        title = 'Нове питання';
        html = `
          <div class="form-group"><label>Питання *</label><input type="text" id="f_question" placeholder="Питання"></div>
          <div class="form-group"><label>Відповідь (HTML) *</label><textarea id="f_answer" rows="5"></textarea></div>
        `;
        break;
      default: return;
    }
    modalTitle.innerHTML = `<i class="fas fa-plus-circle"></i> ${title}`;
    modalBody.innerHTML = html;
    modalOverlay.classList.add('active');
    modalSave.onclick = () => saveItem(tab);
  }

  function openEditModal(entity, id) {
    editingId = id;
    editingEntity = entity;
    let item = null, title = '', html = '';
    const dataMap = { trips, blog, gear, albums, reviews, faq };
    const entMap = { trips: 'trips', blog: 'blog', gear: 'gear', albums: 'albums', reviews: 'reviews', faq: 'faq' };
    const list = dataMap[entity] || [];
    item = list.find(i => i.id == id);
    if (!item) return;

    switch (entity) {
      case 'trips':
        title = 'Редагувати маршрут';
        html = `
          <div class="form-group"><label>Назва *</label><input type="text" id="f_title" value="${Utils.escapeHtml(item.title)}"></div>
          <div class="form-group"><label>Дата</label><input type="date" id="f_date" value="${item.date || ''}"></div>
          <div class="form-group"><label>Протяжність</label><input type="text" id="f_distance" value="${item.distance || ''}"></div>
          <div class="form-group"><label>Складність</label><select id="f_difficulty"><option value="легка" ${item.difficulty==='легка'?'selected':''}>Легка</option><option value="середня" ${item.difficulty==='середня'?'selected':''}>Середня</option><option value="вище середньої" ${item.difficulty==='вище середньої'?'selected':''}>Вище середньої</option></select></div>
          <div class="form-group"><label>Тривалість</label><input type="text" id="f_duration" value="${item.duration || ''}"></div>
          <div class="form-group"><label>Провідник</label><input type="text" id="f_guide" value="${Utils.escapeHtml(item.guide || '')}"></div>
          <div class="form-group"><label>URL карти</label><input type="url" id="f_mapUrl" value="${item.mapUrl || ''}"></div>
          <div class="form-group"><label>Примітки</label><textarea id="f_notes" rows="2">${Utils.escapeHtml(item.notes || '')}</textarea></div>
          <div class="form-group"><label>Історія (HTML)</label><textarea id="f_history" rows="4">${Utils.escapeHtml(item.history || '')}</textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" value="${item.image || ''}"></div>
          <div class="checkbox-group" style="display:flex; gap:16px; flex-wrap:wrap;">
            <label><input type="checkbox" id="f_completed" ${item.report==='виконано'?'checked':''}> Виконано</label>
            <label><input type="checkbox" id="f_traditional" ${item.isTraditional?'checked':''}> Традиційний</label>
          </div>
        `;
        break;
      case 'blog':
        title = 'Редагувати статтю';
        html = `
          <div class="form-group"><label>Заголовок *</label><input type="text" id="f_title" value="${Utils.escapeHtml(item.title)}"></div>
          <div class="form-group"><label>Дата</label><input type="text" id="f_date" value="${item.date || ''}"></div>
          <div class="form-group"><label>Текст</label><textarea id="f_text" rows="5">${Utils.escapeHtml(item.text || '')}</textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" value="${item.image || ''}"></div>
        `;
        break;
      case 'gear':
        title = 'Редагувати запис спорядження';
        html = `
          <div class="form-group"><label>Назва *</label><input type="text" id="f_title" value="${Utils.escapeHtml(item.title)}"></div>
          <div class="form-group"><label>Дата</label><input type="text" id="f_date" value="${item.date || ''}"></div>
          <div class="form-group"><label>Опис</label><textarea id="f_text" rows="4">${Utils.escapeHtml(item.text || '')}</textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" value="${item.image || ''}"></div>
        `;
        break;
      case 'albums':
        title = 'Редагувати альбом';
        html = `
          <div class="form-group"><label>Назва *</label><input type="text" id="f_title" value="${Utils.escapeHtml(item.title)}"></div>
          <div class="form-group"><label>Обкладинка (URL)</label><input type="url" id="f_cover" value="${item.cover || ''}"></div>
          <div class="form-group"><label>Фото (URL через кому)</label><textarea id="f_photos" rows="3">${(item.photos || []).join(', ')}</textarea></div>
        `;
        break;
      case 'reviews':
        title = 'Редагувати відгук';
        html = `
          <div class="form-group"><label>Ім'я *</label><input type="text" id="f_name" value="${Utils.escapeHtml(item.name)}"></div>
          <div class="form-group"><label>Вік</label><input type="number" id="f_age" value="${item.age || ''}"></div>
          <div class="form-group"><label>Текст *</label><textarea id="f_text" rows="4">${Utils.escapeHtml(item.text || '')}</textarea></div>
          <div class="form-group"><label>Рейтинг</label><select id="f_rating"><option value="5" ${item.rating==5?'selected':''}>5 зірок</option><option value="4" ${item.rating==4?'selected':''}>4 зірки</option><option value="3" ${item.rating==3?'selected':''}>3 зірки</option><option value="2" ${item.rating==2?'selected':''}>2 зірки</option><option value="1" ${item.rating==1?'selected':''}>1 зірка</option></select></div>
          <div class="form-group"><label>Статус</label><select id="f_status"><option value="pending" ${!item.approved?'selected':''}>На модерації</option><option value="approved" ${item.approved?'selected':''}>Опубліковано</option></select></div>
        `;
        break;
      case 'faq':
        title = 'Редагувати питання';
        html = `
          <div class="form-group"><label>Питання *</label><input type="text" id="f_question" value="${Utils.escapeHtml(item.question)}"></div>
          <div class="form-group"><label>Відповідь (HTML) *</label><textarea id="f_answer" rows="5">${Utils.escapeHtml(item.answer)}</textarea></div>
        `;
        break;
      default: return;
    }
    modalTitle.innerHTML = `<i class="fas fa-pen"></i> ${title}`;
    modalBody.innerHTML = html;
    modalOverlay.classList.add('active');
    modalSave.onclick = () => saveItem(entity);
  }

  // ========== ЗБЕРЕЖЕННЯ (ADD / UPDATE) ==========
  function saveItem(tab) {
    const entity = getEntity(tab);
    const data = {};
    const fields = document.querySelectorAll('#modalBody input, #modalBody textarea, #modalBody select');
    fields.forEach(el => {
      const id = el.id;
      if (id.startsWith('f_')) {
        const key = id.replace('f_', '');
        if (el.type === 'checkbox') data[key] = el.checked;
        else data[key] = el.value;
      }
    });
    // Спеціальна обробка для деяких полів
    if (tab === 'trips') {
      data.report = data.completed ? 'виконано' : '';
      data.isTraditional = data.traditional || false;
      data.mapUrl = data.mapUrl || null;
      data.distance = data.distance || '? км';
      data.duration = data.duration || '1 день';
      data.guide = data.guide || '—';
      data.createdAt = Date.now();
    }
    if (tab === 'gallery') {
      data.photos = data.photos ? data.photos.split(',').map(s => s.trim()).filter(Boolean) : [];
      data.cover = data.cover || '';
    }
    if (tab === 'reviews') {
      data.approved = data.status === 'approved';
      data.rating = parseInt(data.rating);
      data.age = parseInt(data.age);
      data.createdAt = Date.now();
    }
    // Валідація
    if (!data.title && tab !== 'faq') { alert('Заповніть назву'); return; }
    if (tab === 'faq' && !data.question) { alert('Введіть питання'); return; }
    if (tab === 'faq' && !data.answer) { alert('Введіть відповідь'); return; }
    if (tab === 'reviews' && !data.name) { alert('Введіть ім\'я'); return; }
    if (tab === 'reviews' && !data.text) { alert('Введіть текст відгуку'); return; }

    if (editingId) {
      Utils.updateItem(entity, editingId, data).then(() => {
        closeModal();
        loadData();
        Utils.showNotification('Оновлено', true);
      });
    } else {
      Utils.addItem(entity, data).then(() => {
        closeModal();
        loadData();
        Utils.showNotification('Додано', true);
      });
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    editingId = null;
    editingEntity = null;
  }

  // ========== ІНІЦІАЛІЗАЦІЯ ==========
  document.addEventListener('DOMContentLoaded', function() {
    if (!window.isAdmin) {
      window.location.href = '../index.html';
      return;
    }

    // Вкладки
    tabs.forEach(el => {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        switchTab(this.dataset.tab);
      });
    });

    // Кнопка "Додати"
    addBtn.addEventListener('click', () => {
      const activeTab = document.querySelector('.admin-nav a.active');
      if (activeTab) openAddModal(activeTab.dataset.tab);
    });

    // Модальне вікно
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    // Фільтри відгуків
    document.querySelectorAll('.filter-reviews').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-reviews').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        reviewFilter = this.dataset.filter;
        renderReviews();
      });
    });

    // Фільтри заявок
    document.querySelectorAll('.app-filter').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.app-filter').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        appStatusFilter = this.dataset.status;
        renderApplications();
      });
    });
    document.querySelectorAll('.app-tab').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.app-tab').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentAppTab = this.dataset.tab;
        renderApplications();
      });
    });

    // Вийти
    document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
      e.preventDefault();
      if (window.signOut) signOut();
    });

    // Завантажити дані
    loadData();
  });

  // Робимо switchTab глобальною для виклику з HTML
  window.switchTab = switchTab;
})();