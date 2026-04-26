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
          backgroundColor: '#050505',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #152515 0%, #050505 60%)',
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
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
            opacity: 0.5,
          }}
        />

        {/* Radiation symbol */}
        <div
          style={{
            display: 'flex',
            marginBottom: 30,
            opacity: 0.9,
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="140" 
            height="140" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#39ff14" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 12h.01"/>
            <path d="M7.5 4.2c-.3-.5-.9-.7-1.3-.4C4 5.5 2.7 8.1 2.3 11c-.1.5.3 1 .8 1.1l7.6-2-3.2-5.9z"/>
            <path d="M16.5 4.2c.3-.5.9-.7 1.3-.4C20 5.5 21.3 8.1 21.7 11c.1.5-.3 1-.8 1.1l-7.6-2 3.2-5.9z"/>
            <path d="M12 15c-3.3 0-6.1 1.9-7.5 4.6-.2.4 0 1 .5 1.2 2 .6 4.3.9 6.8.9 2.5 0 4.8-.3 6.8-.9.5-.2.7-.8.5-1.2C18.1 16.9 15.3 15 12 15z"/>
          </svg>
        </div>

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textShadow: '0 0 30px rgba(57, 255, 20, 0.3)',
          }}
        >
          APOC-BNB
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontWeight: 600,
            color: '#39ff14',
            marginTop: 20,
            letterSpacing: '0.05em',
            textShadow: '0 0 20px rgba(57, 255, 20, 0.8)',
          }}
        >
          Survival is Luxury
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#888888',
            marginTop: 40,
            maxWidth: 700,
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}
        >
          PREMIUM BUNKER RENTALS FOR THE POST-APOCALYPTIC ELITE
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: 'linear-gradient(90deg, rgba(57,255,20,0.8), rgba(212,175,55,0.8), rgba(255,0,60,0.8))',
          }}
        />

        {/* Corner decorations */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 80,
            height: 80,
            borderLeft: '4px solid #39ff14',
            borderTop: '4px solid #39ff14',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 80,
            height: 80,
            borderRight: '4px solid #39ff14',
            borderTop: '4px solid #39ff14',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            width: 80,
            height: 80,
            borderLeft: '4px solid #39ff14',
            borderBottom: '4px solid #39ff14',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 80,
            height: 80,
            borderRight: '4px solid #39ff14',
            borderBottom: '4px solid #39ff14',
            opacity: 0.7,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
