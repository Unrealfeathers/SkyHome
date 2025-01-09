<script setup lang="ts">
import { Content, useData, useRouter } from 'vitepress'
import { ArrowLeft } from '@element-plus/icons-vue'
import { Menu } from '@element-plus/icons-vue'
import { scrollToAnchor } from './tool'

const router = useRouter()
const { site, theme, page, frontmatter } = useData()

const sidebarItems = theme.value.sidebar
const githubUrl = frontmatter.value.githubUrl
</script>

<template>
  <!-- 404 Not Found! -->
  <el-container class="notFound" v-if="page.isNotFound">
    <el-card class="card">
      <template #header>
        <h1 class="h2">404 Not Found !</h1>
      </template>
      <el-text class="text">Sorry, the page you are looking for could not be found.</el-text>
      <template #footer>
        <el-button :icon="ArrowLeft" class="backButton" size="large" @click="router.go('/')">Go Home</el-button>
      </template>
    </el-card>
  </el-container>
  <el-container class="home" v-else>
    <!-- Header -->
    <el-header class="header" height="8%">
      <h1 class="title">
        <el-icon class="icon">
          <Menu></Menu>
        </el-icon>
        <el-text class="text" @click="router.go('/')">{{ site.title }}</el-text>
      </h1>
    </el-header>
    <!-- Container -->
    <el-container class="container">
      <!-- Aside -->
      <el-aside class="aside" width="9%">
        <el-scrollbar height="100%">
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

<style>
.home {
  height: 100%;
}

.notFound {
  height: 80%;
  background-color: #EEF1FF;
  align-items: center;
  justify-content: center;

  .card {
    display: grid;
    background-color: #D2DAFF;
    --el-card-border-color: #D2DAFF;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 16px;

    .h2 {
      color: #FFFFFF;
      font-size: 150%;
    }

    .text {
      color: #FFFFFF;
      font-size: 120%;
    }

    .backButton {
      color: #FFFFFF;
      background-color: #AAC4FF;
      border-color: #AAC4FF;
    }
  }
}

.header {
  background-color: #B1B2FF;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
      color: #ffffff;
      font-size: 200%;
      margin-right: 10px;
    }

    .text {
      color: #ffffff;
      font-size: 150%;
      cursor: pointer;
    }
  }

  .github {
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.container {
  height: 92%;

  .aside {
    height: 100%;
    background-color: #AAC4FF;

    .menu {
      height: 100%;
      background-color: transparent;

      .text {
        color: #FFFFFF;
        font-size: 150%;
      }
    }
  }

  .main {
    width: 80%;
    height: 100%;
    background-color: #EEF1FF;
  }
}
</style>