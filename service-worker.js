const CACHE='feralwild-1.1.1';
const FILES=['./','index.html','game.css','app.mjs','engine.mjs','data.mjs','saves.mjs','online.mjs','firebase-config.mjs','icon.svg','ferals-a.png','ferals-b.png','item-icons.png','item-art.mjs','audio.mjs','alerts.mjs'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('feralwild-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match('./'):Response.error()))));});

self.addEventListener('notificationclick',event=>{event.notification.close();const url=new URL('./',self.registration.scope).href;event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(async clients=>{const client=clients.find(c=>c.url.startsWith(self.registration.scope));if(client)return client.focus();return self.clients.openWindow(url);}));});
