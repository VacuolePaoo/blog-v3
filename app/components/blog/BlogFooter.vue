<script setup lang="ts">
const appConfig = useAppConfig()
const hitokoto = ref('')
const hitokotoReady = ref(false)

async function fetchHitokoto() {
	hitokotoReady.value = false

	try {
		hitokoto.value = await $fetch<string>('https://v1.hitokoto.cn/?encode=text')
	}
	catch {
		hitokoto.value = ''
	}
	finally {
		hitokotoReady.value = true
	}
}

onMounted(() => {
	fetchHitokoto()
})
</script>

<template>
<footer class="blog-footer">
	<nav class="footer-nav">
		<div v-for="(group, groupIndex) in appConfig.footer.nav" :key="groupIndex" class="footer-nav-group">
			<h3 v-if="group.title">
				{{ group.title }}
			</h3>
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
	<p class="text-story hitokoto" :class="{ 'is-ready': hitokotoReady && hitokoto }">
		<span>{{ hitokoto }}</span>
	</p>
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
		min-height: calc(1.75em * 2);
		color: var(--c-text-3);

		span {
			display: inline-block;
			opacity: 0;
			transform: translateY(0.6rem);
			transition:
				opacity 0.45s ease,
				filter 0.45s ease,
				transform 0.45s ease;
			filter: blur(8px);
		}

		&.is-ready span {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}
}
</style>
