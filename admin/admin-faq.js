// admin/admin-faq.js
(function() {
  const ENTITY = 'faq';
  let faqItems = [];
  let editingId = null;

  const defaultFaq = [
    { id: 'f1', question: 'Правила туристичного клубу «Рідня»', answer: `<p><strong>1. Добровільне членство.</strong> Участь у походах є добровільною. Кожен учасник самостійно оцінює свою фізичну підготовку та стан здоров'я.</p><p><strong>2. Безпека.</strong> Учасник зобов'язаний дотримуватися вказівок провідника, не відставати від групи, мати базове спорядження (зручне взуття, одяг за погодою, воду, перекус, ліхтарик).</p><p><strong>3. Екологія.</strong> Забороняється залишати сміття, ламати дерева, розводити багаття без дозволу. Ми практикуємо принцип «Не залишай слідів».</p><p><strong>4. Взаємоповага.</strong> У клубі заборонені образи, конфлікти, політичні або релігійні суперечки. Підтримуємо дружню атмосферу.</p><p><strong>5. Відповідальність.</strong> Клуб не несе відповідальності за травми, отримані внаслідок недотримання правил безпеки або власної необережності.</p><p><strong>6. Благодійність.</strong> Участь у походах безкоштовна, але ми заохочуємо добровільні внески на підтримку ЗСУ та розвиток клубу.</p><p><strong>7. Фото та відео.</strong> Погоджуючись на похід, ви даєте згоду на використання ваших світлин у соціальних мережах клубу.</p><p><strong>8. Скасування.</strong> Про неможливість участі потрібно повідомити організатора не пізніше ніж за 2 дні до старту.</p>` },
    { id: 'f2', question: 'Як приєднатися до клубу?', answer: '<p>Просто зв\'яжіться з нами через форму на сторінці <a href="../contacts.html">Контакти</a> або напишіть у соцмережі (Facebook, Instagram). Ми додамо вас до чату учасників. Жодних вступних внесків – достатньо бажання мандрувати!</p>' },
    { id: 'f3', question: 'Який рівень підготовки потрібен?', answer: '<p>У нас є маршрути різної складності: від легких прогулянок (до 10 км, перепад висот до 300 м) до серйозних вершин (понад 2000 м, 20+ км). Початківцям радимо починати з легких маршрутів. Головне – мати базову фізичну форму та не мати медичних протипоказань.</p>' },
    { id: 'f4', question: 'Що брати з собою?', answer: '<p><strong>Обов\'язково:</strong> зручне трекінгове взуття, рюкзак, дощовик, вода (1-1,5 л), перекус (енергетичні батончики, горіхи, бутерброди), ліхтарик, заряджений телефон.<br><strong>За бажанням:</strong> трекінгові палиці, термос, аптечка, фотоапарат, запасні шкарпетки, головний убір.</p>' },
    { id: 'f5', question: 'Чи є благодійні внески?', answer: '<p>Походи <strong>безкоштовні</strong>. Однак ми раді будь-яким добровільним внескам на потреби ЗСУ або розвиток клубу (придбання спорядження, маркування стежок). Реквізити для підтримки – на сторінці <a href="../contacts.html">Контакти</a>.</p>' },
    { id: 'f6', question: 'Як дістатися до місця старту?', answer: '<p>Зазвичай учасники добираються власним транспортом або організовують спільне авто (карпулінг). Ми публікуємо координати GPS та орієнтири. Для деяких маршрутів можна домовитися про трансфер зі Стрия чи Львова.</p>' },
    { id: 'f7', question: 'Чи можна з собакою?', answer: '<p>Так, але попередньо повідомте організатора. Собака має бути на повідку, керованим та не агресивним до інших учасників. Господар забирає екскременти та відповідає за поведінку тварини.</p>' },
    { id: 'f8', question: 'Як часто проводяться походи?', answer: '<p>Зазвичай 2-3 походи на місяць (переважно у вихідні). Влітку частіше, взимку – рідше. Слідкуйте за розкладом на сторінці <a href="../trips.html">Маршрути</a> або в наших соцмережах.</p>' }
  ];

  function loadFaq() {
    Utils.fetchData(ENTITY).then(data => {
      faqItems = Array.isArray(data) && data.length ? data : defaultFaq;
      renderFaq();
    });
  }

  function saveFaq() { Utils.saveData(ENTITY, faqItems); }

  function renderFaq() {
    const container = document.getElementById('faqList');
    if (!container) return;
    if (!faqItems.length) { container.innerHTML = '<div class="card">Немає питань. Додайте перше.</div>'; return; }
    container.innerHTML = faqItems.map(item => `
      <div class="card" data-id="${item.id}">
        <div class="faq-item-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
          <div class="faq-item-question" style="font-weight:700; font-size:1.1rem;">${Utils.escapeHtml(item.question)}</div>
          <div class="faq-item-actions" style="display:flex; gap:8px;">
            <button class="icon-btn edit-faq" data-id="${item.id}" style="background:white; border:1px solid #e2e8f0; border-radius:12px; width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer;"><i class="fas fa-pen"></i></button>
            <button class="icon-btn delete-faq" data-id="${item.id}" style="background:white; border:1px solid #e2e8f0; border-radius:12px; width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer;"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="faq-item-answer" style="background:#f8fafc; padding:16px; border-radius:16px;">${item.answer}</div>
      </div>
    `).join('');
    document.querySelectorAll('.edit-faq').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.id)));
    document.querySelectorAll('.delete-faq').forEach(btn => btn.addEventListener('click', () => { if (confirm('Видалити питання?')) { faqItems = faqItems.filter(i => i.id !== btn.dataset.id); saveFaq(); renderFaq(); } }));
  }

  function openModal(id = null) {
    editingId = id;
    const modal = document.getElementById('faqModal');
    const title = document.getElementById('modalTitle');
    if (id) {
      const item = faqItems.find(i => i.id === id);
      if (!item) return;
      title.innerHTML = '<i class="fas fa-pen"></i> Редагувати питання';
      document.getElementById('faqQuestion').value = item.question;
      document.getElementById('faqAnswer').value = item.answer;
    } else {
      title.innerHTML = '<i class="fas fa-plus-circle"></i> Нове питання';
      document.getElementById('faqQuestion').value = '';
      document.getElementById('faqAnswer').value = '';
    }
    modal.style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('faqModal').style.display = 'none';
    editingId = null;
  }

  function saveQuestion() {
    const q = document.getElementById('faqQuestion').value.trim();
    const a = document.getElementById('faqAnswer').value.trim();
    if (!q || !a) { alert('Заповніть обидва поля'); return; }
    if (editingId) {
      const idx = faqItems.findIndex(i => i.id === editingId);
      if (idx !== -1) { faqItems[idx].question = q; faqItems[idx].answer = a; }
    } else {
      faqItems.push({ id: Date.now().toString(), question: q, answer: a });
    }
    saveFaq();
    renderFaq();
    closeModal();
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (!window.isAdmin) { window.location.href = '../index.html'; return; }
    loadFaq();
    document.getElementById('addQuestionBtn').addEventListener('click', () => openModal());
    document.getElementById('saveQuestionBtn').addEventListener('click', saveQuestion);
    document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
    document.getElementById('faqModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
    document.getElementById('logoutBtn').addEventListener('click', () => window.signOut && window.signOut());
  });
})();