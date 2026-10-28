/**
 * Reverse Linked List — see README.md next to this file.
 */

import { ListNode } from '@/shared/structures/list-node.ts';

/** TODO: describe the approach and its complexity. */
export function reverseList(head: ListNode | null): ListNode | null {
  let prev = null;
  let current = head;


  while (current) {
    const next = current.next;
    current.next = prev;

    prev = current;
    current = next!;
  }

  return prev;
}

/** TODO: describe the approach and its complexity. */
export function reverseListRecursive(head: ListNode | null): ListNode | null {
  throw new Error('reverseListRecursive: not implemented');
}
