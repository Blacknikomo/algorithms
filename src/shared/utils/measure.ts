/**
 * Quick-and-dirty timing for the playground. For real comparisons use
 * `npm run bench` (Vitest benchmarks) — it warms up and reports variance.
 */
export function measure<T>(label: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const ms = performance.now() - start;
  console.log(`${label}: ${ms.toFixed(3)} ms`);
  return result;
}

/** Runs `fn` `times` times and reports the average. */
export function measureAverage(label: string, times: number, fn: () => unknown): void {
  const start = performance.now();
  for (let i = 0; i < times; i++) fn();
  const total = performance.now() - start;
  console.log(`${label}: ${(total / times).toFixed(4)} ms avg over ${times} runs`);
}
