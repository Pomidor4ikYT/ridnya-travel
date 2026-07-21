// admin/admin.js
(function() {
  'use strict';

  // ========== СТАН ==========
  let currentTab = 'trips';
  let data = {
    trips: [],
    blog: [],
    albums: [],
    contacts: [],
    gear: [],
    faq: [],
    reviews: [],
    members: []
  };
  let editingId = null;
  let editingEntity = null;

  // Пагінація
  let currentPage = 1;
  const ITEMS_PER_PAGE = 10;

  // Маппінг вкладок
  const TAB_CONFIG = {
    trips:   { entity: 'trips',   label: 'Маршрути', icon: 'fa-hiking' },
    blog:    { entity: 'blog',    label: 'Блог', icon: 'fa-newspaper' },
    gallery: { entity: 'albums',  label: 'Галерея', icon: 'fa-images' },
    contacts: { entity: 'contacts', label: 'Контакти', icon: 'fa-address-card' },
    gear:    { entity: 'gear',    label: 'Спорядження', icon: 'fa-campground' },
    faq:     { entity: 'faq',     label: 'FAQ', icon: 'fa-question-circle' },
    reviews: { entity: 'reviews', label: 'Відгуки', icon: 'fa-star' },
    team:    { entity: 'members', label: 'Команда', icon: 'fa-users' }
  };

  // ==================== ДЕФОЛТНІ ДАНІ ====================
  // 17 маршрутів (повністю з trips.js)
  const DEFAULT_TRIPS = [
    { id: '1', title: "г.Маківка 958 м. (з заходом на г.\"Захар Беркут\")", date: "2026-01-01", distance: "8 км", difficulty: "легка", duration: "1 день", guide: "Петро Маковський", report: "виконано", mapUrl: null, notes: "", image: "https://vidviday.ua/storage/media/tour/1321/162495238960dace458b87e-1200x1200.jpg", isTraditional: false, createdAt: Date.now() - 60 * 86400000, history: "" },
    { id: '2', title: "г. Пікуй 1408,3 м (старт з с.Білосовиця, або с.Гусне)", date: "2026-02-01", distance: "10 км", difficulty: "легка", duration: "1 день", guide: "Валерій Бурлака", report: "виконано", mapUrl: "https://uk.mapy.cz/s/gurefacuro", notes: "", image: "https://alp.com.ua/content/uploads/images/pkui-2.jpeg", isTraditional: false, createdAt: Date.now() - 50 * 86400000, history: "" },
    { id: '3', title: "г.Лопата 1210,9м., г.Кудрявець 1242м. (старт з м.Сколе)", date: "2026-02-15", distance: "16 км", difficulty: "легка", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/pubadohabo", notes: "", image: "https://skolebeskydy-park.in.ua/wp-content/uploads/2023/01/SAM_4941-scaled.jpg", isTraditional: true, createdAt: Date.now() - 45 * 86400000, history: "" },
    { id: '4', title: "Навколо Славського (Рожанка - В.Верх)", date: "2026-03-01", distance: "21 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "", mapUrl: "https://mapy.cz/s/dobojobozu", notes: "", image: "https://mashapasha.com/wp-content/uploads/2014/11/slavskoe_peshkom_2.jpg", isTraditional: false, createdAt: Date.now() - 40 * 86400000, history: "" },
    { id: '5', title: "г.Кукул, г.Велика Козьмеська, г.Говерла (старт с.Завоєля)", date: "18-19.04.2026", distance: "35 км", difficulty: "середня", duration: "2-3 дні", guide: "Олег Дашко", report: "", mapUrl: "https://uk.mapy.cz/s/celemebeze", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e9a7a5897607f1f82ebbdb0a2b775a64c0557823/%D0%B3%D0%BE%D0%B2%D0%B5%D1%80%D0%BB%D0%B0-%D0%B3%D0%BE%D1%80%D0%B0.jpeg", isTraditional: false, createdAt: Date.now() - 30 * 86400000, history: "" },
    { id: '6', title: "Цицька, Великий Верх (старт і фініш смт. Воловець)", date: "02-03.05.2026", distance: "24 км", difficulty: "легка", duration: "1-2 дні", guide: "Олег Дашко", report: "", mapUrl: "https://mapy.com/s/cahucugobe", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb01NIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5333777e4ca98cbb8a305bc015cd6a4f0264a9c6/%D0%B2%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B8%CC%86%20%D0%B2%D0%B5%D1%80%D1%85.jpeg", isTraditional: false, createdAt: Date.now() - 25 * 86400000, history: "" },
    { id: '7', title: "г.Ключ 929 м. (старт з с.Труханів)", date: "2026-06-01", distance: "10-12 км", difficulty: "легка", duration: "1 день", guide: "Василь Дмитришин", report: "", mapUrl: null, notes: "багато варіантів", image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Kljucmontenegro.jpg", isTraditional: false, createdAt: Date.now() - 20 * 86400000, history: "" },
    { id: '8', title: "г. Велика Сивуля 1836,6 м, г. Ігровець (старт с.Стара Гута)", date: "19-21.06.2026", distance: "40 км", difficulty: "вище середньої", duration: "2-3 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/nesopepumu", notes: "", image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/%D0%94%D0%BE%D1%80%D0%BE%D0%B3%D0%B0_%D0%BD%D0%B0_%D0%A1%D0%B8%D0%B2%D1%83%D0%BB%D1%96.jpg", isTraditional: false, createdAt: Date.now() - 15 * 86400000, history: "" },
    { id: '9', title: "г.Яворина 1131 м. (Похід \"Горами нашої слави\")", date: "11-12.07.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: "https://uk.mapy.cz/s/badepupuvu", notes: "масове сходження", image: "https://vpohid.com.ua/static/photos/5111.jpg", isTraditional: true, createdAt: Date.now() - 10 * 86400000, history: "" },
    { id: '10', title: "Кичера 2025. (через водоспад Гуркало)", date: "", distance: "15-16 км", difficulty: "середня", duration: "2 дні", guide: "Богдан Сидорак", report: "", mapUrl: null, notes: "багато варіантів", image: "https://hatarizba.com.ua/wp-content/uploads/2018/01/biloberizka-gora-kychera-3.jpg", isTraditional: true, createdAt: Date.now() - 5 * 86400000, history: "" },
    { id: '11', title: "Похід на Близниці (старт і фініш с.Кваси)", date: "01-02.08.2026", distance: "28 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.com/s/badopogohu", notes: "", image: "https://karpaty.love/uploads/posts/2018-02/1519386501_blyznytsia-22.jpg", isTraditional: false, createdAt: Date.now() - 3 * 86400000, history: "" },
    { id: '12', title: "г.Яйко-Ілемське 1680 м. (старт з с.Мислівка)", date: "15-16.08.2026", distance: "30 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://uk.mapy.cz/s/bohevajodo", notes: "", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Yaiko-Ilemske_RB.jpg", isTraditional: false, createdAt: Date.now() - 2 * 86400000, history: "" },
    { id: '13', title: "Скельні масиви Сколівських Бескидів", date: "26-27.09.2026", distance: "27,5 км", difficulty: "легка", duration: "1-2 дні", guide: "Володимир Коколюс", report: "", mapUrl: "https://uk.mapy.cz/s/galezadaku", notes: "", image: "https://kuluarpohod.com/wp-content/uploads/2024/05/800x_mg_8988rer-800x600.jpg", isTraditional: false, createdAt: Date.now() - 1 * 86400000, history: "" },
    { id: '14', title: "Пікуяна (старт і фініш - в.Гусне)", date: "", distance: "20 км", difficulty: "легка", duration: "1 день", guide: "Лука Павлюк", report: "", mapUrl: "https://uk.mapy.cz/s/komerovuse", notes: "масове сходження", image: "https://tourinform.org.ua/wp-content/uploads/2018/05/borzava.jpg", isTraditional: false, createdAt: Date.now() - 0.5 * 86400000, history: "" },
    { id: '15', title: "г.Менчул 1501 м (з с.Лумшори)", date: "2026-10-10", distance: "18 км", difficulty: "середня", duration: "1 день", guide: "Олег Дашко", report: "", mapUrl: null, notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c65672302195e2a6e189640c86537f701723caaf/menchul.jpg", isTraditional: false, createdAt: Date.now() - 0.3 * 86400000, history: "" },
    { id: '16', title: "хр.Писаний Камінь (з с.Буковець)", date: "2026-11-01", distance: "22 км", difficulty: "середня", duration: "2 дні", guide: "Валерій Бурлака", report: "", mapUrl: "https://mapy.cz/s/abcdef", notes: "", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaE1HIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e6822aedcc48f9d43803b6128544171730e1f7dd/%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%BD%D0%B8%D0%B8%CC%86-%D0%BA%D0%B0%D0%BC%D1%96%D0%BD%D1%8C.jpeg", isTraditional: false, createdAt: Date.now() - 0.1 * 86400000, history: "" },
    { id: '17', title: "г.Петрос 2020 м (з с.Кваси)", date: "2026-12-05", distance: "26 км", difficulty: "вище середньої", duration: "2 дні", guide: "Петро Маковський", report: "", mapUrl: "https://uk.mapy.cz/s/ghijkl", notes: "", image: "https://we.org.ua/wp-content/uploads/2015/03/211.jpg", isTraditional: false, createdAt: Date.now() - 0.05 * 86400000, history: "" }
  ];

  const DEFAULT_DATA = {
    trips: DEFAULT_TRIPS,
    blog: [
      { id: 'b1', title: '❄️ Як ми підкорили Говерлу взимку', date: '10.01.2026', text: 'Зимове сходження на найвищу точку України...', image: 'https://splav.lviv.ua/foto/big/hoverla-winter.jpg', createdAt: Date.now() - 30 * 86400000 },
      { id: 'b2', title: '🇺🇦 Місцями слави УПА: похід на Маківку', date: '22.02.2026', text: 'Історичний маршрут на гору Маківка...', image: 'https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdG9DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--21c10b132ed3f73f42821cd909e65e11a3e64592/%D0%B3%D0%BE%D1%80%D0%B0-%D0%BC%D0%B0%D0%BA%D1%96%D0%B2%D0%BA%D0%B0-%D0%BC%D0%B5%D0%BC%D0%BE%D1%80%D1%96%D0%B0%D0%BB.jpeg', createdAt: Date.now() - 20 * 86400000 },
      { id: 'b3', title: '🌸 Весняний похід на Лопату', date: '05.03.2026', text: 'Лопата (1210,9 м) — улюблена гора для відкриття сезону...', image: 'https://vidviday.ua/storage/media/tour/10897/hora-lopata.jpg', createdAt: Date.now() - 10 * 86400000 },
      { id: 'b4', title: '🎒 Огляд нового спорядження: що купити цієї весни', date: '18.03.2026', text: 'Час оновити спорядження! Тестували новинки 2026 року...', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', createdAt: Date.now() - 5 * 86400000 }
    ],
    albums: [
      { id: 'a1', title: 'Наші мандрівки 2026', cover: '../images/img1.jpg', photos: ['../images/img1.jpg','../images/img2.jpg','../images/img3.jpg'], createdAt: Date.now() - 15 * 86400000 }
    ],
    contacts: [
      { id: 'c1', address: 'м. Стрий, вул. Незалежності, 8', phone: '+380 50 370 16 40', email: 'mgastryi2026@gmail.com', facebook: 'https://www.facebook.com/bfridnya', instagram: 'https://www.instagram.com/fond_ridnya', youtube: 'https://www.youtube.com/channel/UCr67AbASZGqx4RefbKaIRSQ', createdAt: Date.now() - 100 * 86400000 }
    ],
    gear: [
      { id: 'g1', title: 'Намет Mountain Hardwear Strato', date: '20.04.2026', text: 'Легкий двомісний намет...', image: 'https://propohody.com/wp-content/uploads/2025/02/%D0%97%D0%B0%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D0%BA%D0%BE%D0%BF%D1%96%D1%8F3.jpg', createdAt: Date.now() - 8 * 86400000 },
      { id: 'g2', title: 'Трекінгові палиці Black Diamond Trail', date: '15.04.2026', text: 'Складані, алюмінієві...', image: 'https://propohody.com/wp-content/uploads/2017/07/20170718_171603.jpg', createdAt: Date.now() - 3 * 86400000 },
      { id: 'g3', title: 'Рюкзак Osprey Kestrel 48L', date: '10.04.2026', text: 'Універсальний туристичний рюкзак...', image: 'https://propohody.com/wp-content/uploads/2019/06/IMG_20190602_155742.jpg', createdAt: Date.now() - 1 * 86400000 }
    ],
    faq: [
      { id: 'f1', question: 'Правила туристичного клубу «Рідня»', answer: `<p><strong>1. Добровільне членство.</strong> Участь у походах є добровільною. Кожен учасник самостійно оцінює свою фізичну підготовку та стан здоров'я.</p><p><strong>2. Безпека.</strong> Учасник зобов'язаний дотримуватися вказівок провідника, не відставати від групи, мати базове спорядження (зручне взуття, одяг за погодою, воду, перекус, ліхтарик).</p><p><strong>3. Екологія.</strong> Забороняється залишати сміття, ламати дерева, розводити багаття без дозволу. Ми практикуємо принцип «Не залишай слідів».</p><p><strong>4. Взаємоповага.</strong> У клубі заборонені образи, конфлікти, політичні або релігійні суперечки. Підтримуємо дружню атмосферу.</p><p><strong>5. Відповідальність.</strong> Клуб не несе відповідальності за травми, отримані внаслідок недотримання правил безпеки або власної необережності.</p><p><strong>6. Благодійність.</strong> Участь у походах безкоштовна, але ми заохочуємо добровільні внески на підтримку ЗСУ та розвиток клубу.</p><p><strong>7. Фото та відео.</strong> Погоджуючись на похід, ви даєте згоду на використання ваших світлин у соціальних мережах клубу.</p><p><strong>8. Скасування.</strong> Про неможливість участі потрібно повідомити організатора не пізніше ніж за 2 дні до старту.</p>`, createdAt: Date.now() - 60 * 86400000 },
      { id: 'f2', question: 'Як приєднатися до клубу?', answer: '<p>Просто зв\'яжіться з нами через форму на сторінці <a href="../contacts.html">Контакти</a> або напишіть у соцмережі (Facebook, Instagram). Ми додамо вас до чату учасників. Жодних вступних внесків – достатньо бажання мандрувати!</p>', createdAt: Date.now() - 55 * 86400000 },
      { id: 'f3', question: 'Який рівень підготовки потрібен?', answer: '<p>У нас є маршрути різної складності: від легких прогулянок (до 10 км, перепад висот до 300 м) до серйозних вершин (понад 2000 м, 20+ км). Початківцям радимо починати з легких маршрутів. Головне – мати базову фізичну форму та не мати медичних протипоказань.</p>', createdAt: Date.now() - 50 * 86400000 },
      { id: 'f4', question: 'Що брати з собою?', answer: '<p><strong>Обов\'язково:</strong> зручне трекінгове взуття, рюкзак, дощовик, вода (1-1,5 л), перекус (енергетичні батончики, горіхи, бутерброди), ліхтарик, заряджений телефон.<br><strong>За бажанням:</strong> трекінгові палиці, термос, аптечка, фотоапарат, запасні шкарпетки, головний убір.</p>', createdAt: Date.now() - 45 * 86400000 },
      { id: 'f5', question: 'Чи є благодійні внески?', answer: '<p>Походи <strong>безкоштовні</strong>. Однак ми раді будь-яким добровільним внескам на потреби ЗСУ або розвиток клубу (придбання спорядження, маркування стежок). Реквізити для підтримки – на сторінці <a href="../contacts.html">Контакти</a>.</p>', createdAt: Date.now() - 40 * 86400000 },
      { id: 'f6', question: 'Як дістатися до місця старту?', answer: '<p>Зазвичай учасники добираються власним транспортом або організовують спільне авто (карпулінг). Ми публікуємо координати GPS та орієнтири. Для деяких маршрутів можна домовитися про трансфер зі Стрия чи Львова.</p>', createdAt: Date.now() - 35 * 86400000 },
      { id: 'f7', question: 'Чи можна з собакою?', answer: '<p>Так, але попередньо повідомте організатора. Собака має бути на повідку, керованим та не агресивним до інших учасників. Господар забирає екскременти та відповідає за поведінку тварини.</p>', createdAt: Date.now() - 30 * 86400000 },
      { id: 'f8', question: 'Як часто проводяться походи?', answer: '<p>Зазвичай 2-3 походи на місяць (переважно у вихідні). Влітку частіше, взимку – рідше. Слідкуйте за розкладом на сторінці <a href="../trips.html">Маршрути</a> або в наших соцмережах.</p>', createdAt: Date.now() - 25 * 86400000 }
    ],
    reviews: [
      { id: 'r1', name: 'Олена', age: 28, text: 'Неймовірна атмосфера! Вперше пішла в гори і закохалася.', rating: 5, approved: true, createdAt: Date.now() - 20 * 86400000 },
      { id: 'r2', name: 'Андрій', age: 45, text: 'Ходимо з клубом уже два роки.', rating: 5, approved: true, createdAt: Date.now() - 10 * 86400000 },
      { id: 'r3', name: 'Ігор', age: 33, text: 'Дізнався багато нового про історію УПА.', rating: 5, approved: true, createdAt: Date.now() - 2 * 86400000 }
    ],
    members: [
      { id: 'm1', name: 'Петро Маковський', rating: 4 },
      { id: 'm2', name: 'Валерій Бурлака', rating: 4 },
      { id: 'm3', name: 'Олег Дашко', rating: 4 },
      { id: 'm4', name: 'Володимир Коколюс', rating: 4 },
      { id: 'm5', name: 'Василь Дмитришин', rating: 4 },
      { id: 'm6', name: 'Богдан Сидорак', rating: 4 },
      { id: 'm7', name: 'Лука Павлюк', rating: 4 }
    ]
  };

  // ========== DOM ==========
  const navLinks = document.querySelectorAll('.admin-nav a[data-tab]');
  const pageTitle = document.getElementById('pageTitle');
  const contentContainer = document.getElementById('contentContainer');
  const addBtn = document.getElementById('addBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalSave = document.getElementById('modalSave');
  const modalCancel = document.getElementById('modalCancel');
  const modalClose = document.getElementById('modalClose');

  // ========== ЗАВАНТАЖЕННЯ ==========
  function loadAllData() {
    const entities = Object.values(TAB_CONFIG).map(c => c.entity);
    const uniqueEntities = [...new Set(entities)];
    const promises = uniqueEntities.map(entity => Utils.fetchData(entity));
    Promise.all(promises)
      .then(results => {
        uniqueEntities.forEach((entity, index) => {
          let items = results[index];
          if (!Array.isArray(items) || items.length === 0) {
            const defaultItems = DEFAULT_DATA[entity] || [];
            items = defaultItems;
            if (defaultItems.length) {
              Utils.saveData(entity, defaultItems).catch(e => console.warn('Не вдалося зберегти дефолтні дані для', entity, e));
            }
          }
          data[entity] = items;
        });
        renderCurrentTab();
      })
      .catch(err => {
        console.error('Помилка завантаження даних:', err);
        Utils.showNotification('Помилка завантаження даних. Використовуються локальні дані.', false);
        Object.keys(DEFAULT_DATA).forEach(entity => {
          if (!data[entity] || data[entity].length === 0) {
            data[entity] = DEFAULT_DATA[entity] || [];
          }
        });
        renderCurrentTab();
      });
  }

  // ========== РЕНДЕРИНГ ==========
  function renderCurrentTab() {
    const config = TAB_CONFIG[currentTab];
    if (!config) {
      if (currentTab === 'applications') {
        contentContainer.innerHTML = `
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd3Zx.../viewform" target="_blank" class="applications-link">
            <i class="fas fa-external-link-alt"></i>
            <h3>Перейти до заявок (Google Forms)</h3>
            <p>Керуйте заявками через Google Таблиці</p>
          </a>
        `;
        addBtn.style.display = 'none';
        return;
      }
      return;
    }

    const entity = config.entity;
    const allItems = data[entity] || [];
    const label = config.label;

    // Пагінація
    const totalItems = allItems.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = allItems.slice(start, start + ITEMS_PER_PAGE);

    addBtn.style.display = 'inline-flex';

    if (!pageItems.length) {
      contentContainer.innerHTML = `<div class="empty-state"><i class="fas ${config.icon}"></i><p>Немає записів. Додайте перший!</p></div>`;
      renderPagination(totalPages);
      return;
    }

    let html = '<div class="list-container">';
    pageItems.forEach(item => {
      const isNew = (item.createdAt && (Date.now() - item.createdAt < 30 * 86400000));
      let displayTitle = item.title || item.question || item.name || 'Без назви';
      // Для контактів замінюємо "Без назви" на "Основна інформація"
      if (entity === 'contacts' && displayTitle === 'Без назви') {
        displayTitle = 'Основна інформація';
      }
      html += `
        <div class="record-card" data-id="${item.id}">
          <div class="info">
            <div class="title">
              ${Utils.escapeHtml(displayTitle)}
              ${isNew ? '<span class="badge-new">Новинка</span>' : ''}
            </div>
            <div class="meta">
              ${item.date ? `<span><i class="far fa-calendar"></i> ${Utils.escapeHtml(item.date)}</span>` : ''}
              ${item.difficulty ? `<span><i class="fas fa-signal"></i> ${Utils.escapeHtml(item.difficulty)}</span>` : ''}
              ${item.guide ? `<span><i class="fas fa-user-hiking"></i> ${Utils.escapeHtml(item.guide)}</span>` : ''}
              ${item.rating ? `<span><i class="fas fa-star"></i> ${item.rating}/5</span>` : ''}
              ${item.approved !== undefined ? `<span>${item.approved ? '✅ Опубліковано' : '⏳ На модерації'}</span>` : ''}
            </div>
          </div>
          <div class="actions">
            <button class="edit-btn" data-id="${item.id}"><i class="fas fa-pen"></i> Редагувати</button>
            <button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i> Видалити</button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    contentContainer.innerHTML = html;

    // Прив'язка подій
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(currentTab, btn.dataset.id);
      });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Видалити цей запис?')) {
          deleteItem(currentTab, btn.dataset.id);
        }
      });
    });

    renderPagination(totalPages);
  }

  // ========== ПАГІНАЦІЯ ==========
  function renderPagination(totalPages) {
    const existingPagination = document.getElementById('paginationContainer');
    if (existingPagination) existingPagination.remove();

    if (totalPages <= 1) return;

    const container = document.createElement('div');
    container.id = 'paginationContainer';
    container.className = 'pagination-container';
    container.innerHTML = `
      <button class="page-nav" id="prevPageBtn" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>
      <div class="page-numbers">
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p =>
          `<button class="page-number ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`
        ).join('')}
      </div>
      <button class="page-nav" id="nextPageBtn" ${currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>
    `;
    contentContainer.parentNode.insertBefore(container, contentContainer.nextSibling);

    document.getElementById('prevPageBtn').addEventListener('click', () => {
      if (currentPage > 1) { currentPage--; renderCurrentTab(); }
    });
    document.getElementById('nextPageBtn').addEventListener('click', () => {
      if (currentPage < totalPages) { currentPage++; renderCurrentTab(); }
    });
    document.querySelectorAll('.page-number').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page);
        renderCurrentTab();
      });
    });
  }

  // ========== ПЕРЕМИКАННЯ ВКЛАДОК ==========
  function switchTab(tabId) {
    currentTab = tabId;
    currentPage = 1;
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`.admin-nav a[data-tab="${tabId}"]`).classList.add('active');

    const config = TAB_CONFIG[tabId];
    if (config) {
      pageTitle.innerHTML = `<i class="fas ${config.icon}"></i> ${config.label}`;
    } else if (tabId === 'applications') {
      pageTitle.innerHTML = `<i class="fas fa-clipboard-list"></i> Заявки`;
    }
    renderCurrentTab();
  }

  // ========== ФОРМИ ==========
  function getFormFields(entity, item = null) {
    let fieldsHtml = '';
    const v = (key, defaultVal = '') => (item && item[key] !== undefined) ? item[key] : defaultVal;

    switch (entity) {
      case 'trips':
        const diffOptions = ['легка', 'середня', 'вище середньої'];
        let diffSelect = `<select id="f_difficulty">`;
        diffOptions.forEach(d => {
          diffSelect += `<option value="${d}" ${v('difficulty') === d ? 'selected' : ''}>${d.charAt(0).toUpperCase() + d.slice(1)}</option>`;
        });
        diffSelect += `</select>`;

        let guideOptions = `<option value="">— Оберіть провідника —</option>`;
        (data.members || []).forEach(m => {
          guideOptions += `<option value="${Utils.escapeHtml(m.name)}" ${v('guide') === m.name ? 'selected' : ''}>${Utils.escapeHtml(m.name)} (⭐ ${m.rating})</option>`;
        });
        const guideSelectHtml = `
          <div style="display: flex; gap: 8px; align-items: center; width: 100%;">
            <select id="f_guide" style="flex:1;">${guideOptions}</select>
            <button type="button" id="quickAddLeaderBtn" class="btn btn-outline" style="padding: 8px 12px; white-space: nowrap;"><i class="fas fa-plus"></i> Новий</button>
          </div>
        `;

        fieldsHtml = `
          <div class="form-group"><label>Назва *</label><input type="text" id="f_title" value="${Utils.escapeHtml(v('title'))}" placeholder="Назва маршруту"></div>
          <div class="form-row">
            <div class="form-group"><label>Дата</label><input type="date" id="f_date" value="${v('date')}"></div>
            <div class="form-group"><label>Протяжність</label><input type="text" id="f_distance" value="${Utils.escapeHtml(v('distance'))}" placeholder="8 км"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Складність</label>${diffSelect}</div>
            <div class="form-group"><label>Тривалість</label><input type="text" id="f_duration" value="${Utils.escapeHtml(v('duration'))}" placeholder="1 день"></div>
          </div>
          <div class="form-group"><label>Провідник</label>${guideSelectHtml}</div>
          <div class="form-group"><label>URL карти (mapy.cz)</label><input type="url" id="f_mapUrl" value="${Utils.escapeHtml(v('mapUrl'))}" placeholder="https://mapy.cz/..."></div>
          <div class="form-group"><label>Примітки</label><textarea id="f_notes" rows="2">${Utils.escapeHtml(v('notes'))}</textarea></div>
          <div class="form-group"><label>Історія маршруту (HTML)</label><textarea id="f_history" rows="4" placeholder="Опис походу, фото, враження... можна використовувати HTML теги">${Utils.escapeHtml(v('history'))}</textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" value="${Utils.escapeHtml(v('image'))}" placeholder="https://..."></div>
          <div class="checkbox-group">
            <label><input type="checkbox" id="f_completed" ${v('report') === 'виконано' ? 'checked' : ''}> <i class="fas fa-check-circle"></i> Виконано (ручне позначення)</label>
            <label><input type="checkbox" id="f_traditional" ${v('isTraditional') ? 'checked' : ''}> <i class="fas fa-leaf"></i> Традиційний</label>
          </div>
        `;
        break;

      case 'blog':
        fieldsHtml = `
          <div class="form-group"><label>Заголовок *</label><input type="text" id="f_title" value="${Utils.escapeHtml(v('title'))}" placeholder="Заголовок статті"></div>
          <div class="form-group"><label>Дата</label><input type="text" id="f_date" value="${Utils.escapeHtml(v('date'))}" placeholder="22.02.2026"></div>
          <div class="form-group"><label>Текст</label><textarea id="f_text" rows="5">${Utils.escapeHtml(v('text'))}</textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" value="${Utils.escapeHtml(v('image'))}" placeholder="https://..."></div>
        `;
        break;

      case 'albums':
        fieldsHtml = `
          <div class="form-group"><label>Назва альбому *</label><input type="text" id="f_title" value="${Utils.escapeHtml(v('title'))}" placeholder="Назва"></div>
          <div class="form-group"><label>Обкладинка (URL)</label><input type="url" id="f_cover" value="${Utils.escapeHtml(v('cover'))}" placeholder="https://..."></div>
          <div class="form-group"><label>Фото (URL через кому або завантажте файли)</label>
            <textarea id="f_photos" rows="3">${Array.isArray(v('photos')) ? v('photos').join(', ') : ''}</textarea>
            <div style="margin-top:8px;">
              <input type="file" id="f_photo_files" multiple accept="image/*" style="display:inline-block; padding:6px;">
              <button type="button" id="uploadPhotosBtn" class="btn btn-outline" style="padding:4px 12px;">Завантажити вибрані</button>
            </div>
          </div>
        `;
        break;

      case 'contacts':
        fieldsHtml = `
          <div class="form-group"><label>Адреса</label><input type="text" id="f_address" value="${Utils.escapeHtml(v('address'))}" placeholder="м. Стрий, вул..."></div>
          <div class="form-group"><label>Телефон</label><input type="text" id="f_phone" value="${Utils.escapeHtml(v('phone'))}" placeholder="+380..."></div>
          <div class="form-group"><label>Email</label><input type="email" id="f_email" value="${Utils.escapeHtml(v('email'))}" placeholder="email@domain.com"></div>
          <div class="form-group"><label>Facebook URL</label><input type="url" id="f_facebook" value="${Utils.escapeHtml(v('facebook'))}" placeholder="https://facebook.com/..."></div>
          <div class="form-group"><label>Instagram URL</label><input type="url" id="f_instagram" value="${Utils.escapeHtml(v('instagram'))}" placeholder="https://instagram.com/..."></div>
          <div class="form-group"><label>YouTube URL</label><input type="url" id="f_youtube" value="${Utils.escapeHtml(v('youtube'))}" placeholder="https://youtube.com/..."></div>
        `;
        break;

      case 'gear':
        fieldsHtml = `
          <div class="form-group"><label>Назва *</label><input type="text" id="f_title" value="${Utils.escapeHtml(v('title'))}" placeholder="Назва спорядження"></div>
          <div class="form-group"><label>Дата</label><input type="text" id="f_date" value="${Utils.escapeHtml(v('date'))}" placeholder="22.02.2026"></div>
          <div class="form-group"><label>Опис</label><textarea id="f_text" rows="5">${Utils.escapeHtml(v('text'))}</textarea></div>
          <div class="form-group"><label>URL зображення</label><input type="url" id="f_image" value="${Utils.escapeHtml(v('image'))}" placeholder="https://..."></div>
        `;
        break;

      case 'faq':
        fieldsHtml = `
          <div class="form-group"><label>Питання *</label><input type="text" id="f_question" value="${Utils.escapeHtml(v('question'))}" placeholder="Питання"></div>
          <div class="form-group"><label>Відповідь (HTML) *</label><textarea id="f_answer" rows="5">${Utils.escapeHtml(v('answer'))}</textarea></div>
        `;
        break;

      case 'reviews':
        const ratingOptions = [5,4,3,2,1];
        let ratingSelect = `<select id="f_rating">`;
        ratingOptions.forEach(r => {
          ratingSelect += `<option value="${r}" ${parseInt(v('rating')) === r ? 'selected' : ''}>${r} зірок</option>`;
        });
        ratingSelect += `</select>`;
        fieldsHtml = `
          <div class="form-group"><label>Ім'я *</label><input type="text" id="f_name" value="${Utils.escapeHtml(v('name'))}" placeholder="Ім'я автора"></div>
          <div class="form-group"><label>Вік</label><input type="number" id="f_age" value="${v('age')}" placeholder="28"></div>
          <div class="form-group"><label>Текст *</label><textarea id="f_text" rows="4">${Utils.escapeHtml(v('text'))}</textarea></div>
          <div class="form-group"><label>Рейтинг</label>${ratingSelect}</div>
          <div class="form-group"><label>Статус</label><select id="f_status"><option value="pending" ${!v('approved') ? 'selected' : ''}>На модерації</option><option value="approved" ${v('approved') ? 'selected' : ''}>Опубліковано</option></select></div>
        `;
        break;

      case 'members':
        fieldsHtml = `
          <div class="form-group"><label>Ім'я та прізвище *</label><input type="text" id="f_name" value="${Utils.escapeHtml(v('name'))}" placeholder="Петро Маковський"></div>
          <div class="form-group"><label>Рейтинг (1-5)</label><select id="f_rating">
            ${[5,4,3,2,1].map(r => `<option value="${r}" ${parseInt(v('rating')) === r ? 'selected' : ''}>${r} зірок</option>`).join('')}
          </select></div>
        `;
        break;

      default:
        fieldsHtml = '<p>Невідома сутність</p>';
    }
    return fieldsHtml;
  }

  // ========== ВІДКРИТТЯ МОДАЛОК ==========
  function openAddModal() {
    const config = TAB_CONFIG[currentTab];
    if (!config) return;
    const entity = config.entity;
    editingId = null;
    editingEntity = entity;

    let title = `Додати ${config.label.slice(0, -1)}`;
    let fieldsHtml = getFormFields(entity, null);

    modalTitle.innerHTML = `<i class="fas fa-plus-circle"></i> ${title}`;
    modalBody.innerHTML = fieldsHtml;
    modalOverlay.classList.add('active');
    modalSave.onclick = () => saveItem(entity);

    // Для галереї – обробка завантаження фото
    if (entity === 'albums') {
      const uploadBtn = document.getElementById('uploadPhotosBtn');
      if (uploadBtn) {
        uploadBtn.onclick = function() {
          const fileInput = document.getElementById('f_photo_files');
          if (!fileInput.files.length) {
            alert('Виберіть файли');
            return;
          }
          // Відправляємо файли через FormData
          const formData = new FormData();
          for (let file of fileInput.files) {
            formData.append('photos[]', file);
          }
          fetch('/admin/upload.php', {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(data => {
            if (data.success && data.files.length) {
              const photosTextarea = document.getElementById('f_photos');
              const existing = photosTextarea.value.trim() ? photosTextarea.value.trim() + ', ' : '';
              photosTextarea.value = existing + data.files.join(', ');
              alert('Фото завантажено!');
            } else {
              alert('Помилка завантаження');
            }
          })
          .catch(err => {
            alert('Помилка завантаження: ' + err.message);
          });
        };
      }
    }

    const quickAddBtn = document.getElementById('quickAddLeaderBtn');
    if (quickAddBtn) quickAddBtn.onclick = () => openLeaderModal();
  }

  function openEditModal(tab, id) {
    const config = TAB_CONFIG[tab];
    if (!config) return;
    const entity = config.entity;
    const items = data[entity] || [];
    const item = items.find(i => i.id == id);
    if (!item) return;

    editingId = id;
    editingEntity = entity;

    let title = `Редагувати ${config.label.slice(0, -1)}`;
    let fieldsHtml = getFormFields(entity, item);

    modalTitle.innerHTML = `<i class="fas fa-pen"></i> ${title}`;
    modalBody.innerHTML = fieldsHtml;
    modalOverlay.classList.add('active');
    modalSave.onclick = () => saveItem(entity);

    if (entity === 'albums') {
      const uploadBtn = document.getElementById('uploadPhotosBtn');
      if (uploadBtn) {
        uploadBtn.onclick = function() {
          const fileInput = document.getElementById('f_photo_files');
          if (!fileInput.files.length) {
            alert('Виберіть файли');
            return;
          }
          const formData = new FormData();
          for (let file of fileInput.files) {
            formData.append('photos[]', file);
          }
          fetch('/admin/upload.php', {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(data => {
            if (data.success && data.files.length) {
              const photosTextarea = document.getElementById('f_photos');
              const existing = photosTextarea.value.trim() ? photosTextarea.value.trim() + ', ' : '';
              photosTextarea.value = existing + data.files.join(', ');
              alert('Фото завантажено!');
            } else {
              alert('Помилка завантаження');
            }
          })
          .catch(err => {
            alert('Помилка завантаження: ' + err.message);
          });
        };
      }
    }

    const quickAddBtn = document.getElementById('quickAddLeaderBtn');
    if (quickAddBtn) quickAddBtn.onclick = () => openLeaderModal();
  }

  // ========== МОДАЛКА ДОДАВАННЯ ЛІДЕРА ==========
  function openLeaderModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
      <div class="modal" style="max-width: 450px;">
        <div class="modal-header">
          <h2><i class="fas fa-user-plus"></i> Додати лідера</h2>
          <button class="modal-close" id="closeLeaderModalBtn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group"><label>Ім'я та прізвище *</label><input type="text" id="leaderName" placeholder="Петро Маковський"></div>
          <div class="form-group"><label>Початковий рейтинг (1-5)</label><select id="leaderRating">
            ${[5,4,3,2,1].map(r => `<option value="${r}" ${r===4?'selected':''}>${r} зірок</option>`).join('')}
          </select></div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" id="cancelLeaderBtn">Скасувати</button>
          <button class="btn btn-primary" id="saveLeaderBtn">Зберегти</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const closeModal = () => overlay.remove();
    overlay.querySelector('#closeLeaderModalBtn').onclick = closeModal;
    overlay.querySelector('#cancelLeaderBtn').onclick = closeModal;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    overlay.querySelector('#saveLeaderBtn').onclick = () => {
      const name = document.getElementById('leaderName').value.trim();
      const rating = parseInt(document.getElementById('leaderRating').value);
      if (!name) { alert('Введіть ім\'я лідера'); return; }
      if (data.members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
        alert('Такий лідер вже існує');
        return;
      }
      const newLeader = { id: 'm' + Date.now(), name, rating };
      data.members.push(newLeader);
      Utils.saveData('members', data.members).then(() => {
        // Оновлюємо випадаючий список у формі маршруту
        const guideSelect = document.getElementById('f_guide');
        if (guideSelect) {
          const opt = document.createElement('option');
          opt.value = name;
          opt.textContent = `${name} (⭐ ${rating})`;
          opt.selected = true;
          guideSelect.appendChild(opt);
        }
        closeModal();
        renderCurrentTab();
        Utils.showNotification('Лідера додано', true);
      });
    };
  }

  // ========== ЗБЕРЕЖЕННЯ ==========
  function saveItem(entity) {
    const formData = {};
    const inputs = modalBody.querySelectorAll('input, textarea, select');
    inputs.forEach(el => {
      const id = el.id;
      if (id && id.startsWith('f_')) {
        const key = id.replace('f_', '');
        if (el.type === 'checkbox') formData[key] = el.checked;
        else formData[key] = el.value;
      }
    });

    // Спеціальна обробка
    if (entity === 'albums') {
      formData.photos = formData.photos ? formData.photos.split(',').map(s => s.trim()).filter(Boolean) : [];
    }
    if (entity === 'reviews') {
      formData.approved = formData.status === 'approved';
      formData.rating = parseInt(formData.rating) || 5;
      formData.age = parseInt(formData.age) || 0;
    }
    if (entity === 'trips') {
      formData.report = formData.completed ? 'виконано' : '';
      formData.isTraditional = formData.traditional || false;
      formData.mapUrl = formData.mapUrl || '';
      formData.distance = formData.distance || '? км';
      formData.duration = formData.duration || '1 день';
      formData.guide = formData.guide || '—';
      // Якщо провідника немає в списку – додаємо
      if (formData.guide && !data.members.some(m => m.name === formData.guide)) {
        data.members.push({ id: 'm' + Date.now(), name: formData.guide, rating: 4 });
        Utils.saveData('members', data.members);
      }
    }
    if (entity === 'members') {
      formData.rating = parseInt(formData.rating) || 4;
    }

    // Валідація
    if (!formData.title && entity !== 'faq' && entity !== 'reviews' && entity !== 'contacts' && entity !== 'members') {
      alert('Заповніть назву');
      return;
    }
    if (entity === 'faq' && (!formData.question || !formData.answer)) {
      alert('Заповніть питання та відповідь');
      return;
    }
    if (entity === 'reviews' && (!formData.name || !formData.text)) {
      alert('Заповніть ім\'я та текст відгуку');
      return;
    }
    if (entity === 'members' && !formData.name) {
      alert('Введіть ім\'я');
      return;
    }

    if (editingId) {
      Utils.updateItem(entity, editingId, formData)
        .then(() => {
          closeModal();
          loadAllData();
          Utils.showNotification('Оновлено', true);
        })
        .catch(() => Utils.showNotification('Помилка оновлення', false));
    } else {
      formData.id = Date.now().toString();
      formData.createdAt = Date.now();
      Utils.addItem(entity, formData)
        .then(() => {
          closeModal();
          loadAllData();
          Utils.showNotification('Додано', true);
        })
        .catch(() => Utils.showNotification('Помилка додавання', false));
    }
  }

  // ========== ВИДАЛЕННЯ ==========
  function deleteItem(tab, id) {
    const config = TAB_CONFIG[tab];
    if (!config) return;
    const entity = config.entity;
    Utils.deleteItem(entity, id)
      .then(() => {
        loadAllData();
        Utils.showNotification('Видалено', true);
      })
      .catch(() => Utils.showNotification('Помилка видалення', false));
  }

  // ========== ЗАКРИТТЯ МОДАЛКИ ==========
  function closeModal() {
    modalOverlay.classList.remove('active');
    editingId = null;
    editingEntity = null;
  }

  // ========== ІНІЦІАЛІЗАЦІЯ ==========
  document.addEventListener('DOMContentLoaded', function() {
    if (!window.isAdmin) {
      window.location.href = 'index.html';
      return;
    }

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const tab = this.dataset.tab;
        if (tab) switchTab(tab);
      });
    });

    addBtn.addEventListener('click', openAddModal);

    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.getElementById('logoutBtn').addEventListener('click', function(e) {
      e.preventDefault();
      if (window.signOut) signOut();
    });

    loadAllData();
  });
})();