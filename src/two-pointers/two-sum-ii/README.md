# Two Sum II - Input Array Is Sorted

Source: [LeetCode 167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) · Difficulty: medium · Tags: array

## Problem

Given an array `numbers` sorted in non-decreasing order and an integer `target`, return
`[index1, index2]` — the **1-indexed** positions of the two numbers that add up to
`target`, with `index1 < index2`. There is exactly one solution, and the same element
cannot be used twice. Only constant extra space is allowed.

Signature: `twoSumII(numbers: readonly number[], target: number): number[]`.

Contrast with [Two Sum](../../array/two-sum/README.md), whose hash-map solution uses
`O(n)` space — not allowed here.

Examples:

- `[2, 7, 11, 15]`, target `9` → `[1, 2]`
- `[2, 3, 4]`, target `6` → `[1, 3]`
- `[-1, 0]`, target `-1` → `[1, 2]`

Constraints:

- `2 ≤ numbers.length ≤ 3·10⁴`
- `-1000 ≤ numbers[i] ≤ 1000`
- `numbers` is sorted in non-decreasing order
- Exactly one solution exists

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Indices are **1-based** in the output.
- The same element can't be used twice: `[1, 3, 5]`, target `6` → `[1, 3]`, not `3 + 3`.
- Duplicates are allowed and may themselves be the pair: `[0, 0, 3, 4]`, target `0` → `[1, 2]`.
- Negatives and zero are in range.
- `O(1)` extra space — no hash map / set.

## Follow-ups

- TODO
