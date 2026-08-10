/**
 * Singly linked list node, shaped exactly like the one LeetCode hands you,
 * plus converters so tests can stay readable arrays.
 */
export class ListNode<T = number> {
  constructor(
    public val: T,
    public next: ListNode<T> | null = null,
  ) {}
}

/** [1, 2, 3] -> 1 -> 2 -> 3 -> null */
export function arrayToList<T>(values: readonly T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null;
  let tail: ListNode<T> | null = null;

  for (const value of values) {
    const node = new ListNode(value);
    if (tail === null) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
  }

  return head;
}

/** 1 -> 2 -> 3 -> null  ->  [1, 2, 3]. Throws on a cycle instead of hanging. */
export function listToArray<T>(head: ListNode<T> | null, maxLength = 10_000): T[] {
  const result: T[] = [];

  for (let node = head; node !== null; node = node.next) {
    if (result.length >= maxLength) {
      throw new Error(`listToArray: list is longer than ${maxLength} nodes — probably a cycle`);
    }
    result.push(node.val);
  }

  return result;
}

/** Builds a list whose tail points back at index `cycleIndex` (-1 = no cycle). */
export function arrayToCyclicList<T>(values: readonly T[], cycleIndex: number): ListNode<T> | null {
  const head = arrayToList(values);
  if (head === null || cycleIndex < 0) return head;

  let target: ListNode<T> | null = head;
  for (let i = 0; i < cycleIndex && target !== null; i++) {
    target = target.next;
  }

  let tail = head;
  while (tail.next !== null) tail = tail.next;
  tail.next = target;

  return head;
}
