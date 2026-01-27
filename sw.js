const CACHE_NAME = 'paris-store-v19'; // Version 19 (Correction Images)

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js',
  // La librairie Code-Barres
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js'
];

// INSTALLATION
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ACTIVATION (Nettoyage)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// INTERCEPTION (Le Cerveau)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. CSV : Réseau d'abord (pour les prix)
  if (url.pathname.endsWith('base.csv')) {
    event.respondWith(
      fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        }).catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // 2. IMAGES : Cache d'abord + Sauvegarde auto
  if (url.pathname.includes('/images/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Si l'image est déjà là, on la donne tout de suite !
        if (response) { return response; }
        
        // Sinon on la télécharge et on la garde
        return fetch(event.request).then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        });
      })
    );
    return;
  }

  // 3. LE RESTE (Scripts, Pages...)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});