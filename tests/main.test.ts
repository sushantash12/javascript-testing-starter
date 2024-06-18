import { it, expect, describe } from 'vitest';
import { calculateDiscount } from '../src/main';

describe('calculateDiscount', () => {
  it('should return discounted price if valid code', () => {
    expect(calculateDiscount(100, 'SAVE10')).toBe(90);
  });
});
