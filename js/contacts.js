// js/contacts.js
(function() {
  'use strict';
  const TEAM_APPS_KEY = 'ridnya_team_applications';

  function addTeamApplication(name, email, message) {
    const apps = Utils.getStorage(TEAM_APPS_KEY);
    apps.push({
      id: Date.now(),
      userName: name.trim(),
      email: email.trim(),
      message: message.trim(),
      date: new Date().toLocaleString(),
      status: 'pending'
    });
    Utils.setStorage(TEAM_APPS_KEY, apps);
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
          Utils.showNotification('Будь ласка, заповніть ім\'я та email', false);
          return;
        }
        addTeamApplication(name, email, msg);
        Utils.showNotification('✅ Дякуємо! Вашу заявку прийнято. Ми зв\'яжемося з вами найближчим часом.', true);
        form.reset();
      });
    }
  });
})();