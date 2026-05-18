(function() {
  'use strict';

  const TEAM_APPS_KEY = 'ridnya_team_applications';

  function showNotification(message, isSuccess = true) {
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${escapeHtml(message)}</p>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m));
  }

  function addTeamApplication(name, email, message) {
    const apps = JSON.parse(localStorage.getItem(TEAM_APPS_KEY) || '[]');
    apps.push({
      id: Date.now(),
      userName: name.trim(),
      email: email.trim(),
      message: message.trim(),
      date: new Date().toLocaleString(),
      status: 'pending'
    });
    localStorage.setItem(TEAM_APPS_KEY, JSON.stringify(apps));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value.trim() || '';
        const email = document.getElementById('contactEmail')?.value.trim() || '';
        const msg = document.getElementById('contactMsg')?.value.trim() || '';
        if (!name || !email) {
          showNotification('Будь ласка, заповніть ім\'я та email', false);
          return;
        }
        addTeamApplication(name, email, msg);
        showNotification('✅ Дякуємо! Вашу заявку прийнято. Ми зв\'яжемося з вами найближчим часом.', true);
        form.reset();
      });
    }
  });
})();