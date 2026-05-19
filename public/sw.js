const CACHE_VERSION = 'v2'
const STATIC_CACHE  = `ai-literacy-static-${CACHE_VERSION}`
const PAGES_CACHE   = `ai-literacy-pages-${CACHE_VERSION}`
const ALL_CACHES    = [STATIC_CACHE, PAGES_CACHE]

// Pre-cache lightweight shell pages on install
const PRECACHE_PAGES = ['/', '/tracks', '/offline']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGES_CACHE)
      .then(cache => cache.addAll(PRECACHE_PAGES).catch(() => {}))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !ALL_CACHES.includes(k)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  // Never cache API routes or auth callbacks
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/auth/')) return

  // Next.js static chunks — cache first (filenames include content hashes)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(STATIC_CACHE).then(c => c.put(request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // Next.js image optimization — cache first with network refresh
  if (url.pathname.startsWith('/_next/image')) {
    event.respondWith(
      caches.match(request).then(cached => {
        const networkFetch = fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(STATIC_CACHE).then(c => c.put(request, clone))
          }
          return response
        })
        return cached || networkFetch
      })
    )
    return
  }

  // HTML navigation — network first, fall back to cache, then offline page
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(PAGES_CACHE).then(c => c.put(request, clone))
        }
        return response
      })
      .catch(() =>
        caches.match(request)
          .then(cached => cached || caches.match('/offline'))
      )
  )
})

// ── Push notifications ────────────────────────────────────────────────────────

self.addEventListener('push', (event) => {
  let data = {}
  try { data = event.data?.json() ?? {} } catch {}
  const title = data.title ?? 'AI Literacy'
  const options = {
    body: data.body ?? 'Keep your learning streak alive!',
    icon: '/icon/192',
    badge: '/icon/32',
    data: { url: data.url ?? '/dashboard' },
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  if (event.action === 'dismiss') return
  const url = event.notification.data?.url ?? '/dashboard'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(wins => {
      const existing = wins.find(w => w.url.includes(self.location.origin))
      if (existing) return existing.focus().then(w => w.navigate(url))
      return clients.openWindow(url)
    })
  )
})
