const CACHE_NAME = "minesweeper-cache-v1";

// List every file in your project that should be cached
const ASSETS = [
  "./",
  "./index.html",
  "./css/main.css",
  "./css/digital-dismay.otf",
  "./css/micross.ttf",
  "./css/prstart.ttf",
  "./js/cell.js",
  "./js/main.js",
  "./images/bomb.png",
  "./images/cool-face.png",
  "./images/dead-face.png",
  "./images/easy.png",
  "./images/flag.png",
  "./images/hard.png",
  "./images/medium.png",
  "./images/mine-menu-icon.png",
  "./images/o-face.png",
  "./images/sad-face.png",
  "./images/smiley-face.png",
  "./images/start.png",
  "./images/window-controls.png",
  "./images/wrong-bomb.png"
];

// Install event: pre-cache everything
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate event: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch event: serve from cache, fallback to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedRes => {
      return cachedRes || fetch(event.request);
    })
  );
});
