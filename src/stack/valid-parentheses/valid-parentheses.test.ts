import { describe, expect, it } from 'vitest';
import { isValid } from './valid-parentheses.ts';

type Solver = (s: string) => boolean;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['isValid', isValid]];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { s: '()[]{}', expected: true },
    { s: '(]', expected: false },
    { s: '([)]', expected: false },
    { s: '{[]}', expected: true },
  ])('returns $expected for "$s"', ({ s, expected }) => {
    expect(solve(s)).toBe(expected);
  });

  it.each([
    { name: 'a single opening bracket', s: '(', expected: false },
    { name: 'a single closing bracket', s: ']', expected: false },
    { name: 'a closer before its opener', s: ')(', expected: false },
    { name: 'an unclosed opener at the end', s: '()(', expected: false },
    { name: 'an extra closer at the end', s: '())', expected: false },
    { name: 'an odd-length string', s: '(()', expected: false },
    { name: 'all three types nested', s: '{[()]}', expected: true },
    { name: 'equal counts per type but wrong order', s: '(){}}{', expected: false },
    { name: 'a type mismatch deep inside', s: '{[(])}', expected: false },
  ])('handles $name ("$s")', ({ s, expected }) => {
    expect(solve(s)).toBe(expected);
  });

  it('accepts 5000 nested pairs (length 10⁴)', () => {
    expect(solve('('.repeat(5000) + ')'.repeat(5000))).toBe(true);
  });

  it('rejects 5000 nested pairs whose last closer has the wrong type', () => {
    expect(solve('('.repeat(5000) + ')'.repeat(4999) + ']')).toBe(false);
  });
});
