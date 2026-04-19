import { describe, it, expect } from 'vitest';
import { loadingMessages, getRandomLoadingMessage } from '../loading-messages';

describe('Loading Messages', () => {
  it('has at least 30 messages', () => {
    expect(loadingMessages.length).toBeGreaterThanOrEqual(30);
  });

  it('all messages are non-empty strings', () => {
    for (const msg of loadingMessages) {
      expect(typeof msg).toBe('string');
      expect(msg.length).toBeGreaterThan(0);
    }
  });

  it('all messages end with "..."', () => {
    for (const msg of loadingMessages) {
      expect(msg).toMatch(/\.\.\.$/);
    }
  });

  it('getRandomLoadingMessage returns a message from the array', () => {
    const msg = getRandomLoadingMessage();
    expect(loadingMessages).toContain(msg);
  });
});
