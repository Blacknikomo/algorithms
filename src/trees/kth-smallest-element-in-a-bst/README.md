# Kth Smallest Element in a BST

Source: [LeetCode 230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) · Difficulty: medium · Tags: binary search tree

## Problem

Given the `root` of a binary search tree and an integer `k`, return the `k`-th smallest
value among all node values, counting from 1 (`k = 1` is the minimum, `k = n` the
maximum). `k` is always valid, so there is no "not found" case.

Examples (tree in LeetCode level order):

- `root = [3, 1, 4, null, 2]`, `k = 1` → `1`
- `root = [5, 3, 6, 2, 4, null, null, 1]`, `k = 3` → `3`
- `root = [1, null, 2, null, 3, null, 4]`, `k = 4` → `4`

Constraints:

- `1 ≤ k ≤ n ≤ 10⁴`
- node values in `[ 0, 10⁴]`
- target: `O(h + k)` time, `O(h)` extra space, stopping at the `k`-th node

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

Follow-up: TODO — the BST is modified often and k-th queries are frequent. What do you
store?

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- `k` is 1-indexed: `k = 1` is the smallest value, not the second smallest.
- `k = n` asks for the largest value.
- `0` is a valid node value.
- The tree can be a single 10⁴-node chain, so its height can equal the node count.

## Follow-ups

- TODO
