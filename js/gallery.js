(function() {
  'use strict';
  const ADMIN_PASSWORD = 'ridnya2026';
  const STORAGE_KEY = 'ridnya_albums';
  const defaultAlbums = [
    { id: 'a1', title: 'Наші мандрівки 2026', cover: 'images/img1.jpg', photos: ['images/img1.jpg','images/img2.jpg','images/img3.jpg','images/img4.jpg','images/img5.jpg'] }
  ];

  let albums = [];
  let editingAlbumId = null;

  function loadData() { try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : [...defaultAlbums]; } catch { return [...defaultAlbums]; } }
  function saveData() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(albums)); } catch(e){} }
  function checkAdmin() { return prompt('Введіть пароль адміністратора:') === ADMIN_PASSWORD; }

  function renderAlbums() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    if (!albums.length) { container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-folder-open" style="font-size:3rem; opacity:0.4; display:block; margin-bottom:16px;"></i><p>Немає альбомів</p></div>'; return; }
    container.innerHTML = albums.map(album => `
      <div class="album-card" data-id="${album.id}">
        <div class="album-cover" style="background-image:url('${album.cover || ''}');">
          ${!album.cover ? '<i class="fas fa-folder"></i>' : ''}
          <button class="delete-btn album-delete" data-id="${album.id}"><i class="fas fa-trash"></i></button>
        </div>
        <div class="album-info"><h4>${album.title}</h4><span>${album.photos.length} фото</span></div>
      </div>`).join('');
    document.querySelectorAll('.album-card').forEach(card => card.addEventListener('click', (e) => { if (e.target.closest('.album-delete')) return; openAlbumView(card.dataset.id); }));
    document.querySelectorAll('.album-delete').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin() && confirm('Видалити альбом?')) { albums = albums.filter(a => a.id !== btn.dataset.id); saveData(); renderAlbums(); } }));
  }

  function openAlbumView(id) {
    const album = albums.find(a => a.id === id); if (!album) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `<div class="modal" style="max-width:800px;"><div class="modal-header"><h2><i class="fas fa-images"></i> ${album.title}</h2><button class="modal-close">&times;</button></div><div style="padding:16px; display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px;">${album.photos.map(photo => `<img src="${photo}" alt="${album.title}" loading="lazy" style="width:100%; border-radius:8px;">`).join('')}</div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  function openAlbumModal(id = null) {
    const form = document.getElementById('addAlbumForm');
    const modal = document.getElementById('albumModalOverlay');
    const modalTitle = document.getElementById('albumModalTitle');
    if (!form || !modal) return;
    if (id) {
      const album = albums.find(a => a.id === id); if (!album) return;
      editingAlbumId = id;
      modalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати альбом';
      document.getElementById('albumTitle').value = album.title;
      document.getElementById('albumCover').value = album.cover || '';
      document.getElementById('albumPhotos').value = album.photos.join(', ');
    } else {
      editingAlbumId = null;
      modalTitle.innerHTML = '<i class="fas fa-folder"></i> Новий альбом';
      form.reset();
    }
    modal.classList.add('active');
  }

  function closeAlbumModal() { document.getElementById('albumModalOverlay').classList.remove('active'); editingAlbumId = null; }

  function init() {
    albums = loadData();
    renderAlbums();
    document.getElementById('addAlbumBtn')?.addEventListener('click', () => { if (checkAdmin()) openAlbumModal(); });
    document.getElementById('closeAlbumModalBtn')?.addEventListener('click', closeAlbumModal);
    document.getElementById('cancelAlbumBtn')?.addEventListener('click', closeAlbumModal);
    document.getElementById('albumModalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeAlbumModal(); });
    document.getElementById('addAlbumForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('albumTitle').value.trim(); if (!title) { alert('Назва альбому обовʼязкова'); return; }
      const cover = document.getElementById('albumCover').value.trim();
      const photosStr = document.getElementById('albumPhotos').value.trim();
      const photos = photosStr ? photosStr.split(',').map(p => p.trim()).filter(p => p) : [];
      if (!photos.length && !cover) { alert('Додайте хоча б одне фото або обкладинку'); return; }
      const data = { title, cover, photos };
      if (editingAlbumId) { const idx = albums.findIndex(a => a.id === editingAlbumId); if (idx !== -1) albums[idx] = { ...albums[idx], ...data }; }
      else { albums.push({ id: 'a' + Date.now(), ...data }); }
      saveData(); renderAlbums(); closeAlbumModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();