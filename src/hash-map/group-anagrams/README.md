# Group Anagrams

Source: [LeetCode 49](https://leetcode.com/problems/group-anagrams/) · Course — Module 4, Hash Maps and Prefix Sums · Difficulty: medium · Tags: array, string

## Problem

Given an array of strings `strs`, put words that are **anagrams** of each other — the same
letters with the same multiplicities, in any order — into the same group, and return the
list of groups. Every input word appears in exactly one group (duplicates included). The
order of the groups and of the words inside a group doesn't matter.

Signature: `groupAnagrams(strs: readonly string[]): string[][]`. Target: `O(n·k)` with a
count key (`n` words, length ≤ `k`); the sorted-letters key, `O(n·k log k)`, is an
acceptable first answer. Say which key you use and why it can't merge two different groups.

Examples:

- `["eat", "tea", "tan", "ate", "nat", "bat"]` → `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]`
- `[""]` → `[[""]]`
- `["a"]` → `[["a"]]`

Constraints:

- `1 ≤ strs.length ≤ 10⁴`
- `0 ≤ strs[i].length ≤ 100`
- `strs[i]` consists of lowercase English letters only

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months. Include
which key you used and why it can't merge two different groups.

## Traps

- Empty strings are valid words and group together: `["", ""]` → `[["", ""]]`.
- Duplicate words are both kept: `["abc", "abc"]` → `[["abc", "abc"]]`.
- Multiplicities matter: `"aab"` and `"abb"` are not anagrams; nor are `"a"` and `"aa"`.
- A letter can repeat up to 100 times in one word: `"bdddddddddd"` and `"bbbbbbbbbbc"`
  are different groups.

## Follow-ups

- TODO
