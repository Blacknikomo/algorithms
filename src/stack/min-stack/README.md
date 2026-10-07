# Min Stack

Source: [LeetCode 155](https://leetcode.com/problems/min-stack/) · Difficulty: medium · Tags: stack, design

## Problem

Implement a class `MinStack` with:

- `push(val: number): void` — push `val`;
- `pop(): void` — remove the top element;
- `top(): number` — return the top element;
- `getMin(): number` — return the smallest element currently in the stack.

**Every operation must run in `O(1)` time.** `pop`, `top` and `getMin` are only called
on a non-empty stack.

Examples (only `top` / `getMin` produce output):

- push −2, push 0, push −3, getMin, pop, top, getMin → `−3, 0, −2`
- push 3, push 1, push 1, pop, getMin → `1`
- push 0, push 1, push 0, getMin, pop, getMin → `0, 0`

Constraints:

- `−2³¹ ≤ val ≤ 2³¹ − 1`
- Up to `3·10⁴` calls in total.
- Target: `O(1)` per operation. Explain what happens to the minimum after popping it.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Popping the current minimum — `getMin` must then return the previous one.
- Duplicate minimums (`push 1, push 1, pop`) — one pop must not lose the other copy.
- The stack can become empty and be reused.
- Values span the full 32-bit range, including `−2³¹`.

## Follow-ups

- TODO
