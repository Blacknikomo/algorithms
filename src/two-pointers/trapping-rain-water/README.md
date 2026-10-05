# Trapping Rain Water

Source: [LeetCode 42](https://leetcode.com/problems/trapping-rain-water/) · Difficulty: hard · Tags: array

## Problem

`height` holds `n` non-negative bar heights, each bar of width 1, standing side by side.
After rain, water collects in the dips between bars. Return the total units of water
trapped. Every bar is a wall: bars in between take up volume and can split the water
into separate pools — unlike Container With Most Water, where only the two chosen lines
matter.

Examples:

- `[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]` → `6`
- `[4, 2, 0, 3, 2, 5]` → `9`

Constraints:

- `1 ≤ n ≤ 2·10⁴`
- `0 ≤ height[i] ≤ 10⁵`
- Target: first the `O(n)`-space prefix/suffix-max version, then `O(1)` space with two
  pointers.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- `n` can be 1 or 2 — nothing can be trapped, must not crash.
- Water spills off both ends: monotonic input and a single peak hold nothing.
- Walls of different height: the level is set by the shorter side.
- Flat stretches (equal neighbouring heights, plateaus) are common.
- The total can reach `~2·10⁹` — fine for a JS `number`, but worth noticing.

## Follow-ups

- TODO
