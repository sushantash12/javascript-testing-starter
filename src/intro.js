// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
  // if (a > b) return a;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

export function calculateAverage(numbers) {
  if (numbers.length > 0)
    return numbers.reduce((a, b) => a + b) / numbers.length;
  return NaN;
}
