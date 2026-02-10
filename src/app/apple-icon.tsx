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
          fontSize: 100,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px',
          border: '6px solid #39ff14',
          boxShadow: '0 0 40px rgba(57, 255, 20, 0.3)',
        }}
      >
        ☢️
      </div>
    ),
    {
      ...size,
    }
  )
}
