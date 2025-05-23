# 彩礼谈判 8 步战前准备 - 前端应用

一个基于 Next.js 14 的专业谈判准备工具，帮助用户在 30 分钟内完成系统性的谈判准备并生成可分享的报告。

## 🎯 产品特色

- **8 步引导式流程**：从目标设定到策略制定的完整准备流程
- **BATNA 科学计算**：自动计算最佳替代方案和谈判底线
- **可视化分析**：价值区间图表、利益相关者分析图
- **离线可用**：所有数据保存在浏览器本地，无需网络连接
- **报告导出**：支持 PNG 长图和 PDF 格式导出
- **移动端友好**：响应式设计，支持手机和平板使用

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: TailwindCSS + shadcn/ui
- **状态管理**: Zustand + Immer
- **数据持久化**: localStorage
- **图表**: Chart.js (react-chartjs-2)
- **导出**: html2canvas + jsPDF
- **图标**: Lucide React

## 📋 功能模块

### 第 1 步：设定谈判目标
- 主要目标设定
- 次要目标管理
- 时间框架规划
- 约束条件识别

### 第 2 步：识别关键议题
- 常见议题快速添加
- 自定义议题创建
- 重要性评级
- 价值区间设定

### 第 3 步：确定价值区间
- 可视化区间展示
- 让步空间分析
- 理想值到底线的完整映射

### 第 4 步：计算 BATNA 方案
- 多方案净价值计算
- 自动识别最佳替代方案
- 谈判底线自动生成
- 安全缓冲设置

### 第 5 步：分析对方情况
- 利益相关者识别
- 影响力和支持度评估
- 痛点和利益诉求分析

### 第 6 步：制定谈判策略
- 谈判方式选择（合作型/竞争型/迁就型）
- 让步模式设定（线性/递减/阶梯）
- 时间策略规划

### 第 7 步：准备开场锚点
- 锚点类型选择
- 首次报价设定
- 理由和依据准备

### 第 8 步：生成完整报告
- 完成度概览
- 准备内容总结
- 多格式导出选项

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发运行
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建部署
```bash
npm run build
npm start
# 或
yarn build
yarn start
```

## 📁 项目结构

```
negotiation/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── step/[id]/         # 步骤页面
│       └── page.tsx
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 基础组件
│   └── steps/            # 8 个步骤组件
├── lib/                  # 工具库
│   ├── store.ts          # Zustand 状态管理
│   ├── utils.ts          # 工具函数
│   └── calc.ts           # BATNA 计算逻辑
├── public/               # 静态资源
└── README.md
```

## 🔧 核心算法

### BATNA 净价值计算
```typescript
netValue = gain - directCost - riskPenalty - switchCost
bestBATNA = max(netValue[])
bottomLine = bestBATNA - overheadBuffer
```

### 数据持久化
使用 Zustand persist 中间件自动将状态保存到 localStorage，确保用户数据不丢失。

## 📊 导出功能

### PNG 长图导出
- 使用 html2canvas 截取完整报告
- 高分辨率输出 (scale = 2)
- 适合社交媒体分享

### PDF 报告导出
- 使用 jsPDF 生成专业文档
- A4 分页自动处理
- 包含完整分析内容

## 🎨 设计特色

- **渐进式引导**：每步完成后显示进度和成就感
- **智能提示**：根据用户输入提供个性化建议
- **数据可视化**：图表和色彩编码帮助理解复杂信息
- **响应式设计**：完美适配各种设备尺寸

## 🔒 隐私保护

- **完全离线**：所有计算和存储都在本地完成
- **无数据上传**：敏感的谈判信息不会离开用户设备
- **浏览器存储**：使用 localStorage 确保数据安全

## 🤝 使用场景

- 婚姻彩礼谈判准备
- 商务合同谈判
- 薪资谈判
- 房产交易谈判
- 其他重要谈判场景

## 📝 开发说明

本项目采用现代前端开发最佳实践：

- TypeScript 类型安全
- ESLint 代码规范
- Prettier 代码格式化
- 组件化架构
- 状态管理模式

## 🎯 未来规划

- [ ] 添加更多图表类型
- [ ] 支持团队协作功能
- [ ] 增加谈判模板库
- [ ] 集成 AI 建议功能
- [ ] 支持多语言界面

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

**一句话总结**：用 Next.js + Tailwind + shadcn/ui 搭建的单页向导应用，前端计算 BATNA 和底线，Chart.js 做可视化，html2canvas / jsPDF 离线导出 PNG 或 PDF——交付一款轻量、私密、开箱即用的专业谈判准备工具。