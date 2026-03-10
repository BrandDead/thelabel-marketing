import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /* eslint-disable-next-line no-undef */
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Replace %VITE_*% placeholders in index.html at build time
      {
        name: 'html-env-replace',
        transformIndexHtml(html) {
          return html.replace(/%VITE_GA_MEASUREMENT_ID%/g, env.VITE_GA_MEASUREMENT_ID || '')
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
