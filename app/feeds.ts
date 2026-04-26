import type { FeedGroup } from '../app/types/feed'
import { myFeed } from '../blog.config'
import { getFavicon, getGhAvatar, getGhIcon, getOicqAvatar, OicqAvatarSize } from './utils/img'

export default [
	{
		name: '相谈甚多',
		desc: '社区伙伴/线下好友，高度相似的爱好和品味',
		entries: [
			{
				author: '纸鹿本鹿',
				title: '纸鹿摸鱼处',
				desc: '纸鹿至麓不知路，支炉制露不止漉',
				link: 'https://blog.zhilu.site/',
				avatar: 'https://www.zhilu.site/api/avatar.png',
				icon: getFavicon('blog.zhilu.site'),
				date: '2026-02-07',
				feed: 'https://blog.zhilu.site/atom.xml',
				comment: '本博客主题作者，专注用户体验，细节狂魔',
				archs: ['Nuxt', 'Vercel'],
				sitenick: '摸鱼处',
			},
			{
				author: 'kzhik',
				title: 'kzhik’s website',
				desc: 'EXPLORE THE WORLD!',
				link: 'https://www.kzhik.cn',
				avatar: 'https://www.kzhik.cn/avatar.webp',
				icon: getFavicon('www.kzhik.cn'),
				date: '2026-02-07',
				feed: 'https://www.kzhik.cn/resources/rss.xml',
			},
			{
				author: '云森🍥🍥🍥',
				title: 'Yunsen的小窝',
				desc: '行之，皆为乐意',
				link: 'https://blog.imysen.com/',
				avatar: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01TWOpM42DSyY5nC0hM_!!0-mtopupload.jpg',
				icon: getFavicon('blog.imysen.com'),
				date: '2026-04-10',
				feed: 'https://blog.imysen.com/feed/',
			},
		],
	},
	{
		name: '网上邻居',
		desc: '哔——啵——电波通讯中，欢迎常来串门。',
		entries: [
			{
				author: 'Nahida',
				title: 'Nahida的个人网站',
				desc: '为世界上一切美好而战！',
				link: 'https://nahida.im/',
				avatar: 'https://nahida.im/profile.png',
				icon: 'https://nahida.im/favicon.ico',
				date: '2026-02-07',
				feed: 'https://nahida.im/rss.xml',
				comment: '社区内活跃成员，曾经搞崩过群组',
				archs: ['Astro'],
			},
			{
				author: '张洪Heo',
				desc: '分享设计与科技生活',
				link: 'https://blog.zhheo.com/',
				avatar: 'https://img.zhheo.com/i/67d8fa75943e4.webp',
				icon: getFavicon('blog.zhheo.com'),
				date: '2026-02-07',
				feed: 'https://blog.zhheo.com/rss.xml',
				comment: '专业设计师，其博客风格被众多博主参考',
			},
		],
	},
] satisfies FeedGroup[]
