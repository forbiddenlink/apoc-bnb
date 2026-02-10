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
        // Response may be a humorous non-food response
        expect(typeof response).toBe('string')
        expect(response.length).toBeGreaterThan(0)
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

describe('Bunker-specific responses', () => {
    test('responds to Deep Earth Citadel queries', () => {
        const response = getApocAiResponse('Tell me about the Deep Earth Citadel')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/citadel|commander|scratching|spa|300 feet/i)
    })

    test('responds to Vault 101 queries', () => {
        const response = getApocAiResponse('What is Vault 101 like?')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/vault|overseer|jumpsuit|pip-boy|g\.e\.c\.k/i)
    })

    test('responds to Silo Complex queries', () => {
        const response = getApocAiResponse('Tell me about the Silo Complex')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/silo|general|winters|military|yelled|steel doors|armory|0600/i)
    })

    test('responds to Wasteland Willie queries', () => {
        const response = getApocAiResponse('What about Wasteland Willie\'s place?')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/willie|budget|honest|stain|150 caps/i)
    })

    test('responds to Orbital Safe House queries', () => {
        const response = getApocAiResponse('Can I stay at the Orbital Safe House?')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/orbital|space|cosmos|zero|gravity|2000 caps/i)
    })

    test('responds to Mountain Fortress queries', () => {
        const response = getApocAiResponse('Tell me about Mountain Fortress')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/mountain|mike|geothermal|cave|rocky/i)
    })
})

describe('Raid-specific responses', () => {
    test('responds to Supermarket Sweep queries', () => {
        const response = getApocAiResponse('Tell me about the Supermarket Sweep raid')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/supermarket|jax|costco|jenkins|70%|50 caps/i)
    })

    test('responds to Tech Store Heist queries', () => {
        const response = getApocAiResponse('What about Cyber-Viper\'s tech store raid?')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/cyber-viper|tech|best buy|night|gpu|45%|200 caps/i)
    })

    test('responds to Pharmacy Run queries', () => {
        const response = getApocAiResponse('Tell me about the pharmacy run')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/doc|holliday|pharmacy|medicine|meds|red zone|suicide|walgreens|30%|500 caps/i)
    })

    test('responds to Library Expedition queries', () => {
        const response = getApocAiResponse('What about the library expedition?')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/library|librarian|books|shakespeare|95%|20 caps/i)
    })

    test('responds to Military Base queries', () => {
        const response = getApocAiResponse('Tell me about the military base raid')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/military|steele|fort|weapons|55%|300 caps/i)
    })

    test('responds to Gas Station queries', () => {
        const response = getApocAiResponse('What about Fred\'s gas station runs?')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/gas|fred|fuel|twinkie|80%|75 caps/i)
    })

    test('responds to general experience queries', () => {
        const response = getApocAiResponse('What experiences do you offer?')
        expect(response).toBeTruthy()
        expect(response.toLowerCase()).toMatch(/experience|raid|adventure|waiver|success/i)
    })
})
