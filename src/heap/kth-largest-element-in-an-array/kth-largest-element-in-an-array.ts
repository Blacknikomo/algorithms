/**
 * Kth Largest Element in an Array — see README.md next to this file.
 */

/**
 * TODO: describe the approach and its complexity.
 *
 * `nums` is not `readonly`: an in-place approach may reorder it. Callers must not rely
 * on its order afterwards.
 */
export function findKthLargest(nums: number[], k: number): number {
  const heap = MaxHeap.heapify(nums);
  let result: number | null = -1;

  for (let i = 0; i < k; i++) {
    result = heap.pop();
  }

  return result;
}

// - `nums = [3, 2, 1, 5, 6, 4]`, `k = 2` → `5` (descending: 6, **5**, 4, …)
// - `nums = [3, 2, 3, 1, 2, 4, 5, 5, 6]`, `k = 4` → `4` (6, 5, 5, **4** — both 5s count)
// - `nums = [7, 7, 7, 7]`, `k = 3` → `7`

/**
 *  0 1  2 3 4  5  6 7
 * 10 3 15 2 5 13 18 1
 *        10
 *     3      15
 *   2   5  13   18
 *  1
 */

type Comparator<T> = (a: T, b: T) => number;

class MaxHeap<T = number> {
  store: T[] = [];

  constructor(public cmp: (a: T, b: T) => number = (a: any, b: any) => a - b) {}

  get size(): number {
    return this.store.length;
  }

  peek(): T | undefined {
    return this.store.at(0);
  }

  push(number: T): void {
    this.store.push(number);
    this.up(this.store.length - 1);
  }

  pop(): T | undefined {
    if (!this.size) return undefined;

    const element = this.store.at(0);
    const last = this.store.pop();

    if (!this.size) return element;

    this.store[0] = last!;
    this.down(0);

    return element;
  }

  public static heapify = function (numbers: number[]): MaxHeap<number> {
    const heap = new MaxHeap<number>();
    for (let item of numbers) {
      heap.push(item);
    }

    return heap;
  };

  down(index: number) {
    while (true) {
      const leftChildIdx = index * 2 + 1;
      const rightChildIdx = leftChildIdx + 1;
      let nextIdx = index;
      let currentIdx = nextIdx;

      const values = {
        left: this.store.at(leftChildIdx),
        right: this.store.at(rightChildIdx),
        current: this.store.at(currentIdx),
      };

      if (leftChildIdx < this.size && this.cmp(values.left!, values.current!) > 0)
        nextIdx = leftChildIdx;
      if (rightChildIdx < this.size && this.cmp(values.right!, this.store[nextIdx]!) > 0)
        nextIdx = rightChildIdx;

      if (nextIdx == currentIdx) break;
      index = nextIdx;

      this.store[currentIdx] = this.store[nextIdx];
      this.store[nextIdx] = values.current!;
    }
  }

  up(index: number) {
    let currentElementIndex = index;
    while (currentElementIndex > 0) {
      let parentIdx = (currentElementIndex - 1) >> 1;
      const parentValue = this.store[parentIdx];
      const currentValue = this.store[currentElementIndex];

      if (this.cmp(parentValue, currentValue) >= 0) break;

      this.store[parentIdx] = currentValue;
      this.store[currentElementIndex] = parentValue;

      currentElementIndex = parentIdx;
    }
  }
}

class MaxHeapOld {
  private store: number[] = [];
  private comp: Comparator = (a, b) => b - a;

  constructor(sort?: Comparator) {
    if (sort) this.comp = sort;
  }

  peek() {
    return this.store[0];
  }

  push(n: number) {
    this.store.push(n);
    this.up();
  }

  pop() {
    const item = this.store[0];
    this.store[0] = this.store[this.store.length - 1];
    this.store.splice(this.store.length - 1);

    this.down();

    return item;
  }

  up() {
    let index = this.store.length - 1;

    while (index > 0) {
      let parentIndex = (index - 1) >> 1;
      if (this.store[index] > this.store[parentIndex]) {
        this.swap(index, parentIndex);
      } else {
        break;
      }

      index = parentIndex;
    }
  }

  down() {
    let index = 0;
    let n = this.store.length;

    while (true) {
      let leftChildIndex = this.getLeftChildIndex(index);
      let rightChildIndex = this.getRightChildIndex(index);
      let best = index;

      const currentElement = this.store[index];
      const leftChild = this.store[leftChildIndex];
      const rightChild = this.store[rightChildIndex];

      if (leftChildIndex < n && leftChild < currentElement) best = leftChildIndex;

      if (rightChildIndex < n && rightChild < currentElement) best = rightChildIndex;

      if (best === index) break;
      this.swap(best, index);

      i = best;
    }
  }

  private swap(aIndex: number, bIndex: number): void {
    [this.store[aIndex], this.store[bIndex]] = [this.store[bIndex], this.store[aIndex]];
  }
  private getLeftChildIndex = (i: number) => i * 2 + 1;
  private getRightChildIndex = (i: number) => i * 2 + 2;
}
