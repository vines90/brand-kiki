# 内容管理系统使用指南

## 概述

KIKI品牌网站的内容管理系统提供了完整的文章和图片管理功能，支持通过Web界面进行内容的创建、编辑、删除和管理。

## 功能特性

### 🔐 安全认证
- JWT token认证机制
- 角色权限控制（admin/editor）
- 会话管理和自动登出

### 📝 文章管理
- 支持Markdown格式编写
- 实时预览功能
- 文章分类和标签管理
- 特色文章设置
- 自动生成URL slug
- 阅读时间计算

### 🖼️ 图片管理
- 文件上传和存储
- 图片分类管理（产品/工厂/文章/其他）
- 图片信息编辑
- 批量管理功能

### 🎨 用户界面
- 现代化响应式设计
- 深色模式支持
- 流畅的动画效果
- 直观的操作体验

## 系统访问

### 登录地址
```
https://yourdomain.com/admin/login
```

### 默认账户
- **用户名**: `admin`
- **密码**: `admin123456`

> ⚠️ **重要**: 首次登录后请立即修改默认密码！

## 使用指南

### 1. 登录系统

1. 访问 `/admin/login` 页面
2. 输入用户名和密码
3. 点击"登录"按钮
4. 成功后自动跳转到管理后台

### 2. 文章管理

#### 创建新文章
1. 在管理后台点击"文章管理"
2. 点击"新建文章"按钮
3. 填写文章信息：
   - **标题**: 文章标题
   - **URL Slug**: 文章URL标识符（可自动生成）
   - **摘要**: 文章简要描述
   - **内容**: 使用Markdown格式编写
   - **分类**: 选择文章分类
   - **标签**: 用逗号分隔的标签
   - **特色文章**: 是否设为特色文章
4. 使用"预览"功能查看效果
5. 点击"保存"完成创建

#### Markdown语法支持
```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*

[链接文本](https://example.com)
![图片描述](图片URL)

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

| 表格标题1 | 表格标题2 |
|-----------|-----------|
| 单元格1   | 单元格2   |

> 引用文本

`内联代码`

```代码块```
```

#### 管理现有文章
- **查看**: 文章列表显示标题、分类、日期等信息
- **编辑**: 点击编辑图标修改文章
- **删除**: 点击删除图标（需确认）

### 3. 图片管理

#### 上传图片
1. 切换到"图片管理"标签
2. 点击"上传图片"按钮
3. 选择要上传的图片文件
4. 设置图片信息：
   - **分类**: product/factory/article/other
   - **描述**: 图片描述信息
   - **Alt文本**: 图片替代文本
5. 完成上传

#### 图片分类
- **product**: 产品展示图片
- **factory**: 工厂设施图片
- **article**: 文章配图
- **other**: 其他用途图片

#### 管理图片
- **浏览**: 网格形式展示所有图片
- **筛选**: 按分类筛选图片
- **删除**: 删除不需要的图片

### 4. 用户管理

#### 角色说明
- **admin**: 管理员，拥有所有权限
- **editor**: 编辑者，可管理文章和图片

#### 权限控制
- 所有管理功能都需要登录认证
- API接口基于JWT token验证
- 角色权限自动检查

## 技术架构

### 后端API
- `/api/auth/login` - 用户登录
- `/api/admin/articles` - 文章管理CRUD
- `/api/admin/images` - 图片管理CRUD
- `/api/admin/upload` - 文件上传

### 数据库表结构

#### articles表
```sql
CREATE TABLE articles (
  id VARCHAR(255) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  category VARCHAR(100),
  readtime VARCHAR(50),
  views VARCHAR(50),
  comments VARCHAR(50),
  author_name VARCHAR(255),
  author_bio TEXT,
  author_avatar VARCHAR(500),
  tags JSON,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### images表
```sql
CREATE TABLE images (
  id VARCHAR(255) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  category VARCHAR(50) DEFAULT 'other',
  description TEXT,
  alt_text VARCHAR(255),
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### users表
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'editor',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 部署和维护

### 环境变量
```env
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 初始化脚本
```bash
# 运行数据库迁移
npm run db:migrate

# 设置管理后台
npm run admin:setup
```

### 备份建议
1. 定期备份数据库
2. 备份上传的图片文件
3. 保存环境配置

### 安全建议
1. 修改默认管理员密码
2. 使用强JWT密钥
3. 启用HTTPS
4. 定期更新依赖包
5. 监控登录日志

## 故障排除

### 常见问题

#### 1. 无法登录
- 检查用户名和密码
- 确认数据库连接正常
- 检查JWT配置

#### 2. 图片上传失败
- 检查文件大小限制（默认10MB）
- 确认uploads目录权限
- 检查磁盘空间

#### 3. 文章保存失败
- 检查必填字段
- 确认数据库连接
- 检查slug是否重复

#### 4. 样式显示异常
- 清除浏览器缓存
- 检查CSS文件加载
- 确认主题设置

### 日志查看
```bash
# 查看应用日志
npm run dev

# 查看数据库日志
# 根据数据库类型查看相应日志
```

## 更新和扩展

### 功能扩展建议
1. 图片编辑功能
2. 批量操作
3. 内容搜索
4. 版本控制
5. 评论管理
6. SEO优化工具

### 自定义开发
- 修改UI样式：编辑Tailwind CSS类
- 添加新功能：扩展API和页面组件
- 数据库扩展：修改表结构和模型

## 联系支持

如有技术问题或功能建议，请联系开发团队。

---

**最后更新**: 2025年1月
**版本**: 1.0.0 