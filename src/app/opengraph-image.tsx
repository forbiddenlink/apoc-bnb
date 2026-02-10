import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'APOC-BNB - Survival is Luxury'
export const size = {
  width: 1200,
  height: 630,
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
        {/* Scanline effect overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
            opacity: 0.3,
          }}
        />

        {/* Radiation symbol */}
        <div
          style={{
            display: 'flex',
            fontSize: 120,
            marginBottom: 20,
          }}
        >
          ☢️
        </div>

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            fontSize: 80,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-4px',
            textTransform: 'uppercase',
          }}
        >
          APOC-BNB
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            fontWeight: 600,
            color: '#39ff14',
            marginTop: 20,
            textShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
          }}
        >
          Survival is Luxury
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: '#a1a1a1',
            marginTop: 30,
            maxWidth: 600,
            textAlign: 'center',
          }}
        >
          Premium bunker rentals for the post-apocalyptic elite
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #39ff14, #ffea00, #ff003c)',
          }}
        />

        {/* Corner decorations */}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 30,
            width: 60,
            height: 60,
            borderLeft: '4px solid #39ff14',
            borderTop: '4px solid #39ff14',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 30,
            right: 30,
            width: 60,
            height: 60,
            borderRight: '4px solid #39ff14',
            borderTop: '4px solid #39ff14',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 38,
            left: 30,
            width: 60,
            height: 60,
            borderLeft: '4px solid #39ff14',
            borderBottom: '4px solid #39ff14',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 38,
            right: 30,
            width: 60,
            height: 60,
            borderRight: '4px solid #39ff14',
            borderBottom: '4px solid #39ff14',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
