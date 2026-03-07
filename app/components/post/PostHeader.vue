<script setup lang="ts">
import type { ArticleProps } from '~/types/article'

defineOptions({ inheritAttrs: false })
const props = defineProps<ArticleProps>()

const appConfig = useAppConfig()

const coverFilter = computed(() => props.meta?.coverFilter || (props.meta?.coverDim && 'brightness(0.75)') || undefined)
const categoryLabel = computed(() => props.categories?.[0])
const categoryIcon = computed(() => getCategoryIcon(categoryLabel.value))

const shareText = `【${appConfig.title}】${props.title}\n\n${
	props.description ? `${props.description}\n\n` : ''}${
	new URL(props.path!, appConfig.url).href}`

const { copy, copied } = useCopy(shareText)
</script>

<template>
<div class="header-card">
	<h1 class="post-title" :class="getPostTypeClassName(type)">
		{{ title }}
	</h1>
	<div class="operations">
		<ZButton
			:icon="copied ? 'ph:check-bold' : 'ph:share-bold'"
			@click="copy()"
		>
			文字分享
		</ZButton>
	</div>
	<div v-if="!meta?.hideInfo" class="post-info">
		<UtilDate
			v-if="date"
			v-tip
			:tip-transform="d => `创建于${d}`"
			:date
			icon="ph:calendar-dots-bold"
		/>

		<UtilDate
			v-if="updated && isTimeDiffSignificant(date, updated, 1)"
			v-tip
			:tip-transform="d => `修改于${d}`"
			:date="updated"
			icon="ph:calendar-plus-bold"
		/>

		<span v-if="categoryLabel">
			<Icon :name="categoryIcon" />
			{{ categoryLabel }}
		</span>

		<span>
			<Icon name="ph:paragraph-bold" />
			{{ formatNumber(readingTime?.words) }} 字
		</span>
	</div>
</div>
<div v-if="image" class="post-header has-cover">
	<Pic class="post-cover" :src="image" :alt="title" :filter="coverFilter" />
</div>
</template>

<style lang="scss" scoped>
.post-header {
	contain: paint; // overflow hidden + position relative
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	margin: 0.5rem;
	border: 2px solid var(--c-border);
	border-radius: 1rem;
	background-color: var(--c-bg-2);

	@media (max-width: $breakpoint-mobile) {
		margin: 0;
		border-radius: 0;
	}

	&.has-cover {
		min-height: 16rem;
		max-height: 20rem;
		transition: font-size 0.2s;
	}
}

.operations {
	position: absolute;
	opacity: 0;
	inset-inline-end: 1em;
	color: var(--c-text-1);
	transition: opacity 0.2s;
	z-index: 1;
}

.post-cover {
	position: absolute;
	inset: 0;

	> :deep(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.header-card {
	contain: paint;
	display: block;
	margin: 0.5rem;
	border: 2px solid var(--c-border);
	border-radius: 1rem;
	background-color: var(--ld-bg-card);
	transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;

	&:hover .operations,

	&:focus-within .operations {
		opacity: 1;
	}
}

.post-title {
	padding: 0.75rem 1rem 0;
	font-size: 1.6em;
	z-index: 1;
}

.post-info {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5em 1.2em;
	column-gap: clamp(1em, 3%, 1.5em);
	padding: 0.75rem 1rem;
	font-size: 0.8em;
}
</style>
