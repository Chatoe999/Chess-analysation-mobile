const V='razbor-v2',
 SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','chess.min.js','stockfish.js'],
 LIBS=['https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.2/chess.min.js','https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.allSettled([...SHELL,...LIBS].map(u=>c.add(u)))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const r=e.request,h=new URL(r.url).hostname;
 if(r.method!=='GET'||/(^|\.)(chess\.com|lichess\.org)$/.test(h))return;
 e.respondWith(caches.match(r).then(hit=>{
  const net=fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const cp=x.clone();caches.open(V).then(c=>c.put(r,cp))}return x}).catch(()=>hit);
  return hit||net}))});
