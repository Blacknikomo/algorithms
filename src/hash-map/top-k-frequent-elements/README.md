# Top K Frequent Elements

Source: [LeetCode 347](https://leetcode.com/problems/top-k-frequent-elements/) · Difficulty: medium · Tags: array

## Problem

Given an integer array `nums` and an integer `k`, return the `k` distinct values that occur
most often in `nums`, in any order. The answer is guaranteed to be unique — there is never
a tie across the cut between the `k`-th and the `(k+1)`-th most frequent value.

Signature: `topKFrequent(nums: readonly number[], k: number): number[]`. Target: better
than `O(n log n)` (LeetCode's follow-up). Count first, then name the selection step and
its cost: sort, heap of size `k`, or buckets indexed by frequency.

Examples:

- `[1, 1, 1, 2, 2, 3]`, `k = 2` → `[1, 2]`
- `[1]`, `k = 1` → `[1]`
- `[4, 4, 4, 6, 6, 1, 1, 1, 1, 7]`, `k = 2` → `[1, 4]`

Constraints:

- `1 ≤ nums.length ≤ 10⁵`
- `-10⁴ ≤ nums[i] ≤ 10⁴`
- `1 ≤ k ≤` number of distinct values in `nums`

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Return values, not their counts, and each value once.
- Frequency decides, not the value itself: `[100, 100, 1, 1, 1]`, `k = 1` → `[1]`.
- Ties _below_ the cut are allowed: `[1, 1, 1, 2, 3]`, `k = 1` → `[1]`.
- `k` can equal the number of distinct values — then every value is returned.
- Negative values and zero are in range.

## Follow-ups

- TODO
