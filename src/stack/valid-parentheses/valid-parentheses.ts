/**
 * Valid Parentheses — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. */
export function isValid(s: string): boolean {
  let result = true;
  const stack: string[] = [];
  const complements: Record<string, string> = {
    "]": "[",
    "}": "{",
    ")": "(",
  }

  for (let el of s) {
    if (complements[el]) {
      const prevBracket = stack.pop();
      if (!prevBracket) {
        return false;
      } else if (prevBracket == complements[el]) {
        continue;
      } else {
        return false;
      }
    } else {
      stack.push(el);
      continue;
    }
  }

  if (stack.length) return false;

  return result;
}
