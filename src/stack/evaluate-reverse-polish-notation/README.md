# Evaluate Reverse Polish Notation

Source: [LeetCode 150](https://leetcode.com/problems/evaluate-reverse-polish-notation/) · Difficulty: medium · Tags: array, string

## Problem

Given `tokens`, an arithmetic expression in Reverse Polish (postfix) notation, return its
value as a number. Each token is either an integer (possibly negative, e.g. `"-11"`) or one
of the operators `+`, `-`, `*`, `/`. An operator applies to the two values before it.
Division truncates toward zero. The input is always a valid expression, there is no
division by zero, and every intermediate result fits in 32 bits.

Examples:

- `["2","1","+","3","*"]` → `9` — (2 + 1) × 3
- `["4","13","5","/","+"]` → `6` — 4 + 13 / 5
- `["10","6","9","3","+","-11","*","/","*","17","+","5","+"]` → `22`

Constraints:

- `1 ≤ tokens.length ≤ 10⁴`
- numbers in `[−200, 200]`

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- `-` and `/` are not commutative: `["3","5","-"]` is `3 - 5 = -2`, not `2`.
- Division truncates toward zero, not down: `-7 / 2` is `-3`, not `-4`.
- A negative number token like `"-11"` starts with `-` but is not an operator.
- A single-token input (`["7"]`) is a valid expression.

## Follow-ups

- TODO
