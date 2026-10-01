import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Makes describe, test, it, expect, beforeEach, etc.
    // available globally.
    globals: true,

    // Backend tests run in Node rather than a browser environment.
    environment: "node",

    // Useful when multiple test files share the same database.
    fileParallelism: false,

    // Gives asynchronous database operations enough time to complete.
    testTimeout: 20000,
  },
});