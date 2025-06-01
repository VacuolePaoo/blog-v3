<script setup lang="ts">
// 社交媒体链接类型定义
interface SocialLink {
    text: string      // 展开显示的详细文本
    alt: string       // 悬浮提示的简短文本
    url: string       // 链接地址
    icon: string      // 图标名称
}

const config = useAppConfig()

// 确保配置正确加载
const layoutStore = useLayoutStore()
layoutStore.setAside([])

useSeoMeta({
    title: '关于',
    ogType: 'profile',
    description: `关于我的个人介绍`,
})

const timeline = [
    {
        period: '2021-2024',
        title: '石家庄市第四十中学',
        description: '高中阶段'
    },
    {
        period: '2024-202?',
        title: '河北师大附中',
        description: '未来可期'
    }
]

const specialties = [
    {
        title: '玄学流电脑疑难问题解决专家',
        icon: 'ph:desktop-bold',
        level: '专家级'
    },
    {
        title: '软件折腾能力',
        icon: 'ph:wrench-bold',
        level: '大师级'
    }
]

/**
 * 社交媒体链接配置
 * text: 展开显示的详细文本
 * alt: 悬浮提示的简短文本
 * url: 链接地址
 * icon: 图标 (使用Remix Icon: https://remixicon.com/)
 */
const socials: SocialLink[] = [
    {
        text: '看看我的项目',
        alt: 'GitHub: VacuolePaoo',
        url: 'https://github.com/VacuolePaoo',
        icon: 'line-md:github'
    },
    {
        text: '加入我的Discord群组',
        alt: 'Discord',
        url: 'https://discord.gg/vMTSEScRSQ',
        icon: 'line-md:discord'
    },
    {
        text: '给我发邮件',
        alt: 'me@vacuole.top',
        url: 'mailto:me@example.com',
        icon: 'line-md:email'
    },
    {
        text: '看看我的视频',
        alt: 'Bilibili: VacuolePao',
        url: 'https://space.bilibili.com/518590350',
        icon: 'ant-design:bilibili-outlined'
    },
]

// 获取头像URL
const avatarUrl = config.header?.logo || ''
</script>

<template>
    <div class="about-container">
        <!-- 个人信息展示区 -->
        <div class="profile-hero">
            <div class="hero-content">
                <div class="scrolling-title">
                    <div class="gradient-mask"></div>
                    <div class="title-wrapper">
                        <div class="title-track track-1">
                            <span>VACUOLE</span>
                            <span>液泡</span>
                            <span>VACUOLE</span>
                            <span>液泡</span>
                            <span>VACUOLE</span>
                            <span>液泡</span>
                        </div>
                        <div class="title-track track-2">
                            <span>VACUOLE</span>
                            <span>液泡</span>
                            <span>VACUOLE</span>
                            <span>液泡</span>
                            <span>VACUOLE</span>
                            <span>液泡</span>
                        </div>
                    </div>
                </div>
                <div class="avatar-container">
                    <div class="avatar-mask"></div>
                    <img
                        :src="avatarUrl"
                        alt="Avatar"
                        class="avatar"
                        v-if="avatarUrl"
                    >
                </div>
                <div class="social-links-wrapper">
                    <a
                        v-for="social in socials"
                        :key="social.text"
                        :href="social.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link"
                        :title="social.alt"
                    >
                        <div class="social-content">
                            <span class="social-text">{{ social.text }}</span>
                            <Icon :name="social.icon" class="social-icon" />
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- 其他部分保持不变 -->
        <div class="about-grid">
            <!-- 其他卡片内容保持不变 -->
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/css/about' as *;
</style>