import { defineConfig } from 'vitepress'
import { getSidebar } from './theme/tool'

export default defineConfig({
  lang: 'en-US',
  title: "SkyHome",
  titleTemplate: 'Welcome',
  description: "A Nevagation Site.",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  srcDir: "docs",
  themeConfig: {
    sidebar: getSidebar(),
  },
})
