import { describe, it, expect } from 'vitest';
import { fizzBuzz, max, calculateAverage } from '../src/intro';

describe('max', () => {
  it('should return the first argument', () => {
    expect(max(2, 1)).toBe(2);
  });
  it('should return the second argument', () => {
    expect(max(1, 2)).toBe(2);
  });
});

describe('fizzBuzz', () => {
  it('should return Fizbuzz if number is divisible by 3 and 5', () => {
    expect(fizzBuzz(45)).toBe('FizzBuzz');
  });
  it('should return Fizz if number is divisible by 3', () => {
    expect(fizzBuzz(21)).toBe('Fizz');
  });
  it('should return Buzz if number is divisible by 5', () => {
    expect(fizzBuzz(25)).toBe('Buzz');
  });
  it('should return the number if number is neither divisible by 3 nor 5', () => {
    expect(fizzBuzz(22)).toBe('22');
  });
});

describe('calculateAverage', () => {
  it('should return NaN if given an empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  it('should return 1', () => {
    expect(calculateAverage([1])).toBe(1);
  });
  it('should return 1', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });
});
