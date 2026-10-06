# Linked List Cycle II

Source: [LeetCode 142](https://leetcode.com/problems/linked-list-cycle-ii/) · Difficulty: medium · Tags: linked list

## Problem

Given the `head` of a singly linked list, return the **node** where the cycle begins, or
`null` if there is no cycle. Internally the tail's `next` points at index `pos`
(`-1` = no cycle), but `pos` is not passed to the function. The list must not be
modified. Values may repeat, so the answer is a node identity (`===`), not a value.

Examples:

- `[3, 2, 0, -4]`, pos `1` → the node at index 1 (val 2)
- `[1, 2]`, pos `0` → the node at index 0 (val 1)
- `[1]`, pos `-1` → `null`

Constraints:

- `0 ≤ n ≤ 10⁴`
- `-10⁵ ≤ Node.val ≤ 10⁵`
- `pos` is `-1` or a valid index.
- Target: `O(n)` time, `O(1)` extra space. State the Set-of-visited-nodes version first
  (`O(n)` space), then prove phase 2: `a + b = k·c`.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Empty list and a single node (with or without a self-loop).
- A cyclic list never reaches `null` — any loop that waits for `null` hangs.
- Repeated values: two nodes with the same `val` are different answers; compare nodes,
  not values.
- The cycle can start at the head (`pos = 0`) or at the tail itself (`pos = n − 1`).
- The list must come back unchanged — no marking nodes or rewiring `next`.

## Follow-ups

- TODO
