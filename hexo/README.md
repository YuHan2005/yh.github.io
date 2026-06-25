# 个人博客（Hexo）

基于 [Hexo 8](https://hexo.io/) 的静态博客，使用 `landscape` 主题，构建后通过 `hexo-deployer-git` 部署到 GitHub Pages 的 `gh-pages` 分支。

线上地址：<https://cocla009.github.io/yh.github.io/>

## 项目架构

```
hexo/
├── _config.yml          # Hexo 全局配置（站点信息、URL、部署等）
├── _config.landscape.yml # landscape 主题配置
├── package.json         # 依赖与 npm 脚本
├── scaffolds/           # 新建内容的模板
│   ├── post.md          #   hexo new post 使用
│   ├── page.md          #   hexo new page 使用
│   └── draft.md         #   hexo new draft 使用
├── source/              # 源内容（你主要编辑这里）
│   └── _posts/          #   Markdown 文章
├── themes/              # 本地主题目录（landscape 由 npm 依赖提供）
├── public/              # hexo generate 生成的静态站点（不纳入版本控制）
├── db.json              # 渲染缓存（不纳入版本控制）
├── .deploy_git/         # 部署用的临时 git 仓库（不纳入版本控制）
└── .github/
    └── dependabot.yml   # 每日检查 npm 依赖更新
```

工作流概览：在 `source/_posts/` 写 Markdown → `hexo generate` 渲染为 `public/` 下的静态 HTML → `hexo deploy` 推送到 `gh-pages` 分支供 GitHub Pages 托管。

### 核心依赖

| 依赖 | 作用 |
| --- | --- |
| `hexo` | 核心框架 |
| `hexo-theme-landscape` | 默认主题 |
| `hexo-renderer-marked` | Markdown 渲染 |
| `hexo-renderer-ejs` | EJS 模板渲染 |
| `hexo-renderer-stylus` | Stylus 样式渲染 |
| `hexo-generator-index` / `-archive` / `-category` / `-tag` | 首页、归档、分类、标签页生成 |
| `hexo-server` | 本地预览服务器 |
| `hexo-deployer-git` | 部署到 Git 仓库（GitHub Pages） |

## 配置

### 站点配置（`_config.yml`）

部署前请按需修改以下字段：

```yaml
# 站点信息
title: Hexo            # 站点标题
subtitle: ''           # 副标题
description: ''         # 站点描述
author: John Doe       # 作者名
language: en           # 语言，如改为 zh-CN

# URL —— 部署到 GitHub Pages 时务必设置正确
url: https://cocla009.github.io/yh.github.io/
permalink: :year/:month/:day/:title/

# 首页每页文章数
index_generator:
  per_page: 10

# 主题
theme: landscape
```

### 部署配置（`_config.yml` 末尾）

```yaml
deploy:
  type: git
  repository: git@github.com:YuHan2005/yh.github.io.git  # 目标仓库（请改为你自己的）
  branch: gh-pages                                       # 发布分支
```

> 使用 SSH 地址部署需先配置好 GitHub SSH key；若用 HTTPS，请将 `repository` 改为 `https://github.com/<用户名>/<仓库>.git`。

### 主题配置

主题相关样式、菜单、社交链接等在 `_config.landscape.yml` 中调整。

## 使用

### 1. 安装依赖

```bash
# 全局安装 Hexo CLI（首次使用）
npm install -g hexo-cli

# 在 hexo/ 目录下安装项目依赖
npm install
```

### 2. 本地预览

```bash
npm run server          # 等价于 hexo server，默认 http://localhost:4000
```

### 3. 写文章

```bash
hexo new post "文章标题"   # 在 source/_posts/ 下生成 Markdown 文件
hexo new draft "草稿标题"  # 生成草稿，默认不渲染
hexo new page "关于"       # 生成独立页面
```

文章顶部的 Front-matter 示例：

```yaml
---
title: 文章标题
date: 2026-06-25 12:00:00
tags: [标签1, 标签2]
categories: [分类]
---
```

### 4. 生成静态文件

```bash
npm run clean           # hexo clean，清除缓存 db.json 和 public/
npm run build           # hexo generate，生成静态站点到 public/
```

### 5. 部署到 GitHub Pages

```bash
npm run deploy          # hexo deploy，推送 public/ 到 gh-pages 分支
```

常用一条龙命令：

```bash
hexo clean && hexo generate && hexo deploy
```

## npm 脚本速查

| 命令 | 等价 Hexo 命令 | 说明 |
| --- | --- | --- |
| `npm run server` | `hexo server` | 启动本地预览服务器 |
| `npm run build` | `hexo generate` | 生成静态文件到 `public/` |
| `npm run clean` | `hexo clean` | 清除缓存与已生成文件 |
| `npm run deploy` | `hexo deploy` | 部署到配置的 Git 仓库 |
