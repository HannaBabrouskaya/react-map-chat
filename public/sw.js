// importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js");
// workbox.routing.registerRoute(
//     /\.(?:js|css)$/,
//     workbox.strategies.staleWhileRevalidate(),
// );

// workbox.routing.registerRoute(
//     new RegExp('https://maps.(?:googleapis|gstatic).com/(.*)'),
//     workbox.strategies.staleWhileRevalidate({
//       cacheName: 'googleapis'
//     }),
// );

// without workbox
const filesToCache = [
    './',
    './index.html',
    './public/style.css'
];

self.addEventListener('install', async event => {
    console.log('[ServiceWorker] Install');
    const cacheName = 'map-static';
    const cache = await caches.open(cacheName);
    cache.addAll(filesToCache);
});

self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});
  
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}
  
async function networkFirst(request) {
    const dynamicCache = await caches.open('map-dynamic');
    try {
        const networkResponse = await fetch(request);
        dynamicCache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (err) {
        const cachedResponse = await dynamicCache.match(request);
        return cachedResponse;
    }
}