/**
 * Reverse Linked List — see README.md next to this file.
 */

import type { ListNode } from '@/shared/structures/list-node.ts';
//               p  c  n
// { values: [null->1->2->3->4->5], expected: [5, 4, 3, 2, 1] },
export function reverseList(head: ListNode | null): ListNode | null {
  let curr = head;
  let prev = null;

  while (curr) {
    const next = curr.next;
    curr.next = prev;

    prev = curr;
    curr = next;
  }

  return prev;
}

export function reverseListRecursive(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  let newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}
