<script setup lang="ts">
const appConfig = useAppConfig()

const hitokoto = shallowRef('')
onMounted(async () => {
	try {
		const content = await $fetch<string>('https://v1.hitokoto.cn/?encode=text', { timeout: 5000 })
		hitokoto.value = content || '一言获取失败'
	}
	catch {
		hitokoto.value = '一言获取失败'
	}
})
</script>

<template>
<footer class="blog-footer">
	<nav class="footer-nav">
		<div v-for="(group, groupIndex) in appConfig.footer.nav" :key="groupIndex">
			<hgroup class="text-creative" v-text="group.title" />
			<menu>
				<li v-for="(item, itemIndex) in group.items" :key="itemIndex">
					<UtilLink :to="item.url">
						<Icon :name="item.icon" />
						<span class="nav-text">{{ item.text }}</span>
					</UtilLink>
				</li>
			</menu>
		</div>
	</nav>
	<p v-html="appConfig.footer.copyright" />
	<Transition name="hitokoto">
		<p v-if="hitokoto" class="text-story">
			{{ hitokoto }}
		</p>
	</Transition>
</footer>
</template>

<style lang="scss" scoped>
.blog-footer {
	margin: 3rem 1rem;
	font-size: 0.9em;
	color: var(--c-text-2);

	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 5vw clamp(2rem, 5%, 5vw);
		padding-block: 3rem;

		hgroup {
			margin: 0.5em;
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
}

.hitokoto-enter-active {
	transition: opacity var(--delay);
}

.hitokoto-enter-from {
	opacity: 0;
}
</style>
