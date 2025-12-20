import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        // This splits your node_modules into separate chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Optional: Increases the warning limit to 1000kB if you 
    // know your vendor chunk will be slightly over 500kB
    chunkSizeWarningLimit: 1000,
  },
})
