import { expect, test, describe } from 'vitest'
import { getApocAiResponse } from './apocAiResponses'

describe('ApocAiResponses', () => {
    test('responds to radiation queries', () => {
        const response = getApocAiResponse('What about radiation?')
        expect(response).toBeTruthy()
        expect(typeof response).toBe('string')
    })

    test('responds to food queries', () => {
        const response = getApocAiResponse('Do you have food?')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toContain('food')
    })

    test('responds to greetings', () => {
        const response = getApocAiResponse('hello')
        expect(response).toBeTruthy()
    })

    test('provides default response for unknown queries', () => {
        const response = getApocAiResponse('xyzabc123nonsense')
        expect(response).toBeTruthy()
        expect(typeof response).toBe('string')
    })

    test('handles empty strings', () => {
        const response = getApocAiResponse('')
        expect(response).toBeTruthy()
    })
})
