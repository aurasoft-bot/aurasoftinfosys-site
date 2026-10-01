/* Aurasoft Infosys: the small bits of motion. Everything works without this file;
   it only adds the scroll reveals, the tap-to-peek redaction bars and a stamp easter egg. */
(function () {
  'use strict';
  var d = document;

  /* 1. Reveal things as they scroll into view */
  var items = [].slice.call(d.querySelectorAll('.rv'));
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* 2. Redaction bars: tap (or press Enter) to peek, on touch screens where hover does not exist */
  [].forEach.call(d.querySelectorAll('.red'), function (b) {
    var t;
    b.addEventListener('click', function () {
      b.classList.add('is-open');
      clearTimeout(t);
      t = setTimeout(function () { b.classList.remove('is-open'); }, 1800);
    });
  });

  /* 3. Click the rubber stamp to stamp it again */
  var stamp = d.querySelector('.stamp');
  if (stamp) {
    stamp.addEventListener('click', function () {
      stamp.classList.add('again');
      void stamp.offsetWidth;
      stamp.classList.remove('again');
    });
  }

  /* 4. A note for the curious */
  if (window.console && console.log) {
    console.log('%cpsst: we have receipts. howdy@aurasoftindex.com', 'font:700 16px Georgia,serif;color:#2B4BD7');
  }
})();
