# algorithms

TypeScript playground for practicing algorithms and data structures before interviews.

Read [Agents.md](Agents.md) for the structure, conventions and workflow.

## Requirements

Node.js 20 or newer.

## Getting started

```bash
npm install
npm run check
```

## Everyday commands

```bash
npm run new -- dp/coin-change    # scaffold a new task folder
npm run test:watch               # tests in watch mode
npm run dev                      # re-run src/playground.ts on save
npx tsx src/arrays/two-sum/two-sum.ts
```

Debugging: open a file in VS Code, set a breakpoint, press F5 and pick
*Debug current TS file* or *Debug current test file (vitest)*.

## Example

`src/arrays/two-sum/` is the reference task — solution with two approaches, table-driven
tests, a seeded stress test against the brute-force implementation, a benchmark and a
README. Copy its shape.
