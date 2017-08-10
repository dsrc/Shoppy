var CACHENAME = "ShoppyCache-v75";

// var filesToCache = [
//     '.',
//     '/',
//     '/index.html',
//     // '/search',
//     // '/details',
//     // '/sync',
//     '/external-files/products.js',
//     '/assets/image/UnAvailable.png'
// ];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if ([CACHENAME].indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    // event.waitUntil(
    //     caches.open(CACHENAME).then(function(cache) {
    //         return cache.addAll(filesToCache);
    //     })
    // );
});



self.addEventListener('fetch', event => {
  event.respondWith(
    // check if the resource was cached before
    caches.match(event.request).then(response => {
        if (event.request.url.indexOf("img/thumb/") > -1) {
            // For image request
            if(response){
                return response;
            }
            // Else get from network
            return fetch(event.request).then(networkResponse => {
                if (networkResponse == null) { // || networkResponse.status != 200
                    //return networkResponse;
                    return caches.match('/assets/image/UnAvailable.png');                    
                } else {
                    // cache the newly fetched resource and serve it
                    let responseCopy = networkResponse.clone();
                    addToCache(event.request, responseCopy); // this is a custom function, I'll elaborate on it later
                    return networkResponse;
                }
            })
            .catch(() => {
                return caches.match('/assets/image/UnAvailable.png');
            });
            
        }
        //  else if (event.request.url.indexOf("get/products") > -1) {
        //     return new Response(JSON.stringify([]), {headers: {'Content-Type': 'application/json'}});
        // } 
        else {
            // Other requests
            // serve the resource if cached, otherwise fetch it through the network

            return response || fetch(event.request).then(networkResponse => {
                if(networkResponse == null){
                    return networkResponse;
                }
                else
                {
                    // cache the newly fetched resource and serve it
                    let responseCopy = networkResponse.clone();
                    // var url = new URL(event.request.url);
                    // if(filesToCache.includes(url.pathname))
                    {
                        addToCache(event.request, responseCopy); // this is a custom function, I'll elaborate on it later
                    }           
                    return networkResponse;
                }
            })
            .catch(() => {
                // return caches.match('/offline/');
            });
        }
        
    })
  );
});

const addToCache = (request, response) => {
    caches.open(CACHENAME).then(cache => cache.put(request, response)).catch(error => { console.log("catch Error"); console.log(error);});
};

// called from index.html
const trimCache = (cacheName, maxItems) => {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > maxItems)
          cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
    });
  });
};

self.addEventListener('message', event => {
    if(event.data.command == 'trimCache') {
        // trimCache(CACHENAME, filesToCache.length);
        trimCache(CACHENAME, 30);
    }
});