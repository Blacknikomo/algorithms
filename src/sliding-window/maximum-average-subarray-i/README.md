# Maximum Average Subarray I

Source: [LeetCode 643](https://leetcode.com/problems/maximum-average-subarray-i/) · Difficulty: easy · Tags: array

## Problem

Given an integer array `nums` and an integer `k`, look at every contiguous subarray of
length **exactly** `k` and return the largest average among them. Answers within `10⁻⁵` of
the true value are accepted.

Signature: `findMaxAverage(nums: readonly number[], k: number): number`. Target: `O(n)`
time, `O(1)` extra space.

Examples:

- `[1, 12, -5, -6, 50, 3]`, `k = 4` → `12.75` (`[12, -5, -6, 50]`)
- `[5]`, `k = 1` → `5`
- `[-4, -2, -7]`, `k = 2` → `-3`

Constraints:

- `1 ≤ k ≤ n ≤ 10⁵`
- `-10⁴ ≤ nums[i] ≤ 10⁴`

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- All-negative input: the answer is negative (`[-5, -3, -9]`, `k = 1` → `-3`) — what does
  `best` start at?
- `k = n` leaves exactly one window; `k = 1` makes every element a window.
- Length is exactly `k` — not "at most `k`".
- The result is fractional (`[1, 2, 1]`, `k = 3` → `1.333…`) — don't round or use integer division.

## Follow-ups

- TODO
