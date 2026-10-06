# Search in Rotated Sorted Array

Source: [LeetCode 33](https://leetcode.com/problems/search-in-rotated-sorted-array/) · Difficulty: medium · Tags: array

## Problem

`nums` holds **distinct** values that were sorted ascending and then possibly rotated at
an unknown pivot `k`: `[nums[k], …, nums[n−1], nums[0], …, nums[k−1]]`. Given `target`,
return its index in `nums`, or `-1` if it is absent. Must run in `O(log n)`. LeetCode
calls the function `search`; here it is `searchRotated`.

Builds on Find Minimum in Rotated Sorted Array.

Examples:

- `[4, 5, 6, 7, 0, 1, 2]`, target `0` → `4`
- `[4, 5, 6, 7, 0, 1, 2]`, target `3` → `-1`
- `[1]`, target `0` → `-1`

Constraints:

- `1 ≤ n ≤ 5000`
- `-10⁴ ≤ nums[i], target ≤ 10⁴`
- All values are distinct.
- Target: `O(log n)`.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- "Possibly rotated" includes not rotated at all — a plain sorted array is valid input.
- Two elements (`[3, 1]`, target `1` → `1`): the smallest rotated case.
- A single element, matching or not.
- Target at either end of the array, or equal to the maximum / minimum.
- A missing target can fall inside the value range (`[5, 6, 1, 2, 3]`, target `4`).

## Follow-ups

- TODO
