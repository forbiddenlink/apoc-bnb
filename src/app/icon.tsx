import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '2px solid rgba(57, 255, 20, 0.3)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#39ff14"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: '20px', height: '20px' }}
        >
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M10.5 9.5l-3 -5" />
          <path d="M13.5 9.5l3 -5" />
          <path d="M12 15l0 6" />
          <path d="M12 15l0 6" transform="rotate(60 12 12)" />
          <path d="M12 15l0 6" transform="rotate(120 12 12)" />
          <path d="M12 15l0 6" transform="rotate(180 12 12)" />
          <path d="M12 15l0 6" transform="rotate(240 12 12)" />
          <path d="M12 15l0 6" transform="rotate(300 12 12)" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
