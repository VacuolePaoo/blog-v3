<script setup lang="ts">
const appConfig = useAppConfig()
const { location, loading, error } = useIpLocation()

const welcomeMessage = computed(() => {
    if (loading.value) return { prefix: '', location: '正在获取您的位置', suffix: '...' }
    if (error.value) return { prefix: '', location: '', suffix: '欢迎您的访问！' }
    return {
        prefix: '欢迎来自',
        location: location.value.filter(Boolean).join(''),
        suffix: '的小伙伴！'
    }
})
</script>

<template>
    <h3 class="widget-title">公告</h3>
    <div class="widget-card seasonal" :style="{
        '--seasonal-bg': `url(${appConfig.seasonal.widgetBackground})`,
        '--seasonal-emoji': appConfig.seasonal.emoji,
    }">
        <p class="welcome-message">
            {{ welcomeMessage.prefix }}<span class="location">{{ welcomeMessage.location }}</span>{{ welcomeMessage.suffix }}
        </p>
        <p>液泡部落格在全球能够正常访问 <br><del>除了某些地区的电信</del></p>
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

.seasonal-emoji::before,
.seasonal-emoji::after {
    content: var(--seasonal-emoji, "\1F595");
}

.welcome-message {
    background-image: linear-gradient(
        -45deg,
        #0c3483 0%,
        #a2b6df 25%,
        #6b8cce 50%,
        #a2b6df 75%,
        #0c3483 100%
    );
    background-size: 400% 400%;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: flow 8s ease infinite;

    .location {
        font-weight: bold;
    }
}

@keyframes flow {
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
