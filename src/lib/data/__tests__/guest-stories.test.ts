import { describe, it, expect } from 'vitest';
import { guestStories, getRandomGuestStories } from '../guest-stories';

describe('Guest Stories', () => {
  it('has at least 20 stories', () => {
    expect(guestStories.length).toBeGreaterThanOrEqual(20);
  });

  it('all stories have required fields', () => {
    for (const story of guestStories) {
      expect(story).toHaveProperty('quote');
      expect(story).toHaveProperty('guestName');
      expect(story).toHaveProperty('bunkerRef');
      expect(story).toHaveProperty('rating');
      expect(story).toHaveProperty('survived');
    }
  });

  it('all ratings are between 1 and 5', () => {
    for (const story of guestStories) {
      expect(story.rating).toBeGreaterThanOrEqual(1);
      expect(story.rating).toBeLessThanOrEqual(5);
    }
  });

  it('getRandomGuestStories returns requested count', () => {
    const stories = getRandomGuestStories(3);
    expect(stories).toHaveLength(3);
  });

  it('getRandomGuestStories defaults to 5', () => {
    const stories = getRandomGuestStories();
    expect(stories).toHaveLength(5);
  });

  it('at least one story has survived: false', () => {
    const dead = guestStories.filter((s) => !s.survived);
    expect(dead.length).toBeGreaterThanOrEqual(1);
  });
});
