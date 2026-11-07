/* Кэшируем только файлы, которые реально лежат в репозитории.
   chess.js и Stockfish загружаются с CDN и перечислены в LIBS ниже. */
const V='razbor-v4',
 SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'],
 LIBS=['https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.2/chess.min.js','https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.allSettled([...SHELL,...LIBS].map(u=>c.add(new Request(u,{cache:'reload'}))))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
