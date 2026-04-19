import { describe, it, expect } from 'vitest';
import {
  mockReviews,
  getReviewsByBunkerId,
  verifiedIncidents,
  getIncidentsByBunkerId,
} from '../reviews';

describe('Review Data', () => {
  it('all reviews have required fields', () => {
    for (const review of mockReviews) {
      expect(review).toHaveProperty('id');
      expect(review).toHaveProperty('bunkerId');
      expect(review).toHaveProperty('userId');
      expect(review).toHaveProperty('userName');
      expect(review).toHaveProperty('rating');
      expect(review).toHaveProperty('comment');
      expect(review).toHaveProperty('date');
    }
  });

  it('all review ratings are between 1 and 5', () => {
    for (const review of mockReviews) {
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
    }
  });

  it('getReviewsByBunkerId returns correct reviews', () => {
    const reviews = getReviewsByBunkerId('bunker-1');
    expect(reviews.length).toBeGreaterThan(0);
    for (const review of reviews) {
      expect(review.bunkerId).toBe('bunker-1');
    }
  });

  it('getReviewsByBunkerId returns empty array for unknown bunker', () => {
    const reviews = getReviewsByBunkerId('bunker-999');
    expect(reviews).toEqual([]);
  });
});

describe('Verified Incidents', () => {
  it('all incidents have required fields', () => {
    for (const incident of verifiedIncidents) {
      expect(incident).toHaveProperty('id');
      expect(incident).toHaveProperty('bunkerId');
      expect(incident).toHaveProperty('title');
      expect(incident).toHaveProperty('description');
      expect(incident).toHaveProperty('date');
      expect(incident).toHaveProperty('severity');
      expect(incident).toHaveProperty('resolved');
    }
  });

  it('getIncidentsByBunkerId returns correct incidents', () => {
    const incidents = getIncidentsByBunkerId('bunker-1');
    expect(incidents.length).toBeGreaterThan(0);
    for (const incident of incidents) {
      expect(incident.bunkerId).toBe('bunker-1');
    }
  });
});
