/**
 * Top K Frequent Elements — see README.md next to this file.
 */

/** TODO: describe the approach, the selection step, and its complexity. */
export function topKFrequent(nums: readonly number[], k: number): number[] {
  const hash = new Map<number, number>();

  nums.forEach(item => {
    if (hash.get(item) === undefined) {
      hash.set(item, 1);
    } else {
      hash.set(item, hash.get(item)! + 1);
    }
  })


  const result = [...hash.entries()]
    .sort(([_, s1], [__, s2]) => s2 - s1)
    .slice(0, k)
    .map(i => i[0])

  return result;
}
