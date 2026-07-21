// js/gallery.js
(function() {
  'use strict';
  const ENTITY = 'albums';
  let albums = [];
  let editingAlbumId = null;
  let currentPage = 1;
  const ITEMS_PER_PAGE = 6;

const defaultAlbums = [
  { id: 'a1', title: 'Наші мандрівки 2026', cover: '../images/img1.jpg', photos: ['../images/img1.jpg','../images/img2.jpg','../images/img3.jpg','../images/img4.jpg','../images/img5.jpg'], createdAt: Date.now() - 60 * 86400000 }
];

  function loadData() {
    Utils.fetchData(ENTITY).then(data => {
      albums = Array.isArray(data) && data.length ? data : defaultAlbums;
      renderAlbums();
    });
  }

  function saveData() { Utils.saveData(ENTITY, albums); }

  // ========== РЕНДЕРИНГ АЛЬБОМІВ З ПАГІНАЦІЄЮ ==========
  function renderAlbums() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    const totalPages = Math.ceil(albums.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageAlbums = albums.slice(start, start + ITEMS_PER_PAGE);

    if (!pageAlbums.length) {
      container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-folder-open" style="font-size:3rem; opacity:0.4;"></i><p>Немає альбомів</p></div>';
      renderPagination(totalPages);
      return;
    }

    container.innerHTML = pageAlbums.map(album => `
      <div class="album-card" data-id="${album.id}">
        <div class="album-cover" style="background-image:url('${album.cover || ''}');">
          ${!album.cover ? '<i class="fas fa-folder"></i>' : ''}
          <button class="delete-btn album-delete admin-only" data-id="${album.id}" title="Видалити альбом" style="${window.isAdmin ? '' : 'display:none'}"><i class="fas fa-trash"></i></button>
        </div>
        <div class="album-info"><h4>${Utils.escapeHtml(album.title)}</h4><span>${album.photos.length} фото</span></div>
      </div>
    `).join('');

    document.querySelectorAll('.album-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.album-delete')) openAlbumView(card.dataset.id);
      });
    });

    if (window.isAdmin) {
      document.querySelectorAll('.album-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm('Видалити альбом?')) {
            Utils.deleteItem(ENTITY, btn.dataset.id).then(() => loadData());
          }
        });
      });
    }

    renderPagination(totalPages);
  }

  // ========== ПАГІНАЦІЯ ДЛЯ АЛЬБОМІВ ==========
  function renderPagination(totalPages) {
    const existingPagination = document.getElementById('albumPagination');
    if (existingPagination) existingPagination.remove();
    if (totalPages <= 1) return;

    const container = document.createElement('div');
    container.id = 'albumPagination';
    container.className = 'pagination-container';
    container.innerHTML = `
      <button class="page-nav" id="albumPrevPage" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>
      <div class="page-numbers">
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p =>
          `<button class="page-number ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`
        ).join('')}
      </div>
      <button class="page-nav" id="albumNextPage" ${currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>
    `;
    document.querySelector('.albums-grid').parentNode.insertBefore(container, document.querySelector('.albums-grid').nextSibling);

    document.getElementById('albumPrevPage').addEventListener('click', () => {
      if (currentPage > 1) { currentPage--; renderAlbums(); }
    });
    document.getElementById('albumNextPage').addEventListener('click', () => {
      if (currentPage < totalPages) { currentPage++; renderAlbums(); }
    });
    document.querySelectorAll('#albumPagination .page-number').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page);
        renderAlbums();
      });
    });
  }

  // ========== ПЕРЕГЛЯД АЛЬБОМУ (З МОЖЛИВІСТЮ ДОДАВАННЯ/ВИДАЛЕННЯ ФОТО) ==========
  function openAlbumView(albumId) {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;
    const isAdmin = window.isAdmin;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal" style="max-width: 900px; max-height: 85vh;">
        <div class="modal-header"><h2><i class="fas fa-images"></i> ${Utils.escapeHtml(album.title)}</h2><button class="modal-close">&times;</button></div>
        <div class="modal-body" style="padding: 20px; overflow-y: auto; max-height: 60vh;">
          <div style="margin-bottom: 16px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
            ${isAdmin ? `<button id="addPhotoBtn" class="add-trip-btn" style="background:var(--blue); color:white;"><i class="fas fa-plus"></i> Додати фото</button>` : ''}
            ${isAdmin ? `<button id="changeCoverBtn" class="add-trip-btn" style="background:var(--gray-600);"><i class="fas fa-image"></i> Змінити обкладинку</button>` : ''}
            ${isAdmin ? `<input type="file" id="uploadPhotoInput" accept="image/*" style="display:inline-block; padding:6px;"><button id="uploadPhotoBtn" class="add-trip-btn" style="background:var(--blue); color:white; padding:6px 12px;">Завантажити</button>` : ''}
          </div>
          <div id="albumPhotosGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;"></div>
        </div>
        <div class="modal-footer" style="padding: 16px 20px;"><button class="btn-cancel close-modal-btn">Закрити</button></div>
      </div>`;
    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    const grid = modal.querySelector('#albumPhotosGrid');

    function renderPhotos() {
      if (!grid) return;
      grid.innerHTML = album.photos.map((photoUrl, idx) => `
        <div class="photo-item" style="position:relative; border-radius:16px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <img src="${photoUrl}" alt="Фото ${idx+1}" style="width:100%; height:150px; object-fit:cover; display:block;">
          ${isAdmin ? `<div style="position:absolute; top:8px; right:8px; display:flex; gap:6px;">
            <button class="edit-photo-btn" data-index="${idx}" style="background:rgba(255,255,255,0.9); border:none; border-radius:50%; width:30px; height:30px; cursor:pointer;"><i class="fas fa-pen"></i></button>
            <button class="delete-photo-btn" data-index="${idx}" style="background:rgba(255,255,255,0.9); border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; color:red;"><i class="fas fa-trash"></i></button>
          </div>` : ''}
        </div>
      `).join('');

      if (isAdmin) {
        grid.querySelectorAll('.edit-photo-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.index);
            const newUrl = prompt('Введіть новий URL зображення:', album.photos[idx]);
            if (newUrl && newUrl.trim()) {
              album.photos[idx] = newUrl.trim();
              Utils.updateItem(ENTITY, album.id, album).then(() => loadData());
              renderPhotos();
            }
          });
        });
        grid.querySelectorAll('.delete-photo-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Видалити це фото?')) {
              album.photos.splice(parseInt(btn.dataset.index), 1);
              Utils.updateItem(ENTITY, album.id, album).then(() => loadData());
              renderPhotos();
            }
          });
        });
      }
    }
    renderPhotos();

    if (isAdmin) {
      // Додати фото за URL
      modal.querySelector('#addPhotoBtn').addEventListener('click', () => {
        const newUrl = prompt('Введіть URL нового фото:');
        if (newUrl && newUrl.trim()) {
          album.photos.push(newUrl.trim());
          Utils.updateItem(ENTITY, album.id, album).then(() => loadData());
          renderPhotos();
        }
      });

      // Завантажити фото з файлу
      const uploadInput = modal.querySelector('#uploadPhotoInput');
      const uploadBtn = modal.querySelector('#uploadPhotoBtn');
      uploadBtn.addEventListener('click', () => {
        if (!uploadInput.files.length) {
          alert('Виберіть файл');
          return;
        }
        const formData = new FormData();
        formData.append('photo', uploadInput.files[0]);
        fetch('/admin/upload.php', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.files.length) {
            album.photos.push(data.files[0]);
            Utils.updateItem(ENTITY, album.id, album).then(() => loadData());
            renderPhotos();
            alert('Фото завантажено!');
          } else {
            alert('Помилка завантаження');
          }
        })
        .catch(err => {
          alert('Помилка: ' + err.message);
        });
      });

      modal.querySelector('#changeCoverBtn').addEventListener('click', () => {
        const newCover = prompt('Введіть URL нової обкладинки:', album.cover);
        if (newCover && newCover.trim()) {
          album.cover = newCover.trim();
          Utils.updateItem(ENTITY, album.id, album).then(() => loadData());
          renderAlbums();
        }
      });
    }
  }

  function openAlbumModal(id = null) {
    if (!window.isAdmin) return;
    const form = document.getElementById('addAlbumForm');
    const modal = document.getElementById('albumModalOverlay');
    const modalTitle = document.getElementById('albumModalTitle');
    if (!form || !modal) return;
    if (id) {
      const album = albums.find(a => a.id === id);
      if (!album) return;
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

  function closeAlbumModal() {
    document.getElementById('albumModalOverlay').classList.remove('active');
    editingAlbumId = null;
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (window.isAdmin) document.getElementById('addAlbumBtn')?.addEventListener('click', () => openAlbumModal());
    document.getElementById('closeAlbumModalBtn')?.addEventListener('click', closeAlbumModal);
    document.getElementById('cancelAlbumBtn')?.addEventListener('click', closeAlbumModal);
    document.getElementById('albumModalOverlay')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeAlbumModal();
    });
    document.getElementById('addAlbumForm')?.addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('albumTitle').value.trim();
      if (!title) { alert('Назва альбому обовʼязкова'); return; }
      const cover = document.getElementById('albumCover').value.trim();
      const photosStr = document.getElementById('albumPhotos').value.trim();
      const photos = photosStr ? photosStr.split(',').map(p => p.trim()).filter(p => p) : [];
      if (!photos.length && !cover) { alert('Додайте хоча б одне фото або обкладинку'); return; }
      const data = { title, cover, photos, createdAt: Date.now() };
      if (editingAlbumId) {
        Utils.updateItem(ENTITY, editingAlbumId, data).then(() => loadData());
      } else {
        Utils.addItem(ENTITY, data).then(() => loadData());
      }
      closeAlbumModal();
    });
    loadData();
  });
})();