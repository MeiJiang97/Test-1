# 云端部署指南

## 快速部署步骤

### 1. 准备工作
确保您已经：
- 创建了 Firebase 项目（参考 `FIREBASE_SETUP.md`）
- 更新了 `firebase-config.js` 中的配置信息
- 测试了本地功能

### 2. 安装 Firebase CLI
```bash
npm install -g firebase-tools
```

### 3. 登录 Firebase
```bash
firebase login
```

### 4. 初始化项目
```bash
firebase init hosting
```

在初始化过程中：
- 选择您的 Firebase 项目
- 设置公共目录为 `.`（当前目录）
- 配置为单页应用：`No`
- 不要覆盖 `index.html`

### 5. 部署到云端
```bash
firebase deploy
```

部署完成后，您会得到一个公共URL，例如：
`https://your-project-id.web.app`

## 实时同步功能

部署后，您的应用将具备以下实时同步功能：

### 自动同步
- 任何用户对数据库的更改都会立即同步到所有其他用户
- 无需手动刷新页面
- 支持离线数据同步

### 数据一致性
- 使用 Firebase 的实时数据库确保数据一致性
- 自动处理并发冲突
- 提供数据版本控制

## 访问控制

### 测试模式
当前配置允许所有用户读写数据，适合开发和测试。

### 生产环境
在生产环境中，建议：
1. 设置更严格的安全规则
2. 添加用户身份验证
3. 实施数据验证

## 监控和维护

### Firebase Console
- 在 [Firebase Console](https://console.firebase.google.com/) 监控应用使用情况
- 查看数据库使用量和性能
- 设置告警和通知

### 备份策略
- Firebase 自动备份数据
- 定期导出重要数据
- 设置数据保留策略

## 故障排除

### 常见问题
1. **部署失败**：检查 Firebase 配置和网络连接
2. **实时同步不工作**：确认安全规则设置正确
3. **性能问题**：优化查询和索引

### 获取帮助
- [Firebase 文档](https://firebase.google.com/docs)
- [Firebase 社区](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)