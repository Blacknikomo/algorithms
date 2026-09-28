/**
 * Performs a binary search on a sorted numeric array.
 * Returns the index of the matching value, -1 when the array is empty,
 * or an error message when the search term is not a valid number.
 */
export function binarySearch(arr: Array<number> = [], number: number) {
  if (arr.length == 0) return -1;
  if (isNaN(number)) throw new Error('Wrong search term');

  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (arr[mid] !== number && left <= right) {
    if (number < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
    mid = Math.floor((left + right) / 2);
  }

  return arr[mid] === number ? mid : -1;
}
