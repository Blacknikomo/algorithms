/**
 * Longest Substring Without Repeating Characters — see README.md next to this file.
 */

/** TODO: describe the approach and its complexity. Target: O(n) time, O(min(n, Σ)) space. */
export function lengthOfLongestSubstring(s: string): number {
  let maxLength = 0;
  const hash: Map<string, number> = new Map();
  let slide = {left: 0, right: 0};

  while (slide.right < s.length) {
    const letter = s[slide.right];
    const letterPosition = hash.get(letter);
    
    if (letterPosition !== undefined && letterPosition >= slide.left) {
      slide.left = letterPosition + 1;
    } else {
      maxLength = Math.max(maxLength, slide.right - slide.left + 1);
    }
    
    hash.set(letter, slide.right);
    slide.right++;
  }
  
  return maxLength;
}

/** Reference implementation — keep it obviously correct. */
export function lengthOfLongestSubstringBrute(s: string): number {
  return 42
}
