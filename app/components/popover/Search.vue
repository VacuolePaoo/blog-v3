<script setup lang="ts">
import type { SearchResult } from 'minisearch'
import MiniSearch from 'minisearch'

const props = defineProps<{
	open?: boolean
}>()

defineEmits<{
	close: []
}>()

const appConfig = useAppConfig()
const segmenter = Intl.Segmenter && new Intl.Segmenter(appConfig.language, { granularity: 'word' })

// await useAsyncData() 会阻塞渲染
const { data, status } = await useLazyAsyncData(
	'search',
	async () => {
		const [sections, metaList] = await Promise.all([
			queryCollectionSearchSections('content', {
				ignoredTags: ['pre'],
			}),
			queryCollection('content')
				.where('extension', '=', 'md')
				.select('path', 'tags', 'title', 'categories')
				.all(),
		])
		const metaMap = new Map(metaList.map(item => [item.path, item]))

		return sections.map((section) => {
			const basePath = section.id.split('#')[0]
			const meta = metaMap.get(basePath)
			const isPreview = basePath.startsWith('/previews/')
			const tags = meta?.tags ?? []
			const pageTitle = meta?.title ?? ''
			const category = meta?.categories?.[0] ?? ''
			const isTopLevel = section.id === basePath

			return {
				...section,
				category,
				isPreview,
				tags,
				pageTitle: isTopLevel ? pageTitle : '',
				searchTags: isTopLevel ? tags : [],
				headingTitle: section.id.includes('#') ? section.title : '',
				searchTitles: (section.titles ?? []).filter(title => title && title !== pageTitle),
			}
		})
	},
)

const miniSearch = new MiniSearch({
	fields: ['pageTitle', 'headingTitle', 'searchTitles', 'content', 'searchTags'],
	storeFields: ['title', 'titles', 'content', 'level', 'tags', 'category', 'isPreview'],
	searchOptions: {
		prefix: true,
		fuzzy: 0.2,
		combineWith: 'AND',
		boost: {
			pageTitle: 4,
			headingTitle: 2,
			searchTitles: 1.5,
			searchTags: 2,
		},
	},
	processTerm: segmenter
		? term => Array.from(segmenter.segment(term)).map(seg => seg.segment.toLowerCase())
		: undefined,
})

const searchInput = ref<HTMLInputElement>()

const { word, debouncedWord, source } = storeToRefs(useSearchStore())
const sourceOptions = [
	{
		key: 'all',
		label: '全部',
		fields: ['pageTitle', 'headingTitle', 'searchTitles', 'content', 'searchTags'] as string[],
	},
	{
		key: 'title',
		label: '标题',
		fields: ['pageTitle'] as string[],
	},
	{
		key: 'content',
		label: '内容',
		fields: ['headingTitle', 'searchTitles', 'content'] as string[],
	},
	{
		key: 'tags',
		label: '标签',
		fields: ['searchTags'] as string[],
	},
] as const
interface SearchResultItem extends SearchResult {
	category?: string
	isPreview?: boolean
}

const result = computed<SearchResultItem[]>(() => {
	void data.value
	const query = debouncedWord.value.trim()
	if (!query)
		return []
	const fields = sourceOptions.find(item => item.key === source.value)?.fields ?? sourceOptions[0].fields
	return miniSearch.search(query, { fields }) as SearchResultItem[]
})
const categoryFilter = ref('all')
const categoryOptions = computed(() => {
	const categories = new Set<string>()
	for (const item of data.value ?? []) {
		if (item.category)
			categories.add(item.category)
	}
	return Array.from(categories).sort((left, right) => left.localeCompare(right, appConfig.language))
})
const filteredResult = computed(() => {
	if (categoryFilter.value === 'all')
		return result.value
	return result.value.filter(item => item.category === categoryFilter.value)
})

const isKeyboardMode = ref(false)
const listResult = useTemplateRef('list-result')

const activeIndex = ref(0)
const activeItem = computed(() => listResult.value?.children[activeIndex.value] as HTMLElement | undefined)

watch(() => props.open, focusInput)

watch(status, (newStatus) => {
	if (newStatus === 'success' && data.value) {
		miniSearch.addAll(data.value)
	}
})

watch([debouncedWord, source, categoryFilter], () => {
	activeIndex.value = 0
})

useEventListener('mousemove', () => isKeyboardMode.value = false)
useEventListener('keydown', () => isKeyboardMode.value = true)

async function focusInput(allSelect = false) {
	await nextTick()
	searchInput.value?.focus()
	if (allSelect)
		searchInput.value?.select()
}

function setSource(nextSource: typeof source.value) {
	source.value = nextSource
	focusInput()
}

function updateActiveIndex(index: number, isKeyboard = false) {
	focusInput()
	if (index < 0 || index >= filteredResult.value?.length)
		return
	activeIndex.value = index
	if (isKeyboard)
		isKeyboardMode.value = true
	if (activeItem.value && isKeyboardMode.value) {
		activeItem.value.scrollIntoView({ block: 'nearest' })
	}
}
</script>

<template>
<Transition name="float-in">
	<div v-if="open" class="blog-search">
		<form class="input" @submit.prevent>
			<Icon :name="status === 'pending' ? 'line-md:loading-alt-loop' : 'ph:magnifying-glass-bold'" />

			<!-- 方向键切换搜索结果不应只在搜索框内触发 -->
			<input
				ref="searchInput"
				v-model="word"
				type="search"
				incremental
				class="search-input"
				placeholder="键入开始搜索"
				@keydown.up.prevent
				@keydown.down.prevent
			>
		</form>

		<menu class="scrollcheck-x source-picker">
			<li v-for="option in sourceOptions" :key="option.key">
				<button
					type="button"
					class="source-btn"
					:class="{ active: source === option.key }"
					@click="setSource(option.key)"
				>
					{{ option.label }}
				</button>
			</li>
			<PopoverSearchCategoryDropdown
				v-model="categoryFilter"
				:options="categoryOptions"
				@change="focusInput()"
			/>
		</menu>

		<TransitionGroup name="expand">
			<div v-if="debouncedWord && status === 'success' && !filteredResult.length" class="no-result">
				无结果
			</div>

			<menu
				v-if="filteredResult.length"
				ref="list-result"
				:key="filteredResult.length < 5 ? filteredResult.length : filteredResult[0]?.id"
				class="scrollcheck-y search-result"
			>
				<PopoverSearchItem
					v-for="(item, itemIndex) in filteredResult"
					:key="item.id"
					v-bind="item"
					:class="{ active: activeIndex === itemIndex }"
					@mousemove="updateActiveIndex(itemIndex)"
				/>
			</menu>

			<div v-if="filteredResult.length" class="tip" @click="searchInput?.focus()">
				<Key code="ArrowUp" prevent @press="updateActiveIndex(activeIndex - 1, true)" />
				<Key code="ArrowDown" prevent @press="updateActiveIndex(activeIndex + 1, true)" />
				切换&emsp;
				<Key code="Enter" icon @press="activeItem?.click()" />
				选择&emsp;
				<Key code="Escape" :icon="false" @press="$emit('close')" />
				关闭
			</div>
		</TransitionGroup>
	</div>
</Transition>
</template>

<style lang="scss" scoped>
.blog-search {
	--float-distance: 20vh;

	contain: paint;
	position: fixed;
	inset: 0;
	width: 90%;
	height: fit-content;
	max-width: $breakpoint-mobile;
	margin: auto;
	border: 2px solid var(--c-primary);
	border-radius: 1em;
	box-shadow: var(--box-shadow-3);
	background-color: var(--ld-bg-card);
}

.input {
	display: flex;
	align-items: center;
	gap: 1em;
	position: relative;
	padding: 0 1em;

	> .search-input {
		width: 100%;
		padding: 1em 0;
		outline: none;
	}
}

.source-picker {
	--fadeout-width: 1.6em;
	--control-height: 1.8em;
	--control-radius: 0.7em;

	display: flex;
	align-items: center;
	gap: 0.3em;
	margin: 0;
	padding: 0.2em 0.8em 0.6em;
}

.source-btn {
	height: var(--control-height);
	padding: 0 0.55em;
	border: 1px solid var(--c-border);
	border-radius: var(--control-radius);
	background-color: var(--c-bg-2);
	font-size: 0.8em;
	color: var(--c-text-2);
	transition: color 0.2s, background-color 0.2s, border-color 0.2s;

	&.active {
		border-color: var(--c-primary);
		background-color: var(--c-primary-soft);
		color: var(--c-primary);
	}
}

.no-result {
	// expand 时不要设置 padding
	max-height: 5em;
	line-height: 5em;
	text-align: center;
	color: var(--c-text-3);
	transition: all 0.5s;
}

.search-result {
	max-height: 75vh;
	max-height: 75dvh;
	transition: all 0.5s;
	scroll-padding: var(--fadeout-height);
}

.search-item {
	transition: background-color 0.1s, opacity 0.2s;
}

.tip {
	max-height: 1rem;
	margin: 0 1em 0.8rem;
	font-size: 0.8em;
	text-align: center;
	color: var(--c-text-3);
	transition: all 0.5s;
}

.expand-enter-active,
.expand-leave-active {
	transition: all 0.5s;
}

.expand-enter-from,
.expand-leave-to {
	opacity: 0;
	max-height: 0;
}
</style>
