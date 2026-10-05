# Container With Most Water

Source: [LeetCode 11](https://leetcode.com/problems/container-with-most-water/) · Difficulty: medium · Tags: array

## Problem

`height[i]` is a vertical line at `x = i`. Pick two lines `i < j`; together with the
x-axis they form a container holding `min(height[i], height[j]) × (j − i)` water. Lines
between `i` and `j` do not matter. Return the maximum such area over all pairs.

Not to be confused with Trapping Rain Water: there the lines in between _do_ matter and
the answer is a sum over all positions.

Examples:

- `[1, 8, 6, 2, 5, 4, 8, 3, 7]` → `49` (lines 1 and 8: `min(8, 7) × 7`)
- `[1, 1]` → `1`

Constraints:

- `2 ≤ n ≤ 10⁵`
- `0 ≤ height[i] ≤ 10⁴`
- Target: `O(n)`, with a proof of why the chosen pointer can move.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Heights can be `0` — a container with a zero-height side holds nothing.
- Area is width × the _shorter_ line, not the taller one.
- `n = 10⁵` rules out checking every pair (`~5·10⁹` pairs).
- Equal heights on both sides are valid and common (`[1, 1]`, all-equal input).

## Follow-ups

- TODO
