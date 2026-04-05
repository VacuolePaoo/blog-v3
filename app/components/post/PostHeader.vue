<script setup lang="ts">
import type { ArticleProps } from '~/types/article'

defineOptions({ inheritAttrs: false })
const props = defineProps<ArticleProps>()

const appConfig = useAppConfig()

const coverFilter = computed(() => props.meta?.coverFilter || (props.meta?.coverDim && 'brightness(0.75)') || undefined)
const categoryLabel = computed(() => props.categories?.[0])
const categoryIcon = computed(() => getCategoryIcon(categoryLabel.value))
const isPreview = computed(() => props.path?.startsWith('/previews/'))

const shareText = `【${appConfig.title}】${props.title}\n\n${
	props.description ? `${props.description}\n\n` : ''}${
	new URL(props.path!, appConfig.url).href}`

const { copy, copied } = useCopy(shareText)
</script>

<template>
<div class="header-card">
	<div v-if="image" class="post-header has-cover">
		<Pic class="post-cover" :src="image" :alt="title" :filter="coverFilter" />
	</div>
	<h1 class="post-title" :class="getPostTypeClassName(type)">
		{{ title }}
	</h1>
	<span v-if="isPreview" class="preview-badge">预览 · 未发布</span>
	<div class="operations">
		<ZButton
			class="share-button"
			:aria-label="copied ? '已复制链接' : '复制链接'"
			:icon="copied ? 'ph:check-bold' : 'ph:share-bold'"
			:disabled="isPreview"
			@click="!isPreview && copy()"
		>
			<span class="share-button-label" :class="{ 'is-visible': copied }">
				{{ copied ? '已复制' : '文字分享' }}
			</span>
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
</template>

<style lang="scss" scoped>
.post-header {
	contain: paint; // overflow hidden + position relative
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	overflow: hidden;
	margin: 0.5rem 0.5rem 0;
	border-radius: 0.75rem;
	background-color: var(--c-bg-2);

	&.has-cover {
		min-height: 16rem;
		max-height: 20rem;
		box-shadow: var(--box-shadow-3);
		transition: font-size 0.2s;
	}

	@media (max-width: $breakpoint-phone) {
		margin: 0;
		border: 0;
		border-radius: 0;
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

@media (max-width: $breakpoint-phone) {
	.operations {
		opacity: 1;
	}

	:deep(.share-button .button-main) {
		gap: 0;
		transition: gap 0.18s ease;
	}

	.share-button-label {
		overflow: hidden;
		opacity: 0;
		max-width: 0;
		white-space: nowrap;
		transition: max-width 0.18s ease, margin-inline-start 0.18s ease, opacity 0.12s ease;

		&.is-visible {
			opacity: 1;
			max-width: 3em;
			margin-inline-start: 0.2em;
			animation: share-copy-label-in 0.18s ease-out;
		}
	}
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
	position: relative;
	margin: 0.5rem;
	border: 2px solid var(--c-border);
	border-radius: 1rem;
	background-color: var(--ld-bg-card);
	transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;

	&:hover .operations,

	&:focus-within .operations {
		opacity: 1;
	}

	@media (max-width: $breakpoint-phone) {
		margin: 0 0 0.5rem;
		border: 0;
		border-bottom: 2px solid var(--c-border);
		border-radius: 0;
	}
}

.preview-badge {
	display: inline-flex;
	align-items: center;
	position: absolute;
	inset-block-start: 0.75rem;
	inset-inline-end: 1rem;
	padding: 0.25em 0.6em;
	border: 1px solid var(--c-warning);
	border-radius: 0.7em;
	background-color: var(--c-warning-soft);
	font-size: 0.75em;
	letter-spacing: 0.02em;
	color: var(--c-warning);
	user-select: none;
}

.post-title {
	padding: 1rem 1rem 0;
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

@media (max-width: $breakpoint-phone) {
	.post-header {
		border-radius: 0;
	}
}

@keyframes share-copy-label-in {
	from {
		opacity: 0;
		transform: translateY(0.15rem);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
