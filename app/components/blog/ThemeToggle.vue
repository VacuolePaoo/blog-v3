<script setup lang="ts">
const appConfig = useAppConfig()
const colorMode = useColorMode()
</script>

<template>
<div class="theme-toggle" :data-theme="colorMode.preference">
	<span class="theme-toggle-indicator" aria-hidden="true" />
	<button
		v-for="(themeData, themeName) in appConfig.themes"
		:key="themeName"
		v-tip="themeData.tip"
		type="button"
		:aria-label="themeData.tip"
		:aria-pressed="colorMode.preference === themeName"
		:class="{ active: colorMode.preference === themeName }"
		@click="colorMode.preference = themeName"
	>
		<Icon :name="themeData.icon" />
	</button>
</div>
</template>

<style lang="scss" scoped>
.theme-toggle {
	--theme-indicator-offset: 0;

	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 3px;
	position: relative;
	width: fit-content;
	margin: 0 auto;
	padding: 2px;
	border: 1px solid var(--c-border);
	border-radius: 1rem;
	background-color: var(--c-bg-2);

	&[data-theme="system"] {
		--theme-indicator-offset: calc(100% + 3px);
	}

	&[data-theme="dark"] {
		--theme-indicator-offset: calc(200% + 6px);
	}

	> .theme-toggle-indicator {
		grid-column: 1;
		grid-row: 1;
		border-radius: 1rem;
		box-shadow: var(--box-shadow-2);
		background-color: var(--ld-bg-card);
		transform: translateX(var(--theme-indicator-offset));
		transition: transform var(--delay);
		pointer-events: none;

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	}

	> button {
		grid-row: 1;
		position: relative;
		padding: 4px 1rem;
		border-radius: 1rem;
		transition: background-color 0.1s, color 0.1s;
		z-index: 1;

		&:nth-of-type(1) {
			grid-column: 1;
		}

		&:nth-of-type(2) {
			grid-column: 2;
		}

		&:nth-of-type(3) {
			grid-column: 3;
		}

		&:hover:not(.active) {
			background-color: var(--c-bg-soft);
			color: var(--c-text-1);
		}

		&.active {
			color: var(--c-text-1);
			cursor: auto;
		}
	}
}
</style>
