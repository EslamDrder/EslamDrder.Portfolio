const CACHE_NAME = 'eslam-app-v1';
const BASE_PATH = '/EslamDrder.Portfolio/';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        BASE_PATH,
        BASE_PATH + 'index.html',
        BASE_PATH + 'logo_app.png',
        BASE_PATH + 'manifest.json',
        BASE_PATH + 'style.css' // لو موجود عندك
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // تحديث الكاش تلقائيًا
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(res => {
          return res || caches.match(BASE_PATH + 'index.html');
        });
      })
  );
});
