# 数据库设置和管理

## 概述

本项目已成功从静态文件存储迁移到PostgreSQL数据库存储。文章数据现在存储在Supabase数据库中。

## 数据库连接

- **数据库**: PostgreSQL (Supabase)
- **连接字符串**: `postgresql://postgres.arezgybbrvuverzfevxk:young@905906@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`

## 表结构

### articles 表

```sql
CREATE TABLE articles (
  id VARCHAR(255) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  readtime VARCHAR(255) NOT NULL,
  views VARCHAR(255) NOT NULL,
  comments VARCHAR(255),
  author_name VARCHAR(255) NOT NULL,
  author_bio TEXT NOT NULL,
  author_avatar VARCHAR(255) NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 数据库函数

### 获取文章数据

- `getArticles()`: 获取所有文章，按创建时间降序排列
- `getArticleBySlug(slug)`: 根据slug获取单篇文章
- `getFeaturedArticle()`: 获取特色文章
- `getArticlesByCategory(category)`: 根据分类获取文章
- `getRelatedArticles(currentSlug, limit)`: 获取相关文章

## 迁移脚本

### 初始迁移

运行以下命令来创建表并导入初始数据：

```bash
npm run migrate
```

此命令将：
1. 创建 `articles` 表
2. 导入现有的文章数据
3. 设置正确的数据结构

## 添加新文章

要添加新文章，你需要直接在数据库中插入数据。推荐使用Supabase管理面板或者创建专门的管理脚本。

### 示例插入语句

```sql
INSERT INTO articles (
  id, slug, title, excerpt, content, date, category, readtime, views, comments,
  author_name, author_bio, author_avatar, tags, featured
) VALUES (
  '4',
  'your-article-slug',
  '文章标题',
  '文章摘要',
  '文章完整内容（Markdown格式）',
  '2025年1月2日',
  '行业洞察',
  '8分钟',
  '0',
  null,
  '张紫琪 (KIKI)',
  '广东顺佳兴不锈钢有限公司创始人，13年不锈钢行业经验',
  '/kiki-profile.jpg',
  '["标签1", "标签2", "标签3"]',
  false
);
```

## 数据字段说明

- `id`: 文章唯一标识符
- `slug`: URL友好的文章标识，用于路由
- `title`: 文章标题
- `excerpt`: 文章摘要，用于列表页展示
- `content`: 文章完整内容，支持Markdown格式
- `date`: 发布日期（字符串格式）
- `category`: 文章分类
- `readtime`: 预计阅读时间
- `views`: 浏览量
- `comments`: 评论数（可选）
- `author_name`: 作者姓名
- `author_bio`: 作者简介
- `author_avatar`: 作者头像路径
- `tags`: 文章标签（JSON数组格式）
- `featured`: 是否为特色文章（布尔值）

## 注意事项

1. **备份**: 在修改数据前请确保有适当的备份
2. **权限**: 确保只有授权用户能够修改数据库
3. **验证**: 添加新文章后，验证网站功能正常
4. **缓存**: Next.js使用静态生成，可能需要重新构建以显示新内容

## 故障排除

如果遇到数据库连接问题：

1. 检查网络连接
2. 验证数据库凭据
3. 确认Supabase服务状态
4. 检查SSL连接设置 