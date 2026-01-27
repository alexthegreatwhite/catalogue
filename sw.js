const CACHE_NAME = 'paris-store-v1'; 

// C'est ici que ça plantait. J'ai remis les BONS noms de tes fichiers.
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './base.csv',
  './manifest.json',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png',
  './apple-touch-icon.png',
  // On cache la librairie pour qu'elle marche hors ligne
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js'
];

// INSTALLATION (Si un fichier manque ici, l'installation s'annule pour éviter les bugs)
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ACTIVATION (Nettoyage des vieilles versions)
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

// INTERCEPTION (Stratégie : Cache d'abord, Internet ensuite)
self.addEventListener('fetch', (event) => {
  // On ignore les requêtes bizarres (chrome-extension, etc)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si c'est dans le cache, on le rend direct (Vitesse max)
      if (response) {
        return response;
      }
      // Sinon on va chercher sur internet
      return fetch(event.request).catch(() => {
        // Si pas d'internet et pas en cache, on ne fait rien (ou on pourrait mettre une image d'erreur)
      });
    })
  );
});