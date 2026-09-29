# JavaScript / TypeScript algorithms playground

The repository contains a set of algorithms. The main purpose of the repo is to let the
developer practice before interviews or as a refresher.

## Goals

1. **Practice, not a library.** Nothing here is meant to be published or imported by
   another project. Optimise for how fast a solution can be written, run, debugged and
   verified — not for API polish.
2. **Every solution is executable and proven.** A task is not "done" when the code looks
   right; it is done when tests pass, including edge cases and a randomised check against
   a reference implementation where one is cheap to write.
3. **Retention over volume.** Each task carries a short README with the key idea and the
   traps. Re-reading fifty of those before an interview is worth more than having solved
   two hundred problems and forgotten them.
4. **Complexity is stated, not guessed.** Every solution declares its time and space
   complexity in the doc comment and in the README table.

## Non-goals

- No frameworks, no build step, no bundling, no publishing.
- No competitive-programming I/O parsing (`readline` on stdin). Solutions are plain
  functions; tests are the input.
- No runtime dependencies. `dependencies` in `package.json` stays empty on purpose —
  everything is either the standard library or written by hand in `src/shared`.

## Tech stack

| Concern     | Choice     | Why                                                                    |
| ----------- | ---------- | ---------------------------------------------------------------------- |
| Language    | TypeScript | Strict mode catches the off-by-one type errors before the test does     |
| Run         | `tsx`      | Runs a `.ts` file directly, no build step, breakpoints work             |
| Tests       | Vitest     | Instant watch mode, `it.each` tables, `bench` built in, no config sprawl |
| Format      | Prettier   | Zero formatting debates; format-on-save configured in `.vscode`         |

There is no ESLint. For a practice repo `tsc --noEmit` under `strict` catches the classes
of mistakes that matter, and a linter would mostly generate noise about style.

## Repository structure

```
algorithms/
├── Agents.md                  # this file — the contract for how the repo is used
├── README.md                  # short quick-start
├── package.json               # scripts + dev dependencies (no runtime deps)
├── tsconfig.json              # strict, ESNext, "@/*" -> "src/*"
├── vitest.config.ts           # test/bench globs, the same "@" alias
├── .vscode/
│   ├── launch.json            # debug configs: current file, current test, all tests
│   ├── settings.json          # format on save, workspace TypeScript
│   └── extensions.json        # Vitest explorer, Prettier, EditorConfig
├── scripts/
│   └── new-task.ts            # scaffolds a task folder — `npm run new`
└── src/
    ├── playground.ts          # scratch file for `npm run dev`
    ├── shared/                # reusable building blocks, tested like everything else
    │   ├── structures/
    │   │   ├── list-node.ts       # ListNode + array <-> list converters, cycle-safe
    │   │   ├── tree-node.ts       # TreeNode + LeetCode level-order serialization
    │   │   ├── priority-queue.ts  # binary heap (JS has none built in)
    │   │   └── structures.test.ts
    │   └── utils/
    │       ├── random.ts      # seeded RNG for reproducible stress tests
    │       └── measure.ts     # rough timing for the playground
    └── <topic>/               # arrays, strings, linked-list, trees, graphs, dp, sorting…
        └── <task-slug>/
            ├── <task-slug>.ts       # the solution(s)
            ├── <task-slug>.test.ts  # the tests
            ├── <task-slug>.bench.ts # optional, only when comparing approaches
            └── README.md            # problem, approaches, key idea, traps
```

`src/arrays/two-sum/` is the worked example. Copy its shape when in doubt.

### Topic folders

Create them as needed, kebab-case, one level deep. The intended set:

`arrays` · `strings` · `hash-map` · `two-pointers` · `sliding-window` · `stack` ·
`linked-list` · `trees` · `graphs` · `heap` · `binary-search` · `sorting` ·
`recursion` · `backtracking` · `dp` · `greedy` · `bit-manipulation` · `math` ·
`design` (LRU cache, min stack — the "implement a class" problems)

A task belongs to the topic of the *technique that solves it*, not the shape of the
input. "Longest substring without repeating characters" is `sliding-window`, not
`strings`.

## Daily workflow

```bash
npm run new -- dp/coin-change --url https://leetcode.com/problems/coin-change/
npm run test:watch -- coin-change     # leave this running in a second terminal
```

1. **Scaffold.** `npm run new -- <topic>/<slug>` creates the three files. Nothing is
   overwritten — the script refuses if the folder exists. With Claude Code,
   `/new-algorithm <name> <problem statement>` does steps 1–3 for you: it runs the script,
   types the stub, fills the README's Problem section and writes the (failing) tests —
   without solving the problem. See `.claude/skills/new-algorithm/SKILL.md`.
2. **Write the README first**, at least the Problem section. Restating the input/output
   contract in your own words is where half the bugs get caught.
3. **Write the failing tests next.** Start from the examples in the problem statement,
   then add the empty input, the single element, and the largest realistic input. The
   template ships with `it.todo` placeholders for exactly those three.
4. **Solve it.** Brute force first if the optimal approach is not obvious — it becomes the
   reference implementation for the stress test.
5. **Verify.** `npm run check` (typecheck + full suite) before considering it done.
6. **Write down the key idea** in the README while it is still fresh. One sentence: the
   thing you would need to hear to re-derive the solution in six months.

## Commands

| Command                        | What it does                                             |
| ------------------------------ | -------------------------------------------------------- |
| `npm test`                     | Run the whole suite once                                  |
| `npm run test:watch`           | Watch mode — re-runs only what a change affects           |
| `npm run test:watch -- two-sum`| Watch mode filtered to files matching `two-sum`           |
| `npm run dev`                  | Re-run `src/playground.ts` on every save                  |
| `npm run exec -- <file.ts>`    | Run any single `.ts` file once                            |
| `npm run bench`                | Run `*.bench.ts` benchmarks                               |
| `npm run typecheck`            | `tsc --noEmit` over the whole repo                        |
| `npm run check`                | typecheck + tests — the gate before committing            |
| `npm run new -- <topic>/<slug>`| Scaffold a task folder                                    |
| `npm run format`               | Prettier over everything                                  |

`npx tsx src/path/to/file.ts` works too and is shorter than `npm run exec --`.

## Debugging

Three ways in, in order of how often you will want them:

1. **VS Code, F5.** Open any `.ts` file, put a breakpoint in the gutter, press F5 and pick
   *Debug current TS file*. For a test file pick *Debug current test file (vitest)* —
   it runs that one file with parallelism off so breakpoints actually hit.
2. **Vitest explorer** (recommended extension). Gives a test tree in the sidebar with a
   per-test debug button.
3. **Terminal.** `node --import tsx --inspect-brk src/path/file.ts`, then attach from
   VS Code or `chrome://inspect`.

For the print-debugging phase, `src/playground.ts` plus `npm run dev` is usually faster
than any debugger. `console.table` is underused — it renders arrays of objects and DP
tables far better than `console.log`.

## Conventions

**Naming.** Folders and files kebab-case (`two-sum/two-sum.ts`). Exported functions
camelCase, matching the slug (`twoSum`). When a task has several approaches, the fast one
keeps the plain name and the others are suffixed: `twoSum`, `twoSumBrute`.

**Imports.** Use the `@/` alias for anything outside the current task folder
(`@/shared/structures/tree-node.ts`), relative imports within it (`./two-sum.ts`). Import
paths include the `.ts` extension — that is deliberate (`allowImportingTsExtensions`), it
keeps the paths honest and matches what the runtime actually loads.

**Exports.** Named exports only. No default exports, no barrel `index.ts` files — jumping
straight to the file that defines a thing is worth more than a shorter import.

**Solution signatures.** Pure functions taking plain data and returning plain data. Use
`readonly` on array parameters that are not mutated; when a problem mutates in place, say
so in the doc comment.

**Comments.** Every solution has a doc comment stating the approach and its `O(...)` time
and space. Inside the function, comment only the non-obvious invariant — the reason a
pointer moves when it does, not what the line does.

**Tests.** Table-driven with `it.each` for the example cases, separate `it` blocks for
edge cases. Where a brute-force reference exists, add a stress test comparing the two on
seeded random input (see `two-sum.test.ts`) — it catches more real bugs than any number of
hand-written cases. Always use `createRng(seed)` from `@/shared/utils/random.ts` rather
than `Math.random`, so a failure is reproducible.

**Shared code.** Anything you write twice moves into `src/shared/` and gets its own tests.
The shared helpers are the ground everything else stands on; if they lie, every task's
tests lie with them.

## TypeScript notes

- `strict` is on. `noUncheckedIndexedAccess` is deliberately **off**: it turns every
  `nums[i]` into `number | undefined`, which is pedagogically correct and practically
  miserable for index-heavy algorithm code. Turn it on in `tsconfig.json` if you want the
  extra rigour.
- The one place non-null assertions are acceptable is index access in a hot loop where the
  bound is obviously safe. Prefer `as number` / `as T` over `!` so it greps cleanly.
- No `any`. `unknown` plus a narrowing check, or a proper generic.

## Notes for AI agents working in this repo

- Prefer the smallest change that solves the task; do not restructure folders or swap
  tooling without being asked.
- When adding a solution, add its tests and its README in the same change — a solution
  without those is incomplete here.
- Run `npm run check` before reporting a task as done, and report the actual output.
- Do not add runtime dependencies. If a data structure is missing, implement it in
  `src/shared/structures/` with tests.
- Do not "optimise" a deliberately naive reference implementation — `twoSumBrute` and its
  kin exist precisely to be slow and obviously correct.
- Keep this file up to date when the structure or the workflow changes.
