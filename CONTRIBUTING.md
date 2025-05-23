# 贡献指南

感谢你对谈判准备工具项目的关注！我们欢迎各种形式的贡献。

## 🤝 如何贡献

### 报告问题
- 使用 [GitHub Issues](https://github.com/yourusername/negotiation-prep/issues) 报告 bug
- 提供详细的重现步骤
- 包含浏览器版本和操作系统信息

### 提出功能建议
- 在 Issues 中描述新功能的需求
- 解释为什么这个功能对用户有价值
- 提供具体的使用场景

### 代码贡献

#### 开发环境设置
```bash
# 克隆仓库
git clone https://github.com/yourusername/negotiation-prep.git
cd negotiation-prep

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

#### 提交代码
1. Fork 这个仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'feat: 添加某个功能'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 创建 Pull Request

## 📝 代码规范

### 提交信息格式
使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

类型包括：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动

### 代码风格
- 使用 TypeScript
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 命名

### 目录结构
```
negotiation/
├── app/                    # Next.js App Router
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件
│   └── steps/            # 步骤组件
├── lib/                  # 工具库和状态管理
├── public/               # 静态资源
└── docs/                 # 文档
```

## 🧪 测试

```bash
# 运行 linting
npm run lint

# 构建检查
npm run build
```

## 📋 开发任务

### 当前需要帮助的领域
- [ ] 添加单元测试
- [ ] 改进移动端体验
- [ ] 增加更多图表类型
- [ ] 优化性能
- [ ] 国际化支持
- [ ] 无障碍访问改进

### 功能路线图
- [ ] 团队协作功能
- [ ] 谈判模板库
- [ ] AI 建议功能
- [ ] 数据导入/导出
- [ ] 云端同步

## 🎯 设计原则

1. **用户体验优先**: 界面简洁直观，操作流程清晰
2. **隐私保护**: 所有数据本地存储，不上传到服务器
3. **性能优化**: 快速加载，流畅交互
4. **可访问性**: 支持键盘导航，屏幕阅读器友好
5. **响应式设计**: 完美适配各种设备尺寸

## 📞 联系方式

- 项目讨论：[GitHub Discussions](https://github.com/yourusername/negotiation-prep/discussions)
- 问题报告：[GitHub Issues](https://github.com/yourusername/negotiation-prep/issues)
- 邮件联系：your.email@example.com

## 📄 许可证

通过贡献代码，你同意你的贡献将在 [MIT License](LICENSE) 下发布。

---

再次感谢你的贡献！🙏