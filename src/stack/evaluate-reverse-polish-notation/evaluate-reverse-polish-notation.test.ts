import { describe, expect, it } from 'vitest';
import { evalRPN } from './evaluate-reverse-polish-notation.ts';

type Solver = (tokens: readonly string[]) => number;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['evalRPN', evalRPN]];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { tokens: ['2', '1', '+', '3', '*'], expected: 9 },
    { tokens: ['4', '13', '5', '/', '+'], expected: 6 },
    {
      tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'],
      expected: 22,
    },
  ])('evaluates the statement example $tokens to $expected', ({ tokens, expected }) => {
    expect(solve(tokens)).toBe(expected);
  });

  it.each([
    { tokens: ['7'], expected: 7 },
    { tokens: ['-11'], expected: -11 },
  ])('returns a lone number $tokens as is', ({ tokens, expected }) => {
    expect(solve(tokens)).toBe(expected);
  });

  it.each([
    { tokens: ['3', '5', '-'], expected: -2 },
    { tokens: ['5', '13', '/'], expected: 0 },
  ])('keeps operand order for non-commutative $tokens', ({ tokens, expected }) => {
    expect(solve(tokens)).toBe(expected);
  });

  it.each([
    { tokens: ['-7', '2', '/'], expected: -3 },
    { tokens: ['7', '-2', '/'], expected: -3 },
    { tokens: ['-7', '-2', '/'], expected: 3 },
  ])('truncates division toward zero: $tokens → $expected', ({ tokens, expected }) => {
    expect(solve(tokens)).toBe(expected);
  });

  it('truncates a small negative quotient to zero', () => {
    // `+ 0` turns -0 into 0, so either zero is accepted.
    expect(solve(['-1', '2', '/']) + 0).toBe(0);
  });

  it('handles boundary values of the number range', () => {
    expect(solve(['200', '-200', '*'])).toBe(-40000);
  });

  it('applies an operator to the two most recent values in a right-nested chain', () => {
    // 1 - (2 - 3)
    expect(solve(['1', '2', '3', '-', '-'])).toBe(2);
  });

  it('evaluates a long left-nested chain', () => {
    // 1 + 1 + ... + 1, five thousand ones: "1", then ("1", "+") repeated.
    const tokens = ['1'];
    for (let i = 1; i < 5000; i++) tokens.push('1', '+');
    expect(solve(tokens)).toBe(5000);
  });

  it('evaluates a deeply nested expression with all numbers first', () => {
    // 5000 numbers followed by 4999 operators — the deepest input the constraints allow.
    const tokens = [...Array<string>(5000).fill('1'), ...Array<string>(4999).fill('+')];
    expect(solve(tokens)).toBe(5000);
  });
});
