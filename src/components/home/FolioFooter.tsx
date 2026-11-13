import Link from 'next/link'

const links = [
  { href: '/search', label: 'Find a bunker' },
  { href: '/host', label: 'Become a warlord' },
  { href: '/experiences', label: 'Raid parties' },
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms of survival' },
]

export function FolioFooter() {
  return (
    <footer className="relative overflow-hidden bg-[var(--soot)] pb-mobile-nav text-[var(--vellum)] md:pb-0">
      <div className="mx-auto max-w-[90rem] px-5 pt-16 md:px-10">
        <p className="font-[family-name:var(--font-folio-display)] text-2xl italic md:text-4xl">
          Survival is luxury. Checkout is at dawn, if there is one.
        </p>
        <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="folio-label border-b border-transparent py-1 hover:border-[var(--geiger)] hover:text-[var(--geiger)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="folio-label mt-6 text-[var(--vellum)]/70">
          A parody. No bunkers were rented, no rads were measured.
        </p>
      </div>
      <div
        aria-hidden="true"
        className="folio-rise folio-display select-none whitespace-nowrap pt-6 text-center text-[15.5vw] leading-[0.78] text-[var(--vellum)]"
        style={{ marginBottom: '-0.14em', whiteSpace: 'nowrap' }}
      >
        APOC-BNB
      </div>
    </footer>
  )
}
