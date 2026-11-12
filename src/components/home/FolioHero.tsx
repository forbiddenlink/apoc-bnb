'use client'

import { animate, useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { useAppStore } from '@/lib/store'
import { needleAngle, readingAt, stampVisible } from './descent'

const RAD_OPTIONS = [0, 1, 2, 3, 5, 10]

function Dosimeter({ progress }: { progress: number }) {
  const reading = readingAt(progress)
  const angle = needleAngle(reading)
  const ticks = Array.from({ length: 17 }, (_, i) => i)
  return (
    <figure
      className="relative mx-auto w-full max-w-[34rem] pt-24 min-[1400px]:pt-0"
      aria-label={`Dosimeter reading ${reading.toFixed(1)} millisieverts per hour`}
    >
      <svg viewBox="0 0 400 250" className="w-full" role="img" aria-hidden="true">
        <path d="M 30 210 A 170 170 0 0 1 370 210" fill="none" stroke="#15130f" strokeWidth="2" />
        <path
          d="M 50 210 A 150 150 0 0 1 350 210"
          fill="none"
          stroke="#15130f"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        {ticks.map((t) => {
          const a = ((-80 + (t / 16) * 160) * Math.PI) / 180
          const long = t % 4 === 0
          const r1 = 150
          const r2 = long ? 128 : 138
          return (
            <line
              key={t}
              x1={200 + r1 * Math.sin(a)}
              y1={210 - r1 * Math.cos(a)}
              x2={200 + r2 * Math.sin(a)}
              y2={210 - r2 * Math.cos(a)}
              stroke="#15130f"
              strokeWidth={long ? 2 : 1}
            />
          )
        })}
        {[0, 4, 8, 12, 16].map((t) => {
          const a = ((-80 + (t / 16) * 160) * Math.PI) / 180
          return (
            <text
              key={t}
              x={200 + 188 * Math.sin(a)}
              y={214 - 188 * Math.cos(a)}
              fontSize="12"
              textAnchor="middle"
              fill="#5e574a"
              fontFamily="var(--font-geist-mono), monospace"
            >
              {t}
            </text>
          )
        })}
        <g transform={`rotate(${angle} 200 210)`}>
          <line
            x1="200"
            y1="214"
            x2="200"
            y2="62"
            stroke="#15130f"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="200"
            y1="214"
            x2="200"
            y2="62"
            stroke="#c8f03a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
        <circle cx="200" cy="210" r="12" fill="#15130f" />
        <line x1="20" y1="214" x2="380" y2="214" stroke="#15130f" strokeWidth="2" />
      </svg>
      <figcaption className="mt-3 flex items-end justify-between border-t border-[var(--soot)] pt-3">
        <span className="folio-label text-[var(--ash)]">
          Surface dosimeter, mSv/h (parody units)
        </span>
        <span className="font-mono text-4xl tabular-nums" aria-live="off">
          {reading.toFixed(1)}
        </span>
      </figcaption>
    </figure>
  )
}

export function FolioHero() {
  const router = useRouter()
  const { updateSearchFilters } = useAppStore()
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [sector, setSector] = useState('')
  const [guests, setGuests] = useState(2)
  const [rad, setRad] = useState(2)
  const mv = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(mv, 'change', setProgress)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (pinned) mv.set(v)
  })

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) {
      mv.set(1)
      return
    }
    if (wide.matches) {
      setPinned(true)
      mv.set(scrollYProgress.get())
      return
    }
    const controls = animate(mv, 1, { duration: 1.4, ease: 'easeOut' })
    return () => controls.stop()
  }, [mv, scrollYProgress])

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearchFilters({ location: sector.trim(), guests, maxRadLevel: rad, radFree: rad === 0 })
    router.push('/search')
  }

  const field =
    'bg-[var(--bone)] border-b-2 border-[var(--soot)] px-2 py-0.5 text-[var(--soot)] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--soot)]'

  return (
    <section ref={ref} id="reserve" className="relative md:h-[200vh]">
      <div className="md:sticky md:top-0 md:h-screen flex items-center pt-28 pb-12 md:items-start md:pt-28 md:pb-0 lg:pt-32">
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-10 px-5 md:grid-cols-[1.35fr_1fr] md:gap-8 md:px-10">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3 text-[var(--ash)]">
              <span className="folio-label border border-[var(--soot)] px-2 py-1 text-[var(--soot)]">
                Folio No. 0001
              </span>
              <span className="folio-label">DEFCON 3: weekends filling up fast</span>
            </div>
            <h1 className="folio-display text-[clamp(3rem,7.4vw,7.25rem)]">
              The world{' '}
              <span className="relative inline-block">
                ended
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-[0.06em] bg-[var(--oxide)]"
                  style={{ width: `${Math.min(100, progress * 160)}%` }}
                />
              </span>
              .
              <br />
              <span className="mt-2 block text-[0.52em] font-normal italic normal-case leading-[1.05] tracking-tight">
                Your standards didn&apos;t.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-[var(--ash)] md:text-lg">
              Bunkers, vaults and hollowed-out mountains for the post-event elite. Every listing is
              inspected, stamped and priced in bottle caps.
            </p>

            <form
              onSubmit={handleReserve}
              className="mt-5 max-w-2xl text-lg leading-[2.5] md:text-xl md:leading-[2.3]"
              aria-label="Reserve a bunker"
            >
              I need a bunker in{' '}
              <input
                aria-label="Sector or region"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="any sector"
                className={`${field} w-40`}
              />{' '}
              for{' '}
              <input
                aria-label="Number of survivors"
                type="number"
                min={1}
                max={50}
                value={guests}
                onChange={(e) => setGuests(Math.min(50, Math.max(1, Number(e.target.value) || 1)))}
                className={`${field} w-16 text-center`}
              />{' '}
              survivors, no hotter than{' '}
              <span className="whitespace-nowrap">
                RAD{' '}
                <select
                  aria-label="Maximum RAD level"
                  value={rad}
                  onChange={(e) => setRad(Number(e.target.value))}
                  className={field}
                >
                  {RAD_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                .
              </span>{' '}
              <button
                type="submit"
                className="ml-1 inline-block bg-[var(--soot)] px-6 py-2 align-middle font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--geiger)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--soot)]"
              >
                Reserve a bunker
              </button>
            </form>
          </div>

          <div className="relative">
            <Dosimeter progress={progress} />
            <div
              aria-hidden={!stampVisible(progress)}
              className="pointer-events-none absolute right-0 top-0 min-[1400px]:-right-4 min-[1400px]:-top-20"
              style={{
                opacity: stampVisible(progress) ? 1 : 0,
                transform: stampVisible(progress)
                  ? 'rotate(-6deg) scale(1)'
                  : 'rotate(-12deg) scale(1.6)',
                transition: 'opacity 220ms ease-out, transform 260ms cubic-bezier(.2,1.4,.4,1)',
              }}
            >
              <div className="rounded-full border-[3px] border-[var(--oxide)] p-1.5">
                <div
                  className="flex h-[5.25rem] w-[5.25rem] flex-col items-center justify-center rounded-full border border-[var(--oxide)] text-center text-[var(--oxide)] min-[1400px]:h-36 min-[1400px]:w-36"
                  style={{ fontFamily: 'var(--font-stencil), sans-serif' }}
                >
                  <span className="text-[0.5rem] tracking-[0.2em] min-[1400px]:text-[0.6rem]">
                    VERIFIED
                  </span>
                  <span className="whitespace-nowrap text-[0.8rem] leading-none min-[1400px]:text-2xl">
                    RAD-FREE
                  </span>
                  <span className="text-[0.45rem] tracking-[0.2em] min-[1400px]:text-[0.55rem]">
                    BY A GUY*
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
