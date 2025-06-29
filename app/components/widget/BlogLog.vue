<script setup lang="ts">
const appConfig = useAppConfig()
const timeEstablished = appConfig.timeEstablished

const blogLog = [
    { date: '2025-06-02', content: 'vacuole.top 到期，更换到当前域名' },
    { date: '2025-05-18', content: '更换为Nuxt框架，并魔改纸鹿摸鱼处' },
    { date: '2024-07-25', content: '使用Hexo框架Solitude主题重做博客' },
    { date: '2023-08-06', content: '使用Hexo框架并魔改Butterfly主题作为博客' },
    { date: timeEstablished, content: '第一代博客上线' },
]
</script>

<template>
    <h3 class="widget-title">
        更新日志
    </h3>
    <!-- TODO: 优化时间线样式 -->
    <div class="widget-card">
        <ul>
            <li v-for="(item, index) in blogLog" :key="index">
                <small>{{ item.date }}</small><br>
                {{ item.content }}
            </li>
        </ul>
    </div>
</template>
