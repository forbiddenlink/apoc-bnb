import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { BookingWidget } from './BookingWidget'
import { BookingConfirmation } from './BookingConfirmation'

vi.mock('@/lib/hooks/useBookBunker', () => ({
  useBookBunker: () => ({ mutate: vi.fn(), isPending: false }),
}))
vi.mock('@/lib/hooks/useSoundEffects', () => ({
  useSoundEffects: () => ({ playClick: vi.fn(), playSuccess: vi.fn(), playError: vi.fn() }),
}))

describe('fictional booking disclosures', () => {
  it('clearly labels the action and explains no real payment or reservation', () => {
    const html = renderToStaticMarkup(
      createElement(BookingWidget, { bunkerId: 'synthetic', price: 100 })
    )
    expect(html).toContain('SIMULATE BOOKING')
    expect(html).toContain(
      'Demo simulation only. No payment is collected and no real shelter is reserved.'
    )
    expect(html.indexOf('Demo simulation only')).toBeLessThan(html.indexOf('SIMULATE BOOKING'))
    expect(html).not.toContain('Charges applied upon')
  })
  it('keeps the disclaimer visible for unavailable shelters', () => {
    const html = renderToStaticMarkup(
      createElement(BookingWidget, { bunkerId: 'synthetic', price: 100, available: false })
    )
    expect(html).toContain('Demo simulation only')
    expect(html).toContain('UNAVAILABLE')
  })
  it('does not present a fictional confirmation as a real booking', () => {
    const html = renderToStaticMarkup(
      createElement(BookingConfirmation, {
        confirmationNumber: 'SYNTHETIC',
        bunkerName: 'Synthetic Shelter',
        nights: 1,
        guests: 1,
        total: 10,
        currency: 'CAPS',
        onClose: () => {},
      })
    )
    expect(html).toContain('fictional confirmation, not a real reservation')
    expect(html).toContain('No payment was collected.')
    expect(html).toContain('role="note"')
  })
})
