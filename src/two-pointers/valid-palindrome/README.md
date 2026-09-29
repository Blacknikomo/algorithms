# Valid Palindrome

Source: [LeetCode 125](https://leetcode.com/problems/valid-palindrome/) · Difficulty: easy · Tags: string

## Problem

Given a string `s`, lowercase it and drop every character that is not a letter or a digit.
Return `true` if what is left reads the same forwards and backwards, `false` otherwise. A
string that is empty after cleaning counts as a palindrome.

Signature: `isPalindrome(s: string): boolean`. Target: `O(n)` time, `O(1)` extra space —
write the clean-then-compare `O(n)`-space version first (`isPalindromeBrute`).

Examples:

- `"A man, a plan, a canal: Panama"` → `true`
- `"race a car"` → `false`
- `" "` → `true` (empty after cleaning)

Constraints:

- `1 ≤ s.length ≤ 2·10⁵`
- `s` consists of printable ASCII characters
- Digits count as alphanumeric (`"0P"` → `false`)

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- A string of only spaces / punctuation is empty after cleaning → `true`.
- Digits are kept, and compared as-is: `"0P"` → `false`.
- Case must not matter: `"Aa"` → `true`.
- `_` is not alphanumeric (careful with `\w`), and neither are the ASCII neighbours of
  letters and digits: `` ` `` `@` `[` `{` `/` `:`.
- Up to `2·10⁵` characters.

## Follow-ups

- TODO
