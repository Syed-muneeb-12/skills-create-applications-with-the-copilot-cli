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
  console.error('Operations: add (+), sub (-), mul (*, x), div (/)');
}

const [op, ...operandStrs] = process.argv.slice(2);

if (!op || operandStrs.length < 2) {
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
      console.error('Error: Division by zero');
      process.exit(3);
    }
    return a / b;
  }, arr[0]);
}

let result;
const opLower = op.toLowerCase();
switch(opLower) {
  case 'add':
  case '+':
    result = add(nums);
    break;
  case 'sub':
  case '-':
    result = sub(nums);
    break;
  case 'mul':
  case '*':
  case 'x':
    result = mul(nums);
    break;
  case 'div':
  case '/':
    result = div(nums);
    break;
  default:
    console.error(`Unsupported operation: ${op}`);
    usage();
    process.exit(2);
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
