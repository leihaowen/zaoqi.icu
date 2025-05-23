# GitHub Pages 部署修复说明

## 🐛 问题描述

在GitHub Pages部署后，网站虽然可以访问，但静态资源（字体文件.woff2和JavaScript文件.js）返回404错误，导致页面样式和功能异常。

## 🔍 问题原因

**错误的basePath配置**：
```javascript
// 错误配置
basePath: process.env.NODE_ENV === 'production' ? '/negotiation-prep' : '',
```

**实际仓库名**：`zaoqi.icu`

GitHub Pages的URL结构是：`https://用户名.github.io/仓库名/`
所以正确的basePath应该是 `/zaoqi.icu`

## ✅ 解决方案

### 修复next.config.js
```javascript
// 正确配置
basePath: process.env.NODE_ENV === 'production' ? '/zaoqi.icu' : '',
```

### 修复后的完整配置
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/zaoqi.icu' : '',
}

module.exports = nextConfig
```

## 🚀 部署步骤

1. **提交修复**：
   ```bash
   git add next.config.js
   git commit -m "fix: 修复GitHub Pages静态资源路径问题"
   git push
   ```

2. **等待自动部署**：
   - GitHub Actions会自动触发
   - 重新构建并部署到GitHub Pages

3. **验证修复**：
   - 访问：https://leihaowen.github.io/zaoqi.icu/
   - 检查开发者工具，确认静态资源正常加载

## 📋 验证清单

部署完成后，请检查：
- [ ] 页面样式正常显示
- [ ] JavaScript功能正常工作
- [ ] 字体文件正确加载
- [ ] 所有步骤页面可以正常访问
- [ ] 导出功能正常工作

## 🔧 技术说明

### basePath的作用
- 告诉Next.js应用部署在子路径下
- 确保所有静态资源使用正确的前缀
- 影响路由、静态文件、图片等的URL生成

### GitHub Pages URL结构
```
https://用户名.github.io/仓库名/
https://leihaowen.github.io/zaoqi.icu/
```

### 资源URL示例
修复前（错误）：
```
https://leihaowen.github.io/negotiation-prep/_next/static/...
```

修复后（正确）：
```
https://leihaowen.github.io/zaoqi.icu/_next/static/...
```

## 🎯 预期结果

修复后，网站应该：
1. 完全正常加载和显示
2. 所有交互功能正常工作
3. 样式和字体正确渲染
4. 8个步骤页面都可以正常访问

---

**修复完成后，你的谈判准备工具将完全可用！** 🎉