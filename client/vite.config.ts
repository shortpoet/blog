import type { ServerConfig } from 'vite'

const config: ServerConfig = {
  port: 8080,
  optimizeDeps: {
    include: ['lodash/random', 'lodash/debounce', 'marked/parse', 'marked/MarkedOptions']
  }

}

export default config
