# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

这是一个基于 **Nuxt 4 + Vue 3 + TypeScript** 的个人博客，内容层使用 **Nuxt Content 3 / MDC**，客户端状态使用 **Pinia**，样式使用 **SCSS**。项目同时支持 SSR 构建，但 README 推荐以 `nuxt generate` 进行静态生成（SSG）部署。

运行环境由 `package.json` 约束为 Node.js `^22.5 || ^23.6 || >=24`、pnpm `>=10`；仓库声明的包管理器版本为 pnpm 11.8.0。依赖版本集中维护在 `pnpm-workspace.yaml` 的 catalogs 中，`package.json` 通过 `catalog:*` 引用；部分依赖还应用了 `patches/` 下的 pnpm 补丁。

## 常用命令

```sh
pnpm install          # 安装依赖；prepare 生命周期会清理缓存并运行 nuxt prepare
pnpm dev              # 启动开发服务器并打开浏览器
pnpm dev:host         # 启动可从局域网访问的开发服务器
pnpm lint             # 依次运行 ESLint 和 Vue/SCSS Stylelint
pnpm lint:fix         # 自动修复 ESLint 和 Stylelint 问题
pnpm build            # 构建 Nuxt SSR 产物
pnpm generate         # 静态生成站点；部署首选方式
pnpm preview          # 预览构建/静态生成结果
pnpm clean            # 清理 .data 和 node_modules/.cache
pnpm new              # 交互式创建 content/posts/<year>/ 下的文章
pnpm check:feed       # 交互式检查一个友链或 URL
pnpm check:feed/all   # 检查全部友链并生成报告
```

只检查单个文件时可直接调用底层工具：

```sh
pnpm exec eslint app/pages/index.vue
pnpm exec stylelint app/components/post/Article.vue
```

仓库当前没有测试运行器、测试脚本或测试文件，因此没有“运行全部测试”或“运行单个测试”的命令。验证代码改动时至少运行 `pnpm lint`；涉及内容查询、Nuxt 配置或生成流程时再运行 `pnpm generate`。

不要把 `pnpm init-project` 当作常规初始化命令：它会在交互确认后删除现有 `content/`，重写博客配置和重定向，仅供首次 Fork 后清除上游内容时使用。

## 配置分层

- `blog.config.ts` 是构建期和客户端共用的静态博客配置：站点元数据、作者、文章分类/版式、订阅源、统计排除项和第三方脚本等。服务端路由也直接读取它。
- `app/app.config.ts` 通过 `defineAppConfig` 将 `blogConfig` 展开后，补充可由前端响应式读取的 UI 配置，例如导航、页脚、组件选项、分页和主题。
- `nuxt.config.ts` 负责 Nuxt 模块、全局样式、SEO、Nitro 预渲染/路由规则、Markdown 插件和 Content 解析钩子。
- `content.config.ts` 定义唯一的 `content` page collection，以及文章 frontmatter 的 Zod schema。新增 frontmatter 字段时应同步更新 `ArticleSchema` 和 `articleSchema`。

`~` / `@` 指向 `app/`，`~~` / `@@` 指向仓库根目录。Vue 组件、Nuxt composables 和 `app/composables` 中的函数主要依赖 Nuxt 自动导入。

## 内容与路由数据流

文章位于 `content/posts/<year>/`，未发布的预览内容位于 `content/previews/`，`content/link.md` 和 `content/theme.md` 是普通内容页面。`scripts/new-blog.ts` 根据 `blog.config.ts` 的分类、版式和 `useRandomPremalink` 配置生成新文章 frontmatter。

Nuxt Content 的解析钩子位于 `nuxt.config.ts`：

1. frontmatter 存在 `permalink` 时，将其设为最终内容路径。
2. 否则，当 `article.hidePostPrefix` 开启时，从基于文件生成的文章 URL 中去掉 `/posts` 前缀。

前端的主要读取流程是：

- `app/pages/index.vue`、`archive.vue` 和 `preview.vue` 通过 `getArticleIndexOptions()` 查询文章元数据，再由 `useArticleSort`、`useCategory`、`usePagination` 在客户端排序、筛选和分页。
- `app/pages/[...slug].vue` 是正文和内容 404 的兜底路由，通过最终 URL path 查询 collection，并用 `ContentRenderer` 渲染 MDC。
- `app/pages/link.vue` 将 `app/feeds.ts` 中的结构化友链和 `content/link.md` 组合成友链页。
- 搜索弹窗使用 `queryCollectionSearchSections` 取得全文索引，再由 MiniSearch 在客户端执行模糊搜索。

`remark-plugins/remark-music.ts` 把 `music-abc` 代码块转为音乐组件；`remark-plugins/rehype-meta-slots.ts` 抽取顶层 `<meta-*>` 内容，文章页随后可通过 `useWidgets` 将 `meta-aside-*` 渲染到侧栏。`app/components/content/` 中的组件是供 MDC 正文使用的自定义内容组件。

## 前端组织

`app/layouts/default.vue` 定义了侧栏、正文和右侧 aside 的整体布局。页面通过命名的 `#aside` 模板插入页面级小组件；移动端的侧栏、aside、搜索和灯箱状态统一由 `app/stores/layout.ts` 管理，搜索状态位于 `app/stores/search.ts`。

组件按职责分组：

- `components/blog/`：站点壳层、侧栏、页脚和面板。
- `components/post/`：文章卡片、正文头尾、归档项和上下篇。
- `components/content/`：MDC/Markdown 渲染组件。
- `components/widget/`：右侧栏小组件。
- `components/partial/`：通用微型组件；`nuxt.config.ts` 为该目录配置了 `Z` 前缀（例如 `Button.vue` 自动导入为 `ZButton`）。

全局 SCSS 入口在 `nuxt.config.ts` 的 `css` 数组中；`app/assets/css/_variable.scss` 由 Vite `additionalData` 自动注入所有 SCSS style block，无需重复 `@use`。

## Nitro 与静态生成

`server/api/stats.get.ts` 从 Content collection 计算文章、字数、年份、分类和标签统计。`server/routes/atom.xml.get.ts` 生成 Atom，`server/routes/subscriptions.opml.get.ts` 根据 `app/feeds.ts` 生成 OPML。`nuxt.config.ts` 的 `routeRules` 会预渲染这些端点并应用 `redirects.json` 中的 308 重定向。

`modules/anti-mirror/` 是本地 Nuxt 模块，用于在客户端识别黑名单镜像域名并跳回 `blog.config.ts` 配置的正式站点。

## 代码风格

ESLint 基于 `@antfu/eslint-config`，TypeScript、Vue 模板和 SCSS 均使用 Tab 缩进；Vue `<script>` 使用 TypeScript，`<style>` 使用 SCSS。Stylelint 规则来自 `@zinkawaii/stylelint-config`。修改依赖时保留 pnpm catalog 和 `patchedDependencies` 结构，不要将 catalog 依赖改成散落在 `package.json` 中的独立版本号。
