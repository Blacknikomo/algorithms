/**
 * Binary-heap priority queue. JS has no built-in one and interview problems
 * (Dijkstra, top-K, merge k lists) need it constantly.
 *
 * The comparator follows `Array.prototype.sort` semantics: a negative result
 * means `a` comes out first. So the default below is a min-heap.
 */
export class PriorityQueue<T> {
  private readonly heap: T[] = [];

  constructor(private readonly compare: (a: T, b: T) => number) {}

  /** Convenience factory for numbers: `PriorityQueue.min<number>()`. */
  static min<T extends number | string>(): PriorityQueue<T> {
    return new PriorityQueue<T>((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  static max<T extends number | string>(): PriorityQueue<T> {
    return new PriorityQueue<T>((a, b) => (a > b ? -1 : a < b ? 1 : 0));
  }

  get size(): number {
    return this.heap.length;
  }

  get isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  push(...values: T[]): this {
    for (const value of values) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
    }
    return this;
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;

    const top = this.heap[0] as T;
    const last = this.heap.pop() as T;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }

    return top;
  }

  /** Drains the queue in priority order. */
  *[Symbol.iterator](): Generator<T> {
    while (!this.isEmpty) {
      yield this.pop() as T;
    }
  }

  private siftUp(start: number): void {
    let index = start;
    const value = this.heap[index] as T;

    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.compare(value, this.heap[parent] as T) >= 0) break;
      this.heap[index] = this.heap[parent] as T;
      index = parent;
    }

    this.heap[index] = value;
  }

  private siftDown(start: number): void {
    let index = start;
    const length = this.heap.length;
    const value = this.heap[index] as T;

    for (;;) {
      const left = index * 2 + 1;
      if (left >= length) break;

      const right = left + 1;
      const child =
        right < length && this.compare(this.heap[right] as T, this.heap[left] as T) < 0
          ? right
          : left;

      if (this.compare(this.heap[child] as T, value) >= 0) break;

      this.heap[index] = this.heap[child] as T;
      index = child;
    }

    this.heap[index] = value;
  }
}
