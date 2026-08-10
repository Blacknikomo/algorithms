# Two Sum

Source: [LeetCode 1](https://leetcode.com/problems/two-sum/) · Difficulty: easy · Tags: array, hash map

## Problem

Given an array of integers `nums` and an integer `target`, return the indices of the two
numbers that add up to `target`. Each input has at most one answer and the same element
may not be used twice. Return `null` when there is no such pair.

## Approaches

| Approach       | Time     | Space  | Note                                    |
| -------------- | -------- | ------ | --------------------------------------- |
| Brute force    | `O(n^2)` | `O(1)` | Reference implementation for stress test |
| Hash map       | `O(n)`   | `O(n)` | One pass, complement lookup              |

## Key idea

Instead of searching for a pair, search for one number at a time: for the current
element ask "have I already seen `target - value`?". Writing to the map *after* the
lookup is what stops an element from pairing with itself.

## Traps

- The same element must not be used twice (`[5, 1, 2]`, target `10` → no answer).
- Negative numbers and duplicates are valid input (`[3, 3]`, target `6` → `[0, 1]`).
- Empty array / single element must not crash.

## Follow-ups

- Input is sorted → two pointers, `O(n)` time and `O(1)` space.
- Return all unique pairs, not just one → sort + two pointers, watch duplicate skipping.
- 3Sum / 4Sum are this problem plus one outer loop.
