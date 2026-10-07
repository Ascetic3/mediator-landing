import react from '@vitejs/plugin-react'
import { loadEnv, defineConfig } from 'vite'

function indexingPolicyPlugin(allowIndexing: boolean) {
  const content = allowIndexing ? 'index, follow' : 'noindex, nofollow'

  return {
    name: 'mediator-indexing-policy',
    transformIndexHtml(html: string) {
      const marker = '<!-- VITE_ROBOTS_META -->'
      if (!html.includes(marker)) throw new Error('Missing robots meta marker in index.html')
      return html.replace(marker, '<meta name="robots" content="' + content + '" />')
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const allowIndexing = env.VITE_ALLOW_INDEXING === 'true'

  return {
    base: process.env.VITE_DEPLOY_BASE || '/',
    plugins: [react(), indexingPolicyPlugin(allowIndexing)],
  }
})
