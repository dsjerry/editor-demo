# 多编辑器文档平台

[English](./README_EN.md) | 中文

这是一个基于 Vue 3 + TypeScript + Vue Router 的多编辑器文档平台，集成了多种文档编辑器，包括 OnlyOffice、Canvas Editor、CKEditor5 和 Monaco Editor，为用户提供多样化的文档编辑体验。

## 📋 目录

- [项目特性](#-项目特性)
- [项目结构](#-项目结构)
- [路由配置](#-路由配置)
- [主要功能](#-主要功能)
- [项目依赖](#-项目依赖)
- [快速开始](#-快速开始)
- [使用说明](#-使用说明)
- [自定义配置](#-自定义配置)
- [样式说明](#-样式说明)
- [编辑器对比](#-编辑器对比)
- [响应式支持](#-响应式支持)
- [调试功能](#-调试功能)
- [贡献](#-贡献)
- [许可证](#-许可证)

## 🚀 项目特性

- ✅ Vue 3 + TypeScript + Vite
- ✅ Vue Router 4 路由管理
- ✅ 多种文档编辑器集成
  - OnlyOffice 编辑器：专业的在线办公套件
  - Canvas Editor：基于 Canvas 的现代化富文本编辑器
  - CKEditor5：功能强大的富文本编辑器
  - Monaco Editor：代码差异对比编辑器
- ✅ 响应式设计
- ✅ 现代化 UI 界面
- ✅ 编辑器功能对比展示

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   └── Navigation.vue       # 导航组件
├── views/              # 页面目录
│   ├── Home.vue             # 首页 - 编辑器选择和功能对比
│   ├── NotFound.vue         # 404 页面
│   └── editors/            # 编辑器页面目录
│       ├── index.vue        # 编辑器选择页面
│       ├── onlyoffice.vue   # OnlyOffice 编辑器
│       ├── canvas-editor.vue # Canvas Editor 编辑器
│       ├── ckeditor5.vue    # CKEditor5 编辑器
│       ├── monaco-editor.vue # Monaco Editor 编辑器
│       ├── onlyoffice-by-api.vue # OnlyOffice API 编辑器
│       ├── onlyoffice-gptver.vue # OnlyOffice GPT版本编辑器
│       └── onlyoffice-docspace.vue # OnlyOffice DocSpace 集成
├── router/             # 路由配置
│   └── index.ts             # 路由配置文件
├── App.vue             # 根组件
└── main.ts             # 入口文件
```

## 🛣️ 路由配置

项目包含以下路由：

| 路径                             | 组件               | 描述                         |
| -------------------------------- | ------------------ | ---------------------------- |
| `/`                            | Home               | 首页 - 编辑器选择和功能对比  |
| `/editors`                     | EditorsIndex       | 编辑器选择页面               |
| `/editors/onlyoffice`          | OnlyOfficeEditor   | OnlyOffice 编辑器页面        |
| `/editors/canvas-editor`       | CanvasEditor       | Canvas Editor 编辑器页面     |
| `/editors/ckeditor5`           | CKEditor5          | CKEditor5 编辑器页面         |
| `/editors/monaco-editor`       | MonacoEditor       | Monaco 差异对比编辑器页面    |
| `/editors/onlyoffice-api`      | OnlyOfficeByAPI    | OnlyOffice API 编辑器页面    |
| `/editors/onlyoffice-gptver`   | OnlyOfficeGptver   | OnlyOffice GPT版本编辑器页面 |
| `/editors/onlyoffice-docspace` | OnlyOfficeDocSpace | OnlyOffice DocSpace 集成页面 |
| `/*`                           | NotFound           | 404 页面                     |

## 🎯 主要功能

### 1. 首页功能

- 多编辑器卡片展示
- 编辑器功能对比表
- 快速导航到各编辑器
- 响应式设计，适配不同屏幕尺寸

### 2. 编辑器功能对比

首页提供编辑器功能对比表，包含以下对比项：

- 文档格式支持
- 协作功能
- 插件系统
- 性能表现
- 学习成本
- 集成方式
- 特色功能

### 3. OnlyOffice 编辑器

- 专业的在线办公套件
- 支持 Word、Excel、PowerPoint 文档的在线编辑和协作
- 多人实时协作功能
- 云端文档管理
- 企业级安全保障

### 4. Canvas Editor 编辑器

- 基于 Canvas 的现代化富文本编辑器
- 支持插件扩展和自定义功能
- 轻量级设计
- 插件扩展系统
- 图表和流程图支持
- 高性能渲染

### 5. CKEditor5 编辑器

- 功能强大的富文本编辑器
- 现代化的编辑体验
- 丰富的插件生态
- 内容样式定制
- 响应式设计

### 6. Monaco Editor 编辑器

- 代码差异对比编辑器
- 高性能代码编辑
- 语法高亮
- 智能代码补全

## 📦 项目依赖

### 主要依赖

- `vue`: ^3.5.18 - Vue 3 框架
- `vue-router`: ^4.5.1 - Vue Router 路由管理
- `@onlyoffice/document-editor-vue`: ^1.6.1 - OnlyOffice 编辑器组件
- `@ckeditor/ckeditor5-vue`: ^7.3.0 - CKEditor5 Vue 组件
- `@guolao/vue-monaco-editor`: ^1.5.5 - Monaco Editor Vue 组件
- `ckeditor5`: ^46.1.1 - CKEditor5 编辑器
- `monaco-editor`: ^0.54.0 - Monaco 编辑器

### Canvas Editor 插件

- `@hufe921/canvas-editor-plugin-barcode1d`: ^0.0.3 - 一维条码插件
- `@hufe921/canvas-editor-plugin-barcode2d`: ^0.0.4 - 二维码插件
- `@hufe921/canvas-editor-plugin-case`: ^0.0.1 - 大小写转换插件
- `@hufe921/canvas-editor-plugin-codeblock`: ^0.0.2 - 代码块插件
- `@hufe921/canvas-editor-plugin-diagram`: ^0.0.2 - 图表插件
- `@hufe921/canvas-editor-plugin-docx`: ^0.0.5 - Word 文档插件
- `@hufe921/canvas-editor-plugin-excel`: ^0.0.1 - Excel 表格插件
- `@hufe921/canvas-editor-plugin-floating-toolbar`: ^0.0.4 - 浮动工具栏插件

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

### 预览生产版本

```bash
npm run preview
```

## 📝 使用说明

### 路由跳转

#### 1. 使用 router-link（推荐）

```vue
<router-link to="/editors/onlyoffice">进入 OnlyOffice 编辑器</router-link>
```

#### 2. 编程式导航

```typescript
import { useRouter } from "vue-router";

const router = useRouter();

// 跳转到 OnlyOffice 编辑器页面
router.push("/editors/onlyoffice");

// 返回上一页
router.go(-1);

// 替换当前页面
router.replace("/editors/canvas-editor");
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
  
  // 记录路由跳转
  console.log(`路由跳转: ${from.path} -> ${to.path}`);
  
  next();
});

// 后置钩子 - 记录路由跳转
router.afterEach((to, from) => {
  console.log(`路由跳转完成: ${to.path}`);
});
```

## 🔧 自定义配置

### 添加新编辑器

1. 在 `src/views/editors/` 目录下创建新的编辑器组件
2. 在 `src/router/index.ts` 中添加新路由：

```typescript
const routes: RouteRecordRaw[] = [
  // 现有路由...
  {
    path: "/editors/new-editor",
    name: "NewEditor",
    component: () => import("../views/editors/new-editor.vue"),
    meta: {
      title: "新编辑器",
    },
  },
];
```

3. 在 `src/views/Home.vue` 中添加新的编辑器卡片

### 路由懒加载

使用动态导入实现路由懒加载：

```typescript
{
  path: '/editors/lazy-editor',
  component: () => import('../views/editors/lazy-editor.vue')
}
```

### 嵌套路由

```typescript
{
  path: '/editors',
  component: EditorsIndex,
  children: [
    {
      path: 'onlyoffice',
      component: OnlyOfficeEditor
    }
  ]
}
```

## 🎨 样式说明

- 使用 CSS Grid 和 Flexbox 布局
- 响应式设计，支持移动端
- 编辑器卡片悬停效果
- 功能对比表样式
- 自定义滚动条样式

## 📊 编辑器对比

| 编辑器        | 文档格式支持     | 协作功能        | 插件系统    | 性能表现 | 学习成本 | 集成方式 | 特色功能           |
| ------------- | ---------------- | --------------- | ----------- | -------- | -------- | -------- | ------------------ |
| OnlyOffice    | Word, Excel, PPT | ✅ 多人实时协作 | 有限        | 高       | 中等     | Vue 组件 | 完整的 Office 功能 |
| Canvas Editor | 富文本           | ❌              | ✅ 丰富插件 | 高       | 低       | Vue 组件 | 轻量级设计         |
| CKEditor5     | 富文本           | ✅ 协作编辑     | ✅ 丰富插件 | 中       | 中等     | Vue 组件 | 现代化编辑体验     |
| Monaco Editor | 代码             | ❌              | ✅ 语法高亮 | 高       | 中等     | Vue 组件 | 代码差异对比       |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📄 许可证

MIT License

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

**开发服务器地址：** [http://localhost:5174/](http://localhost:5174/)

**项目启动成功！** 🎉
