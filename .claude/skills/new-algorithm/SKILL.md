---
name: new-algorithm
description: Scaffold a new algorithm practice task in this repo from a task name and its problem statement — creates the folder, a typed solution stub, a filled-in README and a full test suite (examples, edge cases, large input; a brute-force stub and stress test only on request), but does NOT solve the problem. Use when the user says "new task", "scaffold", "set up a problem", pastes a LeetCode-style problem statement or URL, or invokes /new-algorithm.
argument-hint: <task name or topic/slug> <problem statement or URL>
---

# New algorithm task

The user is **learning** algorithms. They give you a task name and its condition
(problem statement); you prepare everything around the solution so they can open the
stub and start solving immediately with tests already watching them.

**Do not write the solution.** Not in the stub, not in the README, not in a hint, not
in the final message. The deliverable is a red test suite and an empty function. Only
solve if the user explicitly asks for a solution.

Read `AGENT.md` once if you have not in this session — it is the contract for
conventions (naming, imports with `.ts`, `readonly`, `as number` over `!`, no `any`).
`src/array/two-sum/` is the reference shape for tests and README.

## Input

`$ARGUMENTS` — the task name and the condition, in any form: a title, a slug, a
`topic/slug`, a pasted statement with examples and constraints, a URL.

- Only a URL: fetch it (WebFetch). If that fails (LeetCode often blocks), ask the user
  to paste the statement. Never invent a problem from a title alone.
- Condition missing examples or constraints: proceed with what is given, derive
  examples yourself, and say so in the final message.

## Steps

### 1. Pick topic and slug

- **Slug:** kebab-case of the problem title (`Coin Change` → `coin-change`).
- **Topic:** if the user gave `topic/slug` (or named a topic, e.g. "today's course topic
  is heaps"), use it as is — the course topic wins. Otherwise pick the *technique* that
  solves it from the list in "Topic folders" in `AGENT.md` (`dp`, `sliding-window`, …).
  Run `ls src` first: if a folder already exists for that technique under a slightly
  different name (`array` vs `arrays`), reuse it rather than creating a near-duplicate.
  The older `src/array` / `src/tree` folders are input-shape names — do not put new
  tasks there just because the input is an array or a tree.
- Picking the topic gives away the technique. That is accepted here — the user sees the
  folder anyway — but do not elaborate on *why* in the README.

### 2. Scaffold

```bash
npm run new -- <topic>/<slug> --title "<Title>" --url "<url>"   # omit --url if none
```

It refuses to overwrite an existing folder — if it does, stop and ask the user. The
script only gives you the folder and generic placeholders; you replace the contents of
all three files in the next steps.

### 3. Design the signature

Decide the function name (camelCase of the slug), parameters and return type from the
condition, then write `<slug>.ts`:

```ts
/**
 * <Title> — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function <fnName>(<params>): <ReturnType> {
  throw new Error('<fnName>: not implemented');
}
```

Rules:

- Real types, never `unknown`/`any`. Array params `readonly` unless the problem says
  mutate in place — then say so in the doc comment and drop `readonly`.
- Linked lists / trees: use `ListNode` / `TreeNode` from `@/shared/structures/`.
- "No answer" → follow the statement literally (`-1`, `[]`, `null`, `false`).
- Parameter names from the statement (`nums`, `target`, `s`, `grid`).
- **No brute-force variant by default.** The stub has one function, `<fnName>`. Add a
  `<fnName>Brute` stub (same signature, doc comment
  `/** Reference implementation — keep it obviously correct. */`) **only when the user
  explicitly asks for one** in the request (e.g. "with a brute force", "add a reference
  implementation", "with a stress test"). A statement that merely mentions a naive or
  "clean-then-compare" approach, or a target complexity, is not such a request.
- "Design" problems (LRU cache, min stack): stub a class with every method throwing,
  constructor included.

### 4. Write the tests — `<slug>.test.ts`

Follow `src/array/two-sum/two-sum.test.ts`. Structure:

```ts
import { describe, expect, it } from 'vitest';
import { <fnName> } from './<slug>.ts';

type Solver = (<params>) => <ReturnType>;

// A second approach is one more row here.
const implementations: [string, Solver][] = [['<fnName>', <fnName>]];

describe.each(implementations)('%s', (_name, solve) => {
  // 1. Examples from the statement — one row each, verbatim.
  it.each([...])('...', (...) => { ... });

  // 2. Edge cases — derived from the constraints.
  it.each([...])(...);   // or separate `it` blocks for one-offs with a telling name

  // 3. Larger input — see below.
});
```

**Only when the user asked for a Brute stub** (step 3): add
`['<fnName>Brute (reference)', <fnName>Brute]` to `implementations`, import it and the
random helpers, and append a stress test. Large inputs then go in a separate
`describe` that calls `<fnName>` only, so a slow reference cannot time them out.

```ts
import { createRng, randomArray, randomInt } from '@/shared/utils/random.ts';

describe('<fnName> vs <fnName>Brute', () => {
  it('agrees with the reference implementation on random input', () => {
    const rng = createRng(<today as YYYYMMDD>);
    for (let round = 0; round < 500; round++) {
      // small random inputs within the constraints
    }
  });
});
```

Which cases to write:

- **Every example from the statement**, verbatim.
- **Edge cases from the constraints**: minimum size (empty if allowed, else 1), single
  element, all-equal, negatives/zero if the range allows, duplicates, already
  sorted / reverse sorted, no answer, answer at the first / last position, boundary
  values of the range.
- **One larger input** (a few thousand elements, built in code, not a literal) with an
  expected result you can state without solving — e.g. constructed so the answer is
  known. Skip it rather than guess.
- Aim for ~8–15 distinct cases (count rows, not the doubled runs from `describe.each`). Each case must earn its place by covering something the
  others do not; name it for what it covers (`'handles all-negative input'`).

Correctness of the tests themselves:

- **Order-insensitive output** ("return in any order"): sort before comparing, or
  compare sets. **Several valid answers**: assert the property (like two-sum does),
  not one specific answer. Floats: `toBeCloseTo`.
- Large fixtures go in their own `it` block, never in an `it.each` row whose title
  interpolates `$nums` — a 5000-element array in a test name is unreadable.
- In-place problems: assert on the mutated argument, and copy the fixture first so
  `describe.each` does not feed a mutated array to the second implementation.
- **Verify every hand-written expected value** before finishing: write a throwaway
  solver in the scratchpad directory (never in the repo), run all your cases through
  it with `npx tsx`, fix any expectation that disagrees, then delete the file. Do not
  show that solver to the user.

### 5. Fill the README

Keep the template's sections. Fill in:

- **Source** line: the URL if given. If you confidently recognise a well-known problem
  (e.g. LeetCode 53), fill in its link and difficulty — that is not inventing. Otherwise
  `Course — <topic>` and `Difficulty: TODO`. Tags = the data structures in the input
  (not the technique).
- **Problem**: restate the condition in plain words with the exact input/output
  contract. Then, still inside this section, an `Examples` list (input → output, one
  line each) and a `Constraints` list copied from the statement.
- **Traps**: only edge cases visible from the statement and constraints (empty input,
  duplicates, overflow-sized values…). No solution insights.
- **Approaches**, **Key idea**, **Follow-ups**: leave as `TODO` — the user writes those
  after solving (step 6 of the daily workflow).

### 6. Verify

```bash
npm run typecheck
npx vitest run src/<topic>/<slug>
```

- Typecheck **must pass**.
- The test run **must fail**, and every failure must be `not implemented`. Any other
  error (import, syntax, fixture bug) is yours to fix. Check that
  - the summary shows `Test Files 1 failed (1)` and `Tests N failed (N)` — every test
    failed, none passed, none errored at collection;
  - `npx vitest run src/<topic>/<slug> 2>&1 | grep -E '^ +→ ' | grep -vc 'not implemented'`
    prints `0` — vitest prints one `→ <message>` line per failed test, so any other
    message (a fixture bug, a wrong import) shows up here.
- Run `npx prettier --write src/<topic>/<slug>`.

### 7. Report

Short message:

- the folder and files created,
- the signature you chose, and any interpretation of an ambiguous statement,
- distinct case count by group (examples / edge cases / large input, plus stress if
  a Brute stub was requested),
- that you checked every expected value against a scratch solver (no details of it),
- the command to start: `npm run test:watch -- <slug>`,
- only if you added `<fnName>Brute` on request: a reminder to write it first.

No hints about the approach. Do not commit.
