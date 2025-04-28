<script setup lang="ts">
import { Content, useData, useRouter } from 'vitepress'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu } from '@element-plus/icons-vue'
import { scrollToAnchor } from './tool'

const router = useRouter()
const isCollapse = ref(false)
const { site, theme, page } = useData()
const sidebarItems = theme.value.sidebar

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const checkIsMobile = () => {
  return window.matchMedia('(max-width: 768px)').matches
}

onMounted(() => {
  isCollapse.value = checkIsMobile()

  const mediaQuery = window.matchMedia('(max-width: 768px)')
  const handler = (e: MediaQueryListEvent) => {
    isCollapse.value = e.matches
  }
  mediaQuery.addEventListener('change', handler)

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handler)
  })
})
</script>

<template>
  <!-- 404 Not Found! -->
  <el-container class="notFound" v-if="page.isNotFound">
    <el-card class="card">
      <template #header>
        <h1 class="h2">404 Not Found !</h1>
      </template>
      <el-text class="text_normal">Sorry, the page you are looking for could not be found.</el-text>
      <template #footer>
        <el-button :icon="ArrowLeft" class="backButton" size="large" @click="router.go('/')">Go Home</el-button>
      </template>
    </el-card>
  </el-container>
  <el-container class="home" v-else>
    <!-- Header -->
    <el-header class="header">
      <h1 class="title">
        <el-icon class="icon" @click="toggleCollapse">
          <Menu></Menu>
        </el-icon>
        <el-text class="title_text" @click="router.go('/')">{{ site.title }}</el-text>
      </h1>
    </el-header>
    <!-- Container -->
    <el-container class="container">
      <!-- Aside -->
      <el-aside :style="{ minWidth: isCollapse ? '0px' : '10vw', width: isCollapse ? '0px' : '160px' }" class="aside">
        <el-scrollbar class="scrollbar">
          <el-menu class="menu">
            <el-menu-item @click="scrollToAnchor('Home')">
              <el-text class="text">Home</el-text>
            </el-menu-item>
            <el-menu-item v-for="item in sidebarItems" @click="scrollToAnchor(item.text)">
              <el-text class="text">{{ item.text }}</el-text>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <!-- main -->
      <el-main class="main">
        <Content />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.notFound {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EEF1FF;
}

.card {
  display: grid;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #D2DAFF;
  --el-card-border-color: #D2DAFF;
}

.h2 {
  color: #FFFFFF;
  font-size: 1.6rem;
}

.text_normal {
  color: #FFFFFF;
  font-size: 1.4rem;
}

.backButton {
  font-size: 1.2rem;
  color: #FFFFFF;
  border-color: #AAC4FF;
  background-color: #AAC4FF;
}

.home {
  width: 100vw;
  height: 100vh;
}

.header {
  height: 8vh;
  width: 100vw;
  z-index: 1001;
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #B1B2FF;
}

.title {
  display: flex;
  align-items: center;
}

.icon {
  font-size: 3rem;
  color: #ffffff;
  margin-right: 10px;
}

.title_text {
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
}

.container {
  height: 92vh;
  margin-top: 8vh;
}

.aside {
  height: 100%;
  background-color: #AAC4FF;

  @media (max-width: 768px) {
    top: 8vh;
    height: calc(100vh - 8vh);
    z-index: 1000;
    position: fixed;
  }
}

.scrollbar {
  height: 100%;
}

.menu {
  background-color: transparent;
}

.text {
  color: #FFFFFF;
  font-size: 1.5rem;
}

.main {
  height: 92vh;
  background-color: #EEF1FF;
}
</style>