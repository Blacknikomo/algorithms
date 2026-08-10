/**
 * Scratch file. `npm run dev` re-runs it on every save.
 *
 * Use it for the "let me just poke at this" phase — printing intermediate state,
 * eyeballing an edge case, timing something roughly. Nothing here is committed
 * knowledge; the real work lives in src/<topic>/<task>/.
 */
import { twoSum } from '@/arrays/two-sum/two-sum.ts';
import { measure } from '@/shared/utils/measure.ts';

const nums = [2, 7, 11, 15];
const target = 9;

const result = measure('twoSum', () => twoSum(nums, target));

console.log({ nums, target, result });
