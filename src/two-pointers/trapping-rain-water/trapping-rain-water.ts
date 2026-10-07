/**
 * Trapping Rain Water — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function trap(height: readonly number[]): number {
  let sum = 0;
  let l = 0;
  let r = height.length - 1;
  let lmax = height[l];
  let rmax = height[r];

  // `[4, 2, 0, 3, 2, 5]` → `9`

  while (l < r) {
    lmax = Math.max(lmax, height[l]);
    rmax = Math.max(rmax, height[r]);

    if (lmax < rmax) {
      sum += lmax - height[l];
      l++;
    } else {
      sum += rmax - height[r];
      r--;
    }
  }

  return sum;
}
