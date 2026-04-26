import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px',
          border: '6px solid rgba(57, 255, 20, 0.5)',
          boxShadow: '0 0 40px rgba(57, 255, 20, 0.3)',
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100" 
          height="100" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#39ff14" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 12h.01"/>
          <path d="M7.5 4.2c-.3-.5-.9-.7-1.3-.4C4 5.5 2.7 8.1 2.3 11c-.1.5.3 1 .8 1.1l7.6-2-3.2-5.9z"/>
          <path d="M16.5 4.2c.3-.5.9-.7 1.3-.4C20 5.5 21.3 8.1 21.7 11c.1.5-.3 1-.8 1.1l-7.6-2 3.2-5.9z"/>
          <path d="M12 15c-3.3 0-6.1 1.9-7.5 4.6-.2.4 0 1 .5 1.2 2 .6 4.3.9 6.8.9 2.5 0 4.8-.3 6.8-.9.5-.2.7-.8.5-1.2C18.1 16.9 15.3 15 12 15z"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
