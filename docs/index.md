---
home: true
---
<script setup>
import { useData } from 'vitepress'
import { ArrowRight } from '@element-plus/icons-vue'
import { data } from './pageContent.data.ts'

const { theme } = useData()

const sidebarItems = theme.value.sidebar
</script>

<style module>
.home {
    display: grid;

    .title {
        font-size: 100%;
        border-radius: 16px;
        justify-content: center;
        background-color: #AAC4FF;


        .ciallo {
            color: #FFFFFF
        }
    }

    .content {
        display: grid;
        margin-top: 16px;

        .h2 {
            font-size: 100%;
            border-radius: 16px;
            justify-content: center;
            background-color: #AAC4FF;

            .text {
                color: #FFFFFF
            }
        }

        .cardList {
            display: grid;
        }

        .row {
            margin-top: 8px;
        }

        .col {
            padding-left: 8px;
            padding-right: 8px;
        }

        .webCard {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background-color: #D2DAFF;

            .webName {
                font-size: 100%;
            }
        }

        .favicon {
            width: 48px;
            height: 48px;
            border-radius: 8px;
        }

        .backButton {
            color: #FFFFFF;
            font-size: 100%;
            background-color: #AAC4FF;
            border-radius: 8px;
            border-color: #AAC4FF;
        }

        .tag {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            background-color: #AAC4FF;
            border-radius: 8px;
            border-color: #AAC4FF;
        }
    }
}
</style>

<el-container :class="$style.home">
    <!-- Home -->
    <el-container id="Home" :class="$style.title">
        <h2 :class="$style.ciallo">Ciallo ～(∠・ω< )⌒★ !</h2>
    </el-container>
    <!-- Countent -->
    <el-container :class="$style.content" v-for="item in sidebarItems">
        <el-container :class="$style.h2">
            <h2 :class="$style.text" :id="item.text">{{ item.text }}</h2>
        </el-container>
        <!-- Web Card -->
        <div :class="$style.cardList">
            <el-row :class="$style.row" v-for="row in (Math.ceil(Object.keys(data[item.text]).length / 4))">
                <el-col :class="$style.col" :span="6"
                    v-for="col in ((Object.keys(data[item.text]).length - (row - 1) * 4) > 4 ? 4 : (Object.keys(data[item.text]).length - (row - 1) * 4))">
                    <el-card :class="$style.webCard" :body-style="{ padding: '12px' }">
                        <el-row style="margin-bottom: 8px;">
                            <el-col :span="4">
                                <el-image :class="$style.favicon" :src="data[item.text][(row - 1) * 4 + col - 1]['faviconUrl']">
                                    <template #error>
                                        <div><el-image src="/favicon.png" /></div>
                                    </template>
                                </el-image>
                            </el-col>
                            <el-col :span="20">
                                <el-row>
                                    <el-text :class="$style.webName">
                                        {{ data[item.text][(row - 1) * 4 + col - 1]["name"] }}
                                    </el-text>
                                </el-row>
                                <el-row>
                                    <el-text line-clamp="2">
                                        {{ data[item.text][(row - 1) * 4 + col - 1]["description"] }}
                                    </el-text>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="display: flex; flexDirection: row-reverse; justify-content: space-between;">
                            <a :href="data[item.text][(row - 1) * 4 + col - 1]['url']" target="_blank">
                                <el-button :class="$style.backButton">
                                    进入<el-icon class="el-icon--right">
                                        <ArrowRight />
                                    </el-icon>
                                </el-button>
                            </a>
                            <el-col :span="4" :class="$style.tag">
                                {{ data[item.text][(row - 1) * 4 + col - 1]["register"] }}
                            </el-col>
                            <el-col :span="4" :class="$style.tag">
                                {{ data[item.text][(row - 1) * 4 + col - 1]["price"] }}
                            </el-col>
                            <el-col :span="4" :class="$style.tag">
                                {{ data[item.text][(row - 1) * 4 + col - 1]["connection"] }}
                            </el-col>
                            <el-col :span="4" :class="$style.tag">
                                {{ data[item.text][(row - 1) * 4 + col - 1]["language"] }}
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </el-container>
</el-container>