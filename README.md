# OnlyOffice Vue Router 项目

这是一个基于 Vue 3 + TypeScript + Vue Router 的 OnlyOffice 文档编辑器项目。

## 🚀 项目特性

- ✅ Vue 3 + TypeScript + Vite
- ✅ Vue Router 4 路由管理
- ✅ OnlyOffice 文档编辑器集成
- ✅ 响应式设计
- ✅ 现代化 UI 界面

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   ├── DocumentEditor.vue   # OnlyOffice 编辑器组件
│   ├── HelloWorld.vue       # 示例组件
│   └── Navigation.vue       # 导航组件
├── views/              # 页面目录
│   ├── tripdocs.vue         # TripDocs 首页
│   └── NotFound.vue         # 404 页面
├── router/             # 路由配置
│   └── index.ts             # 路由配置文件
├── App.vue             # 根组件
└── main.ts             # 入口文件
```

## 🛣️ 路由配置

项目包含以下路由：

| 路径        | 组件           | 描述                  |
| ----------- | -------------- | --------------------- |
| `/`         | TripDocs       | 首页                  |
| `/tripdocs` | TripDocs       | TripDocs 文档管理页面 |
| `/editor`   | DocumentEditor | OnlyOffice 编辑器页面 |
| `/*`        | NotFound       | 404 页面              |

## 🎯 主要功能

### 1. 路由导航

- 顶部导航栏支持页面切换
- 路由高亮显示当前页面
- 响应式导航设计

### 2. TripDocs 首页

- 现代化设计界面
- 功能特性展示
- 快速导航按钮

### 3. OnlyOffice 编辑器

- 完整的文档编辑功能
- 文本插入和格式化工具
- 编辑器状态监控
- 调试和测试功能

### 4. 404 页面

- 友好的错误提示
- 快速返回导航
- 相关页面推荐

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📝 使用说明

### 路由跳转

#### 1. 使用 router-link（推荐）

```vue
<router-link to="/editor">进入编辑器</router-link>
```

#### 2. 编程式导航

```typescript
import { useRouter } from "vue-router";

const router = useRouter();

// 跳转到编辑器页面
router.push("/editor");

// 返回上一页
router.go(-1);

// 替换当前页面
router.replace("/tripdocs");
```

### 获取当前路由信息

```typescript
import { useRoute } from "vue-router";

const route = useRoute();

// 当前路径
console.log(route.path);

// 路由参数
console.log(route.params);

// 查询参数
console.log(route.query);
```

### 路由守卫

项目已配置全局路由守卫：

```typescript
// 前置守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
  next();
});

// 后置钩子 - 记录路由跳转
router.afterEach((to, from) => {
  console.log(`路由跳转完成: ${to.path}`);
});
```

## 🔧 自定义配置

### 添加新路由

在 `src/router/index.ts` 中添加新路由：

```typescript
const routes: RouteRecordRaw[] = [
  // 现有路由...
  {
    path: "/new-page",
    name: "NewPage",
    component: () => import("../views/NewPage.vue"),
    meta: {
      title: "新页面",
    },
  },
];
```

### 路由懒加载

使用动态导入实现路由懒加载：

```typescript
{
  path: '/lazy-page',
  component: () => import('../views/LazyPage.vue')
}
```

### 嵌套路由

```typescript
{
  path: '/parent',
  component: ParentComponent,
  children: [
    {
      path: 'child',
      component: ChildComponent
    }
  ]
}
```

## 🎨 样式说明

- 使用 CSS Grid 和 Flexbox 布局
- 响应式设计，支持移动端
- 渐变背景和现代化 UI
- 平滑过渡动画效果

## 📱 响应式支持

项目完全支持响应式设计：

- 桌面端：完整功能展示
- 平板端：自适应布局
- 移动端：优化的导航和界面

## 🔍 调试功能

OnlyOffice 编辑器页面提供了丰富的调试功能：

- 编辑器状态监控
- API 调用测试
- 网络连接检查
- 配置信息输出

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**开发服务器地址：** http://localhost:5174/

**项目启动成功！** 🎉
