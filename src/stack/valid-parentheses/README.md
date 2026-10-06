# Valid Parentheses

Source: [LeetCode 20](https://leetcode.com/problems/valid-parentheses/) · Difficulty: easy · Tags: string

## Problem

`s` contains only the characters `()[]{}`. Return `true` if it is valid: every opening
bracket is closed by a bracket of the same type, brackets close in the right order
(innermost first), and every closing bracket has a matching opener. Otherwise `false`.

Examples:

- `"()[]{}"` → `true`
- `"(]"` → `false`
- `"([)]"` → `false`
- `"{[]}"` → `true`

Constraints:

- `1 ≤ s.length ≤ 10⁴`
- `s` consists of `()[]{}` only.
- Target: `O(n)` time. Explain why a counter is not enough with three bracket types.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- A lone bracket (`"("`, `"]"`) is invalid.
- A closer before any opener (`")("`) — the string can go wrong at the very first character.
- Leftover openers at the end (`"()("`) are invalid even if nothing mismatched.
- Matching counts per type do not make a string valid (`"([)]"`, `"(){}}{"`).
- Nesting can be up to `5000` levels deep.

## Follow-ups

- TODO
