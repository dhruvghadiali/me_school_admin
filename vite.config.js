import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@MERedux": "/src/slice",
      "@MEPages": "/src/pages",
      "@MEUtils": "/src/utils",
      "@MEAssets": "/src/assets",
      "@MEHelpers": "/src/helpers",
      "@MEContexts": "/src/contexts",
      "@MELocalization": "/src/localization",
      "@MECommonComponents": "/src/components/common",
      "@MEShadcnComponents": "/src/components/ui",
      "@MEScreenComponents": "/src/components/screens",
      "@MEPageRoutes": "/src/utils/pageRoutes/index.js",
    },
  },
})
