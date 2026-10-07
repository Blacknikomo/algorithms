/**
 * Remove Nth Node From End of List — see README.md next to this file.
 */

import { ListNode } from '@/shared/structures/list-node.ts';

/** TODO: describe the approach and its complexity. Unlinks the node in place. */
export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // { values: [1, 2, 3, 4, 5, 6, 7, 8], n: 2, expected: [1, 2, 3, 4, 5, 6, 8] },
    // { values: [1, 2, 3, 4, 5, 6, 7, 8], n: 4, expected: [1, 2, 3, 4, 6, 7, 8] },
    // { values: [1], n: 1, expected: [] },
    // { values: [1, 2], n: 1, expected: [1] },


  if (!head) return head

  let dummy = new ListNode(-1, head)
  let slow = dummy;
  let fast = dummy;

  for (let i = 0; i < n; i++) {
    if (!fast.next) return null;
    fast = fast?.next;
  }

  while (fast.next) {
    slow = slow.next!;
    fast = fast.next!;
  }

  slow.next = slow.next.next!;

  return dummy.next;
}
