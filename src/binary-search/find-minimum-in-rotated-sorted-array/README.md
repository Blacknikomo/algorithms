# Find Minimum in Rotated Sorted Array

Source: [LeetCode 153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) · Difficulty: medium · Tags: array

## Problem

An array of **distinct** integers, sorted ascending, was rotated between 1 and `n`
times. One rotation moves the last element to the front: `[a0, a1, …, a(n−1)]` →
`[a(n−1), a0, …, a(n−2)]`; `n` rotations give back the original order. Given the
rotated array `nums`, return its minimum element in `O(log n)` time.

Examples:

- `[3, 4, 5, 1, 2]` → `1` (rotated 3 times)
- `[4, 5, 6, 7, 0, 1, 2]` → `0` (rotated 4 times)
- `[11, 13, 15, 17]` → `11` (rotated `n` times, so it is sorted)

Constraints:

- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All values are distinct.
- `nums` is a sorted ascending array rotated between 1 and `n` times.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Rotated `n` times means the array is plain sorted — the minimum is at index `0`.
- Single element and two elements (rotated or not).
- Minimum at the last position (rotated once) or at index 1 (rotated `n − 1` times).
- Negative values and both bounds of the range are valid input.

## Follow-ups

- TODO
