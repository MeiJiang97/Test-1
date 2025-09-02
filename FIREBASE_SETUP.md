# Firebase 云端数据库部署指南

## 1. 创建 Firebase 项目

### 步骤 1: 访问 Firebase Console
1. 打开 [Firebase Console](https://console.firebase.google.com/)
2. 使用 Google 账户登录
3. 点击"创建项目"或"Add project"

### 步骤 2: 配置项目
1. 输入项目名称（例如：`work-order-system`）
2. 选择是否启用 Google Analytics（推荐启用）
3. 点击"创建项目"

## 2. 配置 Firestore 数据库

### 步骤 1: 创建数据库
1. 在项目控制台中，点击左侧菜单的"Firestore Database"
2. 点击"创建数据库"
3. 选择"以测试模式开始"（稍后我们会设置安全规则）
4. 选择数据库位置（建议选择离用户最近的区域）

### 步骤 2: 设置安全规则
在 Firestore Database > 规则 中设置以下规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 允许所有用户读写（仅用于测试，生产环境需要更严格的规则）
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 3. 获取项目配置

### 步骤 1: 添加 Web 应用
1. 在项目控制台中，点击齿轮图标 > 项目设置
2. 在"常规"选项卡中，滚动到"你的应用"部分
3. 点击 Web 图标 (</>) 添加 Web 应用
4. 输入应用昵称（例如：`work-order-web`）
5. 点击"注册应用"

### 步骤 2: 复制配置
复制生成的配置对象，它看起来像这样：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## 4. 更新本地配置

将上述配置替换到 `firebase-config.js` 文件中。

## 5. 实时同步功能

Firebase Firestore 提供实时同步功能：
- 当任何用户更新数据时，其他用户会立即看到更新
- 无需手动刷新页面
- 支持离线数据同步

## 6. 部署到 Firebase Hosting（可选）

### 步骤 1: 安装 Firebase CLI
```bash
npm install -g firebase-tools
```

### 步骤 2: 登录 Firebase
```bash
firebase login
```

### 步骤 3: 初始化项目
```bash
firebase init hosting
```

### 步骤 4: 部署
```bash
firebase deploy
```

## 7. 安全注意事项

1. **生产环境安全规则**：在生产环境中，应该设置更严格的安全规则
2. **身份验证**：考虑添加用户身份验证
3. **数据验证**：在客户端和服务器端都进行数据验证
4. **备份策略**：定期备份重要数据

## 8. 故障排除

### 常见问题：
1. **配置错误**：确保所有配置值都正确复制
2. **网络问题**：检查网络连接和防火墙设置
3. **权限问题**：确保安全规则允许所需的操作

### 获取帮助：
- [Firebase 文档](https://firebase.google.com/docs)
- [Firebase 社区](https://firebase.google.com/community)