const CACHE_NAME = 'paris-store-v20'; // Changement de version OBLIGATOIRE

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js',
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force l'activation immédiate
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  // NETTOYAGE AGRESSIF : On supprime TOUT ce qui n'est pas la v20
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Suppression vieux cache:", cache);
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

  // 1. Gestion CSV (Réseau d'abord)
  if (url.pathname.endsWith('base.csv')) {
    event.respondWith(
      fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // 2. Gestion IMAGES (Cache d'abord, mais INTELLIGENT)
  if (url.pathname.includes('/images/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response; // Si c'est en cache, on rend.
        
        return fetch(event.request).then((networkResponse) => {
            // SÉCURITÉ : On ne met en cache que si l'image existe vraiment (Code 200)
            // Ça évite de stocker des "Erreurs 404"
            if (!networkResponse || networkResponse.status !== 200) {
                return networkResponse;
            }
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Le reste
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});