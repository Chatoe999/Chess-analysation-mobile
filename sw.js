const V='razbor-v4',
 SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','chess.min.js','stockfish.js'],
 LIBS=['https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.2/chess.min.js','https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.allSettled([...SHELL,...LIBS].map(u=>c.add(new Request(u,{cache:'reload'}))))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||/(^|\.)(chess\.com|lichess\.org)$/.test(u.hostname))return;
 const save=x=>{if(x.ok||x.type==='opaque'){const cp=x.clone();caches.open(V).then(c=>c.put(r,cp))}return x};
 e.respondWith(u.origin===location.origin
  ?fetch(r.url,{cache:'no-cache'}).then(save).catch(()=>caches.match(r))
  :caches.match(r).then(hit=>hit||fetch(r).then(save)))});
