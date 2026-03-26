/**
 * @file: vitest.config.ts
 * @description: Vitest configuration for unit tests
 * @dependencies: vitest, jsdom
 * @created: 2026-03-26
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
