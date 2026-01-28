const CACHE_NAME = 'paris-store-v22'; // Version 22

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js',
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js',
  './base.csv' // <--- AJOUT CRUCIAL : On force le CSV à s'installer direct !
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Mise en cache des fichiers obligatoires...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Nettoyage vieux cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. CSV : On essaie internet pour avoir les prix à jour, sinon on prend le cache
  if (url.pathname.endsWith('base.csv')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Si internet marche, on met à jour le cache pour la prochaine fois
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // Si pas d'internet, on rend la version stockée (qui existe forcément maintenant)
          return caches.match(event.request);
        })
    );
    return;
  }

  // 2. IMAGES : Cache d'abord
  if (url.pathname.includes('/images/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        return fetch(event.request).then((networkResponse) => {
            if(!networkResponse || networkResponse.status !== 200) return networkResponse;
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return networkResponse;
        });
      })
    );
    return;
  }

  // 3. LE RESTE
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});