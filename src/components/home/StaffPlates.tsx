import { mockBunkers } from '@/lib/data/bunkers'

const hosts = Array.from(new Map(mockBunkers.map((b) => [b.host.id, b.host])).values()).slice(0, 6)
const offsets = ['md:ml-0', 'md:ml-24', 'md:ml-48', 'md:ml-72', 'md:ml-48', 'md:ml-24']

export function StaffPlates() {
  return (
    <section
      aria-labelledby="staff-h"
      className="relative mx-auto max-w-[90rem] px-5 pb-24 md:px-10 md:pb-32"
    >
      <p className="folio-label text-[var(--ash)]">Your warlords this evening</p>
      <h2 id="staff-h" className="folio-display mb-10 text-[clamp(2.25rem,5vw,4rem)]">
        Staff, <span className="italic normal-case">mostly</span> vetted
      </h2>
      <ul className="space-y-3">
        {hosts.map((h, i) => (
          <li key={h.id} className={offsets[i]}>
            <div className="flex max-w-xl items-baseline gap-4 border-2 border-[var(--soot)] bg-[var(--bone)] px-5 py-3 shadow-[4px_4px_0_var(--soot)]">
              <span className="font-[family-name:var(--font-folio-display)] text-2xl font-bold">
                {h.name}
              </span>
              <span
                aria-hidden="true"
                className="flex-1 border-b-2 border-dotted border-[var(--ash)]"
              />
              <span className="folio-label whitespace-nowrap text-[var(--oxide)]">
                {h.quirkLabel}
              </span>
              <span className="folio-label whitespace-nowrap text-[var(--ash)]">
                {h.yearsHosting} yrs
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
