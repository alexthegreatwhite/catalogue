// CHANGE CE NUMÉRO A CHAQUE FOIS QUE TU MODIFIES LE CODE HTML OU AJOUTES DES IMAGES
const CACHE_NAME = 'paris-store-v13'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js'
  // NOTE : J'ai retiré base.csv d'ici pour le gérer à part (voir plus bas)
];

// 1. INSTALLATION
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. ACTIVATION (Nettoyage automatique des vieux caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Nettoyage ancienne version :", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. INTERCEPTION INTELLIGENTE (C'est ici que la magie opère)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // CAS A : C'est le fichier CSV (Les données)
  // STRATÉGIE : "Network First" (Internet d'abord, Cache en secours)
  if (url.pathname.endsWith('base.csv')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Si on a internet, on prend le nouveau fichier ET on le met en cache pour la prochaine fois
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          // Si pas internet, on rend la version en cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // CAS B : C'est une image ou le code du site
  // STRATÉGIE : "Cache First" (Vitesse maximale)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});