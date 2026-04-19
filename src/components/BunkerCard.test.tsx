import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BunkerCard } from './BunkerCard'
import '@testing-library/jest-dom'
import { mockBunkers } from '@/lib/data/bunkers'

describe('BunkerCard', () => {
    const bunker = mockBunkers[0]

    test('renders bunker information', () => {
        render(<BunkerCard bunker={bunker} />)

        expect(screen.getByText(bunker.title)).toBeInTheDocument()
        // Price is split across separate spans: <span>420</span> <span>CAPS</span>
        expect(screen.getByText(String(bunker.price.caps))).toBeInTheDocument()
        expect(screen.getByText('CAPS')).toBeInTheDocument()
        // Component uses .toFixed(1), not .toFixed(2)
        expect(screen.getByText(bunker.rating.toFixed(1))).toBeInTheDocument()
    })

    test('displays rad-level badge', () => {
        render(<BunkerCard bunker={bunker} />)

        // Component renders RAD-SAFE or HAZARD based on radLevel, not SUPERHOST
        const expectedBadge = bunker.features.radLevel <= 2 ? 'RAD-SAFE' : 'HAZARD'
        expect(screen.getByText(expectedBadge)).toBeInTheDocument()
    })

    test('shows radiation level badge', () => {
        render(<BunkerCard bunker={bunker} />)

        // Component renders RAD-SAFE or HAZARD, not "Radiation"
        const radBadge = screen.getByText(/RAD-SAFE|HAZARD/)
        expect(radBadge).toBeInTheDocument()
    })
})
