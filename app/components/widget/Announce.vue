<script setup lang="ts">
const appConfig = useAppConfig()
const { location, loading, error } = useIpLocation()

const welcomeMessage = computed(() => {
    if (loading.value) return '正在获取您的位置...'
    if (error.value) return '欢迎您的访问！'
    return `欢迎来自${location.value.filter(Boolean).join('')}的小伙伴！`
})
</script>

<template>
    <h3 class="widget-title">
        公告
    </h3>
    <div
        class="widget-card seasonal"
        :style="{
            '--seasonal-bg': `url(${appConfig.seasonal.widgetBackground})`,
            '--seasonal-emoji': appConfig.seasonal.emoji,
        }"
    >
    <p></p>
        <p class="welcome-message">{{ welcomeMessage }}</p>
    </div>
</template>

<style lang="scss" scoped>
.seasonal {
    position: relative;
    overflow: hidden;
    z-index: 0;

    &::before {
        content: "";
        position: absolute;
        opacity: 0.2;
        inset: 0;
        background: center / cover;
        background-image: var(--seasonal-bg, "https://wsrv.nl/?url=i0.hdslb.com/bfs/archive/abf1bb4412360550a18e5f2e71b1227e7d949735.png@320w");
        z-index: -1;
    }
}

.seasonal-emoji::before, .seasonal-emoji::after {
    // 文明用语😋
    content: var(--seasonal-emoji, "\1F595");
}

.welcome-message {
    background: linear-gradient(
        90deg,
        #946E29,
        #f3aa4b,
        #946E29
    );
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: gradient 3s linear infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
