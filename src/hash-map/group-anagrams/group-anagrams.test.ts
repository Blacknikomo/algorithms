import { describe, expect, it } from 'vitest';
import { createRng, randomInt, shuffle } from '@/shared/utils/random.ts';
import { groupAnagrams } from './group-anagrams.ts';

type Solver = (strs: readonly string[]) => string[][];

const implementations: [string, Solver][] = [
  ['groupAnagrams', groupAnagrams],
];

/**
 * Neither the order of the groups nor the order inside a group matters: sort both levels.
 * Duplicate words stay, so a dropped or doubled word still fails `toEqual`.
 */
function normalize(groups: readonly (readonly string[])[]): string[][] {
  return groups
    .map((group) => [...group].sort())
    .sort((a, b) => {
      const x = JSON.stringify(a);
      const y = JSON.stringify(b);
      return x < y ? -1 : x > y ? 1 : 0;
    });
}

describe.each(implementations)('%s', (_name, solve) => {
  it.each([
    {
      strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
      expected: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']],
    },
    { strs: [''], expected: [['']] },
    { strs: ['a'], expected: [['a']] },
  ])('groups $strs (statement example)', ({ strs, expected }) => {
    expect(normalize(solve(strs))).toEqual(normalize(expected));
  });

  it.each([
    { strs: ['', ''], expected: [['', '']], covers: 'several empty strings form one group' },
    { strs: ['', 'a'], expected: [[''], ['a']], covers: 'the empty string is its own group' },
    { strs: ['abc', 'abc'], expected: [['abc', 'abc']], covers: 'duplicate words are both kept' },
    {
      strs: ['abc', 'def', 'ghi'],
      expected: [['abc'], ['def'], ['ghi']],
      covers: 'no anagrams at all',
    },
    {
      strs: ['listen', 'silent', 'enlist', 'inlets'],
      expected: [['enlist', 'inlets', 'listen', 'silent']],
      covers: 'every word in one group',
    },
    {
      strs: ['aab', 'abb'],
      expected: [['aab'], ['abb']],
      covers: 'same letters, different multiplicities',
    },
    { strs: ['a', 'aa'], expected: [['a'], ['aa']], covers: 'same letter, different lengths' },
    {
      strs: ['ab', 'ba', 'abab'],
      expected: [['ab', 'ba'], ['abab']],
      covers: 'a word doubled is not an anagram',
    },
    {
      strs: ['bdddddddddd', 'bbbbbbbbbbc'],
      expected: [['bdddddddddd'], ['bbbbbbbbbbc']],
      covers: 'a letter repeated ten times',
    },
    {
      strs: ['a'.repeat(99) + 'b', 'b' + 'a'.repeat(99), 'a'.repeat(100)],
      expected: [['a'.repeat(99) + 'b', 'b' + 'a'.repeat(99)], ['a'.repeat(100)]],
      covers: 'words at the maximum length of 100',
    },
  ])('groups correctly — $covers', ({ strs, expected }) => {
    expect(normalize(solve(strs))).toEqual(normalize(expected));
  });
});

// Large input — groupAnagrams only: a slow reference could time it out.
describe('groupAnagrams on a large input', () => {
  it('groups ~5000 shuffled words into 98 known groups', () => {
    // Group g is every rotation of "a"×g + "bc" (g = 0..97): g + 2 distinct words, all
    // anagrams of each other and of nothing in another group.
    const expected = Array.from({ length: 98 }, (_, g) => {
      const base = 'a'.repeat(g) + 'bc';
      return Array.from({ length: base.length }, (_, r) => base.slice(r) + base.slice(0, r));
    });
    const strs = shuffle(createRng(20261001), expected.flat());
    expect(strs.length).toBe(4949);

    const groups = groupAnagrams(strs);
    expect(groups.length).toBe(98);
    expect(normalize(groups)).toEqual(normalize(expected));
  });
});