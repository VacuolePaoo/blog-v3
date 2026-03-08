<template>
<a class="comm-link" href="https://dc.vacu.top" target="_blank" rel="noopener noreferrer">
	<BlogWidget
		card
		dim
		title="技术社区"
		bg-img="/assets/img/server.png"
		bg-right
	>
		<div class="title text-creative">
			LadderHub <br> 绳梯社区
		</div>
	</BlogWidget>
</a>
</template>

<style lang="scss" scoped>
.comm-link {
	display: block;
	text-decoration: none;
	color: inherit;
}

.title {
	font-size: 1.8em;
	font-weight: 800;
	letter-spacing: 0.05em;
	color: var(--c-primary);
}

:deep(.bg-img).bg-img.bg-img {
	opacity: 0.5;
}
</style>
