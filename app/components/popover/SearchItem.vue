<script setup lang="ts">
import type { SearchResult } from 'minisearch'

interface SearchItem extends SearchResult {
	title: string
	content: string
	titles: string[]
	tags: string[]
	level: number
	isPreview: boolean
}

const props = withDefaults(defineProps<Partial<SearchItem>>(), {
	titles: () => [],
	tags: () => [],
	isPreview: false,
	title: '',
})

const normalizedQueryTerms = computed(() => (props.queryTerms ?? []).map(term => term.toLowerCase()).filter(Boolean))
function isTagMatched(tag: string) {
	if (!normalizedQueryTerms.value.length)
		return false
	const normalizedTag = tag.toLowerCase()
	return normalizedQueryTerms.value.some(term => normalizedTag.includes(term))
}
</script>

<template>
<UtilLink :to="id" class="search-item">
	<hgroup class="text-creative">
		<span v-if="isPreview" class="preview-badge">预览 · 未发布</span>
		<span v-for="heading in [...titles, title]" :key="heading" class="title" v-html="highlightHtml(heading, queryTerms)" />
		<Icon v-if="level === 1" name="ph:file-text-bold" />
	</hgroup>
	<p v-if="content" class="content" v-html="highlightHtml(content, queryTerms)" />
	<ul v-if="tags?.length" class="tag-list">
		<li v-for="tag in tags" :key="tag" class="tag" :class="{ matched: isTagMatched(tag) }" v-text="tag" />
	</ul>
</UtilLink>
</template>

<style lang="scss" scoped>
.search-item {
	display: block;
	margin: 0.5em;
	padding: 0.5em 0.8em;
	border-radius: 0.5em;
	transition: background-color 0.2s;

	&.active {
		background-color: var(--c-bg-soft);
	}
}

.title:not(:first-child) {
	opacity: 0.5;
	transition: opacity 0.2s;

	.active & {
		opacity: 1;
	}

	&::before {
		content: " > ";
		opacity: 0.5;
	}
}

.title + .iconify {
	margin-inline-start: 0.2em;
}

.preview-badge {
	display: inline-flex;
	align-items: center;
	margin-inline-end: 0.4em;
	padding: 0.12em 0.4em;
	border: 1px solid var(--c-warning);
	border-radius: 0.5em;
	background-color: var(--c-warning-soft);
	font-size: 0.7em;
	letter-spacing: 0.02em;
	color: var(--c-warning);
}

.content {
	margin-top: 0.2em;
	font-size: 0.8em;
	white-space: pre-wrap;
	color: var(--c-text-2);
}

.tag-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.4em;
	margin-top: 0.4em;
	font-size: 0.75em;
	color: var(--c-text-2);
}

.tag {
	display: inline-flex;
	align-items: center;
	gap: 0.1em;
	padding: 0.05em 0.4em;
	border: 1px solid var(--c-border);
	border-radius: 0.6em;
	background-color: var(--c-bg-2);

	&.matched {
		border-color: var(--c-primary);
		background-color: var(--c-primary-soft);
		color: var(--c-primary);
	}

	&::before {
		content: "#";
		opacity: 0.5;
	}
}
</style>
