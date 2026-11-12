import { mockBunkers } from '@/lib/data/bunkers'

const rules = Array.from(new Set(mockBunkers.flatMap((b) => b.bannedItems ?? []))).slice(0, 9)

export function HouseRules() {
  return (
    <section
      aria-labelledby="rules-h"
      className="relative mx-auto grid max-w-[90rem] gap-10 px-5 pb-24 md:grid-cols-[auto_1fr] md:px-10 md:pb-32"
    >
      <div className="md:w-[22rem]">
        <div className="relative border-2 border-[var(--soot)] bg-[var(--bone)] px-6 pb-8 pt-14 md:-ml-4 md:rotate-[-2deg]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-4 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-[var(--soot)] bg-[var(--vellum)]"
          />
          <h2 id="rules-h" className="folio-display text-4xl">
            Please do not disturb the <span className="italic normal-case">survivors</span>
          </h2>
          <p className="folio-label mt-4 text-[var(--ash)]">
            House rules, hung on every door handle
          </p>
        </div>
      </div>
      <ul className="columns-1 gap-10 sm:columns-2 md:pt-6">
        {rules.map((r, i) => (
          <li key={r} className="mb-5 break-inside-avoid border-l-2 border-[var(--oxide)] pl-4">
            <span className="folio-label text-[var(--oxide)]">
              Rule {String(i + 1).padStart(2, '0')}
            </span>
            <span className="block text-lg">{r}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
