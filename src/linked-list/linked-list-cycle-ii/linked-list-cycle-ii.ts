/**
 * Linked List Cycle II — see README.md next to this file.
 */

import type { ListNode } from '@/shared/structures/list-node.ts';

/** TODO: describe the approach and its complexity. Must not modify the list. */

// Given the `head` of a linked list, return the **node** where the cycle begins, or `null` if there is no cycle. Internally, `pos` is the index the tail's `next` connects to (`-1` = no cycle); `pos` is not passed to your function. **Do not modify the list.**
// - `[3, 2, 0, -4]`, pos `1` → the node at index 1 (val 2)
// - `[1, 2]`, pos `0` → the node at index 0 (val 1)
// - `[1]`, pos `-1` → `null`

export function detectCycle(head: ListNode | null): ListNode | null {
  if (!head) return null;

  let slow = head;
  let fast = head;

  while (fast && fast.next && fast.next.next) {
    if (!slow.next) return null;

    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        slow = slow.next!;
        p = p.next!;
      }

      return p;
    }
  }

  return null;
}
