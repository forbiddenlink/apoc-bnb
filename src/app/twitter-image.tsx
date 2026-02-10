import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'APOC-BNB - Survival is Luxury'
export const size = {
  width: 1200,
  height: 600,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a1a 0%, #0a0a0a 50%)',
          position: 'relative',
        }}
      >
        {/* Radiation symbol */}
        <div
          style={{
            display: 'flex',
            fontSize: 100,
            marginBottom: 10,
          }}
        >
          ☢️
        </div>

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-3px',
            textTransform: 'uppercase',
          }}
        >
          APOC-BNB
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 600,
            color: '#39ff14',
            marginTop: 16,
            textShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
          }}
        >
          Survival is Luxury
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #39ff14, #ffea00, #ff003c)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
