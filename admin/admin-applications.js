// admin/admin-applications.js
(function() {
  'use strict';

  const ENTITIES = {
    trip: 'trip_applications',
    leader: 'leader_applications',
    team: 'team_applications'
  };

  let currentTab = 'trip';
  let currentStatusFilter = 'all';
  let data = { trip: [], leader: [], team: [] };
  let currentPage = 1;
  const ITEMS_PER_PAGE = 8;

  function loadData() {
    const promises = Object.keys(ENTITIES).map(key => Utils.fetchData(ENTITIES[key]));
    Promise.all(promises).then(results => {
      data.trip = Array.isArray(results[0]) ? results[0] : [];
      data.leader = Array.isArray(results[1]) ? results[1] : [];
      data.team = Array.isArray(results[2]) ? results[2] : [];
      renderCurrentTab();
    });
  }

  function saveData() {
    Utils.saveData(ENTITIES.trip, data.trip);
    Utils.saveData(ENTITIES.leader, data.leader);
    Utils.saveData(ENTITIES.team, data.team);
  }

  function updateStatus(type, id, status) {
    const app = data[type].find(a => a.id == id);
    if (app) app.status = status;
    saveData();
    currentPage = 1;
    renderCurrentTab();
  }

  function deleteApplication(type, id) {
    if (!confirm('Видалити заявку?')) return;
    data[type] = data[type].filter(a => a.id != id);
    saveData();
    currentPage = 1;
    renderCurrentTab();
  }

  function clearApplicationsByStatus(type, status) {
    let msg = '';
    if (status === 'all') msg = `⚠️ Ви дійсно хочете ВИДАЛИТИ ВСІ заявки у розділі "${getTabName(type)}"? Цю дію не можна скасувати.`;
    else if (status === 'pending') msg = `⚠️ Видалити ВСІ очікувані заявки у розділі "${getTabName(type)}"?`;
    else if (status === 'approved') msg = `⚠️ Видалити ВСІ прийняті заявки у розділі "${getTabName(type)}"?`;
    else msg = `⚠️ Видалити ВСІ відхилені заявки у розділі "${getTabName(type)}"?`;
    if (!confirm(msg)) return;
    if (status === 'all') {
      data[type] = [];
    } else {
      data[type] = data[type].filter(app => app.status !== status);
    }
    saveData();
    currentPage = 1;
    renderCurrentTab();
  }

  function getTabName(type) {
    if (type === 'trip') return 'Походи';
    if (type === 'leader') return 'До лідерів';
    return 'Команда';
  }

  function getStatusText(status) {
    if (status === 'approved') return 'Прийнято';
    if (status === 'rejected') return 'Відхилено';
    return 'Очікування';
  }

  function getStatusClass(status) {
    if (status === 'approved') return 'approved';
    if (status === 'rejected') return 'rejected';
    return 'pending';
  }

  function filterAppsByStatus(apps) {
    if (currentStatusFilter === 'all') return apps;
    return apps.filter(app => app.status === currentStatusFilter);
  }

  function getShortText(text, maxLength = 80) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '…';
  }

  function openApplicationModal(app) {
    const modal = document.getElementById('applicationModal');
    const titleEl = document.getElementById('modalAppTitle');
    const bodyEl = document.getElementById('modalAppBody');

    let typeLabel = '';
    if (currentTab === 'trip') typeLabel = 'Похід';
    else if (currentTab === 'leader') typeLabel = 'Лідер';
    else typeLabel = 'Команда';

    titleEl.innerHTML = `<i class="fas fa-file-alt"></i> Деталі заявки (${typeLabel})`;

    let detailsHtml = `<div class="modal-app-details">`;
    if (currentTab === 'trip') {
      detailsHtml += `<div class="detail-row"><strong>📅 Дата:</strong> ${app.date || '—'}</div>`;
      detailsHtml += `<div class="detail-row"><strong>👤 Ім'я:</strong> ${Utils.escapeHtml(app.userName)}</div>`;
      detailsHtml += `<div class="detail-row"><strong>📞 Телефон:</strong> ${Utils.escapeHtml(app.phone)}</div>`;
      detailsHtml += `<div class="detail-row"><strong>🥾 Похід:</strong> ${Utils.escapeHtml(app.tripTitle)}</div>`;
      if (app.comment) detailsHtml += `<div class="detail-row"><strong>💬 Коментар:</strong> ${Utils.escapeHtml(app.comment)}</div>`;
    } else if (currentTab === 'leader') {
      detailsHtml += `<div class="detail-row"><strong>📅 Дата:</strong> ${app.date || '—'}</div>`;
      detailsHtml += `<div class="detail-row"><strong>👤 Ім'я:</strong> ${Utils.escapeHtml(app.userName)}</div>`;
      detailsHtml += `<div class="detail-row"><strong>📞 Телефон:</strong> ${Utils.escapeHtml(app.phone)}</div>`;
      detailsHtml += `<div class="detail-row"><strong>👨‍🏫 Лідер:</strong> ${Utils.escapeHtml(app.leaderName)}</div>`;
      if (app.comment) detailsHtml += `<div class="detail-row"><strong>💬 Коментар:</strong> ${Utils.escapeHtml(app.comment)}</div>`;
    } else {
      detailsHtml += `<div class="detail-row"><strong>📅 Дата:</strong> ${app.date || '—'}</div>`;
      detailsHtml += `<div class="detail-row"><strong>👤 Ім'я:</strong> ${Utils.escapeHtml(app.userName)}</div>`;
      detailsHtml += `<div class="detail-row"><strong>✉️ Email:</strong> ${Utils.escapeHtml(app.email)}</div>`;
      if (app.message) detailsHtml += `<div class="detail-row"><strong>💬 Повідомлення:</strong> ${Utils.escapeHtml(app.message)}</div>`;
    }
    detailsHtml += `<div class="detail-row"><strong>🏷️ Статус:</strong> <span class="app-status ${getStatusClass(app.status)}">${getStatusText(app.status)}</span></div>`;
    detailsHtml += `</div>`;

    bodyEl.innerHTML = detailsHtml;
    modal.classList.add('active');
  }

  function closeModal() {
    document.getElementById('applicationModal').classList.remove('active');
  }

  function renderCurrentTab() {
    const container = document.getElementById('applicationsContainer');
    if (!container) return;
    let apps = data[currentTab];
    const filteredApps = filterAppsByStatus(apps);
    const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedApps = filteredApps.slice(start, start + ITEMS_PER_PAGE);

    if (!paginatedApps.length) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>Немає заявок</p></div>';
      renderPagination(totalPages);
      return;
    }

    let html = '';
    paginatedApps.forEach(app => {
      let previewText = '';
      if (currentTab === 'trip' && app.comment) previewText = getShortText(app.comment);
      else if (currentTab === 'leader' && app.comment) previewText = getShortText(app.comment);
      else if (currentTab === 'team' && app.message) previewText = getShortText(app.message);
      else previewText = 'Немає додаткового тексту';

      html += `<div class="app-card" data-id="${app.id}">`;
      html += `<div class="app-card-header">`;
      html += `<div class="app-card-title">${currentTab === 'trip' ? Utils.escapeHtml(app.tripTitle) : (currentTab === 'leader' ? Utils.escapeHtml(app.leaderName) : 'Заявка в команду')}</div>`;
      html += `<span class="app-status ${getStatusClass(app.status)}">${getStatusText(app.status)}</span>`;
      html += `</div>`;

      html += `<div class="app-card-info">`;
      html += `<div class="info-line"><i class="fas fa-user"></i> ${Utils.escapeHtml(app.userName)}</div>`;
      html += `<div class="info-line"><i class="fas fa-phone"></i> ${currentTab === 'team' ? Utils.escapeHtml(app.email) : Utils.escapeHtml(app.phone)}</div>`;
      html += `<div class="info-line"><i class="far fa-calendar-alt"></i> ${app.date || '—'}</div>`;
      if (previewText !== 'Немає додаткового тексту') {
        html += `<div class="info-line preview-text">💬 ${Utils.escapeHtml(previewText)}</div>`;
      }
      html += `</div>`;

      html += `<div class="app-card-actions">`;
      html += `<button class="action-btn view-details" data-id="${app.id}" title="Переглянути деталі"><i class="fas fa-eye"></i> Деталі</button>`;
      if (app.status !== 'approved') {
        html += `<button class="action-btn approve" data-type="${currentTab}" data-id="${app.id}" data-status="approved"><i class="fas fa-check"></i> Прийняти</button>`;
      }
      if (app.status !== 'rejected') {
        html += `<button class="action-btn reject" data-type="${currentTab}" data-id="${app.id}" data-status="rejected"><i class="fas fa-times"></i> Відхилити</button>`;
      }
      html += `<button class="action-btn delete" data-type="${currentTab}" data-id="${app.id}"><i class="fas fa-trash"></i> Видалити</button>`;
      html += `</div>`;

      html += `</div>`;
    });
    container.innerHTML = html;
    attachActions();
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    const container = document.getElementById('paginationContainer');
    if (!container) return;
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }
    let html = '<div class="pagination">';
    html += `<button class="page-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    html += `<button class="page-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>`;
    html += '</div>';
    container.innerHTML = html;

    document.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const page = btn.dataset.page;
        if (page === 'prev') currentPage--;
        else if (page === 'next') currentPage++;
        else currentPage = parseInt(page);
        renderCurrentTab();
      });
    });
  }

  function attachActions() {
    document.querySelectorAll('.view-details').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const app = data[currentTab].find(a => a.id == id);
        if (app) openApplicationModal(app);
      };
    });
    document.querySelectorAll('.action-btn.approve, .action-btn.reject, .action-btn.delete').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const type = btn.dataset.type;
        const id = btn.dataset.id;
        if (btn.classList.contains('approve')) updateStatus(type, id, 'approved');
        else if (btn.classList.contains('reject')) updateStatus(type, id, 'rejected');
        else if (btn.classList.contains('delete')) deleteApplication(type, id);
      };
    });
  }

  function switchTab(tabId) {
    currentTab = tabId;
    currentStatusFilter = 'all';
    currentPage = 1;
    document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.admin-tab[data-tab="${tabId}"]`).classList.add('active');
    document.querySelectorAll('.status-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.status-filter-btn[data-status="all"]').classList.add('active');
    renderCurrentTab();
  }

  function setStatusFilter(status) {
    currentStatusFilter = status;
    currentPage = 1;
    document.querySelectorAll('.status-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.status-filter-btn[data-status="${status}"]`).classList.add('active');
    renderCurrentTab();
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (!window.isAdmin) { window.location.href = '../index.html'; return; }
    loadData();
    document.querySelectorAll('.admin-tab').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
    document.querySelectorAll('.status-filter-btn').forEach(btn => btn.addEventListener('click', () => setStatusFilter(btn.dataset.status)));
    document.querySelectorAll('.clear-category-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); clearApplicationsByStatus(currentTab, btn.dataset.status); }));
    document.getElementById('logoutBtn')?.addEventListener('click', () => { if (window.signOut) signOut(); });
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('closeModalFooterBtn')?.addEventListener('click', closeModal);
    document.getElementById('applicationModal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });
  });
})();