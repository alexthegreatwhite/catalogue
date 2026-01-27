const CACHE_NAME = 'paris-store-v18'; // Version 18

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js',
  // La librairie code-barres (Indispensable) :
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Stratégie CSV : Réseau d'abord
  if (url.pathname.endsWith('base.csv')) {
    event.respondWith(fetch(event.request).then(res => caches.open(CACHE_NAME).then(cache => { cache.put(event.request, res.clone()); return res; })).catch(() => caches.match(event.request)));
    return;
  }
  
  // Stratégie Images : Cache d'abord + Sauvegarde auto
  if (url.pathname.includes('/images/')) {
    event.respondWith(caches.match(event.request).then(res => res || fetch(event.request).then(netRes => caches.open(CACHE_NAME).then(cache => { cache.put(event.request, netRes.clone()); return netRes; }))));
    return;
  }

  // Le reste : Cache d'abord
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});