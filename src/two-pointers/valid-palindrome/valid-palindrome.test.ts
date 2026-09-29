import { describe, expect, it } from 'vitest';
import { createRng, randomInt, type Rng } from '@/shared/utils/random.ts';
import { isPalindrome, isPalindromeBrute } from './valid-palindrome.ts';

type Solver = (s: string) => boolean;

const implementations: [string, Solver][] = [
  ['isPalindrome', isPalindrome],
  // ['isPalindromeBrute (reference)', isPalindromeBrute],
];

/** Mirrors `half` around an optional middle, swapping the case of every letter on the way back. */
function mirror(half: string, middle = ''): string {
  const back = [...half]
    .reverse()
    .map((ch) => (ch === ch.toLowerCase() ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');
  return half + middle + back;
}

function randomString(rng: Rng, length: number, alphabet: string): string {
  let out = '';
  for (let i = 0; i < length; i++) out += alphabet[randomInt(rng, 0, alphabet.length - 1)];
  return out;
}

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    { s: 'A man, a plan, a canal: Panama', expected: true },
    { s: 'race a car', expected: false },
    { s: ' ', expected: true },
  ])('returns $expected for "$s" (statement example)', ({ s, expected }) => {
    expect(solve(s)).toBe(expected);
  });

  it.each([
    { s: 'a', expected: true, covers: 'a single character' },
    { s: '.,!?', expected: true, covers: 'punctuation only (empty after cleaning)' },
    { s: 'Aa', expected: true, covers: 'case-insensitive comparison' },
    { s: '0P', expected: false, covers: 'digits are alphanumeric' },
    { s: '12321', expected: true, covers: 'digits only' },
    { s: 'ab_a', expected: true, covers: 'underscore is not alphanumeric' },
    { s: '[a`', expected: true, covers: 'ASCII neighbours of letters are skipped' },
    { s: '/9:', expected: true, covers: 'ASCII neighbours of digits are skipped' },
    { s: 'xabcbay', expected: false, covers: 'mismatch at the outermost pair' },
    { s: 'abcdba', expected: false, covers: 'mismatch in the middle of an even-length string' },
    { s: ',,a,,b,,', expected: false, covers: 'separators on both sides of every character' },
  ])('returns $expected for "$s" — $covers', ({ s, expected }) => {
    expect(solve(s)).toBe(expected);
  });

  it('handles strings at the maximum length', () => {
    const half = randomString(createRng(20260929), 99_999, 'abcXYZ019 ,.:!');

    // Mirrored around one character: a palindrome of length 199 999.
    expect(solve(mirror(half, 'Q'))).toBe(true);
    // Mirrored around "Qr": the only mismatching pair sits in the very centre.
    const centreMismatch = mirror(half, 'Qr');
    expect(centreMismatch.length).toBe(200_000);
    expect(solve(centreMismatch)).toBe(false);
  });
});

// describe('isPalindrome vs isPalindromeBrute', () => {
//   it('agrees with the reference implementation on random input', () => {
//     const rng = createRng(20260929);
//     const alphabet = 'aAbB01 ,.:_';

//     for (let round = 0; round < 500; round++) {
//       // Every other round is mirrored, so both answers show up often.
//       const s =
//         round % 2 === 0
//           ? randomString(rng, randomInt(rng, 1, 12), alphabet)
//           : mirror(
//               randomString(rng, randomInt(rng, 0, 6), alphabet),
//               randomString(rng, randomInt(rng, 0, 1), alphabet),
//             ) || 'a';

//       expect(isPalindrome(s), `s=${JSON.stringify(s)}`).toBe(isPalindromeBrute(s));
//     }
//   });
// });
