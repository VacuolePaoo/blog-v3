# 液泡部落格 (Vacuole Blog)

> [!NOTE]
> 本博客基于 https://github.com/L33Z22L11/blog-v3/ 开发


一个基于 Nuxt.js 构建的现代化个人博客系统，具有优雅的设计和丰富的功能特性。

## 特性

- 🚀 基于 Nuxt.js 3 构建，享受现代化的开发体验
- 📱 响应式设计，完美适配各种设备
- 🎨 优雅的 UI 设计，支持亮色/暗色主题切换
- 📝 完整的 Markdown 支持，轻松创作内容
- 🔍 内置搜索功能
- 💬 集成 Twikoo 评论系统
- 📊 详细的访问统计和文章统计
- 🗂️ 高级文章归档功能
  - 按年份自动分组
  - 显示年度文章统计
  - 支持按更新时间/发布时间排序
  - 支持文章分类筛选
- 🎯 SEO 优化
  - 自动生成 meta 标签
  - 支持 Open Graph 协议
  - 自定义页面描述
- 📰 RSS 订阅支持
- 🔗 友情链接管理
- 🎈 优雅的动画效果
- 📑 文章目录导航
- 🎯 自定义侧边栏组件

## 技术栈

- **框架**: Nuxt.js 3
- **状态管理**: Pinia
- **样式处理**: SCSS
- **内容管理**: Nuxt Content
- **UI 组件**:
  - Vue Tippy 用于工具提示
  - Shiki 用于代码高亮
- **评论系统**: Twikoo
- **部署**: 支持 Netlify/Vercel 等平台

## 目录结构

```
├── app/                # 主应用目录
│   ├── components/    # Vue 组件
│   │   ├── content/  # 内容相关组件
│   │   ├── partial/  # 部分复用组件
│   │   ├── post/     # 文章相关组件
│   │   └── widget/   # 小部件组件
│   ├── composables/   # 组合式函数
│   ├── pages/        # 页面组件
│   ├── stores/       # Pinia 状态存储
│   └── types/        # TypeScript 类型定义
├── content/          # Markdown 内容
│   ├── posts/       # 博客文章
│   └── previews/    # 预览内容
├── public/          # 静态资源
└── server/          # 服务端接口
```

## 主要功能

### 博客功能
- 文章撰写和管理
  - Markdown 支持
  - 文章元数据管理
  - 阅读时间估算
- 文章分类和标签系统
- 高级文章归档
  - 年份分组
  - 多维度排序
  - 分类筛选
- Twikoo 评论系统集成
- RSS 订阅支持

### 用户界面
- 响应式侧边栏导航
- 动态文章目录
- 暗色/亮色主题切换
- 友情链接页面
- 关于页面
- 流畅的过渡动画
- 自适应布局

### 技术特性
- 完整的 SEO 优化
  - 动态 meta 标签
  - Open Graph 支持
- 图片优化和懒加载
- 代码高亮
- 页面预渲染
- 自定义重定向支持
- TypeScript 类型支持
- 组合式函数（Composables）
- Pinia 状态管理

## 配置说明

主要配置文件：
- `blog.config.ts`: 博客核心配置
- `nuxt.config.ts`: Nuxt.js 配置
- `app.config.ts`: 应用运行时配置

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 部署

项目支持多种部署方式，推荐使用 Netlify 或 Vercel：

1. 将代码推送到 GitHub 仓库
2. 在 Netlify/Vercel 中连接仓库
3. 设置构建命令：`pnpm build`
4. 设置输出目录：`.output/public`
5. 完成部署

## 许可证

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 许可证。

## 致谢

感谢所有为这个项目做出贡献的开发者和用户。如果你喜欢这个项目，欢迎 star 和 fork。

## 更新日志

请查看 [GitHub Releases](https://github.com/vacuole1989/nuxt-blog/releases) 获取详细的更新信息。