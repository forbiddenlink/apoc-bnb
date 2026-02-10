import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'APOC-BNB - Survival is Luxury',
    short_name: 'APOC-BNB',
    description: 'Premium bunker rentals for the post-apocalyptic elite',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#39ff14',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['travel', 'lifestyle'],
    screenshots: [
      {
        src: '/opengraph-image',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
  }
}
