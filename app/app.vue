<template>
<NuxtLoadingIndicator />
<NuxtRouteAnnouncer :style="{ position: 'absolute' }" />
<BlogSkipToContent />
<BlogSidebar />
<div id="content">
	<main id="main-content">
		<NuxtPage />
		<BlogFooter />
	</main>
	<BlogAside />
</div>
<BlogPanel />
<BikariyaModals />
</template>

<!-- eslint-disable-next-line vue/enforce-style-attribute -->
<style lang="scss">
#blog-root {
	--reading-focus-opacity: 0.32;
	--reading-focus-blur: 1.5px;
	--reading-focus-duration: 0.45s;
	--reading-focus-duration-hover: 0.28s;
	--reading-focus-ease: cubic-bezier(0.22, 1, 0.36, 1);
	--reading-focus-ease-hover: cubic-bezier(0.4, 0, 0.2, 1);
}

#blog-root {
	display: flex;
	justify-content: center;
	gap: 1rem;
	min-width: 0;
}

#blog-sidebar, #blog-aside {
	flex: 0 0 280px; // 防止搜索框 grow
	position: sticky;
	top: 0;
	height: 100vh;
	height: 100dvh;
	min-width: 0; // 防止搜索框撑开页面
	transition:
		opacity var(--reading-focus-duration) var(--reading-focus-ease),
		filter var(--reading-focus-duration) var(--reading-focus-ease);
	will-change: opacity, filter;
	scrollbar-width: thin;

	@media (max-width: $breakpoint-widescreen) {
		flex-shrink: 0.2;
	}
}

@media (min-width: calc($breakpoint-mobile + 1px)) {
	body.page-reading #blog-sidebar,
	body.page-reading #blog-aside {
		opacity: var(--reading-focus-opacity);
		filter: saturate(0.88) blur(var(--reading-focus-blur));
	}

	body.page-reading #blog-sidebar:hover,
	body.page-reading #blog-aside:hover {
		opacity: 1;
		transition-duration: var(--reading-focus-duration-hover);
		transition-timing-function: var(--reading-focus-ease-hover);
		filter: none;
	}
}

#content {
	display: flex;
	gap: 1rem;

	// 若设置的是 max-width，则内部 main 宽度为 fit-content，可能无法撑满
	// 此时即使设置 flex-grow，也会影响 #sidebar 无法正确 shrink
	width: $breakpoint-widescreen;
	min-width: 0; // 解决父级 flexbox 设置 justify-content: center 时溢出左侧消失的问题

	// 此处不建议给内容设置 padding
	> #main-content {
		flex-grow: 1; // 使较小宽度的内容占满

		// overflow: hidden; // 会使一部分元素吸顶失效

		// 使内容正确计算宽度而不横向溢出
		// 也可设置 width: 0 或者 contain: inline-size（兼容性不佳）
		min-width: 0;
	}
}
</style>
