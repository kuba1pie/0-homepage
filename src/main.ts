import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import type { UserModule } from './types'

import Index from './pages/index.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = [
  { path: '/:catchAll(.*)', component: Index },
  { path: '/', component: Index },
]

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
