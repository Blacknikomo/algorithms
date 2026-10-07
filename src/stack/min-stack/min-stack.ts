/**
 * Min Stack — see README.md next to this file.
 */

type StateCounter = {
  value: number;
  min: number;
};
/** TODO: describe the approach and the complexity of each operation. */
export class MinStack {
  stack: StateCounter[] = [];
  min: number | null = null;

  constructor() {}

  // Q: could I use built in methods?
  push(val: number): void {
    this.min = this.min === null ? val : Math.min(this.min, val);
    this.stack.push({ value: val, min: this.min });
  }

  /** Only called on a non-empty stack. */
  pop(): void {
    if (!this.stack.length) throw new Error('Stack is empty');
    this.stack.pop();

    if (!this.stack.length) {
      this.min = null;
      return;
    } else {
      this.min = this.stack[this.stack.length - 1].min;
    }
  }

  /** Only called on a non-empty stack. */
  // Q: What return if stack is empty?
  top(): number {
    if (!this.stack.length) throw new Error('Stack is empty');

    return this.stack[this.stack.length - 1].value;
  }

  /** Only called on a non-empty stack. */
  getMin(): number {
    if (!this.stack.length) throw new Error('Stack is empty');
    return this.min;
  }
}
