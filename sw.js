/* Service worker minimal : coquille + données en cache, images cache-first borné. */
var V = 'catpro-v11';
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
  if (u.pathname.indexOf('/img/') >= 0 || u.pathname.indexOf('img/') === 0) {
    e.respondWith(caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res.ok) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(e.request, cp); }); }
        return res;
      }).catch(function () { return hit || new Response('', { status: 504, statusText: 'Offline' }); });
    }));
    return;
  }
  /* navigation + index.html + userdb.json : toujours frais (contourne max-age=600
     en passant e.request.url pour éviter TypeError sur Request mode=navigate) */
  var isUserDb = /userdb\.json$/.test(u.pathname);
  var isFresh = e.request.mode === 'navigate' || /\/$/.test(u.pathname) || /index\.html$/.test(u.pathname) || isUserDb;
  var netP = isFresh
    ? fetch(e.request.url, { cache: 'no-store', credentials: 'same-origin' })
    : fetch(e.request);
  e.respondWith(netP.then(function (res) {
    if (!u.search && res.ok && !isUserDb) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(e.request, cp); }); }
    return res;
  }).catch(function () { return caches.match(e.request, { ignoreSearch: true }); }));
});
