import { expect, test, describe, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BookingWidget } from './BookingWidget'
import '@testing-library/jest-dom'

// Mock the useBookBunker hook
vi.mock('@/lib/hooks/useBookBunker', () => ({
    useBookBunker: () => ({
        mutate: vi.fn(),
        isPending: false,
    }),
}))

// Mock the useSoundEffects hook
vi.mock('@/lib/hooks/useSoundEffects', () => ({
    useSoundEffects: () => ({
        playSuccess: vi.fn(),
        playError: vi.fn(),
        playClick: vi.fn(),
    }),
}))

describe('BookingWidget', () => {
    test('renders with initial price in CAPS', () => {
        render(<BookingWidget bunkerId="test-bunker-1" price={100} />)
        expect(screen.getByText('100')).toBeInTheDocument()
        // "CAPS" appears multiple times (price label, total, breakdown), so use getAllByText
        expect(screen.getAllByText('CAPS').length).toBeGreaterThan(0)
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

    test('switches currency to BTC', async () => {
        // 100 CAPS / 10000 = 0.0100 BTC
        render(<BookingWidget bunkerId="test-bunker-1" price={100} />)

        // The currency toggle is a role="group" with two buttons; BTC is the second one
        const toggleGroup = screen.getByRole('group');
        const buttons = toggleGroup.querySelectorAll('button');
        fireEvent.click(buttons[1]); // Second button is BTC

        // AnimatedPrice has a 150ms delay before updating the displayed value
        await waitFor(() => {
            expect(screen.getByText('0.0100')).toBeInTheDocument()
        })
        expect(screen.getAllByText('BTC').length).toBeGreaterThan(0)
    })
})

test('night controls have distinct names and display singular and plural stays', () => {
    render(<BookingWidget bunkerId="fixture" price={100} />)
    const decrease = screen.getByRole('button', { name: 'Decrease nights' })
    const increase = screen.getByRole('button', { name: 'Increase nights' })
    fireEvent.click(decrease)
    fireEvent.click(decrease)
    expect(screen.getByText('1 night')).toBeInTheDocument()
    fireEvent.click(decrease)
    expect(screen.getByText('1 night')).toBeInTheDocument()
    fireEvent.click(increase)
    expect(screen.getByText('2 nights')).toBeInTheDocument()
    for (let i = 0; i < 40; i++) fireEvent.click(increase)
    expect(screen.getByText('30 nights')).toBeInTheDocument()
})

test('guest controls have distinct names and respect the capacity limit', () => {
    render(<BookingWidget bunkerId="fixture" price={100} maxCapacity={3} />)
    const decrease = screen.getByRole('button', { name: 'Decrease guests' })
    const increase = screen.getByRole('button', { name: 'Increase guests' })
    fireEvent.click(decrease)
    fireEvent.click(decrease)
    expect(screen.getByText('1 humans')).toBeInTheDocument()
    fireEvent.click(increase)
    expect(screen.getByText('2 humans')).toBeInTheDocument()
    fireEvent.click(increase)
    expect(screen.getByText('3 humans')).toBeInTheDocument()
    expect(increase).toBeDisabled()
})
