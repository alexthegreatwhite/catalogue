const CACHE_NAME = 'paris-store-v12';
// ... le reste du fichier reste identique à la version précédente ...

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './base.csv',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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
            console.log("Suppression vieux cache", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});