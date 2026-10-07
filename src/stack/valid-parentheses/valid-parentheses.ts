/**
 * Valid Parentheses — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function isValid(s: string): boolean {
  if (s.length % 2 !== 0) return false;

  const stack: string[] = [];
  const complements: Record<string, string> = { ']': '[', '}': '{', ')': '(' };

  for (let el of s) {
    if (complements[el]) {
      const prevBracket = stack.pop();
      if (!prevBracket || prevBracket != complements[el]) {
        return false;
      }
    } else {
      stack.push(el);
    }
  }

  return stack.length === 0;
}
