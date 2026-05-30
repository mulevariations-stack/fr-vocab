const CACHE_NAME = 'fr-vocab-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// インストール時にキャッシュを保存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// オフライン時はキャッシュから読み込む
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあればそれを返し、なければネットワークへ取りに行く
        return response || fetch(event.request);
      })
  );
});
