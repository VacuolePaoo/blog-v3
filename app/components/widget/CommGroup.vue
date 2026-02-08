<template>
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

	<Tip icon :tip-options="{ placement: 'left' }">
		<Icon name="ph:discord-logo-bold" /><a href="https://dc.vacu.top">点击加入Discord服务器</a>
	</Tip>
</BlogWidget>
</template>

<style lang="scss" scoped>
.title {
	background-clip: text;
	background-image: linear-gradient(60deg, var(--c-accent) -30%, var(--c-primary), var(--c-text-1));
	background-position: 100% 0;
	background-size: 200%;
	font-size: 1.8em;
	font-weight: 800;
	letter-spacing: 0.05em;
	color: transparent;
	transition: background-position 0.2s;

	.blog-widget:hover & {
		background-position: 0 0;
	}
}

.tip {
	font-size: 0.9em;
	line-height: 2;
}

:deep(.bg-img).bg-img.bg-img {
	opacity: 0.5;
}
</style>
