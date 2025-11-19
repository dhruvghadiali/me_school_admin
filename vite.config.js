import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@MECommonComponents': path.resolve(__dirname, 'src/components/common'),
      '@MEScreenComponents': path.resolve(__dirname, 'src/components/screens'),
      '@MEScreens': path.resolve(__dirname, 'src/screens'),
      '@MEShadcnComponents': path.resolve(__dirname, 'src/components/ui'),
      '@MERedux': path.resolve(__dirname, 'src/slice'),
      '@MEUtils': path.resolve(__dirname, 'src/utils'),
      '@MELocalization': path.resolve(__dirname, 'src/localization'),
      '@MEStyles': path.resolve(__dirname, 'src/styles'),
      '@MELib': path.resolve(__dirname, 'src/lib'),
      '@MEContexts': path.resolve(__dirname, 'src/contexts'),
      '@MEPages': path.resolve(__dirname, 'src/pages'),
      '@MEMock': path.resolve(__dirname, 'src/mock'),
      '@MEHooks': path.resolve(__dirname, 'src/hooks'),
      '@MEAssets': path.resolve(__dirname, 'src/assets'),
      '@MEHelpers': path.resolve(__dirname, 'src/helpers'),
      '@MEPageRoutes': path.resolve(__dirname, 'src/utils/pageRoutes'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});