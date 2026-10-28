# Invert Binary Tree

Source: [LeetCode 226](https://leetcode.com/problems/invert-binary-tree/) · Difficulty: easy · Tags: binary tree

## Problem

Given the root of a binary tree (`TreeNode | null`), mirror it: swap the left and right
child of **every** node, then return the root (`null` for an empty tree). Tests compare
the result in LeetCode level order (`null` = missing child).

### Examples

- `[4,2,7,1,3,6,9]` → `[4,7,2,9,6,3,1]` (every level reversed)
- `[2,1,3]` → `[2,3,1]`
- `[]` → `[]` (empty tree)

### Constraints

- Number of nodes in `[0, 100]`.
- `-100 ≤ Node.val ≤ 100`.
- Target: `O(n)` time, `O(h)` space.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

TODO — where may the swap go (before both recursive calls, or after both), and why is
putting it _between_ them a bug?

## Traps

- Every node is swapped, not just the root: a lone child must move to the other side
  (`[1,2]` → `[1,null,2]`).
- Empty tree returns `null`; a single node returns itself unchanged.
- A symmetric tree looks unchanged after inverting — passing on it proves nothing.
- Values can repeat and be negative; only the shape is mirrored.

## Follow-ups

- TODO
