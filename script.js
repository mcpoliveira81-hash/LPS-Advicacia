/* LPS Advocacia — interações */
(function () {
  'use strict';

  /* ---------- Header ao rolar ---------- */
  var header = document.getElementById('header');
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobile-menu');

  var closeMenu = function () {
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Animações de entrada ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var observerFired = false;

  var showAll = function () {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  };

  if (!('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observerFired = true;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el) { io.observe(el); });

    /* Rede de segurança: se o observer não disparar (documento oculto,
       ambiente sem suporte), exibe o conteúdo para não deixar a página vazia. */
    setTimeout(function () { if (!observerFired) showAll(); }, 2000);
  }

  /* ---------- Link ativo no menu ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === '#' + id
          );
        });
      });
    }, { threshold: 0.45 });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();
