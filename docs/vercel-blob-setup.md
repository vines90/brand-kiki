# Vercel Blob 存储配置说明

## 概述

本系统使用 Vercel Blob 存储来管理所有的图片和文档文件，包括：
- 产品图片
- 工厂图片
- 文章配图
- 其他文档

## 环境变量配置

### 1. 创建 .env.local 文件

在项目根目录创建 `.env.local` 文件，并添加以下内容：

```env
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xW9qyVTstbc7M7Kp_oyqO2xQoOZAec6eWL2yWxsJvcIL2z6"
```

### 2. 环境变量说明

- `BLOB_READ_WRITE_TOKEN`: Vercel Blob 存储的读写令牌，用于上传、下载和管理文件

## 使用方式

### 管理后台上传

1. 访问 `/admin/login` 登录管理后台
2. 在"图片管理"选项卡中点击"上传图片"按钮
3. 选择要上传的图片文件（支持多选）
4. 系统会自动：
   - 将文件上传到 Vercel Blob 存储
   - 在数据库中保存文件信息
   - 按类别组织文件（product/factory/article/other）

### API 上传

```javascript
// 创建 FormData
const formData = new FormData()
formData.append('file', file)
formData.append('category', 'product') // 可选：product, factory, article, other

// 上传文件
const response = await fetch('/api/admin/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})

const fileInfo = await response.json()
// fileInfo 包含：filename, original_name, url, file_size, mime_type
```

## 文件组织结构

Vercel Blob 中的文件按以下结构组织：

```
/product/
  ├── timestamp-random.jpg     # 产品图片
  └── timestamp-random.png
/factory/
  ├── timestamp-random.jpg     # 工厂图片
  └── timestamp-random.png
/article/
  ├── timestamp-random.jpg     # 文章配图
  └── timestamp-random.png
/other/
  ├── timestamp-random.pdf     # 其他文档
  └── timestamp-random.jpg
```

## 支持的文件类型

- **图片**: JPEG, PNG, GIF, WebP
- **文档**: PDF
- **大小限制**: 最大 10MB

## 安全特性

1. **身份验证**: 所有上传操作需要有效的 JWT 令牌
2. **文件类型验证**: 只允许指定的文件类型
3. **大小限制**: 防止过大文件上传
4. **文件名混淆**: 使用时间戳和随机字符串生成文件名，防止冲突和猜测

## 数据库集成

上传的文件信息会自动保存到数据库的 `images` 表中：

```sql
CREATE TABLE images (
  id VARCHAR(255) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  alt_text VARCHAR(255),
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 故障排除

### 1. 上传失败

检查以下项目：
- 环境变量 `BLOB_READ_WRITE_TOKEN` 是否正确设置
- 文件大小是否超过 10MB
- 文件类型是否受支持
- 网络连接是否正常

### 2. 图片显示问题

- 确认图片 URL 是否可访问
- 检查浏览器控制台是否有错误
- 验证图片文件是否损坏

### 3. 权限问题

- 确保使用有效的管理员令牌
- 检查令牌是否过期
- 验证用户角色权限

## 最佳实践

1. **图片优化**: 上传前压缩图片以减少存储空间和加载时间
2. **合理分类**: 为图片选择正确的分类以便管理
3. **描述信息**: 为图片添加描述和 Alt 文本以提高可访问性
4. **定期清理**: 定期删除不再使用的图片以节省存储空间

## 开发说明

如果需要修改上传逻辑或添加新的文件类型支持，请编辑：
- `pages/api/admin/upload.ts` - 上传 API
- `pages/api/admin/images.ts` - 图片管理 API
- `lib/database.ts` - 数据库操作函数 