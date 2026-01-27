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
        expect(screen.getByText(`${bunker.price.caps} CAPS`)).toBeInTheDocument()
        expect(screen.getByText(bunker.rating.toFixed(2))).toBeInTheDocument()
    })

    test('displays superhost badge when applicable', () => {
        render(<BunkerCard bunker={bunker} />)
        
        if (bunker.host.isSuperhost) {
            expect(screen.getByText('SUPERHOST')).toBeInTheDocument()
        }
    })

    test('shows radiation level badge', () => {
        render(<BunkerCard bunker={bunker} />)
        
        const radBadge = screen.getByText(/Radiation/i)
        expect(radBadge).toBeInTheDocument()
    })
})
