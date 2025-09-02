import { defineConfig, ViteUserConfig } from 'vitest/config'

export default defineConfig((_: ViteUserConfig) => {
  return {
    test: {
      environment: 'node',
      globals: false,
      setupFiles: [],
    },
  }
})