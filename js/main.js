'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // 2. Theme Toggle with LocalStorage persistence
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // 3. Certificate Modal Lightbox Handler
  const modal = document.getElementById('cert-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-cert-img');
  const closeModalBtn = document.getElementById('close-modal');
  const certButtons = document.querySelectorAll('.view-cert-btn');

  certButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const certTitle = btn.getAttribute('data-cert-title') || 'Certificate Preview';
      const certImgUrl = btn.getAttribute('data-cert-img') || '';

      // Validate that only trusted HTTPS Accredible URLs are loaded
      if (!certImgUrl.startsWith('https://api.accredible.com/')) {
        return;
      }

      if (modal && modalTitle && modalImg) {
        modalTitle.textContent = certTitle;
        modalImg.src = certImgUrl;
        modalImg.alt = `${certTitle} Official Certificate`;
        modal.showModal();
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.close();
    });

    // Close modal when clicking outside the dialog box
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const clickedInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!clickedInDialog) {
        modal.close();
      }
    });
  }
});