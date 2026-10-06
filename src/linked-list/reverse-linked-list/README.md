# Reverse Linked List

Source: [LeetCode 206](https://leetcode.com/problems/reverse-linked-list/) · Difficulty: easy · Tags: linked list

## Problem

Given the `head` of a singly linked list, reverse the list and return the new head
(`null` for an empty list). Write it twice, with the same signature: `reverseList`
(iterative) and `reverseListRecursive` (recursive).

Examples:

- `[1, 2, 3, 4, 5]` → `[5, 4, 3, 2, 1]`
- `[1, 2]` → `[2, 1]`
- `[]` → `[]`

Constraints:

- `0 ≤ n ≤ 5000`
- `-5000 ≤ Node.val ≤ 5000`
- Target: `O(n)` time; the iterative version uses `O(1)` extra space. For the recursive
  one, state its extra space and why it is not `O(1)`.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Empty list (`head = null`) and a single node must come back unchanged.
- Up to 5000 nodes: the recursive version must handle that list length too.

## Follow-ups

- TODO
