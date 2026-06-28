(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('[data-mail-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get('subject') || 'Website request');
      const body = encodeURIComponent(
        [...data.entries()]
          .filter(([key]) => key !== 'subject')
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
      );
      window.location.href = `mailto:info@agrodroneeurope.com?subject=${subject}&body=${body}`;
    });
  });
})();
