# Kth Largest Element in an Array

Source: [LeetCode 215](https://leetcode.com/problems/kth-largest-element-in-an-array/) · Difficulty: medium · Tags: array

## Problem

Given an integer array `nums` and an integer `k`, return the element that would stand at position `k` (1-based) if `nums` were sorted in descending order. This is the k-th largest _element_, not the k-th largest _distinct value_: duplicates each take a position. The challenge is to do it without sorting.

Signature: `findKthLargest(nums: number[], k: number): number`. `nums` may be reordered.

Target: a size-`k` min-heap, `O(n log k)` time and `O(k)` space. Then quickselect (`O(n)` average, `O(n²)` worst) — state or write it, including what a random pivot and a three-way partition protect against.

Examples:
  
- `nums = [3, 2, 1, 5, 6, 4]`, `k = 2` → `5` (descending: 6, **5**, 4, …)
- `nums = [3, 2, 3, 1, 2, 4, 5, 5, 6]`, `k = 4` → `4` (6, 5, 5, **4** — both 5s count)
- `nums = [7, 7, 7, 7]`, `k = 3` → `7`

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

- Duplicates count: `[2, 1, 2]`, `k = 2` → `2`, not `1`.
- `k` is 1-based; `k = 1` is the maximum and `k = n` is the minimum.
- Negative values and zero are valid input.
- Inputs up to `10⁵` may arrive already sorted or with every value equal.

## Follow-ups

- TODO
