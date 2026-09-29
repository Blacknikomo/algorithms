# 3Sum

Source: [LeetCode 15](https://leetcode.com/problems/3sum/) · Difficulty: medium · Tags: array

## Problem

Given an integer array `nums`, return every **unique** triplet `[nums[i], nums[j], nums[k]]`
with three distinct indices `i`, `j`, `k` whose values add up to `0`. No triplet may
appear twice in the result (two triplets with the same values count as the same). The
order of the triplets, and of the values inside a triplet, doesn't matter. Return `[]`
when there is none.

Signature: `threeSum(nums: readonly number[]): number[][]`. Target: `O(n²)` time, and no
`Set` for deduplication. Builds on [Two Sum II](../two-sum-ii/README.md).

Examples:

- `[-1, 0, 1, 2, -1, -4]` → `[[-1, -1, 2], [-1, 0, 1]]`
- `[0, 1, 1]` → `[]`
- `[0, 0, 0]` → `[[0, 0, 0]]`

Constraints:

- `3 ≤ nums.length ≤ 3000`
- `-10⁵ ≤ nums[i] ≤ 10⁵`

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Duplicate values must not produce duplicate triplets: `[0, 0, 0, 0, 0]` → `[[0, 0, 0]]`.
- Equal values at different indices _may_ share a triplet (`[-1, -1, 2]`), but one element
  cannot be used twice: `[-2, 1, 3, 4]` → `[]`.
- `[0, 0, 0]` needs three zeros — two are not enough.
- No answer → `[]`, not `null`.
- `n = 3000` rules out `O(n³)`.

## Follow-ups

- TODO
