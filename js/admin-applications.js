(function() {
  'use strict';

  const TRIP_APPS_KEY = 'ridnya_trip_applications';
  const LEADER_APPS_KEY = 'ridnya_leader_applications';
  const TEAM_APPS_KEY = 'ridnya_team_applications';

  let tripApps = [], leaderApps = [], teamApps = [];

  function loadData() {
    tripApps = JSON.parse(localStorage.getItem(TRIP_APPS_KEY) || '[]');
    leaderApps = JSON.parse(localStorage.getItem(LEADER_APPS_KEY) || '[]');
    teamApps = JSON.parse(localStorage.getItem(TEAM_APPS_KEY) || '[]');
  }

  function saveTripApps() { localStorage.setItem(TRIP_APPS_KEY, JSON.stringify(tripApps)); }
  function saveLeaderApps() { localStorage.setItem(LEADER_APPS_KEY, JSON.stringify(leaderApps)); }
  function saveTeamApps() { localStorage.setItem(TEAM_APPS_KEY, JSON.stringify(teamApps)); }

  function renderTrips() {
    const tbody = document.getElementById('tripsTableBody');
    if (!tbody) return;
    tbody.innerHTML = tripApps.map(a => `
      <tr>
        <td>${a.date || ''}</td>
        <td>${escapeHtml(a.userName)}</td>
        <td>${escapeHtml(a.phone)}</td>
        <td>${escapeHtml(a.tripTitle)}</td>
        <td>${escapeHtml(a.comment || '—')}</td>
        <td><span class="status-badge status-${a.status || 'pending'}">${getStatusText(a.status)}</span></td>
        <td>
          <button class="action-btn approve" data-id="${a.id}" data-type="trip" data-status="approved">✓</button>
          <button class="action-btn reject" data-id="${a.id}" data-type="trip" data-status="rejected">✗</button>
          <button class="action-btn delete" data-id="${a.id}" data-type="trip">🗑</button>
        </td>
      </tr>
    `).join('');
    attachActions();
  }

  function renderLeaders() {
    const tbody = document.getElementById('leadersTableBody');
    if (!tbody) return;
    tbody.innerHTML = leaderApps.map(a => `
      <tr>
        <td>${a.date || ''}</td>
        <td>${escapeHtml(a.userName)}</td>
        <td>${escapeHtml(a.phone)}</td>
        <td>${escapeHtml(a.leaderName)}</td>
        <td>${escapeHtml(a.comment || '—')}</td>
        <td><span class="status-badge status-${a.status || 'pending'}">${getStatusText(a.status)}</span></td>
        <td>
          <button class="action-btn approve" data-id="${a.id}" data-type="leader" data-status="approved">✓</button>
          <button class="action-btn reject" data-id="${a.id}" data-type="leader" data-status="rejected">✗</button>
          <button class="action-btn delete" data-id="${a.id}" data-type="leader">🗑</button>
        </td>
      </tr>
    `).join('');
    attachActions();
  }

  function renderTeam() {
    const tbody = document.getElementById('teamTableBody');
    if (!tbody) return;
    tbody.innerHTML = teamApps.map(a => `
      <tr>
        <td>${a.date || ''}</td>
        <td>${escapeHtml(a.userName)}</td>
        <td>${escapeHtml(a.phone)}</td>
        <td>${escapeHtml(a.message || '—')}</td>
        <td><span class="status-badge status-${a.status || 'pending'}">${getStatusText(a.status)}</span></td>
        <td>
          <button class="action-btn approve" data-id="${a.id}" data-type="team" data-status="approved">✓</button>
          <button class="action-btn reject" data-id="${a.id}" data-type="team" data-status="rejected">✗</button>
          <button class="action-btn delete" data-id="${a.id}" data-type="team">🗑</button>
        </td>
      </tr>
    `).join('');
    attachActions();
  }

  function getStatusText(s) {
    if (s === 'approved') return 'Прийнято';
    if (s === 'rejected') return 'Відхилено';
    return 'Очікування';
  }

  function attachActions() {
    document.querySelectorAll('.action-btn.approve, .action-btn.reject, .action-btn.delete').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id, type = btn.dataset.type;
        if (btn.classList.contains('approve')) updateStatus(type, id, 'approved');
        else if (btn.classList.contains('reject')) updateStatus(type, id, 'rejected');
        else if (btn.classList.contains('delete') && confirm('Видалити заявку?')) deleteApplication(type, id);
      };
    });
  }

  function updateStatus(type, id, status) {
    if (type === 'trip') {
      let a = tripApps.find(a => a.id == id);
      if (a) a.status = status;
      saveTripApps();
      renderTrips();
    } else if (type === 'leader') {
      let a = leaderApps.find(a => a.id == id);
      if (a) a.status = status;
      saveLeaderApps();
      renderLeaders();
    } else if (type === 'team') {
      let a = teamApps.find(a => a.id == id);
      if (a) a.status = status;
      saveTeamApps();
      renderTeam();
    }
  }

  function deleteApplication(type, id) {
    if (type === 'trip') {
      tripApps = tripApps.filter(a => a.id != id);
      saveTripApps();
      renderTrips();
    } else if (type === 'leader') {
      leaderApps = leaderApps.filter(a => a.id != id);
      saveLeaderApps();
      renderLeaders();
    } else if (type === 'team') {
      teamApps = teamApps.filter(a => a.id != id);
      saveTeamApps();
      renderTeam();
    }
  }

  function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.getElementById(`${tabId}Tab`).style.display = 'block';
    document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.admin-tab[data-tab="${tabId}"]`).classList.add('active');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m] || m));
  }

  function init() {
    // Перевірка прав адміністратора після завантаження DOM
    if (!window.isAdmin) {
      window.location.href = '../index.html';
      return;
    }
    loadData();
    renderTrips();
    renderLeaders();
    renderTeam();
    document.querySelectorAll('.admin-tab').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();