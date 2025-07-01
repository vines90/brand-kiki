const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://postgres.arezgybbrvuverzfevxk:young@905906@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
})

// 直接定义文章数据，避免import问题
const articles = [
  {
    id: "3",
    slug: "stainless-steel-decorative-board-industry-insights-2025",
    title: "不锈钢装饰板行业深度洞察：技术创新驱动下的市场变革与发展趋势",
    excerpt: "全面分析2025年不锈钢装饰板行业发展态势，深入解读技术创新、市场驱动因素、竞争格局变化及未来5年投资机遇，为行业从业者提供专业洞察。",
    content: "# 不锈钢装饰板行业深度洞察：技术创新驱动下的市场变革与发展趋势\n\n## 一、引言\n\n站在2025年的时间节点，回望过去、展望未来，不锈钢装饰板行业正处在一个充满机遇与挑战并存的关键时期。不锈钢装饰板已成为现代建筑不可或缺的重要组成部分，其地位体现在多个维度：\n\n- **美学角度**：拉丝、镜面、镀钛等多样化表面工艺为建筑师和设计师提供丰富创作素材，无论是摩天大楼外立面幕墙，还是高端商业空间室内装饰，都能呈现独特的现代感和艺术感。\n- **功能角度**：卓越的耐腐蚀、耐磨、耐候性能显著延长建筑使用寿命，降低后期维护成本，契合可持续发展需求。\n\n面对市场需求多元化、技术迭代加速、国际竞争加剧，行业从业者亟需更深入的市场洞察和前瞻性思考。本文旨在为建筑师、室内设计师、工程采购商及行业同仁提供全面、专业的行业分析报告，通过市场趋势剖析、技术革新展示和发展前景预判，助力把握机遇、应对挑战，共同推动行业迈向美好未来。",
    date: "2025年1月1日",
    category: "行业深度分析",
    readTime: "15分钟",
    views: "1.2K",
    comments: "45",
    author: {
      name: "张紫琪 (KIKI)",
      bio: "广东顺佳兴不锈钢有限公司创始人，13年不锈钢行业经验",
      avatar: "/kiki-profile.jpg"
    },
    tags: ["行业洞察", "技术创新", "市场分析", "发展趋势", "投资机会"],
    featured: true
  },
  {
    id: "1",
    slug: "stainless-steel-industry-trends-2024",
    title: "2024年不锈钢行业发展趋势与机遇",
    excerpt: "深度分析2024年不锈钢行业的发展趋势，从市场需求、技术创新到政策导向，为行业从业者提供前瞻性洞察。",
    content: "## 引言\n\n2024年，不锈钢行业正站在一个重要的转折点。随着全球经济复苏、绿色发展理念深入人心，以及新兴应用领域的不断涌现，不锈钢行业面临着前所未有的发展机遇与挑战。\n\n## 市场需求分析\n\n### 建筑装饰市场持续增长\n\n建筑装饰领域仍是不锈钢消费的主力军：\n\n- **高端住宅**：豪华住宅对不锈钢装饰板材需求激增\n- **商业空间**：购物中心、酒店对镜面、彩色不锈钢需求旺盛\n- **公共建筑**：地铁站、机场等基础设施建设带动需求",
    date: "2024年12月15日",
    category: "行业洞察",
    readTime: "10分钟",
    views: "3.2K",
    comments: "156",
    author: {
      name: "张紫琪 (KIKI)",
      bio: "广东顺佳兴不锈钢有限公司创始人，13年不锈钢行业经验",
      avatar: "/kiki-profile.jpg"
    },
    tags: ["行业趋势", "市场分析", "技术创新", "发展机遇"],
    featured: false
  },
  {
    id: "2",
    slug: "advanced-surface-treatment-techniques",
    title: "不锈钢表面处理工艺的技术突破与应用",
    excerpt: "深入解析最新的不锈钢表面处理技术，包括激光蚀刻、PVD涂层、纳米处理等前沿工艺的原理、优势和实际应用案例。",
    content: "## 技术概述\n\n不锈钢表面处理技术是决定产品最终品质和应用价值的关键环节。经过多年的技术积累和创新，我们在表面处理领域取得了重要突破，形成了完整的技术体系。\n\n## 激光蚀刻技术\n\n### 技术原理\n\n激光蚀刻技术利用高能激光束在不锈钢表面进行精密加工，通过控制激光功率、速度和脉冲频率，可以实现各种复杂图案和纹理的制作。",
    date: "2024年11月28日",
    category: "技术分析",
    readTime: "8分钟",
    views: "2.8K",
    comments: "89",
    author: {
      name: "张紫琪 (KIKI)",
      bio: "广东顺佳兴不锈钢有限公司创始人，13年不锈钢行业经验",
      avatar: "/kiki-profile.jpg"
    },
    tags: ["表面处理", "激光技术", "PVD涂层", "工艺创新"],
    featured: false
  }
]

async function createTable() {
  const client = await pool.connect()
  try {
    // 创建articles表
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
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
      )
    `)
    
    console.log('Articles table created successfully')
  } finally {
    client.release()
  }
}

async function insertArticles() {
  const client = await pool.connect()
  try {
    // 清空现有数据（如果需要重新导入）
    await client.query('DELETE FROM articles')
    
    // 插入文章数据
    for (const article of articles) {
      await client.query(`
        INSERT INTO articles (
          id, slug, title, excerpt, content, date, category, readtime, views, comments,
          author_name, author_bio, author_avatar, tags, featured
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `, [
        article.id,
        article.slug,
        article.title,
        article.excerpt,
        article.content,
        article.date,
        article.category,
        article.readTime,
        article.views,
        article.comments || null,
        article.author.name,
        article.author.bio,
        article.author.avatar,
        JSON.stringify(article.tags),
        article.featured
      ])
    }
    
    console.log(`Successfully inserted ${articles.length} articles`)
  } finally {
    client.release()
  }
}

async function migrate() {
  try {
    console.log('Starting database migration...')
    await createTable()
    await insertArticles()
    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await pool.end()
  }
}

// 运行迁移
migrate() 