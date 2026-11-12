'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useBunkers } from '@/lib/hooks/useBunkers'
import type { Bunker } from '@/types'

const TABS: { label: string; test: (rad: number) => boolean }[] = [
  { label: 'Any RAD', test: () => true },
  { label: 'RAD 0', test: (r) => r === 0 },
  { label: 'RAD 1-2', test: (r) => r >= 1 && r <= 2 },
  { label: 'RAD 3+', test: (r) => r >= 3 },
]

export function Register() {
  const { bunkers, isLoading, isError, refetch } = useBunkers()
  const [tab, setTab] = useState(0)
  const [active, setActive] = useState<string | null>(null)

  const rows = [...bunkers]
    .filter((b) => TABS[tab].test(b.features.radLevel))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)
  const preview: Bunker | undefined = rows.find((b) => b.id === active) ?? rows[0]

  return (
    <section
      aria-labelledby="register-h"
      className="relative mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b-2 border-[var(--soot)] pb-4">
        <div>
          <p className="folio-label text-[var(--ash)]">The register, ranked by guest rating</p>
          <h2 id="register-h" className="folio-display text-[clamp(2.25rem,5vw,4rem)]">
            Today&apos;s vacancies
          </h2>
        </div>
        <fieldset className="m-0 flex min-w-0 flex-wrap gap-2 border-0 p-0">
          <legend className="sr-only">Filter by RAD level</legend>
          {TABS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              aria-pressed={tab === i}
              onClick={() => setTab(i)}
              className={`folio-label border border-[var(--soot)] px-3 py-2 ${tab === i ? 'bg-[var(--soot)] text-[var(--geiger)]' : 'hover:bg-[var(--bone)]'}`}
            >
              {t.label}
            </button>
          ))}
        </fieldset>
      </div>

      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          {isLoading && <p className="folio-label text-[var(--ash)]">Consulting the register...</p>}
          {isError && (
            <p className="folio-label text-[var(--oxide)]">
              The register is unreadable.{' '}
              <button type="button" className="underline" onClick={() => refetch()}>
                Try again
              </button>
            </p>
          )}
          {!isLoading && !isError && rows.length === 0 && (
            <p className="folio-label text-[var(--ash)]">
              No vacancies at that RAD level. The surface is full.
            </p>
          )}
          <ol>
            {rows.map((b, i) => (
              <li key={b.id} onMouseEnter={() => setActive(b.id)}>
                <Link
                  href={`/bunkers/${b.id}`}
                  onFocus={() => setActive(b.id)}
                  className="group flex items-baseline gap-3 border-b border-[var(--soot)]/25 py-4 hover:bg-[var(--bone)] focus-visible:bg-[var(--bone)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--soot)]"
                >
                  <span className="folio-label w-6 text-[var(--ash)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-[family-name:var(--font-folio-display)] text-xl font-semibold md:text-2xl">
                    {b.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="min-w-4 flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-[var(--ash)]"
                  />
                  <span className="folio-label hidden text-[var(--ash)] sm:inline">
                    {b.location.name}
                  </span>
                  <span className="folio-label shrink-0 whitespace-nowrap border border-[var(--soot)] px-1.5 py-0.5">
                    RAD {b.features.radLevel}
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-mono text-base font-bold tabular-nums">
                    {b.price.caps} caps
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <Link
            href="/search"
            className="folio-label mt-6 inline-block border-b-2 border-[var(--soot)] pb-1 hover:bg-[var(--bone)]"
          >
            Search all {bunkers.length || ''} listings on the map
          </Link>
        </div>

        <aside className="hidden md:block">
          {preview && (
            <figure className="sticky top-28 border border-[var(--soot)] bg-[var(--bone)] p-3">
              <div className="relative aspect-[4/3] overflow-hidden border border-[var(--soot)]">
                <Image
                  src={preview.images[0]}
                  alt={preview.title}
                  fill
                  sizes="(min-width: 768px) 32vw, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <span className="folio-label text-[var(--ash)]">{preview.location.region}</span>
                <span className="mt-1 block font-[family-name:var(--font-folio-display)] text-2xl font-semibold">
                  {preview.title}
                </span>
                <span className="block text-[var(--ash)]">{preview.description}</span>
                <span className="folio-label mt-2 block">
                  Host: {preview.host.name} ({preview.host.quirkLabel})
                </span>
              </figcaption>
            </figure>
          )}
        </aside>
      </div>
    </section>
  )
}
