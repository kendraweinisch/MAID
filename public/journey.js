/* Journey progress: ticks are saved only in this browser (localStorage).
   Nothing is sent anywhere. If storage is unavailable, ticking still works
   for the current visit. */
(function () {
  'use strict';
  var progress = document.querySelector('.journey-progress');
  var boxes = document.querySelectorAll('input[data-step]');
  if (!progress || !boxes.length) return;
  var total = Number(progress.getAttribute('data-total'));

  function get(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
  function set(key, val) { try { if (val) window.localStorage.setItem(key, '1'); else window.localStorage.removeItem(key); } catch (e) { /* storage blocked */ } }

  function update() {
    var done = 0;
    Array.prototype.forEach.call(boxes, function (b) {
      var li = b.closest('.stop');
      if (b.checked) done++;
      if (li) li.classList.toggle('is-done', b.checked);
    });
    var tpl = progress.getAttribute('data-template') || '{done} of {total} stops done. Your ticks are saved only in this browser.';
    progress.textContent = tpl.replace('{done}', done).replace('{total}', total);
  }

  Array.prototype.forEach.call(boxes, function (b) {
    var key = 'eol-journey-' + b.getAttribute('data-step');
    b.checked = get(key) === '1';
    b.addEventListener('change', function () { set(key, b.checked); update(); });
  });
  update();
})();
