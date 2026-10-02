/**
 * Group Anagrams — see README.md next to this file.
 */

/** TODO: describe the approach, the key you group by, and its complexity. */
export function groupAnagrams(strs: readonly string[]): string[][] {
  const hash = new Map<string, string[]>()
  
  // - `["eat", "tea", "tan", "ate", "nat", "bat"]` → `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]`
  for (let i = 0; i < strs.length; i++) {
    const word: string = strs[i];
    const sorted: string = [...word].sort((a, b) => a.localeCompare(b)).join();
  
    if (!hash.has(sorted)) {
      hash.set(sorted, [word])
    } else {
      const prev: string[] = hash.get(sorted)!
      const newArray = [word, ...prev]
      hash.set(sorted, newArray)
    }
  }
  
  return [...hash.values()]
}
