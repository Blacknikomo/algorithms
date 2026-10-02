# Longest Substring Without Repeating Characters

Source: [LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · Difficulty: medium · Tags: string

## Problem

Given a string `s`, return the **length** of the longest contiguous substring in which no
character appears more than once. Return `0` for the empty string.

Signature: `lengthOfLongestSubstring(s: string): number`. Target: `O(n)` time,
`O(min(n, Σ))` space, where `Σ` is the alphabet size.

Examples:

- `"abcabcbb"` → `3` (`"abc"`)
- `"pwwkew"` → `3` (`"wke"`; `"pwke"` is a subsequence, not a substring)
- `"dvdf"` → `3` (`"vdf"`)

Constraints:

- `0 ≤ s.length ≤ 5·10⁴`
- `s` consists of English letters, digits, symbols and spaces

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Empty string → `0`.
- Substring, not subsequence: `"pwwkew"` → `3`, not `4`.
- Spaces and symbols are characters too; `'a'` and `'A'` are different.
- `"abba"` → `2` — check any follow-up version against it.

## Follow-ups

- TODO
