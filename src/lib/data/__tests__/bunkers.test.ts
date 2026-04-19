import { describe, it, expect } from 'vitest';
import { mockBunkers, getBunkerById, filterBunkers } from '../bunkers';

describe('Bunker Data', () => {
  describe('mockBunkers', () => {
    it('contains 14 bunkers', () => {
      expect(mockBunkers).toHaveLength(14);
    });

    it('all bunkers have required fields', () => {
      for (const bunker of mockBunkers) {
        expect(bunker).toHaveProperty('id');
        expect(bunker).toHaveProperty('title');
        expect(bunker).toHaveProperty('description');
        expect(bunker).toHaveProperty('location');
        expect(bunker).toHaveProperty('price');
        expect(bunker).toHaveProperty('rating');
        expect(bunker).toHaveProperty('host');
        expect(bunker).toHaveProperty('features');
      }
    });

    it('all bunker ids are unique', () => {
      const ids = mockBunkers.map((b) => b.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('all ratings are between 0 and 5', () => {
      for (const bunker of mockBunkers) {
        expect(bunker.rating).toBeGreaterThanOrEqual(0);
        expect(bunker.rating).toBeLessThanOrEqual(5);
      }
    });

    it('all prices have both caps and btc', () => {
      for (const bunker of mockBunkers) {
        expect(bunker.price.caps).toBeGreaterThan(0);
        expect(bunker.price.btc).toBeGreaterThan(0);
      }
    });
  });

  describe('getBunkerById', () => {
    it('returns correct bunker for valid id', () => {
      const bunker = getBunkerById('bunker-1');
      expect(bunker).toBeDefined();
      expect(bunker?.title).toBe('The Deep Earth Citadel');
    });

    it('returns undefined for invalid id', () => {
      expect(getBunkerById('bunker-999')).toBeUndefined();
    });
  });

  describe('filterBunkers', () => {
    it('filters by max price', () => {
      const results = filterBunkers({ maxPrice: 200 });
      expect(results.length).toBeGreaterThan(0);
      for (const bunker of results) {
        expect(bunker.price.caps).toBeLessThanOrEqual(200);
      }
    });

    it('filters by min rating', () => {
      const results = filterBunkers({ minRating: 4.9 });
      expect(results.length).toBeGreaterThan(0);
      for (const bunker of results) {
        expect(bunker.rating).toBeGreaterThanOrEqual(4.9);
      }
    });

    it('filters by rad-free (radLevel <= 2)', () => {
      const results = filterBunkers({ radFree: true });
      expect(results.length).toBeGreaterThan(0);
      for (const bunker of results) {
        expect(bunker.features.radLevel).toBeLessThanOrEqual(2);
      }
    });

    it('filters by location', () => {
      const results = filterBunkers({ location: 'sector' });
      expect(results.length).toBeGreaterThan(0);
      for (const bunker of results) {
        expect(bunker.location.name.toLowerCase()).toContain('sector');
      }
    });

    it('excludes unavailable bunkers', () => {
      const results = filterBunkers({});
      for (const bunker of results) {
        expect(bunker.availability).toBe(true);
      }
    });

    it('returns all available bunkers with no filters', () => {
      const results = filterBunkers({});
      const availableBunkers = mockBunkers.filter((b) => b.availability);
      expect(results).toHaveLength(availableBunkers.length);
    });
  });
});
