import { mockReviews } from '@/lib/data/reviews'

const slips = mockReviews.filter((r) => r.comment.length < 260).slice(0, 4)

export function Slips() {
  return (
    <section aria-labelledby="slips-h" className="relative bg-[var(--soot)] text-[var(--vellum)]">
      <div className="mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32">
        <p className="folio-label text-[var(--geiger)]">Slips from the surface, verified</p>
        <h2 id="slips-h" className="folio-display mb-14 max-w-3xl text-[clamp(2.25rem,5vw,4rem)]">
          Guests are <span className="italic normal-case">delighted</span>. Most of them.
        </h2>
        <ul className="grid gap-x-16 gap-y-10 md:grid-cols-2">
          {slips.map((r, i) => (
            <li key={r.id} className={i % 2 ? 'md:mt-16' : ''}>
              <blockquote className="border-l border-[var(--vellum)]/40 pl-6 font-mono text-[0.95rem] leading-relaxed">
                &ldquo;{r.comment}&rdquo;
              </blockquote>
              <p className="folio-label mt-4 pl-6">
                {r.userName}{' '}
                <span className="border-b-2 border-[var(--geiger)] text-[var(--geiger)]">
                  {r.rating} of 5
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
