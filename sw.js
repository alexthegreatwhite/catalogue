const CACHE_NAME = 'paris-store-v25'; // VERSION 25

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js',
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js',
  './base.csv' // INDISPENSABLE POUR LE OFFLINE
];

// INSTALLATION
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
});

// ACTIVATION (Nettoyage vieux cache)
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});

// INTERCEPTION RESEAU
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. CSV : Réseau d'abord (pour avoir les prix à jour), Cache sinon
  if (url.pathname.endsWith('base.csv')) {
    event.respondWith(
      fetch(event.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return res;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // 2. IMAGES : Cache d'abord + Sauvegarde auto
  if (url.pathname.includes('/images/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        return fetch(event.request).then((networkResponse) => {
            // On ne cache que si l'image existe vraiment (Code 200)
            if(!networkResponse || networkResponse.status !== 200) return networkResponse;
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return networkResponse;
        });
      })
    );
    return;
  }

  // 3. LE RESTE : Cache d'abord
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});