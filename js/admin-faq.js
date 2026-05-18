(function() {
  'use strict';

  const FAQ_STORAGE_KEY = 'ridnya_faq';

  let faqItems = [];
  let editingFaqId = null;

  function loadFaq() {
    try {
      const stored = localStorage.getItem(FAQ_STORAGE_KEY);
      if (stored) {
        faqItems = JSON.parse(stored);
      } else {
        // За замовчуванням ті питання, що вже є в faq.html
        faqItems = [
          { id: 'f1', question: 'Правила туристичного клубу', answer: '<p><strong>1. Добровільне членство.</strong></p><p><strong>2. Членом може бути особа,</strong> яка дійсно любить свій край, гори, ріки, полонини, готова змінити домашній комфорт біля телевізора на вечір біля багаття, віддає перевагу пішим походам з наплічником перед комфортним пересуванням автомобілем, готова зустрічати сонце на мальовничих вершинах наших Карпат.</p><p><strong>3. Метою діяльності Клубу</strong> є задоволення творчих, національно-культурних, спортивних та інших інтересів своїх членів, створення умов для розвитку туризму в середовищі членів фонду громад «Рідня» в усіх його проявах та формах, підвищення рівня здоров\'я, фізичного та духовного розвитку своїх членів.</p><p><strong>4. Основні пріоритети та завдання Клубу:</strong></p><ul><li>популяризація туризму серед членів фонду;</li><li>надання учасникам можливості набуття практичного досвіду в туристичній діяльності;</li><li>сприяння заохоченню членів до здорового способу життя та активного відпочинку;</li><li>створення можливостей подорожувати за доступними цінами;</li><li>згуртування однодумців та залучення нових учасників;</li><li>проведення маркування та розчищення занедбаних туристичних маршрутів;</li><li>набуття досвіду з виживання в складних умовах та орієнтування на місцевості.</li></ul><p><strong>5. Для виконання пріоритетних завдань Клуб має право:</strong></p><ul><li>планувати та проводити туристичні подорожі і спортивно-фізкультурні масові заходи;</li><li>надавати матеріальну, інформаційну, організаційну та інші види допомоги членам Клубу;</li><li>сформувати банк спорядження;</li><li>встановити членський внесок;</li><li>залучати сторонніх інструкторів-провідників;</li><li>розповсюджувати інформацію.</li></ul><p><strong>6. Права та обов\'язки членів клубу:</strong></p><ul><li>брати участь у обговоренні мандрівок;</li><li>відповідально ставитись до здоров\'я;</li><li>допомагати іншим учасникам;</li><li>дотримуватись дисципліни;</li><li>брати участь у табірній роботі;</li><li>пропонувати нові маршрути;</li><li>бути на передпохідних зустрічах;</li><li>ділитися світлинами на сторінці ФГ "Рідня".</li></ul>' },
          { id: 'f2', question: 'Як приєднатися до клубу?', answer: '<p>Просто зв\'яжіться з нами через форму на сторінці «Контакти» або напишіть у соцмережі.</p>' },
          { id: 'f3', question: 'Який рівень підготовки потрібен?', answer: '<p>У нас є маршрути різної складності — обирайте за бажанням.</p>' },
          { id: 'f4', question: 'Що брати з собою?', answer: '<p>Зручне взуття, дощовик, воду, перекус, ліхтарик, аптечку.</p>' },
          { id: 'f5', question: 'Чи є благодійні внески?', answer: '<p>Походи безкоштовні, але ми раді внескам на підтримку ЗСУ.</p>' }
        ];
      }
    } catch (e) {
      faqItems = [];
    }
  }

  function saveFaq() {
    localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(faqItems));
  }

  function renderFaqAdmin() {
    const container = document.getElementById('faqAdminList');
    if (!container) return;
    if (!faqItems.length) {
      container.innerHTML = '<p>Немає питань. Додайте перше.</p>';
      return;
    }
    container.innerHTML = faqItems.map(item => `
      <div class="faq-admin-item" style="background:white; border-radius:20px; padding:16px; margin-bottom:16px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <strong style="font-size:1rem;">${escapeHtml(item.question)}</strong>
          <div>
            <button class="edit-faq-btn" data-id="${item.id}" style="background:#e8f0fe; border:none; border-radius:30px; padding:6px 14px; margin-right:8px; cursor:pointer;"><i class="fas fa-pen"></i> Редагувати</button>
            <button class="delete-faq-btn" data-id="${item.id}" style="background:#ffebee; border:none; border-radius:30px; padding:6px 14px; cursor:pointer; color:#b71c1c;"><i class="fas fa-trash"></i> Видалити</button>
          </div>
        </div>
        <div style="margin-top:12px; color:var(--gray-600); font-size:0.9rem;">${item.answer.substring(0, 100)}${item.answer.length > 100 ? '…' : ''}</div>
      </div>
    `).join('');
    document.querySelectorAll('.edit-faq-btn').forEach(btn => {
      btn.addEventListener('click', () => openFaqModal(btn.dataset.id));
    });
    document.querySelectorAll('.delete-faq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Видалити питання?')) {
          faqItems = faqItems.filter(i => i.id !== btn.dataset.id);
          saveFaq();
          renderFaqAdmin();
          // Оновити faq.html також потрібно – але це окрема функція для головної сторінки FAQ
          // Тут просто зберігаємо, а при завантаженні faq.html дані підтягнуться
        }
      });
    });
  }

  function openFaqModal(id = null) {
    const modal = document.getElementById('faqAdminModal');
    const titleEl = document.getElementById('faqAdminModalTitle');
    const form = document.getElementById('addFaqForm');
    if (!modal || !form) return;
    if (id) {
      const item = faqItems.find(i => i.id === id);
      if (!item) return;
      editingFaqId = id;
      titleEl.innerHTML = '<i class="fas fa-pen"></i> Редагувати питання';
      document.getElementById('faqQuestion').value = item.question;
      document.getElementById('faqAnswer').value = item.answer;
    } else {
      editingFaqId = null;
      titleEl.innerHTML = '<i class="fas fa-plus"></i> Нове питання';
      form.reset();
    }
    modal.classList.add('active');
  }

  function closeFaqModal() {
    document.getElementById('faqAdminModal').classList.remove('active');
    editingFaqId = null;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m));
  }

  function init() {
    if (!window.isAdmin) {
      window.location.href = '../index.html';
      return;
    }
    loadFaq();
    renderFaqAdmin();

    document.getElementById('addFaqBtn')?.addEventListener('click', () => openFaqModal());
    document.getElementById('closeFaqModalBtn')?.addEventListener('click', closeFaqModal);
    document.getElementById('cancelFaqBtn')?.addEventListener('click', closeFaqModal);
    document.getElementById('faqAdminModal')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeFaqModal();
    });
    document.getElementById('addFaqForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = document.getElementById('faqQuestion').value.trim();
      const answer = document.getElementById('faqAnswer').value.trim();
      if (!question || !answer) {
        alert('Заповніть обидва поля');
        return;
      }
      if (editingFaqId) {
        const idx = faqItems.findIndex(i => i.id === editingFaqId);
        if (idx !== -1) {
          faqItems[idx].question = question;
          faqItems[idx].answer = answer;
        }
      } else {
        faqItems.push({ id: 'f' + Date.now(), question, answer });
      }
      saveFaq();
      renderFaqAdmin();
      closeFaqModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();