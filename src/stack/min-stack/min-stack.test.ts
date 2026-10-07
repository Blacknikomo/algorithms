import { describe, expect, it } from 'vitest';
import { MinStack } from './min-stack.ts';

interface Stack {
  push(val: number): void;
  pop(): void;
  top(): number;
  getMin(): number;
}

type Op = ['push', number] | ['pop'] | ['top'] | ['getMin'];

// A second design is one more row here.
const implementations: [string, () => Stack][] = [['MinStack', () => new MinStack()]];

const MIN = -(2 ** 31);
const MAX = 2 ** 31 - 1;

/** Runs the operations on a fresh stack and collects what `top` and `getMin` return. */
const run = (create: () => Stack, ops: Op[]): number[] => {
  const stack = create();
  const out: number[] = [];
  for (const op of ops) {
    if (op[0] === 'push') stack.push(op[1]);
    else if (op[0] === 'pop') stack.pop();
    else if (op[0] === 'top') out.push(stack.top());
    else out.push(stack.getMin());
  }
  return out;
};

describe.each(implementations)('%s', (_name, create) => {
  it.each<{ ops: Op[]; expected: number[] }>([
    {
      ops: [['push', -2], ['push', 0], ['push', -3], ['getMin'], ['pop'], ['top'], ['getMin']],
      expected: [-3, 0, -2],
    },
    // { ops: [['push', 3], ['push', 1], ['push', 1], ['pop'], ['getMin']], expected: [1] },
    // {
    //   ops: [['push', 0], ['push', 1], ['push', 0], ['getMin'], ['pop'], ['getMin']],
    //   expected: [0, 0],
    // },
  ])('statement example $#: returns $expected', ({ ops, expected }) => {
    expect(run(create, ops)).toEqual(expected);
  });

  // it.each<{ name: string; ops: Op[]; expected: number[] }>([
  //   { name: 'a single element', ops: [['push', 5], ['top'], ['getMin']], expected: [5, 5] },
  //   {
  //     name: 'the minimum on top, not the bottom',
  //     ops: [['push', 1], ['push', 5], ['top'], ['getMin']],
  //     expected: [5, 1],
  //   },
  //   {
  //     name: 'decreasing pushes, popped one by one',
  //     ops: [
  //       ['push', 3],
  //       ['push', 2],
  //       ['push', 1],
  //       ['getMin'],
  //       ['pop'],
  //       ['getMin'],
  //       ['pop'],
  //       ['getMin'],
  //     ],
  //     expected: [1, 2, 3],
  //   },
  //   {
  //     name: 'increasing pushes, popped one by one',
  //     ops: [
  //       ['push', 1],
  //       ['push', 2],
  //       ['push', 3],
  //       ['getMin'],
  //       ['pop'],
  //       ['getMin'],
  //       ['pop'],
  //       ['getMin'],
  //     ],
  //     expected: [1, 1, 1],
  //   },
  //   {
  //     name: 'a duplicated minimum popped one copy at a time',
  //     ops: [['push', 2], ['push', 1], ['push', 1], ['pop'], ['getMin'], ['pop'], ['getMin']],
  //     expected: [1, 2],
  //   },
  //   {
  //     name: 'reuse after becoming empty',
  //     ops: [['push', 1], ['pop'], ['push', 2], ['top'], ['getMin']],
  //     expected: [2, 2],
  //   },
  //   {
  //     name: '32-bit boundary values',
  //     ops: [['push', MAX], ['push', MIN], ['getMin'], ['top'], ['pop'], ['getMin'], ['top']],
  //     expected: [MIN, MIN, MAX, MAX],
  //   },
  // ])('handles $name', ({ ops, expected }) => {
  //   expect(run(create, ops)).toEqual(expected);
  // });

  // it('keeps separate instances independent', () => {
  //   const a = create();
  //   const b = create();
  //   a.push(1);
  //   b.push(2);
  //   expect([a.top(), a.getMin(), b.top(), b.getMin()]).toEqual([1, 1, 2, 2]);
  // });

  // it('handles ~3·10⁴ calls: 10 000 decreasing pushes, then pops', () => {
  //   // Pushing 10 000, 9 999, …, 1 makes every new value the minimum; popping then
  //   // exposes them again in reverse, so after popping value v the minimum is v + 1.
  //   const stack = create();
  //   for (let v = 10_000; v >= 1; v--) {
  //     stack.push(v);
  //     expect(stack.getMin()).toBe(v);
  //   }
  //   for (let v = 1; v < 10_000; v++) {
  //     stack.pop();
  //     expect(stack.getMin()).toBe(v + 1);
  //   }
  //   expect(stack.top()).toBe(10_000);
  // });
});
