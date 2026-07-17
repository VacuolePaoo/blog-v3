import type { FeedGroup } from '../app/types/feed'
// 友链检测 CLI 需要使用显式导入和相对路径
import { myFeed } from '../blog.config'
// eslint-disable-next-line unused-imports/no-unused-imports
import { getFavicon, getGithubAvatar, getGithubIcon, getOciqGroupAvatar, getOicqAvatar, OicqAvatarSize } from './utils/img'

export default [
	// #region 相谈甚多
	{
		name: '相谈甚多',
		desc: '志同道合的网友or现实朋友',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: '纸鹿本鹿',
				sitenick: '摸鱼处',
				title: '纸鹿摸鱼处',
				desc: '纸鹿至麓不知路，支炉制露不止漉',
				link: 'https://blog.zhilu.site/',
				icon: getFavicon('blog.zhilu.site'),
				avatar: 'https://www.zhilu.site/api/avatar.png',
				date: '2026-07-13',
				archs: ['Nuxt', 'Vercel'],
				feed: 'https://blog.zhilu.site/atom.xml',
				comment: '本博客主题作者，前端大手子，细节狂魔'
			},
			{
				author: 'kzhik',
				title: "kzhik's website",
				desc: 'EXPLORE THE WORLD!',
				link: 'https://www.kzhik.cn',
				icon: getFavicon('www.kzhik.cn'),
				avatar: 'https://www.kzhik.cn/avatar.webp',
				date: '2026-07-13',
				feed: 'https://www.kzhik.cn/rss.xml',
			},
			{
				author: '🍥云森',
				sitenick: '小窝',
				title: 'Yunsen的小窝',
				desc: '行之，皆为乐意',
				link: 'https://blog.imysen.com/',
				feed: 'https://blog.imysen.com/feed',
				icon: getFavicon('blog.imysen.com'),
				avatar: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01TWOpM42DSyY5nC0hM_!!0-mtopupload.jpg',
				archs: ['WordPress', '虚拟主机'],
				date: '2025-12-23',
				comment: '喜食鱼板',
			},
			{
				author: "纳西妲",
				sitenick: "Nahida",
				desc: "为世界上一切美好而战！",
				link: "https://nahida.im",
				feed: "https://nahida.im/rss.xml",
				icon: "https://file.vacu.top/file/1783955984304_0c0d9ea21b81a5fa35754edb1c70e1c1e683cda40b7eb999c328c90ed4d9f122.png",
				avatar: "https://file.vacu.top/file/1783955984304_0c0d9ea21b81a5fa35754edb1c70e1c1e683cda40b7eb999c328c90ed4d9f122.png",
				archs: ["Astro", "Netlify"],
				date: "2025-05-30",
			},

		],
	},
	// #endregion
	{
		name: '网上邻居',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: '洪畅',
				title: '洪畅的博客',
				desc: '想，全是问题；做，才有答案。',
				link: 'https://blog.hcbu.cn/',
				icon: 'https://gitee.com/hcbug/picture1/raw/master/20260607223324364.webp',
				avatar: 'https://gitee.com/hcbug/picture1/raw/master/20260607223324364.webp',
				date: '2026-07-13',
				feed: 'https://blog.hcbu.cn/atom.xml',
				sitenick: '已失效',
			},
		],
	}
] satisfies FeedGroup[]
