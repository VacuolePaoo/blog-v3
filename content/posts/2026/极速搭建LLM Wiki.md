---
title: 快速搭建LLM Wiki
description: 传统知识库需要不断维护，而LLM Wiki可以让AI把活都干了。本文将从零开始搭建一套LLM Wiki，让AI自动维护一个不断生长的知识网络。
date: 2026-07-16 20:43:16
updated: 2026-07-16 20:43:16
image: https://file.vacu.top/file/1784206299288_Frame_1__3_.png
permalink: /posts/3ac1b71
categories: [技术]
tags: [知识库, AI, 工作流]
---

你在网上冲浪的时候看到了很多“以后用得上”的视频、文章、教程。然后你让它们在收藏夹里吃灰，再也没回去看过。

又或者你已经有一个知识库，但是文件堆积成山，想找的时候找不到。

你或许需要LLM Wiki——你只需要收集收集知识，AI负责把这些整理成知识网络。

## 什么是LLM Wiki

~~编者的话 知识库的历史 知识库的发展~~

这是Andrej Karpathy提出的方法论，发布在了GitHub Gist上：

::link-card
---
title: Gist原文
description: karpathy/llm-wiki.md
link: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
---
::

这不是一个软件或者平台，而是一种使用大模型维护知识库的思路：

把原始材料交给LLM，执行摄取工作流后，LLM会把其中的知识拆分为独立的Wiki页面，并且给所有有关联的页面建立链接。

## 与RAG对比

RAG知识库并不会对原始内容有任何分析，只是把文档切分chunk之后建立embedding。RAG方案在查询时现场检索文件，再次查询相同内容时仍会重新检索一遍，不会产生积累。

LLM Wiki则会提前处理资料，将原始内容拆碎，形成结构化的transformer页面，查询过程中产生的有价值内容会持续积累到知识库中。

但是，在资料数量特别大，或内容很杂的情况下，RAG仍是最优解。LLM Wiki更适合长期积累，并且内容是特定领域的情况。

## 需要准备的

- 有网络连接的配置不那么低的电脑
- Obsidian：查看与编辑markdown文件，同时支持wiki链接和知识图谱
- [Obsidian Web Clipper](https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf)：Obsidian配套浏览器拓展，将网页文章摄取到vault
- Git：版本管理，如果AI产生了错误修改，可以直接回滚
- Agent：Codex、Claude、Buddy均可，是LLM Wiki的关键

