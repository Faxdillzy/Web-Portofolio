/* ================================
   FADILLAH ARYASETO - PORTFOLIO
   Main JavaScript
   Vanilla JS, no dependencies
   Single page (index.html), all features
   ================================ */

(function () {
  'use strict';

  /* ================================
     ELEMENTS
     ================================ */
  const body = document.body;
  const header = document.querySelector('.site-header');
  const themeToggle = document.querySelector('.theme-toggle');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const backToTop = document.querySelector('.back-to-top');
  const contactForm = document.getElementById('contact-form');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-links a');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  const THEME_KEY = 'portfolio-theme';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================================
     THEME (dark default + light toggle)
     ================================ */
  function setTheme(light) {
    body.classList.toggle('light-mode', light);
    localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
    updateThemeUI();
  }

  function updateThemeUI() {
    const isLight = body.classList.contains('light-mode');
    document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';

    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.setAttribute(
      'aria-label',
      isLight ? 'Switch to dark mode' : 'Switch to light mode'
    );
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    // Dark mode is the default theme; only switch to light if explicitly saved
    setTheme(saved === 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(!body.classList.contains('light-mode'));
    });
  }

  /* ================================
     HEADER SCROLL STATE
     ================================ */
  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (header) header.classList.toggle('scrolled', window.scrollY > 10);
        if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 600);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ================================
     MOBILE MENU
     ================================ */
  function openMenu() {
    if (!mobileMenu || !mobileOverlay) return;
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    if (mobileMenuClose) mobileMenuClose.focus();
  }

  function closeMenu() {
    if (!mobileMenu || !mobileOverlay) return;
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        if (mobileToggle) mobileToggle.focus();
      }
      closeLightbox();
    }
  });

  /* ================================
     SMOOTH SCROLL + CLOSE MENU ON LINK
     ================================ */
  function smoothScroll(target) {
    const el = document.querySelector(target);
    if (!el) return;
    const headerOffset = (header ? header.offsetHeight : 72) + 8;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const hash = link.getAttribute('href');
      if (hash.length <= 1) return;
      // Skip link needs native behavior to move keyboard focus
      if (link.classList.contains('skip-link')) return;
      e.preventDefault();
      closeMenu();
      smoothScroll(hash);
      history.replaceState(null, '', hash);
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ================================
     SCROLLSPY (active nav link)
     ================================ */
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + id;
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    mobileLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + id;
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ================================
     SCROLL REVEAL
     ================================ */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Reduced motion or no observer support: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ================================
     STAT COUNTERS
     ================================ */
  const statsPanel = document.querySelector('.stats-panel');

  function animateCounter(el, target) {
    const duration = reduceMotion ? 0 : 900;
    const startTime = performance.now();
    const suffix = el.classList.contains('stat-percent') ? '%' : '+';

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    el.textContent = '0' + suffix;
    requestAnimationFrame(tick);
  }

  if (statsPanel) {
    const statNumbers = statsPanel.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window && !reduceMotion) {
      const statsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              statsObserver.unobserve(entry.target);
              statNumbers.forEach(function (num) {
                animateCounter(num, parseInt(num.dataset.count, 10));
              });
            }
          });
        },
        { threshold: 0.4 }
      );
      statsObserver.observe(statsPanel);
    } else {
      statNumbers.forEach(function (num) {
        num.textContent = num.dataset.count + (num.classList.contains('stat-percent') ? '%' : '+');
      });
    }
  }

  /* ================================
     CONTACT FORM VALIDATION
     ================================ */
  if (contactForm) {
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message'),
    };
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnHTML = submitBtn.innerHTML;

    function setError(input, message) {
      const group = input.closest('.form-field');
      const errorEl = group.querySelector('.field-error');
      group.classList.add('has-error');
      errorEl.textContent = message;
    }

    function clearError(input) {
      const group = input.closest('.form-field');
      group.classList.remove('has-error');
    }

    function validateField(input) {
      const value = input.value.trim();
      const name = input.name;

      if (!value) {
        setError(input, 'This field is required.');
        return false;
      }

      if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError(input, 'Enter a valid email address.');
        return false;
      }

      if (name === 'message' && value.length < 10) {
        setError(input, 'Message must be at least 10 characters.');
        return false;
      }

      clearError(input);
      return true;
    }

    // Clear errors as the user types
    Object.values(fields).forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.closest('.form-field').classList.contains('has-error')) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      Object.values(fields).forEach(function (input) {
        if (!validateField(input)) isValid = false;
      });

      if (!isValid) return;

      // Simulated submit with loading + success states
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';

      setTimeout(function () {
        submitBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Message Sent!';
        contactForm.reset();

        setTimeout(function () {
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.disabled = false;
        }, 2600);
      }, 1200);
    });
  }

  /* ================================
     LIGHTBOX (certificate page)
     ================================ */
  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImg) lightboxImg.src = '';
    body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function () {
      openLightbox(el.getAttribute('data-lightbox'));
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ================================
     INIT
     ================================ */
  initTheme();
})();