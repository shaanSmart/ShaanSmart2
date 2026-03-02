import { defineConfig } from 'vite';

export default defineConfig({
  base: '/shaansmart2/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.test.ts'],
  },
});
