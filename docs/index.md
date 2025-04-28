---
home: true
---

<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useData, useRoute } from 'vitepress'
import { data } from './pageContent.data.ts'

const route = useRoute()
const { theme } = useData()
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})

const sidebarItems = theme.value.sidebar

const filterTags = (webItem) => {
    return Object.entries(webItem)
        .filter(([key]) => ['register', 'price', 'connection', 'language'].includes(key))
}
</script>

<style module>
.title {
    font-size: 1rem;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    background-color: #AAC4FF;
}

.title_text {
    color: #FFFFFF
}

.content {
    margin-top: 16px;
}

.spacer {
    margin-top: 8px;
}

.webCard {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: #D2DAFF;
}

.webName {
    font-size: 1rem;
}

.favicon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
}

.backButton {
    font-size: 1rem;
    border-radius: 8px;
    color: #FFFFFF;
    border-color: #AAC4FF;
    background-color: #AAC4FF;
}

.tag {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-radius: 4px;
    color: #FFFFFF;
    border-color: #AAC4FF;
    background-color: #AAC4FF;
}
</style>

<div>
    <div id="Home" :class="$style.title">
        <h2 :class="$style.title_text">Ciallo ～(∠・ω< )⌒★ !</h2>
    </div>
    <div v-for="item in sidebarItems" :key="item.text" :class="$style.content">
        <div :class="$style.title">
            <h2 :class="$style.title_text" :id="item.text">{{ item.text }}</h2>
        </div>
        <div>
            <el-row :gutter="8" :class="$style.spacer">
                <el-col
                    :class="$style.spacer"
                    :xs="24"
                    :sm="12"
                    :md="8"
                    :lg="6"
                    v-for="(web, index) in data[item.text]"
                    :key="index"
                >
                    <el-card :class="$style.webCard">
                        <el-row :gutter="8" :align="middle">
                            <el-col :span="6">
                                <el-image
                                    :class="$style.favicon"
                                    :src="web.faviconUrl"
                                    fit="cover"
                                >
                                    <template #error>
                                        <el-image src="/favicon.png" />
                                    </template>
                                </el-image>
                            </el-col>
                            <el-col :span="18">
                                <div :class="$style.webName">{{ web.name }}</div>
                                <el-text line-clamp="2">{{ web.description }}</el-text>
                            </el-col>
                        </el-row>
                        <el-row
                            justify="space-between"
                            :align="middle"
                            style="margin-top: 8px;"
                        >
                            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                <el-tag
                                    :key="key"
                                    :class="$style.tag"
                                    v-for="([key, value]) in filterTags(web)"
                                >
                                    {{ value }}
                                </el-tag>
                            </div>
                            <a :href="web.url" target="_blank">
                                <el-button
                                    :class="$style.backButton"
                                    size="large"
                                >
                                    进入<el-icon><ArrowRight /></el-icon>
                                </el-button>
                            </a>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</div>
