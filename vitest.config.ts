import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Keeps `@/shared/...` working the same way it does in tsconfig paths.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    // Explicit imports from 'vitest' instead of magic globals.
    globals: false,
    testTimeout: 10_000,
    benchmark: {
      include: ['src/**/*.bench.ts'],
    },
  },
});
