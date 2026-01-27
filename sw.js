const CACHE_NAME = 'paris-store-v17'; // Nouvelle version v17

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. CSV : Réseau prioritaire (pour avoir les prix à jour)
  if (url.pathname.endsWith('base.csv')) {
    event.respondWith(
      fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        }).catch(() => caches.match(event.request))
    );
    return;
  }

  // 2. IMAGES : C'est ici le secret.
  // Si l'URL contient "images", on essaie le Cache d'abord.
  // Si pas en cache, on télécharge ET on stocke immédiatement.
  if (url.pathname.includes('/images/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response; // Déjà en cache (Super !)
        
        return fetch(event.request).then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone()); // On garde pour le hors-ligne
                return networkResponse;
            });
        });
      })
    );
    return;
  }

  // 3. LE RESTE
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});