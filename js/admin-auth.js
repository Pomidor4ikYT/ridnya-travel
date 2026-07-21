// js/admin-auth.js
(function() {
  'use strict';

  const GOOGLE_CLIENT_ID = '738790400825-1nk23hrsuk3svfa8e1ess8q22kbi9pa3.apps.googleusercontent.com';
  const ADMIN_EMAIL = 'ridnyatravel@gmail.com';

  // Перевірка статусу адміна при завантаженні
  (function immediateCheck() {
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    const email = sessionStorage.getItem('adminEmail');
    window.isAdmin = (loggedIn === 'true' && email === ADMIN_EMAIL);
  })();

  /**
   * Оновлює інтерфейс: показує/ховає кнопку "Адмін-панель" та "Підтримати"
   */
  function updateAdminUI() {
    const adminLink = document.getElementById('adminPanelLink');
    const supportBtn = document.querySelector('.btn-support');
    const currentPath = window.location.pathname;
    const isAdminPage = currentPath.includes('/admin');

    if (window.isAdmin && !isAdminPage) {
      // На головному сайті – показуємо кнопку адмін-панелі, ховаємо Підтримати
      if (adminLink) {
        adminLink.style.display = 'inline-flex';
        adminLink.href = '/admin/dashboard.html';
      }
      if (supportBtn) supportBtn.style.display = 'none';
    } else {
      if (adminLink) adminLink.style.display = 'none';
      if (supportBtn && !window.isAdmin) supportBtn.style.display = 'inline-flex';
    }
  }

  /**
   * Обробка відповіді від Google OAuth
   */
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
        // Якщо на головній – перенаправляємо в адмін-панель
        if (!window.location.pathname.includes('/admin')) {
          window.location.href = '/admin/dashboard.html';
        } else {
          location.reload();
        }
      } else {
        alert('Доступ заборонено. Тільки для ' + ADMIN_EMAIL);
        window.signOut();
      }
    } catch (e) {
      console.error('Помилка декодування токена', e);
    }
  }

  /**
   * Вихід з облікового запису адміна
   */
  window.signOut = function() {
    window.isAdmin = false;
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    updateAdminUI();
    if (google && google.accounts) {
      google.accounts.id.disableAutoSelect();
    }
    // Перенаправлення на головну або сторінку входу
    if (!window.location.pathname.includes('/admin')) {
      location.reload();
    } else {
      window.location.href = '/';
    }
  };

  /**
   * Ініціалізація кнопки Google Login
   */
  function initGoogleAuth() {
    const loginBtn = document.querySelector('.google-login-btn');
    if (!loginBtn) return;
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')) {
      console.warn('Google Client ID не налаштований.');
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

  // Запуск після завантаження DOM
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