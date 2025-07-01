# KIKI个人品牌网站

> 张紫琪（KIKI）- 不锈钢行业创新领导者的个人品牌网站

## 项目概述

这是为广东顺佳兴不锈钢有限公司创始人张紫琪（KIKI）打造的个人品牌网站，旨在建立与海外客户的深度信任关系，展示13年不锈钢行业的专业经验和企业成就。

## 特色功能

- 🎨 **现代化设计**: 采用Bento Grid风格，Apple官网级动效体验
- 🌍 **国际化支持**: 中英文双语切换，面向全球客户
- 🌙 **深色模式**: 自适应深色/浅色主题切换
- 📱 **响应式设计**: 完美适配桌面端、平板和移动端
- ⚡ **性能优化**: 基于Next.js的SSG/SSR，SEO友好
- 🎭 **动画效果**: 使用Framer Motion打造流畅的交互体验

## 技术栈

### 前端
- **框架**: Next.js 14 (React 18)
- **样式**: TailwindCSS 3.0+
- **动画**: Framer Motion
- **图标**: Lucide React
- **国际化**: next-i18next
- **语言**: TypeScript

### 数据库
- **数据库**: PostgreSQL (Supabase)
- **ORM**: 原生SQL查询
- **连接池**: pg Pool

### 部署
- **平台**: Vercel
- **CDN**: 全球加速
- **数据库**: Supabase云数据库
- **文件存储**: Vercel Blob存储

## 网站结构

1. **首屏** - 个人品牌展示与核心数据
2. **关于KIKI** - 创业历程与个人故事
3. **企业和产品** - 顺佳兴集团展示
4. **行业观点** - 专业文章与洞察分享
5. **联系方式** - 商务合作联系

## 快速开始

### 安装依赖
```bash
npm install
```

### 环境配置

创建 `.env.local` 文件并添加必要的环境变量：

```env
# Vercel Blob 存储配置
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xW9qyVTstbc7M7Kp_oyqO2xQoOZAec6eWL2yWxsJvcIL2z6"

# 数据库配置（已内置，无需修改）
DATABASE_URL="postgresql://postgres.arezgybbrvuverzfevxk:young@905906@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

### 数据库设置
项目使用PostgreSQL数据库存储文章数据。首次运行需要执行数据库迁移：

```bash
npm run db:migrate
```

此命令将：
- 创建必要的数据库表
- 导入初始文章数据

### 开发环境
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站

### 构建部署
```bash
npm run build
npm start
```

## 项目文件结构

```
├── components/          # React组件
│   ├── Layout.tsx      # 布局组件
│   ├── HeroSection.tsx # 首屏组件
│   ├── AboutSection.tsx # 关于页面组件
│   ├── BusinessSection.tsx # 企业展示组件
│   └── InsightsSection.tsx # 观点分享组件
├── pages/              # Next.js页面
│   ├── _app.tsx       # 应用入口
│   ├── index.tsx      # 首页
├── public/             # 静态资源
│   ├── locales/       # 国际化语言包
│   └── docs/          # 图片资源
├── styles/            # 样式文件
│   └── globals.css    # 全局样式
├── lib/               # 核心库文件
│   └── database.ts    # 数据库连接和查询
├── scripts/           # 脚本文件
│   └── migrate-to-db.js # 数据库迁移脚本
└── docs/              # 项目文档
    └── database-setup.md # 数据库设置说明
```

## 设计系统

### 颜色方案
- **主色调**: 青莲紫 (#7b5aa3)
- **辅助色**: 玫瑰红 (#dd0025)
- **背景色**: 纯净白 (#fbfbfb)
- **文字色**: 深青色 (#014e60)

### 设计风格
- Bento Grid卡片布局
- 超大字体突出重点
- 中英文混合排版
- 渐变色彩营造科技感
- Apple风格的微动效

## 部署说明

项目已配置Vercel自动部署，推送到主分支即可自动构建和发布。

### 环境变量
无需特殊环境变量配置，开箱即用。

## 数据库管理

文章数据现在存储在PostgreSQL数据库中。详细的数据库管理说明请参考：

📖 [数据库设置和管理文档](docs/database-setup.md)

### 常用命令
- `npm run db:migrate` - 运行数据库迁移
- `npm run migrate` - 同上（别名）
- `npm run admin:setup` - 设置管理后台

## 内容管理系统

项目内置了完整的内容管理后台，支持文章和图片的在线管理。

### 🎯 主要功能
- 🔐 **安全认证**: JWT token认证，角色权限控制
- 📝 **文章管理**: Markdown编辑器，实时预览，分类标签
- 🖼️ **图片管理**: 文件上传，分类管理，批量操作
- 🎨 **现代UI**: 响应式设计，深色模式，流畅动画

### 🚀 快速开始
```bash
# 1. 设置管理后台（首次运行）
npm run admin:setup

# 2. 启动开发服务器
npm run dev

# 3. 访问管理后台
open http://localhost:3000/admin/login
```

### 🔑 默认账户
- **登录地址**: `/admin/login`
- **用户名**: `admin`
- **密码**: `admin123456`

> ⚠️ **安全提醒**: 首次登录后请立即修改默认密码！

### ✨ 核心特性
- **Markdown编辑器**: 支持完整Markdown语法，实时预览
- **图文混合**: 支持文章配图和产品/工厂图片管理
- **分类管理**: 技术创新、行业分析、产品展示等分类
- **特色文章**: 可设置特色文章在首页展示
- **SEO优化**: 自动生成SEO友好的URL结构
- **权限控制**: 管理员和编辑者角色权限分离

### 📚 详细文档
完整的使用指南和技术文档请参考：

📖 [内容管理系统使用指南](docs/admin-system.md)
📖 [Vercel Blob存储配置说明](docs/vercel-blob-setup.md)

### 🛡️ 安全特性
- JWT token身份验证
- 密码加密存储（bcrypt）
- 文件上传安全检查
- 角色权限控制
- 会话自动过期

## 许可证

© 2024 广东顺佳兴不锈钢有限公司 - 版权所有

---

**让中国制造更有温度** 🇨🇳 