import { describe, it, expect } from 'vitest';
import {
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isValidUsername,
  canDrive,
  isPriceInRange,
  Stack,
} from '../src/core';

describe('getCoupons', () => {
  it('should have at least 1 coupon', () => {
    expect(Array.isArray(getCoupons())).toBe(true);
    expect(getCoupons().length).toBeGreaterThan(0);
  });
  it('should have the right properties', () => {
    getCoupons().forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(coupon).toHaveProperty('discount');
      expect(coupon.code).toBeTruthy();
      expect(coupon.discount).toBeTruthy();
    });
  });
  it('should have the right types for each property', () => {
    getCoupons().forEach((coupon) => {
      expect(coupon.code).toBeTypeOf('string');
      expect(coupon.discount).toBeTypeOf('number');
    });
  });
});

describe('calculateDiscount', () => {
  it('should return discounted price if valid code', () => {
    expect(calculateDiscount(100, 'SAVE10')).toBe(90);
  });
});

describe('validateUserInput', () => {
  it('should handle invalid username', () => {
    expect(validateUserInput('Ax', 20)).toMatch(/Invalid username/i);
    expect(validateUserInput(123223, 20)).toMatch(/Invalid username/i);
  });
  it('should handle invalid age', () => {
    expect(validateUserInput('Alex', 17)).toMatch(/Invalid age/i);
    expect(validateUserInput('Alex', true)).toMatch(/Invalid age/i);
  });
  it('should return success message if no errors', () => {
    expect(validateUserInput('Alex', 20)).toMatch(/success/i);
  });
});

describe('isValidUsername', () => {
  it('should return false if username is not a string', () => {
    expect(isValidUsername(123)).toBe(false);
  });
  it('should return false if username length is below the min', () => {
    expect(isValidUsername('alex')).toBe(false);
  });
  it('should return false if username length is above the max', () => {
    expect(isValidUsername('alexandralongname')).toBe(false);
  });
  it('should return true if username length is at the boundary', () => {
    expect(isValidUsername('alexa'.repeat(3))).toBe(true);
    expect(isValidUsername('alexa'.repeat(3))).toBe(true);
  });
  it('should return true if username length is within the boundaries', () => {
    expect(isValidUsername('alexandra')).toBe(true);
  });
});

describe('canDrive', () => {
  it('should handle if age is not a number', () => {
    expect(canDrive(undefined, 'US')).toBe(false);
    expect(canDrive('1d', 'US')).toBe(false);
    expect(canDrive(null, 'US')).toBe(false);
    expect(canDrive(true, 'US')).toBe(false);
  });
  it('should handle if age is below the legal driving age', () => {
    expect(canDrive(15, 'US')).toBe(false);
    expect(canDrive(16, 'UK')).toBe(false);
  });
  it('should handle if age is above the legal driving age', () => {
    expect(canDrive(17, 'US')).toBe(true);
    expect(canDrive(18, 'UK')).toBe(true);
  });
  it('should handle if age is at the exact legal driving age', () => {
    expect(canDrive(16, 'US')).toBe(true);
    expect(canDrive(17, 'UK')).toBe(true);
  });
  it('should handle if country code is not supported', () => {
    expect(canDrive(16, 'CA')).toMatch(/Invalid/i);
    expect(canDrive(16, true)).toMatch(/Invalid/i);
    expect(canDrive(16, null)).toMatch(/Invalid/i);
    expect(canDrive(16, undefined)).toMatch(/Invalid/i);
    expect(canDrive(16, 123)).toMatch(/Invalid/i);
  });
});

describe('isPriceInRange', () => {
  it.each([
    { price: 10, min: 5, max: 15, expected: true },
    { price: 10, min: 5, max: 9, expected: false },
    { price: 10, min: 11, max: 15, expected: false },
    { price: 10, min: 10, max: 10, expected: true },
  ])(
    'should return $expected for price: $price, min: $min, max: $max',
    ({ price, min, max, expected }) => {
      expect(isPriceInRange(price, min, max)).toBe(expected);
    },
  );
});

describe('Stack', () => {
  const stack = new Stack();

  describe('constructor', () => {
    it('should be of type array and empty', () => {
      expect(Array.isArray(stack.items)).toBe(true);
      expect(stack.items.length).toBe(0);
    });
  });

  describe('push', () => {
    it('should add an item to the stack', () => {
      stack.push(1);
      expect(stack.peek()).toBe(1);
    });
  });

  describe('pop', () => {
    it('should remove an item from the stack', () => {
      expect(stack.pop()).toBe(1);
    });

    it('should throw an error if popped from empty stack', () => {
      try {
        stack.pop();
      } catch (popError) {
        expect(popError).toBeInstanceOf(Error);
      }
    });
  });
});
