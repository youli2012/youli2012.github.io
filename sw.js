// Service Worker - 缓存所有音乐文件
const CACHE_NAME = 'music-cache-v1';

// 安装时预缓存所有音乐
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // 缓存10首音乐
      return cache.addAll([
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music01.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music02.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music03.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music04.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music05.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music06.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music07.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music08.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music09.mp3',
        'https://cdn.jsdelivr.net/gh/youli2012/youli2012.github.io@main/music/music10.mp3'
      ]);
    })
  );
  self.skipWaiting();
});

// 拦截网络请求，优先从缓存返回
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

// 更新缓存
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
          .map(function(n) { return caches.delete(n); })
      );
    })
  );
});
