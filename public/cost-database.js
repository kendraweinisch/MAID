/* Cost database: filters the table by kind of care and by provider or place.
   Runs only in the browser; nothing is sent anywhere. */
(function () {
  'use strict';
  var care = document.getElementById('db-care');
  var place = document.getElementById('db-place');
  var count = document.getElementById('db-count');
  var rows = document.querySelectorAll('.db-table tbody tr');
  if (!care || !place || !rows.length) return;
  function update() {
    var c = care.value, q = place.value.trim().toLowerCase(), shown = 0;
    Array.prototype.forEach.call(rows, function (r) {
      var ok = (!c || r.getAttribute('data-care') === c) && (!q || r.getAttribute('data-text').indexOf(q) !== -1);
      r.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = shown + (shown === 1 ? ' report' : ' reports') + (shown < rows.length ? ' of ' + rows.length : '');
  }
  care.addEventListener('change', update);
  place.addEventListener('input', update);
})();
