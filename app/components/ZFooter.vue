<script setup lang="ts">
const appConfig = useAppConfig()
const { hitokoto, isHovered, isRefreshing, fetchHitokoto } = useHitokoto()
</script>

<template>
    <footer class="z-footer">
        <nav class="footer-nav">
            <div v-for="(group, groupIndex) in appConfig.footer.nav" :key="groupIndex" class="footer-nav-group">
                <h3 v-if="group.title">
                    {{ group.title }}
                </h3>
                <menu>
                    <li v-for="(item, itemIndex) in group.items" :key="itemIndex">
                        <ZRawLink :to="item.url">
                            <Icon :name="item.icon" />
                            <span class="nav-text">{{ item.text }}</span>
                        </ZRawLink>
                    </li>
                </menu>
            </div>
        </nav>
        <p v-html="appConfig.footer.copyright" />
        <p v-html="appConfig.footer.message" />
        <div v-if="hitokoto" class="hitokoto" :class="{ 'is-hover': isHovered && !isRefreshing }"
            @mouseenter="isHovered = true" @mouseleave="isHovered = false" @click="!isRefreshing && fetchHitokoto()">
            <div class="hitokoto-content">
                <span class="hitokoto-text" :class="{ hidden: isRefreshing }">{{ hitokoto }}</span>
                <span class="hitokoto-refresh" :class="{ visible: isRefreshing }">
                    <Icon name="ph:check-fat-bold" />
                </span>
            </div>
            <span class="hitokoto-hover">点击刷新</span>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.z-footer {
    margin: 3rem 1rem;
    font-size: 0.9em;
    color: var(--c-text-2);

    .footer-nav {
        display: flex;
        gap: 5vw clamp(2rem, 5%, 5vw);
        padding-block: 3rem;
        flex-wrap: wrap;

        h3 {
            margin: 0.5em;
            font: inherit;
        }

        a {
            display: flex;
            align-items: center;
            gap: 0.3em;
            width: fit-content;
            padding: 0.3em 0.5em;
            border-radius: 0.5em;
            font-size: 0.9em;
            transition: background-color 0.2s, color 0.1s;

            &:hover {
                background-color: var(--c-bg-soft);
                color: var(--c-text);
            }
        }
    }

    p, .hitokoto {
        margin: 0.5em;
    }

    .hitokoto {
        text-align: center;
        font-size: 1rem;
        font-family: 'LXGW Bright Medium', sans-serif;
        font-weight: 400;
        opacity: 0.8;
        cursor: pointer;
        position: relative;
        transition: opacity 0.3s;
        min-height: 1.5em;

        &:hover {
            opacity: 1;
        }

        .hitokoto-content {
            position: relative;
            height: 1.5em;
        }

        .hitokoto-text,
        .hitokoto-hover,
        .hitokoto-refresh {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            transform: translateY(0);
            opacity: 1;
            pointer-events: none;
        }

        .hitokoto-text {
            &.hidden {
                opacity: 0;
            }
        }

        .hitokoto-hover {
            opacity: 0;
            transform: translateY(5px);
        }

        .hitokoto-refresh {
            color: var(--c-green);
            font-size: 1.2em;
            opacity: 0;

            &.visible {
                opacity: 1;
            }
        }

        &.is-hover {
            .hitokoto-text {
                opacity: 0;
                transform: translateY(-5px);
            }

            .hitokoto-hover {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.15s ease;
        position: relative;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}
</style>
