const CACHE_NAME = 'paris-store-v1'; // CHANGE CE NUMÉRO A CHAQUE MISE A JOUR (v2, v3...)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './base.csv',
  './manifest.json',
  './web-app-manifest-192x192',  // Mets ici le vrai nom de ton icône 192
  './web-app-manifest-512x512.png',  // Mets ici le vrai nom de ton icône 512
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js'
];

// 1. INSTALLATION : On met en cache les fichiers essentiels
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force le nouveau SW à s'activer immédiatement
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Mise en cache des fichiers...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. ACTIVATION : On nettoie les vieux caches (v1 quand on passe à v2)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Suppression du vieux cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Prend le contrôle de la page immédiatement
});

// 3. FETCH : Stratégie "Cache First" avec mise à jour réseau
// On sert le cache pour aller vite, mais si on n'a pas internet, ça marche quand même.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si trouvé dans le cache, on le rend. Sinon on va sur internet.
      return response || fetch(event.request);
    })
  );
});