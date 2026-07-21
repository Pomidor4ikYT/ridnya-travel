// js/utils.js
(function() {
  'use strict';

  window.Utils = {
    escapeHtml: function(str) {
      if (!str) return '';
      return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
      });
    },

    showNotification: function(message, isSuccess = true) {
      const notification = document.createElement('div');
      notification.className = 'custom-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
          <p>${this.escapeHtml(message)}</p>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.classList.add('show'), 10);
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 3500);
    },

    // ===== API МЕТОДИ =====

    fetchData: function(entity) {
      // Додаємо параметр _t для обходу кешу
      return fetch('/api.php?_t=' + Date.now(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'get',
          entity: entity,
          email: sessionStorage.getItem('adminEmail') || ''
        })
      })
      .then(res => res.json())
      .then(data => {
        // Якщо прийшов не масив – повертаємо порожній масив
        return Array.isArray(data) ? data : [];
      })
      .catch(err => {
        console.error('Помилка завантаження даних:', err);
        return [];
      });
    },

    saveData: function(entity, data) {
      if (!Array.isArray(data)) data = [];
      return fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set',
          entity: entity,
          data: data,
          email: sessionStorage.getItem('adminEmail') || ''
        })
      })
      .then(res => res.json());
    },

    addItem: function(entity, item) {
      if (!item.id) item.id = Date.now().toString();
      return fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          entity: entity,
          data: item,
          email: sessionStorage.getItem('adminEmail') || ''
        })
      })
      .then(res => res.json());
    },

    updateItem: function(entity, id, newData) {
      return fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          entity: entity,
          id: id,
          data: newData,
          email: sessionStorage.getItem('adminEmail') || ''
        })
      })
      .then(res => res.json());
    },

    deleteItem: function(entity, id) {
      return fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          entity: entity,
          id: id,
          email: sessionStorage.getItem('adminEmail') || ''
        })
      })
      .then(res => res.json());
    }
  };
})();