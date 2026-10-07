# Remove Nth Node From End of List

Source: [LeetCode 19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) · Difficulty: medium · Tags: linked list

## Problem

Given the `head` of a singly linked list and `n`, remove the `n`-th node counting
**from the end** (`n = 1` is the tail) and return the head of the resulting list —
`null` if the list becomes empty. The node is unlinked from the existing list.

Examples:

- `[1, 2, 3, 4, 5]`, `n = 2` → `[1, 2, 3, 5]`
- `[1]`, `n = 1` → `[]`
- `[1, 2]`, `n = 1` → `[1]`

Constraints:

- `1 ≤ sz ≤ 30` nodes
- `0 ≤ Node.val ≤ 100`
- `1 ≤ n ≤ sz`
- Target: one pass, `O(1)` extra space. Two passes (count, then walk) is the brute
  force — also `O(n)`; say so. Handle `n = sz` without a special case.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- `n = sz` removes the head — the returned head is a different node.
- A single-node list becomes empty — return `null`.
- `n = 1` removes the tail — the new tail's `next` must be `null`.
- Values repeat (`[7, 7, 7, 7]`), so the right node is a position, not a value.

## Follow-ups

- TODO
