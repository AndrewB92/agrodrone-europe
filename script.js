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

const tabsWidgets = document.querySelectorAll("[data-tabs]");

tabsWidgets.forEach((widget) => {
  const tabs = Array.from(
    widget.querySelectorAll('[role="tab"]')
  );

  const panels = Array.from(
    widget.querySelectorAll('[role="tabpanel"]')
  );

  const activateTab = (tab, moveFocus = false) => {
    const targetId = tab.dataset.tabTarget;
    const targetPanel = widget.querySelector(`#${targetId}`);

    if (!targetPanel) {
      return;
    }

    tabs.forEach((item) => {
      const isActive = item === tab;

      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel === targetPanel;

      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;

      if (isActive) {
        panel.scrollTop = 0;
      }
    });

    tab.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });

    if (moveFocus) {
      tab.focus();
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(tab);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (index + 1) % tabs.length;
          break;

        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (index - 1 + tabs.length) % tabs.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = tabs.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });
});

document.documentElement.classList.add("js");

const revealGroups = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealGroups.forEach((group) => revealObserver.observe(group));
} else {
  revealGroups.forEach((group) => group.classList.add("is-visible"));
}
