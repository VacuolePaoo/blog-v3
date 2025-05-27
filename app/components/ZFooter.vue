<script setup lang="ts">
const appConfig = useAppConfig()
const { hitokoto } = useHitokoto()
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
        <p v-if="hitokoto" class="hitokoto">{{ hitokoto }}</p>
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

    p {
        margin: 0.5em;
    }

    .hitokoto {
        text-align: center;
        font-style: italic;
        opacity: 0.8;
        animation: hitokoto-fade-in 1s ease;
    }

    @keyframes hitokoto-fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 0.8;
        }
    }
}
</style>
