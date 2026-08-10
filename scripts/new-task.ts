/**
 * Scaffolds a new task folder.
 *
 *   npm run new -- arrays/three-sum
 *   npm run new -- graphs/course-schedule --title "Course Schedule" --url https://leetcode.com/...
 *
 * Creates src/<topic>/<slug>/{<slug>.ts, <slug>.test.ts, README.md} and refuses
 * to overwrite an existing folder.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv: string[]): { path: string; title?: string; url?: string } {
  const positional: string[] = [];
  const flags = new Map<string, string>();

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i] as string;
    if (arg.startsWith('--')) {
      flags.set(arg.slice(2), argv[++i] ?? '');
    } else {
      positional.push(arg);
    }
  }

  const path = positional[0];
  if (path === undefined) {
    throw new Error('Usage: npm run new -- <topic>/<task-slug> [--title "..."] [--url "..."]');
  }

  return { path, title: flags.get('title'), url: flags.get('url') };
}

/** "three-sum" -> "threeSum" */
function toCamelCase(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase());
}

/** "three-sum" -> "Three Sum" */
function toTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function solutionTemplate(fnName: string, title: string): string {
  return `/**
 * ${title} — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function ${fnName}(): unknown {
  throw new Error('${fnName}: not implemented');
}
`;
}

function testTemplate(fnName: string, slug: string, title: string): string {
  return `import { describe, expect, it } from 'vitest';
import { ${fnName} } from './${slug}.ts';

describe('${title}', () => {
  // Start from the examples in the problem statement, one row each.
  // const cases = [
  //   { input: ..., expected: ... },
  // ];
  //
  // it.each(cases)('returns $expected for $input', ({ input, expected }) => {
  //   expect(${fnName}(input)).toEqual(expected);
  // });

  it('solves the first example from the problem statement', () => {
    expect(${fnName}()).toEqual(undefined); // TODO
  });

  it.todo('handles the empty input');
  it.todo('handles the single-element input');
  it.todo('handles the largest realistic input');
});
`;
}

function readmeTemplate(title: string, url?: string): string {
  return `# ${title}

Source: ${url ?? 'TODO'} · Difficulty: TODO · Tags: TODO

## Problem

TODO — restate it in your own words, including the exact input/output contract.

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- TODO

## Follow-ups

- TODO
`;
}

async function main(): Promise<void> {
  const { path, title: titleFlag, url } = parseArgs(process.argv.slice(2));

  const segments = path.split('/').filter(Boolean);
  if (segments.length !== 2) {
    throw new Error(`Expected "<topic>/<task-slug>", got "${path}"`);
  }

  const [topic, slug] = segments as [string, string];
  if (!/^[a-z0-9-]+$/.test(topic) || !/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Topic and slug must be kebab-case: lowercase letters, digits and dashes');
  }

  const dir = join(ROOT, 'src', topic, slug);
  if (existsSync(dir)) {
    throw new Error(`${relative(ROOT, dir)} already exists — pick another name`);
  }

  const fnName = toCamelCase(slug);
  const title = titleFlag ?? toTitle(slug);

  await mkdir(dir, { recursive: true });
  await Promise.all([
    writeFile(join(dir, `${slug}.ts`), solutionTemplate(fnName, title)),
    writeFile(join(dir, `${slug}.test.ts`), testTemplate(fnName, slug, title)),
    writeFile(join(dir, 'README.md'), readmeTemplate(title, url)),
  ]);

  const rel = relative(ROOT, dir);
  console.log(`Created ${rel}`);
  console.log(`  ${rel}/${slug}.ts`);
  console.log(`  ${rel}/${slug}.test.ts`);
  console.log(`  ${rel}/README.md`);
  console.log(`\nNext: npx vitest ${rel}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
