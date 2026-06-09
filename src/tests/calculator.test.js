const { modulo, power, squareRoot, div } = require('../calculator');

describe('Extended calculator operations', () => {
  test('modulo: 5 % 2 -> 1', () => {
    expect(modulo([5, 2])).toBe(1);
  });

  test('power: 2 ^ 3 -> 8', () => {
    expect(power([2, 3])).toBe(8);
  });

  test('squareRoot: sqrt 16 -> 4', () => {
    expect(squareRoot([16])).toBe(4);
  });

  test('squareRoot: negative input throws', () => {
    expect(() => squareRoot([-4])).toThrow('Square root of negative number');
  });

  test('modulo by zero throws', () => {
    expect(() => modulo([10, 0])).toThrow('Modulo by zero');
  });

  test('division by zero throws', () => {
    expect(() => div([10, 0])).toThrow('Division by zero');
  });

  test('power with fractional exponent', () => {
    expect(power([9, 0.5])).toBeCloseTo(3);
  });
});
