import { expect, test, describe, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BookingWidget } from './BookingWidget'
import '@testing-library/jest-dom'

// Mock the useBookBunker hook
vi.mock('@/lib/hooks/useBookBunker', () => ({
    useBookBunker: () => ({
        mutate: vi.fn(),
        isPending: false,
    }),
}))

describe('BookingWidget', () => {
    test('renders with initial price in CAPS', () => {
        render(<BookingWidget bunkerId="test-bunker-1" price={100} />)
        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('CAPS')).toBeInTheDocument()
    })

    test('calculates total price with taxes (Bottle Caps)', () => {
        // Price: 100 * 3 nights = 300
        // Oxygen Tax: 15% of 300 = 45
        // Protection Fee: 10% of 300 = 30
        // Total: 375
        render(<BookingWidget bunkerId="test-bunker-1" price={100} />)

        // Look for the total. Since there are multiple numbers, we search for the specific total line or value
        // The widget displays "375 CAPS" at the bottom
        expect(screen.getByText(/375/)).toBeInTheDocument()
    })

    test('switches currency to BTC', () => {
        // 100 CAPS / 10000 = 0.0100 BTC
        render(<BookingWidget bunkerId="test-bunker-1" price={100} />)

        // Find BTC button (it has the Coins icon)
        // We can find it by the button's class or role if we added one, but here we can try finding by click action or just index.
        // The component has two buttons in the toggle, 1st is CAPS, 2nd is BTC.
        // Click the BTC button using the aria-label we added
        const btcButton = screen.getByLabelText('Switch to BTC currency');
        fireEvent.click(btcButton);

        // Check if price updated
        // 100 / 10000 = 0.0100
        expect(screen.getByText('0.0100')).toBeInTheDocument()
        expect(screen.getByText('BTC')).toBeInTheDocument()
    })
})
