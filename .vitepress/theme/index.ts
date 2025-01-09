import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './style.css'

import Element from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(Element)
  }
} satisfies Theme