import { LazyPopoverSearch } from '#components'

export type SearchSource = 'all' | 'title' | 'content' | 'tags'

export const useSearchStore = defineStore('search', () => {
	// 搜索框应和侧边栏状态联动
	const layoutStore = useLayoutStore()
	const modalStore = useModalStore()

	const word = ref('')
	const debouncedWord = refDebounced(word)
	const source = ref<SearchSource>('all')

	const {
		open: _open,
		close: _close,
	} = modalStore.use(() => h(LazyPopoverSearch, {
		onClose: () => {
			_close()
			layoutStore.close()
		},
	}), {
		unique: true,
		duration: 200,
	})

	// 从外部调用时应该操作 layoutStore
	watch(() => layoutStore.state, (state) => {
		if (state !== 'search')
			return _close()

		word.value = window.getSelection()?.toString().trim() || word.value
		_open()
	})

	return {
		word,
		debouncedWord,
		source,
	}
})
