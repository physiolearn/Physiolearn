const CACHE_NAME = 'physiolearn-v1';
const ASSETS = [
  '/Physiolearn/',
  '/Physiolearn/index.html',
  '/Physiolearn/login.html',
  '/Physiolearn/condition_library.html',
  '/Physiolearn/physio_student_hub.html',
  '/Physiolearn/patient_onboarding.html',
  '/Physiolearn/session.html',
  '/Physiolearn/manifest.json',
];

// Install — cache all core pages
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('/Physiolearn/index.html'));
    })
  );
});
