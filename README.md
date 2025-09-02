# KMindLab 个人主页

这是 KMindLab 的官方网站，展示我们的品牌理念和产品。

## 🚀 特性

- **现代化设计**: 使用 Tailwind CSS 构建的响应式界面
- **静态网站**: 基于 Jekyll 构建，快速且安全
- **产品展示**: 专业的产品详情页面
- **SEO 优化**: 内置 SEO 标签和元数据
- **GitHub Pages**: 自动化部署到 GitHub Pages

## 🛠️ 技术栈

- **Jekyll**: 静态网站生成器
- **Tailwind CSS**: 实用优先的 CSS 框架
- **GitHub Actions**: 自动化部署
- **GitHub Pages**: 免费托管

## 📦 项目结构

```
kmindlabs/
├── _config.yml          # Jekyll 配置文件
├── _data/               # 数据文件
│   └── products.yml     # 产品数据
├── _includes/           # 可重用组件
│   ├── header.html      # 网站头部
│   └── footer.html      # 网站底部
├── _layouts/            # 页面布局
│   ├── default.html     # 默认布局
│   ├── page.html        # 页面布局
│   └── product.html     # 产品布局
├── assets/              # 静态资源
│   ├── css/
│   ├── js/
│   └── images/
├── products/            # 产品页面
├── about/               # 关于页面
├── index.html           # 首页
└── 404.html            # 404 页面
```

## 🚀 本地开发

### 前置要求

- Ruby 3.1+
- Node.js 18+
- Bundler
- npm 或 yarn

### 安装依赖

```bash
# 安装 Ruby 依赖
bundle install

# 安装 Node.js 依赖
npm install
```

### 构建样式

```bash
# 构建 Tailwind CSS
npm run build

# 监听样式变化（开发模式）
npm run watch
```

### 启动开发服务器

```bash
# 启动 Jekyll 开发服务器
bundle exec jekyll serve

# 或者使用 npm 脚本
npm run serve
```

访问 `http://localhost:4000` 查看网站。

## 📝 内容管理

### 添加新产品

1. 在 `_data/products.yml` 中添加产品信息
2. 在 `products/` 目录下创建产品详情页面
3. 添加产品图片到 `assets/images/` 目录

### 修改页面内容

- **首页**: 编辑 `index.html`
- **关于页面**: 编辑 `about/index.html`
- **产品页面**: 编辑对应的产品目录下的 `index.html`

## 🚀 部署

### GitHub Pages 自动部署

1. 推送代码到 `main` 分支
2. GitHub Actions 会自动构建和部署
3. 网站将在几分钟内更新

### 手动部署

```bash
# 构建生产版本
JEKYLL_ENV=production bundle exec jekyll build

# 部署 _site 目录到你的服务器
```

## 🎨 自定义样式

项目使用 Tailwind CSS，你可以：

1. 修改 `tailwind.config.js` 自定义主题
2. 在 `assets/css/main.css` 中添加自定义样式
3. 运行 `npm run build` 重新构建样式

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系我们

- 邮箱: contact@kmindlab.com
- GitHub: [@kmindlab](https://github.com/kmindlab)

---

由 ❤️ 和 Jekyll 构建