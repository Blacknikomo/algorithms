# Search in a Binary Search Tree

Source: [LeetCode 700](https://leetcode.com/problems/search-in-a-binary-search-tree/) · Difficulty: easy · Tags: binary search tree

## Problem

Given the `root` of a binary search tree and an integer `val`, find the node whose value
equals `val` and return it — that is, the subtree rooted at that node. Return `null` if
no node holds `val`. The returned node must be the one in the input tree, not a copy.

Examples (tree in LeetCode level order):

- `root = [4, 2, 7, 1, 3]`, `val = 2` → `[2, 1, 3]`
- `root = [4, 2, 7, 1, 3]`, `val = 5` → `[]` (`null`)

Constraints:

- the number of nodes is in `[1, 5000]`
- `1 ≤ Node.val ≤ 10⁷`
- `root` is a binary search tree
- `1 ≤ val ≤ 10⁷`

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- No match → return `null`, not an empty node (`val = 5` above).
- `val` can be smaller than every key, larger than every key, or fall between two keys.
- A match at the root returns the whole tree.
- The tree can be a single 5000-node chain, so its height can equal the node count.

## Follow-ups

- TODO
