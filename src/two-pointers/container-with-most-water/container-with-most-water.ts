/**
 * Container With Most Water — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function maxArea(height: readonly number[]): number {
  let best = 0;

  let l = 0;
  let r = height.length - 1;

  // { height: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
  // { height: [0, 1, 2, 3, 4, 5, 6, 7, 8], expected: 49 },
  // { height: [1, 1], expected: 1 },

  while (l < r) {
    const lh = height[l];
    const rh = height[r];

    const area = Math.min(lh, rh) * (r - l);
    best = Math.max(area, best);

    if (lh <= rh) l++;
    if (lh > rh) r--;
  }

  return best;
}
