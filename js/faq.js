// js/faq.js – логіка для публічної сторінки FAQ
(function() {
  'use strict';

  const FAQ_STORAGE_KEY = 'ridnya_faq';

  const defaultFaqItems = [
    {
      id: 'f1',
      question: 'Правила туристичного клубу «Рідня»',
      answer: `<p><strong>1. Добровільне членство.</strong> Участь у походах є добровільною. Кожен учасник самостійно оцінює свою фізичну підготовку та стан здоров'я.</p>
      <p><strong>2. Безпека.</strong> Учасник зобов'язаний дотримуватися вказівок провідника, не відставати від групи, мати базове спорядження (зручне взуття, одяг за погодою, воду, перекус, ліхтарик).</p>
      <p><strong>3. Екологія.</strong> Забороняється залишати сміття, ламати дерева, розводити багаття без дозволу. Ми практикуємо принцип «Не залишай слідів».</p>
      <p><strong>4. Взаємоповага.</strong> У клубі заборонені образи, конфлікти, політичні або релігійні суперечки. Підтримуємо дружню атмосферу.</p>
      <p><strong>5. Відповідальність.</strong> Клуб не несе відповідальності за травми, отримані внаслідок недотримання правил безпеки або власної необережності.</p>
      <p><strong>6. Благодійність.</strong> Участь у походах безкоштовна, але ми заохочуємо добровільні внески на підтримку ЗСУ та розвиток клубу.</p>
      <p><strong>7. Фото та відео.</strong> Погоджуючись на похід, ви даєте згоду на використання ваших світлин у соціальних мережах клубу.</p>
      <p><strong>8. Скасування.</strong> Про неможливість участі потрібно повідомити організатора не пізніше ніж за 2 дні до старту.</p>`
    },
    {
      id: 'f2',
      question: 'Як приєднатися до клубу?',
      answer: '<p>Просто зв\'яжіться з нами через форму на сторінці <a href="contacts.html">Контакти</a> або напишіть у соцмережі (Facebook, Instagram). Ми додамо вас до чату учасників. Жодних вступних внесків – достатньо бажання мандрувати!</p>'
    },
    {
      id: 'f3',
      question: 'Який рівень підготовки потрібен?',
      answer: '<p>У нас є маршрути різної складності: від легких прогулянок (до 10 км, перепад висот до 300 м) до серйозних вершин (понад 2000 м, 20+ км). Початківцям радимо починати з легких маршрутів. Головне – мати базову фізичну форму та не мати медичних протипоказань.</p>'
    },
    {
      id: 'f4',
      question: 'Що брати з собою?',
      answer: '<p><strong>Обов\'язково:</strong> зручне трекінгове взуття, рюкзак, дощовик, вода (1-1,5 л), перекус (енергетичні батончики, горіхи, бутерброди), ліхтарик, заряджений телефон.<br><strong>За бажанням:</strong> трекінгові палиці, термос, аптечка, фотоапарат, запасні шкарпетки, головний убір.</p>'
    },
    {
      id: 'f5',
      question: 'Чи є благодійні внески?',
      answer: '<p>Походи <strong>безкоштовні</strong>. Однак ми раді будь-яким добровільним внескам на потреби ЗСУ або розвиток клубу (придбання спорядження, маркування стежок). Реквізити для підтримки – на сторінці <a href="contacts.html">Контакти</a>.</p>'
    },
    {
      id: 'f6',
      question: 'Як дістатися до місця старту?',
      answer: '<p>Зазвичай учасники добираються власним транспортом або організовують спільне авто (карпулінг). Ми публікуємо координати GPS та орієнтири. Для деяких маршрутів можна домовитися про трансфер зі Стрия чи Львова.</p>'
    },
    {
      id: 'f7',
      question: 'Чи можна з собакою?',
      answer: '<p>Так, але попередньо повідомте організатора. Собака має бути на повідку, керованим та не агресивним до інших учасників. Господар забирає екскременти та відповідає за поведінку тварини.</p>'
    },
    {
      id: 'f8',
      question: 'Як часто проводяться походи?',
      answer: '<p>Зазвичай 2-3 походи на місяць (переважно у вихідні). Влітку частіше, взимку – рідше. Слідкуйте за розкладом на сторінці <a href="trips.html">Маршрути</a> або в наших соцмережах.</p>'
    }
  ];

  function loadFaq() {
    try {
      let stored = localStorage.getItem(FAQ_STORAGE_KEY);
      let items;
      if (stored) {
        items = JSON.parse(stored);
      } else {
        items = defaultFaqItems;
        localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(items));
      }
      const container = document.getElementById('faqDynamicList');
      if (container && items.length) {
        container.innerHTML = items.map(item => `
          <div class="faq-item">
            <button class="faq-question">
              <span>${item.id === 'f1' ? '<i class="fas fa-star" style="color:var(--yellow); margin-right:8px;"></i> ' : ''}${Utils.escapeHtml(item.question)}</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="faq-answer">${item.answer}</div>
          </div>
        `).join('');
        document.querySelectorAll('.faq-question').forEach(btn => {
          btn.removeEventListener('click', handleFaqClick);
          btn.addEventListener('click', handleFaqClick);
        });
      }
    } catch(e) { console.error(e); }
  }

  function handleFaqClick(e) {
    const btn = e.currentTarget;
    const item = btn.closest('.faq-item');
    if (item) {
      item.classList.toggle('open');
      const icon = btn.querySelector('i:last-child');
      if (icon) icon.classList.toggle('fa-chevron-down', !item.classList.contains('open'));
      if (icon) icon.classList.toggle('fa-chevron-up', item.classList.contains('open'));
    }
  }

  document.addEventListener('DOMContentLoaded', loadFaq);
})();