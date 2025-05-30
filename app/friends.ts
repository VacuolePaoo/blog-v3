import type { FeedGroup } from "~/types/feed";
import { getGhAvatar } from "./utils/img";

export default [
    {
        name: "相谈甚多",
        desc: "",
        entries: [
            {
                author: "Nahida",
                sitenick: "Buer",
                title: "纳西妲Nahida",
                desc: "为世界上一切美好而战！",
                link: "https://nahida.im",
                feed: "https://nahida.im/rss.xml",
                icon: "https://nahida.im/favicon.ico",
                avatar: "https://nahida.im/profile.png",
                archs: ["Astro", "Cloudflare"],
                date: "2025-05-30",
                comment: "社群中的活跃成员，开源爱好者，曾经给DC社群弄炸过一次"
            },
            // {
            //     author: "GuuGuai",
            //     sitenick: "杂记本",
            //     title: "古怪杂记本",
            //     desc: "一个什么都可能会写的博客",
            //     link: "https://gug.thisis.host/",
            //     feed: "https://gug.thisis.host/atom.xml",
            //     icon: "https://unavatar.webp.se/gug.thisis.host?w",
            //     avatar:
            //         "https://cdn.libravatar.org/avatar/646331bff8f19a0e05679c3cc0fc54d6?s=160",
            //     archs: ["Hexo", "Netlify"],
            //     date: "2024-01-29",
            //     comment: "高中同学，技术好友，爱好番剧/折腾。",
            // },
        ],
    },
    {
        name: "网上邻居",
        desc: "哔——啵——电波通讯中，欢迎常来串门。",
        entries: [
            {
                author: "张洪Heo",
                desc: "分享设计与科技生活",
                link: "https://blog.zhheo.com/",
                feed: "https://blog.zhheo.com/atom.xml",
                icon: "https://blog.zhheo.com/img/favicon4.0.webp",
                avatar: "https://bu.dusays.com/2022/12/28/63ac2812183aa.png",
                archs: ["Hexo", "国内 CDN"],
                date: "2024-02-02",
                comment: "知名博主|设计师，其博客设计风格被众多博主借鉴",
            },
        ],
    },
] satisfies FeedGroup[];
