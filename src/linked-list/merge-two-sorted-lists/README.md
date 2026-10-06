# Merge Two Sorted Lists

Source: [LeetCode 21](https://leetcode.com/problems/merge-two-sorted-lists/) · Difficulty: easy · Tags: linked list

## Problem

Given the heads of two singly linked lists `list1` and `list2`, each sorted in
non-decreasing order, merge them into one sorted list and return its head (`null` if
both are empty). The result must be built by **splicing together the input nodes**,
not by allocating copies.

Examples:

- `[1, 2, 4]`, `[1, 3, 4]` → `[1, 1, 2, 3, 4, 4]`
- `[]`, `[]` → `[]`
- `[]`, `[0]` → `[0]`

Constraints:

- Each list has `0 ≤ n ≤ 50` nodes.
- `-100 ≤ Node.val ≤ 100`
- Both lists are sorted in non-decreasing order.
- Target: `O(m + n)` time, `O(1)` extra space — reuse the nodes. Explain why a dummy
  node removes the "who supplies the head?" branch.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Either list, or both, can be empty.
- Duplicates within a list and equal values across lists (`[1, 2, 4]` + `[1, 3, 4]`).
- Lists of very different length — one runs out long before the other.
- The output must reuse the input nodes; a solution that copies values into new nodes
  fails the splicing test.

## Follow-ups

- TODO
