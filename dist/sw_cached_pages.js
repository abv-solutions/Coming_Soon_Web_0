const cacheName = 'v1';
// Cached pages
const cacheAssets = [
  'index.html',
  '/css/style.css',
  '/js/main.js',
  '/img/logo_white_nobg.png',
  '/img/laptop3.jpg'
];
// Call Install Event
self.addEventListener('install', e => {
  // Add cached files
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => cache.addAll(cacheAssets))
      .then(() => self.skipWaiting())
  );
});
// Call Activate Event
self.addEventListener('activate', e => {
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cache => {
        if (cache !== cacheName) {
          return caches.delete(cache);
        }
      }));
    })
  );
});
// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  );
});
