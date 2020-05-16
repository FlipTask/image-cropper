(function () {
    'use strict';
    var staticFilesToCache = [
        '/',
        'offline.css',
        '/offline.html', 
        'https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap'
    ];

    var staticCaches = 'hacker-rank-cache'; //Will use Cache, falling back to Network.
    var apiCaches = "api-cache"; //Will use Cache then Network.

    self.addEventListener('install', function (event) {
        console.info('##Service Worker## Attempting to install service worker and cache static assets');
        event.waitUntil(caches.open(staticCaches).then(function (cache) {
            return cache.addAll(staticFilesToCache);
        }));
    });

    self.addEventListener('activate', function (event) {
        console.log('##Service Worker## Activating new service worker...');

        var cacheWhitelist = [staticCaches, apiCaches];

        event.waitUntil(caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            }));
        }));
    });

    /* if found in CACHE then return from CACHE else from NETWORK */
    self.addEventListener('fetch', function (event) {
        // console.log('Fetch event for >>>> ', event.request.url);
        if (event.request.mode === 'navigate') {
            event.respondWith((async() => {
                try {
                    // First, try to use the navigation preload response if it's supported.
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    // catch is only triggered if an exception is thrown, which is likely due to a
                    // network error. If fetch() returns a valid HTTP response with a response code
                    // in the 4xx or 5xx range, the catch() will NOT be called.
                    console.log('Fetch failed; returning offline page instead.', error);

                    const cache = await caches.open(staticCaches);
                    const cachedResponse = await cache.match("/offline.html");
                    return cachedResponse;
                }
            })());
        }
        // event.respondWith(caches.match(event.request).then(function (response) {
        //     if (response) {
        //         console.log('Found ', event.request.url, ' in cache');
        //         return response;
        //     }

        //     console.warn('##Service Worker##  Not in Cache... Making Network request for ', event.request.url);

        //     return fetch(event.request).then(function (response) {
        //         if (response.status === 404) {
        //             return caches.match('/offline.html');
        //         }

        //         return response
        //     });
        // }).catch(function (error) {
        //     console.error('##Service Worker##  Failed to fetch', event.request.url);
        //     return caches.match('/offline.html');
        // }));
    });

})();
