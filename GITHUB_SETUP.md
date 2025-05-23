# GitHub 发布指南

## 📋 准备工作清单

### ✅ 已完成的准备工作

1. **创建 .gitignore 文件** - 已添加，包含：
   - node_modules/
   - .next/
   - .env*.local
   - 构建产物和临时文件

2. **创建 LICENSE 文件** - 已添加 MIT 许可证

3. **更新 package.json** - 已添加：
   - 项目描述
   - 关键词
   - 作者信息
   - 仓库链接
   - 主页链接
   - 问题反馈链接

4. **README.md** - 已存在完整的项目文档

### 🔧 需要手动完成的步骤

#### 1. 创建 GitHub 仓库
```bash
# 在 GitHub 上创建新仓库
# 仓库名建议：negotiation-prep
# 描述：一个基于 Next.js 14 的专业谈判准备工具
```

#### 2. 初始化 Git 仓库并推送
```bash
# 在项目根目录执行
cd negotiation

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "feat: 初始化谈判准备工具项目

- 实现8步谈判准备流程
- 支持BATNA计算和可视化
- 提供PNG和PDF导出功能
- 完全离线运行，数据本地存储"

# 添加远程仓库（替换为你的实际仓库地址）
git remote add origin https://github.com/yourusername/negotiation-prep.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 3. 更新 package.json 中的链接
在 `package.json` 中更新以下字段为你的实际 GitHub 用户名：
```json
{
  "author": "你的名字",
  "repository": {
    "type": "git",
    "url": "https://github.com/你的用户名/negotiation-prep.git"
  },
  "homepage": "https://github.com/你的用户名/negotiation-prep#readme",
  "bugs": {
    "url": "https://github.com/你的用户名/negotiation-prep/issues"
  }
}
```

#### 4. 设置 GitHub Pages（可选）
如果想要在线演示：
1. 在 GitHub 仓库设置中启用 Pages
2. 选择 GitHub Actions 作为源
3. 创建 `.github/workflows/deploy.yml` 部署配置

#### 5. 添加项目标签和主题
在 GitHub 仓库页面添加标签：
- `nextjs`
- `react`
- `typescript`
- `negotiation`
- `batna`
- `strategy`
- `tailwindcss`
- `zustand`

## 🚀 部署选项

### Vercel 部署（推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 或者直接在 Vercel 网站导入 GitHub 仓库
```

### Netlify 部署
1. 连接 GitHub 仓库到 Netlify
2. 构建命令：`npm run build`
3. 发布目录：`out`（需要在 next.config.js 中添加 `output: 'export'`）

### GitHub Pages 部署
需要添加静态导出配置和 GitHub Actions 工作流。

## 📝 发布后的维护

### 版本管理
```bash
# 发布新版本
npm version patch  # 修复版本 1.0.1
npm version minor  # 功能版本 1.1.0
npm version major  # 重大版本 2.0.0

# 推送标签
git push --tags
```

### 创建 Release
1. 在 GitHub 仓库页面点击 "Releases"
2. 点击 "Create a new release"
3. 选择版本标签
4. 添加发布说明
5. 可以上传构建产物

## 🔒 安全检查

### 环境变量检查
确保没有敏感信息被提交：
- ✅ 无 API 密钥
- ✅ 无数据库连接字符串
- ✅ 无私人配置信息

### 依赖安全
```bash
# 检查依赖漏洞
npm audit

# 修复漏洞
npm audit fix
```

## 📊 项目统计

- **技术栈**: Next.js 14, React 18, TypeScript, TailwindCSS
- **状态管理**: Zustand + Immer
- **图表**: Chart.js
- **导出**: html2canvas + jsPDF
- **代码行数**: 约 2000+ 行
- **组件数量**: 8个步骤组件 + UI组件库

## 🎯 推广建议

1. **技术社区分享**
   - 在掘金、CSDN等平台发布技术文章
   - 分享 BATNA 算法实现
   - 介绍 Next.js 14 最佳实践

2. **产品展示**
   - 录制功能演示视频
   - 制作产品截图
   - 准备在线演示链接

3. **开源社区**
   - 添加 Contributing 指南
   - 设置 Issue 模板
   - 欢迎社区贡献

---

**准备完成后，你的项目就可以成功发布到 GitHub 了！** 🎉