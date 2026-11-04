(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Entrada de la portada */
  var hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(function () { hero.classList.add('in'); });

  /* Aparición de secciones */
  var sections = Array.prototype.slice.call(document.querySelectorAll('.sec'));
  if ('IntersectionObserver' in window && !reduce) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    sections.forEach(function (s) { reveal.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add('in'); });
  }

  /* La ventana fija: cambia la foto según la sección */
  var shots = {};
  Array.prototype.forEach.call(document.querySelectorAll('.shot'), function (f) {
    shots[f.getAttribute('data-shot')] = f;
  });
  var cap = document.getElementById('stage-cap');
  var current = 'casa';

  function setShot(name, text) {
    if (!shots[name] || name === current) return;
    shots[current].classList.remove('is-on');
    shots[name].classList.add('is-on');
    current = name;
    if (cap && text) cap.textContent = text;
  }

  var watchers = Array.prototype.slice.call(document.querySelectorAll('.hero[data-shot], .sec[data-shot]'));

  function syncShot() {
    var mid = window.innerHeight * 0.5;
    var best = null;
    var bestDist = Infinity;
    watchers.forEach(function (w) {
      var r = w.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var d = Math.abs((r.top + r.bottom) / 2 - mid);
      if (d < bestDist) { bestDist = d; best = w; }
    });
    if (best) setShot(best.getAttribute('data-shot'), best.getAttribute('data-cap'));
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { syncShot(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', syncShot);
  syncShot();

  /* Filtro de la carta */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('#menu-list .row'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('#menu-list .group'));
  var status = document.getElementById('filter-status');

  function applyFilter(kind) {
    var shown = 0;
    rows.forEach(function (row) {
      var on = kind === 'todo' || row.getAttribute('data-cat') === kind;
      row.hidden = !on;
      if (on) shown++;
    });
    groups.forEach(function (g) {
      var any = g.querySelector('.row:not([hidden])');
      g.hidden = !any;
    });
    if (status) {
      status.textContent = kind === 'todo'
        ? 'Toda la carta, ' + shown + ' platos.'
        : shown + (shown === 1 ? ' plato' : ' platos') + ' en esta sección.';
    }
    chips.forEach(function (c) {
      c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === kind));
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      applyFilter(chip.getAttribute('data-filter'));
    });
  });

  if (status) status.textContent = 'Toda la carta, ' + rows.length + ' platos.';
})();
