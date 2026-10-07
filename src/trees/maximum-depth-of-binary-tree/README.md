# Maximum Depth of Binary Tree

Source: [LeetCode 104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) · Difficulty: easy · Tags: binary tree

## Problem

Given the root of a binary tree (`TreeNode | null`), return its maximum depth: the number
of **nodes** (not edges) on the longest path from the root down to a leaf. An empty tree
(`null`) has depth `0`, a single node has depth `1`.

Solve it three ways, all with the same signature `(root: TreeNode | null) => number`:

- `maxDepth` — **bottom-up** recursion: the height of a subtree comes up as a return value.
- `maxDepthTopDown` — **top-down** recursion: the current depth goes down as an argument.
- `maxDepthBfs` — iterative, level by level.

Trees in the tests are written as LeetCode level-order arrays (`null` = missing child).

### Examples

- `[3,9,20,null,null,15,7]` → `3` (3 → 20 → 15, or 3 → 20 → 7)
- `[1,null,2]` → `2` (a single right child still counts)
- `[]` → `0` (empty tree)

### Constraints

- Number of nodes in `[0, 10⁴]`.
- `-100 ≤ Node.val ≤ 100`.
- Target: `O(n)` time; space stated as `O(h)` — `O(log n)` balanced, `O(n)` skewed.

## Approaches

| Approach  | Time | Space | Note |
| --------- | ---- | ----- | ---- |
| Bottom-up | TODO | TODO  |      |
| Top-down  | TODO | TODO  |      |
| BFS       | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Depth counts nodes, not edges: a single node is `1`, an empty tree is `0`.
- A node with only one child is not a leaf — the missing side must not end the path.
- Node values are irrelevant (and may be negative); only the shape matters.
- A 10⁴-node chain means 10⁴ nested recursive calls — close to the default JS stack limit.

## Follow-ups

- TODO
