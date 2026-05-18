// js/admin-auth.js
(function() {
  'use strict';

  const GOOGLE_CLIENT_ID = '738790400825-1nk23hrsuk3svfa8e1ess8q22kbi9pa3.apps.googleusercontent.com';
  const ADMIN_EMAIL = 'ridnyatravel@gmail.com';

  // Негайна синхронна перевірка sessionStorage (до DOMContentLoaded)
  (function immediateCheck() {
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    const email = sessionStorage.getItem('adminEmail');
    window.isAdmin = (loggedIn === 'true' && email === ADMIN_EMAIL);
  })();

  function updateAdminUI() {
    const adminElements = document.querySelectorAll('.admin-only');
    const logoutBtn = document.getElementById('adminLogoutBtn');
    const applicationsLink = document.querySelector('a[href="admin/applications.html"]');
    const reviewsLink = document.querySelector('a[href="admin/reviews.html"]');
    const supportBtn = document.querySelector('.btn-support');
    const currentPath = window.location.pathname;

    const isAdminPage = currentPath.includes('/admin');
    const showAdminControls = window.isAdmin && !isAdminPage;

    if (showAdminControls) {
      adminElements.forEach(el => { if (el) el.style.display = ''; });
      if (logoutBtn) logoutBtn.style.display = 'inline-flex';
      if (applicationsLink) applicationsLink.style.display = 'inline-flex';
      if (reviewsLink) reviewsLink.style.display = 'inline-flex';
      if (supportBtn) supportBtn.style.display = 'none';
    } else {
      adminElements.forEach(el => { if (el) el.style.display = 'none'; });
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (applicationsLink) applicationsLink.style.display = 'none';
      if (reviewsLink) reviewsLink.style.display = 'none';
      if (supportBtn && !window.isAdmin) supportBtn.style.display = 'inline-flex';
    }
  }

  function handleCredentialResponse(response) {
    const token = response.credential;
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.email === ADMIN_EMAIL) {
        window.isAdmin = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminEmail', payload.email);
        updateAdminUI();

        // Виправлено: більше НЕ перекидаємо на головну з адмін-сторінок
        // Просто перезавантажуємо ту саму сторінку, щоб оновився UI
        location.reload();
      } else {
        alert('Доступ заборонено. Тільки для ' + ADMIN_EMAIL);
        signOut();
      }
    } catch (e) {
      console.error('Помилка декодування токена', e);
    }
  }

  window.signOut = function() {
    window.isAdmin = false;
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    updateAdminUI();
    if (google && google.accounts) {
      google.accounts.id.disableAutoSelect();
    }
    location.reload();
  };

  function initGoogleAuth() {
    // На всіх сторінках шукаємо кнопку з класом google-login-btn
    const loginBtn = document.querySelector('.google-login-btn');
    if (!loginBtn) return;  // якщо немає кнопки – нічого не робимо

    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')) {
      console.warn('Google Client ID не налаштований. Admin-функції не працюватимуть.');
      return;
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    google.accounts.id.renderButton(loginBtn, {
      type: 'standard',
      theme: 'outline',
      size: 'medium',
      text: 'signin_with',
      shape: 'pill',
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateAdminUI();
    if (typeof google !== 'undefined' && google.accounts) {
      initGoogleAuth();
    } else {
      const checkGoogle = setInterval(() => {
        if (typeof google !== 'undefined' && google.accounts) {
          clearInterval(checkGoogle);
          initGoogleAuth();
        }
      }, 200);
    }
  });
})();