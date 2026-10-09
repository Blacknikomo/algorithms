# Validate Binary Search Tree

Source: [LeetCode 98](https://leetcode.com/problems/validate-binary-search-tree/) · Difficulty: medium · Tags: binary tree

## Problem

Given the `root` of a binary tree, return `true` if it is a valid binary search tree and
`false` otherwise. A tree is a valid BST when, for every node, every key in its left
subtree is strictly smaller than the node's key, every key in its right subtree is
strictly larger, and both subtrees are themselves valid BSTs.

Examples (tree in LeetCode level order):

- `[2, 1, 3]` → `true`
- `[5, 1, 4, null, null, 3, 6]` → `false` — 4 is the right child of 5 but smaller
- `[5, 4, 6, null, null, 3, 7]` → `false` — 3 < 6 locally, but it is in 5's right subtree

Constraints:

- `1 ≤ n ≤ 10⁴` nodes
- node values in `[-2³¹, 2³¹ − 1]`
- target: `O(n)` time, `O(h)` extra space

## Approaches

Before coding: TODO — state the parent-only check and why it fails.

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- "Strictly" — a key equal to its parent, or to any ancestor, makes the tree invalid
  (`[2, 2]`, `[5, 3, 7, null, null, 5]` → `false`).
- Values reach both ends of the 32-bit range (`[0, -2³¹, 2³¹ − 1]` → `true`), so any
  "no bound" placeholder must not collide with a real value.
- Up to 10⁴ nodes in a single chain — the tree height `h` can be `n`.

## Follow-ups

- TODO
