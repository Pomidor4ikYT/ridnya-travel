(function() {
  'use strict';
  const ADMIN_PASSWORD = 'ridnya2026';
  const STORAGE_KEY = 'ridnya_blog';
  const defaultBlog = [
    { id: 'b1', title: 'Як ми підкорили Говерлу взимку', date: '10.01.2026', text: 'Зимове сходження на найвищу точку України — це незабутньо.', image: 'images/img8.jpg' },
    { id: 'b2', title: 'Місцями слави УПА: похід на Маківку', date: '22.02.2026', text: 'Історичний маршрут, який нагадує про героїчне минуле.', image: 'images/img9.jpg' },
    { id: 'b3', title: 'Традиційний весняний похід на Лопату', date: '05.03.2026', text: 'Щороку ми відкриваємо сезон на горі Лопата.', image: 'images/img10.jpg' }
  ];

  let blogPosts = [];
  let editingBlogId = null;

  function loadData() { try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : [...defaultBlog]; } catch { return [...defaultBlog]; } }
  function saveData() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(blogPosts)); } catch(e){} }
  function checkAdmin() { return prompt('Введіть пароль адміністратора:') === ADMIN_PASSWORD; }

  function renderBlog() {
    const container = document.getElementById('blogContainer');
    if (!container) return;
    if (!blogPosts.length) { container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-newspaper" style="font-size:3rem; opacity:0.4; display:block; margin-bottom:16px;"></i><p>Немає статей</p></div>'; return; }
    container.innerHTML = blogPosts.map(post => `
      <article class="blog-card" data-id="${post.id}">
        <div class="blog-card-actions">
          <button class="edit-btn" data-id="${post.id}"><i class="fas fa-pen"></i></button>
          <button class="delete-btn" data-id="${post.id}"><i class="fas fa-trash"></i></button>
        </div>
        ${post.image ? `<img src="${post.image}" alt="${post.title}" loading="lazy">` : '<div class="blog-card-img"><i class="fas fa-image"></i></div>'}
        <div class="blog-card-body">
          <span class="blog-date">${post.date || ''}</span>
          <h4>${post.title}</h4>
          <p>${post.text || ''}</p>
          <a href="javascript:void(0)">Читати далі →</a>
        </div>
      </article>`).join('');
    document.querySelectorAll('#blogContainer .edit-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin()) openBlogModal(btn.dataset.id); }));
    document.querySelectorAll('#blogContainer .delete-btn').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); if (checkAdmin() && confirm('Видалити статтю?')) { blogPosts = blogPosts.filter(p => p.id !== btn.dataset.id); saveData(); renderBlog(); } }));
  }

  function openBlogModal(id = null) {
    const form = document.getElementById('addBlogForm');
    const modal = document.getElementById('blogModalOverlay');
    const modalTitle = document.getElementById('blogModalTitle');
    if (!form || !modal) return;
    if (id) {
      const post = blogPosts.find(p => p.id === id); if (!post) return;
      editingBlogId = id;
      modalTitle.innerHTML = '<i class="fas fa-pen"></i> Редагувати статтю';
      document.getElementById('blogTitle').value = post.title;
      document.getElementById('blogDate').value = post.date || '';
      document.getElementById('blogText').value = post.text || '';
      document.getElementById('blogImage').value = post.image || '';
    } else {
      editingBlogId = null;
      modalTitle.innerHTML = '<i class="fas fa-newspaper"></i> Нова стаття';
      form.reset();
    }
    modal.classList.add('active');
  }

  function closeBlogModal() { document.getElementById('blogModalOverlay').classList.remove('active'); editingBlogId = null; }

  function init() {
    blogPosts = loadData();
    renderBlog();
    document.getElementById('addBlogBtn')?.addEventListener('click', () => { if (checkAdmin()) openBlogModal(); });
    document.getElementById('closeBlogModalBtn')?.addEventListener('click', closeBlogModal);
    document.getElementById('cancelBlogBtn')?.addEventListener('click', closeBlogModal);
    document.getElementById('blogModalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeBlogModal(); });
    document.getElementById('addBlogForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('blogTitle').value.trim();
      if (!title) { alert('Заголовок обовʼязковий'); return; }
      const data = { title, date: document.getElementById('blogDate').value.trim(), text: document.getElementById('blogText').value.trim(), image: document.getElementById('blogImage').value.trim() };
      if (editingBlogId) { const idx = blogPosts.findIndex(p => p.id === editingBlogId); if (idx !== -1) blogPosts[idx] = { ...blogPosts[idx], ...data }; }
      else { blogPosts.push({ id: 'b' + Date.now(), ...data }); }
      saveData(); renderBlog(); closeBlogModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();