import getDaysFromDate from './getDaysFromDate';
import { describe, it, expect } from 'vitest';

describe('getDaysFromDate', () => {
  it("should return 0 for today's date", () => {
    const today = new Date().toISOString().split('T')[0];
    expect(getDaysFromDate(today)).toBe(0);
  });

  it('should return 1 for a date 1 day ago', () => {
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0];
    expect(getDaysFromDate(yesterday)).toBe(1);
  });

  it('should return 2 for a date 2 days ago', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000)
      .toISOString()
      .split('T')[0];
    expect(getDaysFromDate(twoDaysAgo)).toBe(2);
  });

  it('should return the correct number of days for a date in the past', () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 86400000)
      .toISOString()
      .split('T')[0];
    expect(getDaysFromDate(tenDaysAgo)).toBe(10);
  });

  it('should handle invalid date strings', () => {
    const invalidDate = 'invalid-date';
    expect(() => getDaysFromDate(invalidDate)).toThrow();
  });
});
