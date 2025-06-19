# KIKI个人品牌网站

## 背景
KIKI是广东佛山顺佳兴不锈钢企业创始人，需要打造一个个人品牌网站，建立与海外客户的深度信任关系

## 网站结构
1、首屏
名字+身份+个人品牌价值主张+ 个人品牌标签 + 照片

2、关于KIKI
KIKI的创业经历介绍 + 企业/产品理念 + 照片

3、我的行业观点
KIKI发布的专业文章，这是建立信任关系的关键内容。 要有舒适的阅读体验

4、KIKI的企业和产品

5、footer

## 网站UI设计要求
1、色彩要求
    --primary-100:#7b5aa3;
    --primary-200:#ab87d5;
    --primary-300:#ffeaff;
    --accent-100:#dd0025;
    --accent-200:#ffbfab;
    --text-100:#014e60;
    --text-200:#3f7a8d;
    --bg-100:#fbfbfb;
    --bg-200:#f1f1f1;
    --bg-300:#c8c8c8;
      
2、设计风格
1. 使用Bento Grid风格的视觉设计，白底（#fbfbfb）配合青莲紫色#7b5aa3颜色作为高亮
2. 强调超大字体或数字突出核心要点，画面中有超大视觉元素强调重点，与小元素的比例形成反差
3. 中英文混用，中文大字体粗体，英文小字作为点缀
4. 简洁的勾线图形化作为数据可视化或者配图元素
5. 运用高亮色自身透明度渐变制造科技感，但是不同高亮色不要互相渐变
6. 模仿 apple 官网的动效
9. 使用 Framer Motion （通过CDN引入）
10. 使用HTML5、TailwindCSS 3.0+（通过CDN引入）和必要的JavaScript1
11. 使用专业图标库如Font Awesome或Material Icons（通过CDN引入）
      
# 功能要求
1、支持国际化，支持中英文
2、light 和 dark 双主题切换
3、对SEO友好

# 技术框架
1、前端：react
2、后端：node.js + restAPI
3、数据库: supabase
4、部署环境：vercel