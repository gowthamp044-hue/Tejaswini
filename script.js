/* =========================================================
   Tejaswini Arava — QA Engineer Portfolio
   Navigation, scroll effects and copy-email interaction
   ========================================================= */

(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  var navLinks = document.querySelectorAll('.nav-link');
  var mobileQuery = window.matchMedia('(max-width: 960px)');

  /* ---------- Mobile navigation ---------- */
  function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    navMenu.classList.toggle('is-open', open);
  }

  function isMenuOpen() {
    return navToggle.getAttribute('aria-expanded') === 'true';
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      setMenu(!isMenuOpen());
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (mobileQuery.matches) setMenu(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isMenuOpen()) {
        setMenu(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (isMenuOpen() && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        setMenu(false);
      }
    });

    var onBreakpointChange = function (event) {
      if (!event.matches) setMenu(false);
    };
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', onBreakpointChange);
    } else if (mobileQuery.addListener) {
      mobileQuery.addListener(onBreakpointChange);
    }
  }

  /* ---------- Header shadow on scroll ---------- */
  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- Active section highlighting ---------- */
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // The active section is the last one whose top has passed a line 35% down the viewport.
  // No link is highlighted while the hero is in view.
  function updateActiveLink() {
    var line = window.innerHeight * 0.35;
    var currentId = '';
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    if (atBottom && sections.length) {
      currentId = sections[sections.length - 1].id;
    } else {
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= line) currentId = section.id;
      });
    }
    setActiveLink(currentId);
  }

  if (sections.length) {
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  /* ---------- Copy email ---------- */
  var copyButton = document.getElementById('copy-email');
  var copyStatus = document.getElementById('copy-status');
  var copyTimer;

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return fallbackCopy(text); }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  if (copyButton && copyStatus) {
    var label = copyButton.querySelector('.copy-label');

    copyButton.addEventListener('click', function () {
      var email = copyButton.getAttribute('data-email');

      copyText(email).then(function (ok) {
        clearTimeout(copyTimer);
        if (ok) {
          copyButton.classList.add('is-copied');
          if (label) label.textContent = 'Copied!';
          copyStatus.textContent = 'Email address copied to your clipboard.';
        } else {
          copyStatus.textContent = 'Copy is not available in this browser. My email is ' + email + '.';
        }
        copyTimer = setTimeout(function () {
          copyButton.classList.remove('is-copied');
          if (label) label.textContent = 'Copy email';
          copyStatus.textContent = '';
        }, 3000);
      });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
