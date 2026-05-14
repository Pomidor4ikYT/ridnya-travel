// js/blog.js
(function() {
  'use strict';
  const ADMIN_PASSWORD = 'ridnya2026';
  const STORAGE_KEY = 'ridnya_blog';

  // ========== БЕЗПЕЧНЕ ОЧИЩЕННЯ HTML (виправлена версія без помилок) ==========
  function sanitizeHtml(str) {
    if (!str) return '';
    const allowedTags = ['b', 'strong', 'i', 'em', 'a', 'br', 'p', 'ul', 'ol', 'li', 'h3', 'h4', 'h5', 'span', 'blockquote'];
    const allowedAttrs = ['href', 'target', 'rel'];
    
    const temp = document.createElement('div');
    temp.innerHTML = str;
    
    // Отримуємо всі елементи в порядку зверху вниз (щоб не ламати ітерацію)
    const allElements = [...temp.querySelectorAll('*')];
    for (let el of allElements) {
      const tag = el.tagName.toLowerCase();
      // Якщо тег не дозволений – розгортаємо його вміст
      if (!allowedTags.includes(tag)) {
        const parent = el.parentNode;
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
        continue;
      }
      // Очищаємо атрибути
      const attrs = [...el.attributes];
      for (let attr of attrs) {
        if (!allowedAttrs.includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      }
      // Для посилань додаємо target="_blank"
      if (tag === 'a' && el.getAttribute('href')) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    }
    return temp.innerHTML;
  }

  function stripHtml(html) {
    if (!html) return '';
    let tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m));
  }

  // ========== ДАНІ З КРАСИВИМИ ФОТО (з Unsplash) ==========
  const defaultBlog = [
    {
      id: 'b1',
      title: '❄️ Як ми підкорили Говерлу взимку',
      date: '10.01.2026',
      text: `<p><strong>Зимове сходження на найвищу точку України</strong> — це справжнє випробування сили духу та фізичної витривалості. 10 січня 2026 року наша команда з 12 учасників вирушила підкорювати <strong>Говерлу (2061 м)</strong>.</p>
      <h3>Підготовка до походу</h3>
      <p>За тиждень до старту ми провели обов'язковий інструктаж. Кожен учасник отримав список необхідного спорядження:</p>
      <ul><li>Термобілизна (верх і низ)</li><li>Флісова куртка середньої товщини</li><li>Пуховик або синтетична куртка</li><li>Вітро-вологозахисна куртка (Gore-Tex)</li><li>Трекінгові палиці з широкими кільцями</li><li>Гамаки для сидіння</li><li>Термос об'ємом не менше 1 літра</li><li>Ліхтарик, запасні батарейки</li></ul>
      <p>Особливу подяку хочемо висловити <a href="trips.html" target="_blank">інструктору Івану</a>, який має 10-річний досвід зимових сходжень.</p>
      <h3>Хроніка сходження</h3>
      <p><strong>06:00</strong> — виїзд зі Стрия.<br><strong>09:30</strong> — початок маршруту з села Лазещина. Температура -12°C.<br><strong>11:45</strong> — полонина, гарячий чай.<br><strong>13:20</strong> — фінішна пряма, глибина снігу 80 см.<br><strong>14:00</strong> — ВЕРШИНА! Провели 45 хвилин, сотні фото.</p>
      <blockquote>«Коли стоїш на найвищій точці країни, розумієш, що немає нічого неможливого.» — Олег</blockquote>
      <h3>Підсумки та поради</h3>
      <ol><li>Не економте на взутті.</li><li>Рухайтеся повільно, але впевнено.</li><li>Беріть запасні рукавиці та шкарпетки.</li><li>Пийте гарячі напої кожні 40 хвилин.</li></ol>
      <p>Детальний звіт на <a href="https://www.youtube.com/channel/UCr67AbASZGqx4RefbKaIRSQ" target="_blank">YouTube</a> та <a href="https://www.facebook.com/bfridnya" target="_blank">Facebook</a>. До зустрічі на вершинах!</p>`,
      image: 'https://images.unsplash.com/photo-1587923623987-9e6f3d8c2b8f?w=800'
    },
    {
      id: 'b2',
      title: '🇺🇦 Місцями слави УПА: похід на Маківку',
      date: '22.02.2026',
      text: `<p><strong>Історичний маршрут на гору Маківка (958 м)</strong> — подорож у часі. Тут у травні 1915 року точилися бої легіону Українських Січових Стрільців, а в роки Другої світової війни — база УПА.</p>
      <h3>Що ми побачили</h3>
      <ul><li>Меморіал «Маківка»</li><li>Військові окопи та бліндажі</li><li>Каплиця Святого Архистратига Михаїла</li><li>Музей просто неба — реконструкція землянки</li></ul>
      <p>Провідник <strong>Петро Маковський</strong> розповів про сотника «Бурлаку» та зв'язок УПА з місцевими жителями.</p>
      <h3>Вшанування пам'яті</h3>
      <p>Провели літію, поклали квіти, співали «Ой у лузі червона калина». Потім — традиційний стрілецький обід.</p>
      <blockquote>«Пам'ять робить нас сильними. Поки ми пам'ятаємо героїв — Україна житиме.» — Володимир</blockquote>
      <h3>Як підготуватися</h3>
      <ul><li>Зручне трекінгове взуття</li><li>Дощовик</li><li>Фотоапарат</li><li>Вода та перекус</li><li>Нотатник для історій</li></ul>
      <p>Запрошуємо на наступний похід «Стежками УПА на <strong>Яйко-Ілемське</strong>». Реєстрація на сторінці <a href="contacts.html" target="_blank">Контакти</a>. Візьміть синьо-жовтий прапор!</p>`,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    },
    {
      id: 'b3',
      title: '🌸 Весняний похід на Лопату',
      date: '05.03.2026',
      text: `<p><strong>Лопата (1210,9 м)</strong> — улюблена гора для відкриття сезону. Цього року до нас приєдналося <strong>25 нових учасників</strong> — рекорд!</p>
      <h3>Чому варто йти навесні</h3>
      <ul><li>Перші квіти (підсніжники, крокуси)</li><li>М'яке сонце (+10..+15°C)</li><li>Немає натовпів</li><li>Соковите повітря</li></ul>
      <p>Підйом 2,5 год. На вершині — пікнік із домашньою випічкою та трав'яним чаєм.</p>
      <blockquote>«Весняна Лопата — це побачення з природою після довгої зими.» — Олена</blockquote>
      <h3>Поради</h3>
      <ol><li>Багатошаровий одяг</li><li>Дощовик навіть у сонце</li><li>Фотоапарат для квітів</li><li>Трекінгові палиці</li><li>Запас води 1,5 л</li></ol>
      <p>Більше фото в альбомі <a href="gallery.html" target="_blank">«Наші мандрівки 2026»</a>. Наступного тижня — похід на <strong>Кукул</strong>!</p>`,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
    },
    {
      id: 'b4',
      title: '🎒 Огляд нового спорядження: що купити цієї весни',
      date: '18.03.2026',
      text: `<p>Час оновити спорядження! Тестували новинки 2026 року.</p>
      <h3>1. Рюкзак Osprey Kestrel 48L</h3>
      <p>Відмінна вентиляція спини, кріплення льодоруба. Об'єм 48 л на 2-3 дні.</p>
      <h3>2. Черевики Salomon X Ultra 4 GTX</h3>
      <p>Gore-Tex, підошва Contagrip — сухі ноги та жодних мозолів.</p>
      <h3>3. Фільтр Katadyn BeFree 1L</h3>
      <p>Пийте з будь-якого струмка за 30 секунд. Вага 80 г.</p>
      <p>У наступному огляді — намети та спальники. Пишіть у <a href="contacts.html" target="_blank">контактну форму</a> для групової закупівлі зі знижкою.</p>`,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'
    }
  ];

  let blogPosts = [];
  let editingBlogId = null;

  function loadData() { try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : [...defaultBlog]; } catch { return [...defaultBlog]; } }
  function saveData() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(blogPosts)); } catch(e){} }
  function checkAdmin() { return prompt('Введіть пароль адміністратора:') === ADMIN_PASSWORD; }

  // ========== МОДАЛКА ДЛЯ ПОВНОГО ТЕКСТУ ==========
  function openBlogDetailsModal(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    const { title, date, text, image } = post;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
      <div class="modal blog-detail-modal" style="max-width: 850px;">
        <div class="modal-header">
          <h2><i class="fas fa-newspaper"></i> ${escapeHtml(title)}</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body" style="padding: 0 28px 28px 28px;">
          ${date ? `<div class="blog-detail-date"><i class="far fa-calendar-alt"></i> ${escapeHtml(date)}</div>` : ''}
          ${image ? `<div class="blog-detail-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy"></div>` : ''}
          <div class="blog-detail-content">
            ${sanitizeHtml(text)}
          </div>
        </div>
        <div class="modal-footer" style="padding: 16px 28px; border-top: 1px solid var(--gray-200);">
          <button class="btn-cancel close-modal-btn">Закрити</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const closeModal = () => overlay.remove();
    overlay.querySelector('.modal-close').addEventListener('click', closeModal);
    overlay.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  }

  // ========== РЕНДЕР БЛОГУ ==========
  function renderBlog() {
    const container = document.getElementById('blogContainer');
    if (!container) return;
    if (!blogPosts.length) {
      container.innerHTML = '<div style="text-align:center; padding:50px;"><i class="fas fa-newspaper" style="font-size:3rem; opacity:0.4;"></i><p>Немає статей</p></div>';
      return;
    }
    container.innerHTML = blogPosts.map(post => {
      const shortText = stripHtml(post.text || '').substring(0, 130) + (stripHtml(post.text || '').length > 130 ? '...' : '');
      return `
      <article class="blog-card" data-id="${post.id}">
        <div class="blog-card-actions">
          <button class="edit-btn" data-id="${post.id}"><i class="fas fa-pen"></i></button>
          <button class="delete-btn" data-id="${post.id}"><i class="fas fa-trash"></i></button>
        </div>
        ${post.image ? `<img src="${post.image}" alt="${post.title}" loading="lazy">` : '<div class="blog-card-img"><i class="fas fa-image"></i></div>'}
        <div class="blog-card-body">
          <span class="blog-date">${post.date || ''}</span>
          <h4>${escapeHtml(post.title)}</h4>
          <p>${escapeHtml(shortText)}</p>
          <a href="#" class="read-more-link" data-id="${post.id}">Читати далі →</a>
        </div>
      </article>`;
    }).join('');

    // Делегування подій
    container.onclick = (e) => {
      const editBtn = e.target.closest('.edit-btn');
      if (editBtn) {
        e.stopPropagation();
        if (checkAdmin()) openBlogModal(editBtn.dataset.id);
        return;
      }
      const deleteBtn = e.target.closest('.delete-btn');
      if (deleteBtn) {
        e.stopPropagation();
        if (checkAdmin() && confirm('Видалити статтю?')) {
          blogPosts = blogPosts.filter(p => p.id !== deleteBtn.dataset.id);
          saveData();
          renderBlog();
        }
        return;
      }
      const readMoreLink = e.target.closest('.read-more-link');
      if (readMoreLink) {
        e.preventDefault();
        e.stopPropagation();
        openBlogDetailsModal(readMoreLink.dataset.id);
      }
    };
  }

  // ========== МОДАЛКА ДЛЯ ДОДАВАННЯ/РЕДАГУВАННЯ ==========
  function openBlogModal(id = null) {
    const form = document.getElementById('addBlogForm');
    const modal = document.getElementById('blogModalOverlay');
    const modalTitle = document.getElementById('blogModalTitle');
    if (!form || !modal) return;
    if (id) {
      const post = blogPosts.find(p => p.id === id);
      if (!post) return;
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

  function closeBlogModal() {
    document.getElementById('blogModalOverlay').classList.remove('active');
    editingBlogId = null;
  }

  // ========== ІНІЦІАЛІЗАЦІЯ ==========
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
      saveData();
      renderBlog();
      closeBlogModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();