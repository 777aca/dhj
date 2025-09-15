# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个名为《代号：界》的游戏官网项目，采用传统的静态网站架构，支持PC端和移动端两套页面。

## 项目架构

### 目录结构
- `/` - PC端主页面 (index.html)
- `/mobile/` - 移动端页面 (index.html)
- `/file/` - 静态资源目录
  - `/file/css/` - 样式文件
  - `/file/js/` - JavaScript文件
  - `/file/img/` - 图片资源
  - `/file/data/` - 数据文件
- `/file-business/` - 业务相关静态资源
  - 包含各种尺寸的图片资源（PC端、移动端、下载等）

### 技术栈
- **前端框架**: Vue.js (通过CDN引入)
- **UI组件**: Swiper (轮播图组件)
- **动画库**: WOW.js + Animate.css
- **工具库**: jQuery 1.11.0
- **视频播放**: JSMpeg (移动端)

### 核心文件说明

#### JavaScript架构
- `/file/js/common/` - 公共工具和配置
  - `tools.js` - 工具函数库（防抖、本地存储等）
  - `config.js` - 项目配置（API地址等）
  - `request.js` - 请求封装
  - `jquery1.11.0.js` - jQuery库
- `/file/js/app/` - 应用层代码
  - `index.js` - PC端主页逻辑
  - `index_mob.js` - 移动端主页逻辑
- `/file/js/lib/` - 第三方库文件

#### 响应式设计
项目采用独立的PC端和移动端页面：
- PC端：`/index.html`
- 移动端：`/mobile/index.html`
- 通过meta标签进行设备检测和重定向

## 开发指南

### 本地开发
由于这是静态网站，可以通过以下方式本地开发：
```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 或使用Node.js的http-server
npx http-server . -p 8000
```

### 文件修改注意事项
1. **版本控制**: CSS和JS文件使用版本参数（如 `?v=1757058427274`）进行缓存控制
2. **路径引用**: 注意相对路径的正确性，特别是移动端页面中的 `../file/` 路径
3. **配置修改**: API地址等配置在 `/file/js/common/config.js` 中
4. **双端适配**: 修改功能时需要同时考虑PC端和移动端的实现

### 代码规范
- JavaScript使用严格模式 (`'use strict'`)
- 工具函数统一放在Tools对象中
- 配置信息统一放在CONFIG对象中
- 保持PC端和移动端代码的一致性

### 资源管理
- 图片资源按用途分类存放在不同目录
- 业务相关资源放在 `/file-business/` 目录
- 第三方库文件放在 `/file/js/lib/` 目录
- 样式文件统一放在 `/file/css/` 目录

## 部署说明

这是一个纯静态网站项目，可以直接部署到任何Web服务器或CDN。部署时确保：
1. 所有静态资源路径正确
2. 版本号参数正确更新
3. API配置指向正确的后端地址