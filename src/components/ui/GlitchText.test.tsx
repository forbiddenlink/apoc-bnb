import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GlitchText } from './GlitchText'

describe('GlitchText', () => {
    test('renders text correctly', () => {
        render(<GlitchText text="Survival" />)
        const elements = screen.getAllByText('Survival')
        // Should render 3 times (main + 2 glitch layers)
        expect(elements.length).toBe(3)
    })

    test('applies custom className', () => {
        const { container } = render(<GlitchText text="Test" className="custom-class" />)
        const wrapper = container.firstChild
        expect(wrapper).toHaveClass('custom-class')
    })
})
