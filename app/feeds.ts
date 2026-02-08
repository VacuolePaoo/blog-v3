// 友链检测 CLI 需要使用显式导入和相对路径
import type { FeedGroup } from '../app/types/feed'
import { myFeed } from '../blog.config'
import { getFavicon, getGhAvatar, getGhIcon, getOicqAvatar, OicqAvatarSize } from './utils/img'

export default [
	{
		name: '优质推荐',
		desc: '拥有优质内容或设计的博客。',
		entries: [
			{
				author: '纸鹿本鹿',
				title: '纸鹿摸鱼处',
				desc: '纸鹿至麓不知路，支炉制露不止漉',
				link: 'https://blog.zhilu.site/',
				avatar: 'https://www.zhilu.site/api/avatar.png',
				date: '2026-02-07',
				icon: getFavicon('blog.zhilu.site'),
				feed: 'https://blog.zhilu.site/atom.xml',
				comment: '本博客主题作者，专注用户体验，细节狂魔',
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
				author: '张洪Heo',
				link: 'https://blog.zhheo.com/',
				desc: '分享设计与科技生活',
				avatar: 'https://img.zhheo.com/i/67d8fa75943e4.webp',
				icon: getFavicon('blog.zhheo.com'),
				date: '2026-02-07',
				feed: 'https://blog.zhheo.com/rss.xml',
				comment: '专业设计师，其博客风格被众多博主参考',
			},
		],
	},
	// #region 网上邻居
	{
		name: '网上邻居',
		desc: '哔——啵——电波通讯中，欢迎常来串门。',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: 'Nahida',
				link: 'https://nahida.im/',
				avatar: 'https://nahida.im/profile.png',
				date: '2026-02-07',
				icon: 'https://nahida.im/favicon.ico',
				title: 'Nahida的个人网站',
				desc: '为世界上一切美好而战！',
				comment: '社区内活跃成员，曾经搞崩过群组',
				feed: 'https://nahida.im/rss.xml',
			},
		],
	},
// #endregion
] satisfies FeedGroup[]
