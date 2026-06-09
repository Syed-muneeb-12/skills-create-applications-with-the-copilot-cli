#!/usr/bin/env node
/**
 * src/calculator.js
 *
 * Node.js CLI Calculator
 * Supports the following basic operations (as requested in the issue):
 * - addition (add, +)
 * - subtraction (sub, -)
 * - multiplication (mul, * , x)
 * - division (div, /)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3        # -> 5
 *   node src/calculator.js + 1.5 2.25     # -> 3.75
 *   node src/calculator.js mul 3 4 2      # -> 24
 *   node src/calculator.js div 8 2        # -> 4
 *
 * The script accepts an operation followed by one or more numeric operands.
 * Division performs left-to-right division (a / b / c ...).
 */

function usage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2> [...numN]');
  console.error('Operations: add (+), sub (-), mul (*, x), div (/), mod (%), pow (^), sqrt');
}

const [op, ...operandStrs] = process.argv.slice(2);

if (!op) {
  usage();
  process.exit(2);
}

const nums = operandStrs.map((s) => {
  const n = Number(s);
  if (Number.isNaN(n)) {
    console.error(`Invalid number: ${s}`);
    process.exit(2);
  }
  return n;
});

function add(arr) { return arr.reduce((a,b) => a + b, 0); }
function sub(arr) {
  return arr.slice(1).reduce((a,b) => a - b, arr[0]);
}
function mul(arr) { return arr.reduce((a,b) => a * b, 1); }
function div(arr) {
  return arr.slice(1).reduce((a,b) => {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }, arr[0]);
}

function modulo(arr) {
  return arr.slice(1).reduce((a,b) => {
    if (b === 0) {
      throw new Error('Modulo by zero');
    }
    return a % b;
  }, arr[0]);
}

function power(arr) {
  // Exponentiation: expects exactly two operands: base and exponent
  return Math.pow(arr[0], arr[1]);
}

function squareRoot(arr) {
  // Square root: expects one operand
  const n = arr[0];
  if (n < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(n);
}

let result;
const opLower = op.toLowerCase();
try {
  switch(opLower) {
    case 'add':
    case '+':
      if (nums.length < 2) { console.error('add requires at least two operands'); usage(); process.exit(2); }
      result = add(nums);
      break;
    case 'sub':
    case '-':
      if (nums.length < 2) { console.error('sub requires at least two operands'); usage(); process.exit(2); }
      result = sub(nums);
      break;
    case 'mul':
    case '*':
    case 'x':
      if (nums.length < 2) { console.error('mul requires at least two operands'); usage(); process.exit(2); }
      result = mul(nums);
      break;
    case 'div':
    case '/':
      if (nums.length < 2) { console.error('div requires at least two operands'); usage(); process.exit(2); }
      result = div(nums);
      break;
    case 'mod':
    case '%':
    case 'modulo':
      if (nums.length < 2) { console.error('modulo requires two operands'); usage(); process.exit(2); }
      result = modulo(nums);
      break;
    case 'pow':
    case '^':
    case 'power':
      if (nums.length < 2) { console.error('power requires two operands'); usage(); process.exit(2); }
      result = power(nums);
      break;
    case 'sqrt':
    case 'squareroot':
      if (nums.length < 1) { console.error('sqrt requires one operand'); usage(); process.exit(2); }
      result = squareRoot(nums);
      break;
    default:
      console.error(`Unsupported operation: ${op}`);
      usage();
      process.exit(2);
  }
} catch (e) {
  console.error('Error:', e.message);
  process.exit(3);
}

// Export functions for testing when required as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { add, sub, mul, div, modulo, power, squareRoot };
}

// Print result (no extra formatting) and exit
if (Number.isFinite(result)) {
  // Print as-is; JS prints floats with reasonable precision
  console.log(result);
  process.exit(0);
} else {
  console.error('Computation resulted in a non-finite value');
  process.exit(1);
}
