import { expect, test, describe } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BookingWidget } from './BookingWidget'
import '@testing-library/jest-dom'

describe('BookingWidget', () => {
    test('renders with initial price in CAPS', () => {
        render(<BookingWidget price={100} />)
        expect(screen.getByText('100')).toBeInTheDocument()
        expect(screen.getByText('CAPS')).toBeInTheDocument()
    })

    test('calculates total price with taxes (Bottle Caps)', () => {
        // Price: 100 * 3 nights = 300
        // Oxygen Tax: 15% of 300 = 45
        // Protection Fee: 10% of 300 = 30
        // Total: 375
        render(<BookingWidget price={100} />)

        // Look for the total. Since there are multiple numbers, we search for the specific total line or value
        // The widget displays "375 CAPS" at the bottom
        expect(screen.getByText(/375/)).toBeInTheDocument()
    })

    test('switches currency to BTC', () => {
        // 100 CAPS / 10000 = 0.0100 BTC
        render(<BookingWidget price={100} />)

        // Find BTC button (it has the Coins icon)
        // We can find it by the button's class or role if we added one, but here we can try finding by click action or just index.
        // The component has two buttons in the toggle, 1st is CAPS, 2nd is BTC.
        const buttons = screen.getAllByRole('button')
        // Buttons in widget: CAPS toggle, BTC toggle, -, +, Secure Shelter.
        // The currency toggles are the first two buttons inside the component structure?
        // Let's use getByText if possible or rely on the icon presence which is harder.
        // Let's assume the user clicks the second currency toggle.

        // Better strategy: Add test-ids in the component if needed, but let's try to target the button that *doesn't* have "bg-primary" initially? 
        // Actually, let's just assume the 2nd button in the document order is BTC based on the code.
        // Or we can query by the BTC conversion text after clicking.

        // Let's try to click the button that *would* be BTC.
        // In code: 
        // <button onClick={() => setCurrency("BTC")} ...> <Coins /> </button>
        // It's the second button in that specific container.

        // To be robust, let's look for the one that isn't active.
        // Or just fire event on the second button found in the container.

        // Let's try finding the "BTC" text in the span next to price? No, it says "CAPS" initially.

        // Let's just click the button that contains the Coins icon. 
        // Since we can't easily select by icon in RTL without aria-label, let's use the fact it's the 2nd button.
        const toggles = screen.getAllByRole('button').slice(0, 2); // First two are currency
        fireEvent.click(toggles[1]); // Click BTC

        // Check if price updated
        // 100 / 10000 = 0.0100
        expect(screen.getByText('0.0100')).toBeInTheDocument()
        expect(screen.getByText('BTC')).toBeInTheDocument()
    })
})
