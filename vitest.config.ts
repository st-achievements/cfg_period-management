import { vitestConfig } from '@st-api/config';
import { InlineConfig } from 'vitest/node';
import { defineConfig, mergeConfig } from 'vitest/config';

export default defineConfig(async (env) =>
  mergeConfig(await vitestConfig(env), {
    test: {
      setupFiles: ['node_modules/@st-api/core/dist/vitest.setup.js'],
    } satisfies InlineConfig,
  }),
);
