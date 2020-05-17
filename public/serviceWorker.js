/* eslint-disable no-restricted-globals */
// eslint-disable-next-line func-names
(function () {
    const staticFilesToCache = [
        "/",
        "offline.css",
        "/offline.html",
        "https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap"
    ];

    const staticCaches = "hacker-rank-cache"; // Will use Cache, falling back to Network.
    const apiCaches = "api-cache"; // Will use Cache then Network.

    self.addEventListener("install", (event) => {
        console.info("##Service Worker## Attempting to install service worker and cache static assets");
        event.waitUntil(caches.open(staticCaches).then((cache) => cache.addAll(staticFilesToCache)));
    });

    self.addEventListener("activate", (event) => {
        console.log("##Service Worker## Activating new service worker...");

        const cacheWhitelist = [staticCaches, apiCaches];

        event.waitUntil(caches.keys().then((cacheNames) => Promise.all(cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
            }
            return null;
        }))));
    });

    /* if found in CACHE then return from CACHE else from NETWORK */
    self.addEventListener("fetch", (event) => {
        // console.log("Fetch event for >>>> ", event.request.url);
        if (event.request.mode === "navigate") {
            event.respondWith((async () => {
                try {
                    // First, try to use the navigation preload response if it"s supported.
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
                    console.log("Fetch failed; returning offline page instead.", error);

                    const cache = await caches.open(staticCaches);
                    const cachedResponse = await cache.match("/offline.html");
                    return cachedResponse;
                }
            })());
        }
    });
}());
