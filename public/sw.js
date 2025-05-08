const CACHE_NAME = 'edusic-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
  // Ajoute d'autres fichiers ici UNIQUEMENT s'ils existent dans le dossier public/
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const isApi = request.url.includes('/api/');

  if (isApi) {
    // Network First pour les API
    event.respondWith(
      fetch(request)
        .then((response) => {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
          return response;
        })
        .catch(() => caches.match(request))
    );
  } else {
    // Cache First pour le reste, avec fallback offline
    event.respondWith(
      caches.match(request)
        .then((response) => response || fetch(request))
        .catch(() => caches.match('/offline.html'))
    );
  }
});