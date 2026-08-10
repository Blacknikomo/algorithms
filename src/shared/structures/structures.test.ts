import { describe, expect, it } from 'vitest';
import { arrayToCyclicList, arrayToList, listToArray } from './list-node.ts';
import { arrayToTree, treeToArray } from './tree-node.ts';
import { PriorityQueue } from './priority-queue.ts';
import { createRng, randomArray } from '../utils/random.ts';

// The shared helpers are the ground everything else stands on — if they lie,
// every task's tests lie with them.

describe('linked list helpers', () => {
  it('round-trips an array', () => {
    expect(listToArray(arrayToList([1, 2, 3]))).toEqual([1, 2, 3]);
  });

  it('handles an empty array', () => {
    expect(arrayToList([])).toBeNull();
    expect(listToArray(null)).toEqual([]);
  });

  it('detects a cycle instead of hanging', () => {
    const cyclic = arrayToCyclicList([1, 2, 3], 1);
    expect(() => listToArray(cyclic, 100)).toThrow(/cycle/);
  });
});

describe('binary tree helpers', () => {
  it('round-trips level order with holes', () => {
    const levelOrder = [3, 9, 20, null, null, 15, 7];
    expect(treeToArray(arrayToTree(levelOrder))).toEqual(levelOrder);
  });

  it('handles an empty tree', () => {
    expect(arrayToTree([])).toBeNull();
    expect(treeToArray(null)).toEqual([]);
  });

  it('trims trailing nulls', () => {
    expect(treeToArray(arrayToTree([1, 2]))).toEqual([1, 2]);
  });
});

describe('PriorityQueue', () => {
  it('pops in ascending order for a min-heap', () => {
    const pq = PriorityQueue.min<number>();
    pq.push(5, 1, 4, 1, 9, 2);
    expect([...pq]).toEqual([1, 1, 2, 4, 5, 9]);
  });

  it('pops in descending order for a max-heap', () => {
    const pq = PriorityQueue.max<number>();
    pq.push(5, 1, 4);
    expect([...pq]).toEqual([5, 4, 1]);
  });

  it('supports a custom comparator over objects', () => {
    const pq = new PriorityQueue<{ name: string; cost: number }>((a, b) => a.cost - b.cost);
    pq.push({ name: 'c', cost: 3 }, { name: 'a', cost: 1 }, { name: 'b', cost: 2 });
    expect([...pq].map((item) => item.name)).toEqual(['a', 'b', 'c']);
  });

  it('reports size and empty state', () => {
    const pq = PriorityQueue.min<number>();
    expect(pq.isEmpty).toBe(true);
    expect(pq.pop()).toBeUndefined();
    expect(pq.peek()).toBeUndefined();

    pq.push(7);
    expect(pq.size).toBe(1);
    expect(pq.peek()).toBe(7);
  });

  it('matches a sorted array on random input', () => {
    const rng = createRng(42);

    for (let round = 0; round < 100; round++) {
      const values = randomArray(rng, 50, -1000, 1000);
      const pq = PriorityQueue.min<number>();
      pq.push(...values);
      expect([...pq]).toEqual([...values].sort((a, b) => a - b));
    }
  });
});
