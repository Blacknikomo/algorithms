/**
 * Seeded RNG. Stress tests must be reproducible: when a random case fails you
 * want to re-run that exact seed, not a new random one.
 */
export type Rng = () => number;

/** mulberry32 — small, fast, good enough for test data. */
export function createRng(seed: number): Rng {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Integer in [min, max] inclusive. */
export function randomInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

export function randomArray(rng: Rng, length: number, min = -100, max = 100): number[] {
  return Array.from({ length }, () => randomInt(rng, min, max));
}

/** In-place Fisher-Yates using the seeded rng. */
export function shuffle<T>(rng: Rng, items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = randomInt(rng, 0, i);
    [items[i], items[j]] = [items[j] as T, items[i] as T];
  }
  return items;
}
