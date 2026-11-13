export function ConciergeNote() {
  return (
    <section
      aria-labelledby="note-h"
      className="relative mx-auto max-w-[90rem] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="max-w-2xl md:ml-[12%] md:rotate-[-1deg]">
        <h2
          id="note-h"
          className="font-[family-name:var(--font-folio-display)] text-[clamp(2rem,4vw,3.25rem)] italic leading-tight"
        >
          The concierge is always on the radio.
        </h2>
        <p className="mt-4 text-lg text-[var(--ash)]">
          Ask APOC-AI anything from the corner of the screen, or press{' '}
          <kbd className="folio-label border border-[var(--soot)] bg-[var(--bone)] px-2 py-1 text-[var(--soot)]">
            ?
          </kbd>{' '}
          to see the keyboard shortcuts. Replies may include static.
        </p>
      </div>
    </section>
  )
}
