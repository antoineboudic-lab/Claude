import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Literacy',
    short_name: 'AI Literacy',
    description: 'Personalised AI training for business professionals.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F0FDFA',
    theme_color: '#0D9488',
    categories: ['education', 'productivity'],
    icons: [
      {
        src: '/icon/32',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        description: 'Your learning dashboard',
      },
      {
        name: 'Review cards',
        url: '/review',
        description: 'Spaced repetition review session',
      },
      {
        name: 'Browse tracks',
        url: '/tracks',
        description: 'Explore all learning tracks',
      },
    ],
  }
}
