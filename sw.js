/* Service worker minimal : coquille + données en cache, images cache-first borné. */
var V = 'catpro-v1';
var SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  if (u.pathname.indexOf('/img/') === 0 || u.pathname.indexOf('img/') === 0) {
    e.respondWith(caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res.ok) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(e.request, cp); }); }
        return res;
      }).catch(function () { return hit; });
    }));
    return;
  }
  /* navigation + index.html : toujours frais (bypasse le cache HTTP/CDN),
     le cache ne sert que de repli hors-ligne */
  var isNav = e.request.mode === 'navigate' || /index\.html$/.test(u.pathname);
  e.respondWith(fetch(e.request, isNav ? { cache: 'no-store' } : undefined).then(function (res) {
    var cp = res.clone(); caches.open(V).then(function (c) { c.put(e.request, cp); });
    return res;
  }).catch(function () { return caches.match(e.request); }));
});
