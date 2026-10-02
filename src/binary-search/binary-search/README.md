# Binary Search

Source: [LeetCode 704](https://leetcode.com/problems/binary-search/) · Difficulty: easy · Tags: array

## Problem

Given an array of integers `nums` sorted in ascending order and an integer `target`,
return the index of `target` in `nums`, or `-1` if it is not there. The intended
solution runs in `O(log n)` time.

Examples:

- `nums = [-1, 0, 3, 5, 9, 12]`, `target = 9` → `4`
- `nums = [-1, 0, 3, 5, 9, 12]`, `target = 2` → `-1`

Constraints:

- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- All integers in `nums` are unique.
- `nums` is sorted in ascending order.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Single-element array — both the hit and the miss (smaller and larger) must work.
- Target at index `0` or at the last index.
- Target outside the range of values (below the first / above the last element).
- Target falling between two neighbouring elements.

## Follow-ups

- TODO
