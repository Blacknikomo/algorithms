/**
 * Valid Palindrome — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. Target: O(n) time, O(1) extra space. */
export function isPalindrome(s: string): boolean {
  let l = 0;
  let r = s.length - 1;
  
  let result = true;

  if (s.length == 0) {
    return result;
  }

  const reg = new RegExp(/[A-Za-z0-9]/)

  while (l < r) {
    if (!reg.test(s[l])) {
      l++;
      continue;
    }

    if (!reg.test(s[r])) {
      r--;
      continue;
    }
    
    const leftSymbol = s[l].toLocaleLowerCase();
    const rightSymbol = s[r].toLocaleLowerCase();

    if (leftSymbol != rightSymbol) {
      return false  
    }

    l++;
    r--;
  }

  return result;
}

/** Reference implementation — keep it obviously correct. */
export function isPalindromeBrute(s: string): boolean {
  throw new Error('isPalindromeBrute: not implemented');
}
