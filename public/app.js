/* End of Life Atlas as an installable app: registers the offline service
   worker and shows the "Install the app" buttons where the browser offers
   installation. Nothing is sent anywhere; saved pages stay on this device. */
(function () {
  'use strict';
  var base = document.documentElement.getAttribute('data-base') || '';
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(base + '/sw.js', { scope: base + '/' }).catch(function () {});
    });
  }
  var deferred = null;
  var buttons = document.querySelectorAll('[data-install]');
  function show(on) {
    Array.prototype.forEach.call(buttons, function (b) { b.hidden = !on; });
  }
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    show(true);
  });
  Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener('click', function () {
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.finally(function () { deferred = null; show(false); });
    });
  });
  window.addEventListener('appinstalled', function () { show(false); });
})();
