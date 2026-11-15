// Offline-Cache. Die App selbst (HTML) wird immer zuerst frisch aus dem Netz geholt,
// damit Updates sofort ankommen. Ohne Netz (z. B. im Studio) kommt sie aus dem Cache.
const CACHE = "trainingstagebuch-v5";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)); }
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isPage = req.mode === "navigate" || req.destination === "document" || /\/(index\.html)?$/.test(new URL(req.url).pathname);
  if (isPage) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      try {
        const r = await Promise.race([fetch(req, { cache: "no-store" }), timeout(4000)]);
        if (r && r.ok) { c.put("./index.html", r.clone()); c.put("./", r.clone()); }
        return r;
      } catch (err) {
        return (await c.match(req, { ignoreSearch: true })) || (await c.match("./index.html")) || Response.error();
      }
    })());
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
