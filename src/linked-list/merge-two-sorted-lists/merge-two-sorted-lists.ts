/**
 * Merge Two Sorted Lists — see README.md next to this file.
 */

import { ListNode } from '@/shared/structures/list-node.ts';
// merges [ 1, 2, 4 ] and [ 1, 3, 4 ] into [ 1, 1, 2, 3, 4, 4 ]
/** TODO: describe the approach and its complexity. Splices the input nodes, no copies. */
export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode(-1)
  let head = dummy;

  while (list1 && list2) {
    head.next = list1.val < list2.val ? list1 : list2;

    if (list1.val < list2.val) {
      list1 = list1.next;
    } else {
      list2 = list2.next;
    }

    head = head.next;

  }

  head.next = list1 ? list1 : list2;

  return dummy.next;
}
