<script setup lang="ts">
const props = withDefaults(defineProps<{
	options: string[]
	label?: string
	allLabel?: string
	allValue?: string
}>(), {
	label: '分类',
	allLabel: '全部分类',
	allValue: 'all',
})

const emit = defineEmits<{
	change: []
}>()
const model = defineModel<string>({ default: 'all' })
const open = ref(false)
const menuStyle = ref<Record<string, string>>({})

const wrapRef = useTemplateRef('category-wrap')
const buttonRef = useTemplateRef('category-button')
const menuRef = useTemplateRef('category-menu')

const labelText = computed(() => (model.value === props.allValue ? props.allLabel : model.value))

function toggleMenu() {
	open.value = !open.value
}

function selectCategory(value: string) {
	model.value = value
	open.value = false
	emit('change')
}

function updateMenuPosition() {
	const button = buttonRef.value
	if (!button)
		return
	const rect = button.getBoundingClientRect()
	const computedStyle = window.getComputedStyle(button)
	const maxLeft = Math.max(8, window.innerWidth - rect.width - 8)
	const left = Math.min(rect.left, maxLeft)
	menuStyle.value = {
		'top': `${rect.bottom + 8}px`,
		'left': `${left}px`,
		'minWidth': `${rect.width}px`,
		'--menu-radius': computedStyle.borderRadius || '0.7em',
		'--menu-height': computedStyle.height || '1.8em',
	}
}

watch(open, async (value) => {
	if (!value)
		return
	await nextTick()
	updateMenuPosition()
})

useEventListener('click', (event) => {
	if (!open.value)
		return
	const target = event.target as Node | null
	if (!target)
		return
	if (wrapRef.value?.contains(target))
		return
	if (menuRef.value?.contains(target))
		return
	open.value = false
})

useEventListener('keydown', (event) => {
	if (event.key === 'Escape')
		open.value = false
})

useEventListener('resize', () => {
	if (open.value)
		updateMenuPosition()
})

useEventListener('scroll', () => {
	if (open.value)
		updateMenuPosition()
})
</script>

<template>
<li ref="category-wrap" class="category-filter">
	<span class="category-label">{{ props.label }}</span>
	<div class="category-dropdown">
		<button
			ref="category-button"
			type="button"
			class="category-select"
			:class="{ open }"
			@click="toggleMenu"
		>
			<span class="category-value">{{ labelText }}</span>
			<span class="category-caret" aria-hidden="true" />
		</button>
	</div>
</li>

<Teleport to="body">
	<Transition name="expand">
		<ul
			v-if="open"
			ref="category-menu"
			class="category-menu"
			:style="menuStyle"
		>
			<li>
				<button
					type="button"
					class="category-option"
					:class="{ active: model === props.allValue }"
					@click="selectCategory(props.allValue)"
				>
					{{ props.allLabel }}
				</button>
			</li>
			<li v-for="category in options" :key="category">
				<button
					type="button"
					class="category-option"
					:class="{ active: model === category }"
					@click="selectCategory(category)"
				>
					{{ category }}
				</button>
			</li>
		</ul>
	</Transition>
</Teleport>
</template>

<style lang="scss" scoped>
.category-filter {
	display: flex;
	align-items: center;
	gap: 0.4em;
	position: relative;
	margin-inline-start: auto;
}

.category-label {
	font-size: 0.8em;
	color: var(--c-text-3);
}

.category-dropdown {
	position: relative;
}

.category-select {
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.4em;
	height: var(--control-height);
	min-width: 7.5em;
	padding: 0 0.6em;
	border: 1px solid var(--c-border);
	border-radius: 0.7em;
	background-color: var(--ld-bg-card);
	font-size: 0.8em;
	line-height: 1;
	color: var(--c-text-2);
	transition: border-color 0.2s, background-color 0.2s, color 0.2s;
	user-select: none;

	&:hover,
	&:focus-visible,
	&.open {
		border-color: var(--c-primary);
		outline: none;
		background-color: var(--c-primary-soft);
		color: var(--c-primary);
	}
}

.category-value {
	white-space: nowrap;
}

.category-caret {
	width: 0.4em;
	height: 0.4em;
	border-right: 2px solid currentcolor;
	border-bottom: 2px solid currentcolor;
	transform: translateY(-0.1em) rotate(45deg);
	transition: transform 0.2s;

	.category-select.open & {
		transform: translateY(0.1em) rotate(225deg);
	}
}

.category-menu {
	display: grid;
	gap: 0.2em;
	position: fixed;
	padding: 0.4em;
	border: 1px solid var(--c-border);
	border-radius: 0.8em;
	background-color: var(--ld-bg-card);
	z-index: calc(var(--z-index-popover) + 1000);
}

.category-option {
	display: block;
	width: 100%;
	min-height: 1.8em;
	padding: 0.35em 0.6em;
	border: 1px solid transparent;
	border-radius: 0.7em;
	font-size: 0.8em;
	text-align: left;
	color: var(--c-text-2);
	transition: background-color 0.2s, color 0.2s, border-color 0.2s;
	user-select: none;

	&:hover,
	&:focus-visible,
	&.active {
		border-color: var(--c-primary-soft);
		outline: none;
		background-color: var(--c-primary-soft);
		color: var(--c-primary);
	}
}
</style>
