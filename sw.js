self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('eslam-app').then(cache => {
      return cache.addAll([
        '/',
        '/index.php',
        '/logo_app.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});