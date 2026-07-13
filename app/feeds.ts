import type { FeedGroup } from '../app/types/feed'
// 友链检测 CLI 需要使用显式导入和相对路径
import { myFeed } from '../blog.config'
// eslint-disable-next-line unused-imports/no-unused-imports
import { getFavicon, getGithubAvatar, getGithubIcon, getOciqGroupAvatar, getOicqAvatar, OicqAvatarSize } from './utils/img'

export default [
	// #region 网上邻居 since 2024
	{
		name: '网上邻居',
		desc: '哔——啵——电波通讯中，欢迎常来串门。',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: 'isYangs',
				desc: '一个前端Bug构造师的博客',
				link: 'https://www.isyangs.cn/',
				feed: 'https://www.isyangs.cn/feed.xml',
				icon: 'https://www.isyangs.cn/favicon.svg',
				avatar: 'https://7.isyangs.cn/8/655c9835780a0-8.jpg',
				archs: ['Vue', '国内 CDN'],
				date: '2024-01-29',
				comment: '高中时认识的小学校友，目前从事前端开发。',
			},
			{
				author: 'KazariEX',
				sitenick: '微光档案',
				desc: '故事就是只为你一个人而存在的世界',
				link: 'https://archive.bikari.top/',
				feed: 'https://archive.bikari.top/feed',
				icon: 'https://archive.bikari.top/image/favicon.svg',
				avatar: getGithubAvatar('KazariEX'),
				archs: ['Nuxt', 'Netlify'],
				date: '2024-01-30',
				comment: 'Vue.js Member，前端大手子。',
			},
		],
	},
	// #endregion
] satisfies FeedGroup[]
