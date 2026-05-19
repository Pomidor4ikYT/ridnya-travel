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

    getStorage: function(key, defaultValue = []) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : defaultValue;
      } catch {
        return defaultValue;
      }
    },

    setStorage: function(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }
  };
})();