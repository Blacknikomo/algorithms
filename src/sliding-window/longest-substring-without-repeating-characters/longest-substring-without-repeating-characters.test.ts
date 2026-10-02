import { describe, expect, it } from 'vitest';
import { createRng, randomInt } from '@/shared/utils/random.ts';
import {
  lengthOfLongestSubstring,
  lengthOfLongestSubstringBrute,
} from './longest-substring-without-repeating-characters.ts';

type Solver = (s: string) => number;

const implementations: [string, Solver][] = [
  ['lengthOfLongestSubstring', lengthOfLongestSubstring],
  // ['lengthOfLongestSubstringBrute (reference)', lengthOfLongestSubstringBrute],
];

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { s: 'abcabcbb', expected: 3 },
    { s: 'pwwkew', expected: 3 },
    { s: 'dvdf', expected: 3 },
  ])('returns $expected for "$s" (statement example)', ({ s, expected }) => {
    expect(solve(s)).toBe(expected);
  });

  it.each([
    { s: '', expected: 0, covers: 'empty string' },
    { s: 'a', expected: 1, covers: 'a single character' },
    { s: ' ', expected: 1, covers: 'a space is a character' },
    { s: 'bbbbb', expected: 1, covers: 'all equal' },
    { s: 'abcdef', expected: 6, covers: 'all distinct — the whole string' },
    { s: 'aA', expected: 2, covers: 'case-sensitive' },
    { s: 'abcdd', expected: 4, covers: 'answer at the start' },
    { s: 'aabcd', expected: 4, covers: 'answer at the end' },
    { s: 'abba', expected: 2, covers: 'repeat of a character already left behind' },
    { s: 'tmmzuxt', expected: 5, covers: 'repeat far to the left of the current window' },
    { s: 'a b!a', expected: 4, covers: 'symbols and spaces' },
  ])('returns $expected for "$s" — $covers', ({ s, expected }) => {
    expect(solve(s)).toBe(expected);
  });
});

// Maximum length — fast solution only: a quadratic reference would be too slow here.
describe('lengthOfLongestSubstring at the maximum length', () => {
  it('finds 95 in 5·10^4 characters cycling through all printable ASCII', () => {
    // 95 printable characters (32..126) repeated in order: every window of 95 is distinct, 96 is not.
    const s = Array.from({ length: 50_000 }, (_, i) => String.fromCharCode(32 + (i % 95))).join('');
    expect(lengthOfLongestSubstring(s)).toBe(95);
  });

  it('finds 1 in 5·10^4 equal characters', () => {
    expect(lengthOfLongestSubstring('z'.repeat(50_000))).toBe(1);
  });
});

// describe('lengthOfLongestSubstring vs lengthOfLongestSubstringBrute', () => {
//   it('agrees with the reference implementation on random input', () => {
//     const rng = createRng(20260930);
//     const alphabet = 'abcA !';

//     for (let round = 0; round < 500; round++) {
//       const s = Array.from(
//         { length: randomInt(rng, 0, 15) },
//         () => alphabet[randomInt(rng, 0, alphabet.length - 1)],
//       ).join('');
//       expect(lengthOfLongestSubstring(s), `s=${JSON.stringify(s)}`).toBe(
//         lengthOfLongestSubstringBrute(s),
//       );
//     }
//   });
// });
