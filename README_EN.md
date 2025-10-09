# Multi-Editor Document Platform

English | [中文](./README.md)

This is a multi-editor document platform based on Vue 3 + TypeScript + Vue Router, integrating various document editors including OnlyOffice, Canvas Editor, CKEditor5, and Monaco Editor, providing users with diverse document editing experiences.

## 📋 Table of Contents

- [Project Features](#-project-features)
- [Project Structure](#-project-structure)
- [Route Configuration](#-route-configuration)
- [Main Functions](#-main-functions)
- [Project Dependencies](#-project-dependencies)
- [Quick Start](#-quick-start)
- [Usage Instructions](#-usage-instructions)
- [Custom Configuration](#-custom-configuration)
- [Style Description](#-style-description)
- [Editor Comparison](#-editor-comparison)
- [Responsive Support](#-responsive-support)
- [Debugging Features](#-debugging-features)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Project Features

- ✅ Vue 3 + TypeScript + Vite
- ✅ Vue Router 4 routing management
- ✅ Multiple document editor integration
  - OnlyOffice Editor: Professional online office suite
  - Canvas Editor: Modern Canvas-based rich text editor
  - CKEditor5: Powerful rich text editor
  - Monaco Editor: Code diff comparison editor
- ✅ Responsive design
- ✅ Modern UI interface
- ✅ Editor feature comparison display

## 📁 Project Structure

```
src/
├── components/          # Component directory
│   └── Navigation.vue       # Navigation component
├── views/              # Page directory
│   ├── Home.vue             # Homepage - Editor selection and feature comparison
│   ├── NotFound.vue         # 404 page
│   └── editors/            # Editor page directory
│       ├── index.vue        # Editor selection page
│       ├── onlyoffice.vue   # OnlyOffice Editor
│       ├── canvas-editor.vue # Canvas Editor
│       ├── ckeditor5.vue    # CKEditor5 Editor
│       ├── monaco-editor.vue # Monaco Editor
│       ├── onlyoffice-by-api.vue # OnlyOffice API Editor
│       ├── onlyoffice-gptver.vue # OnlyOffice GPT Version Editor
│       └── onlyoffice-docspace.vue # OnlyOffice DocSpace Integration
├── router/             # Route configuration
│   └── index.ts             # Route configuration file
├── App.vue             # Root component
└── main.ts             # Entry file
```

## 🛣️ Route Configuration

The project includes the following routes:

| Path | Component | Description |
| --- | --- | --- |
| `/` | Home | Homepage - Editor selection and feature comparison |
| `/editors` | EditorsIndex | Editor selection page |
| `/editors/onlyoffice` | OnlyOfficeEditor | OnlyOffice Editor page |
| `/editors/canvas-editor` | CanvasEditor | Canvas Editor page |
| `/editors/ckeditor5` | CKEditor5 | CKEditor5 Editor page |
| `/editors/monaco-editor` | MonacoEditor | Monaco Diff Comparison Editor page |
| `/editors/onlyoffice-api` | OnlyOfficeByAPI | OnlyOffice API Editor page |
| `/editors/onlyoffice-gptver` | OnlyOfficeGptver | OnlyOffice GPT Version Editor page |
| `/editors/onlyoffice-docspace` | OnlyOfficeDocSpace | OnlyOffice DocSpace Integration page |
| `/*` | NotFound | 404 page |

## 🎯 Main Functions

### 1. Homepage Features

- Multi-editor card display
- Editor feature comparison table
- Quick navigation to each editor
- Responsive design, adapting to different screen sizes

### 2. Editor Feature Comparison

The homepage provides an editor feature comparison table, including the following comparison items:

- Document format support
- Collaboration features
- Plugin system
- Performance
- Learning cost
- Integration method
- Special features

### 3. OnlyOffice Editor

- Professional online office suite
- Supports online editing and collaboration of Word, Excel, PowerPoint documents
- Multi-person real-time collaboration
- Cloud document management
- Enterprise-level security

### 4. Canvas Editor

- Modern Canvas-based rich text editor
- Supports plugin extensions and custom features
- Lightweight design
- Plugin extension system
- Chart and flowchart support
- High-performance rendering

### 5. CKEditor5 Editor

- Powerful rich text editor
- Modern editing experience
- Rich plugin ecosystem
- Content style customization
- Responsive design

### 6. Monaco Editor

- Code diff comparison editor
- High-performance code editing
- Syntax highlighting
- Intelligent code completion

## 📦 Project Dependencies

### Main Dependencies

- `vue`: ^3.5.18 - Vue 3 framework
- `vue-router`: ^4.5.1 - Vue Router routing management
- `@onlyoffice/document-editor-vue`: ^1.6.1 - OnlyOffice Editor component
- `@ckeditor/ckeditor5-vue`: ^7.3.0 - CKEditor5 Vue component
- `@guolao/vue-monaco-editor`: ^1.5.5 - Monaco Editor Vue component
- `ckeditor5`: ^46.1.1 - CKEditor5 Editor
- `monaco-editor`: ^0.54.0 - Monaco Editor

### Canvas Editor Plugins

- `@hufe921/canvas-editor-plugin-barcode1d`: ^0.0.3 - 1D barcode plugin
- `@hufe921/canvas-editor-plugin-barcode2d`: ^0.0.4 - 2D barcode plugin
- `@hufe921/canvas-editor-plugin-case`: ^0.0.1 - Case conversion plugin
- `@hufe921/canvas-editor-plugin-codeblock`: ^0.0.2 - Code block plugin
- `@hufe921/canvas-editor-plugin-diagram`: ^0.0.2 - Diagram plugin
- `@hufe921/canvas-editor-plugin-docx`: ^0.0.5 - Word document plugin
- `@hufe921/canvas-editor-plugin-excel`: ^0.0.1 - Excel table plugin
- `@hufe921/canvas-editor-plugin-floating-toolbar`: ^0.0.4 - Floating toolbar plugin

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

### Preview Production Version

```bash
npm run preview
```

## 📝 Usage Instructions

### Route Navigation

#### 1. Using router-link (Recommended)

```vue
<router-link to="/editors/onlyoffice">Enter OnlyOffice Editor</router-link>
```

#### 2. Programmatic Navigation

```typescript
import { useRouter } from "vue-router";

const router = useRouter();

// Navigate to OnlyOffice Editor page
router.push("/editors/onlyoffice");

// Go back to previous page
router.go(-1);

// Replace current page
router.replace("/editors/canvas-editor");
```

### Get Current Route Information

```typescript
import { useRoute } from "vue-router";

const route = useRoute();

// Current path
console.log(route.path);

// Route parameters
console.log(route.params);

// Query parameters
console.log(route.query);
```

### Route Guards

The project has configured global route guards:

```typescript
// Before guard - Set page title
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
  
  // Log route navigation
  console.log(`Route navigation: ${from.path} -> ${to.path}`);
  
  next();
});

// After hook - Log route navigation
router.afterEach((to, from) => {
  console.log(`Route navigation completed: ${to.path}`);
});
```

## 🔧 Custom Configuration

### Add New Editor

1. Create a new editor component in the `src/views/editors/` directory
2. Add a new route in `src/router/index.ts`:

```typescript
const routes: RouteRecordRaw[] = [
  // Existing routes...
  {
    path: "/editors/new-editor",
    name: "NewEditor",
    component: () => import("../views/editors/new-editor.vue"),
    meta: {
      title: "New Editor",
    },
  },
];
```

3. Add a new editor card in `src/views/Home.vue`

### Route Lazy Loading

Implement route lazy loading using dynamic imports:

```typescript
{
  path: '/editors/lazy-editor',
  component: () => import('../views/editors/lazy-editor.vue')
}
```

### Nested Routes

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

## 🎨 Style Description

- CSS Grid and Flexbox layout
- Responsive design, supporting mobile devices
- Editor card hover effects
- Feature comparison table styles
- Custom scrollbar styles

## 📊 Editor Comparison

| Editor | Document Format Support | Collaboration Features | Plugin System | Performance | Learning Cost | Integration Method | Special Features |
| --- | --- | --- | --- | --- | --- | --- | --- |
| OnlyOffice | Word, Excel, PPT | ✅ Multi-person real-time collaboration | Limited | High | Medium | Vue component | Complete Office functionality |
| Canvas Editor | Rich text | ❌ | ✅ Rich plugins | High | Low | Vue component | Lightweight design |
| CKEditor5 | Rich text | ✅ Collaborative editing | ✅ Rich plugins | Medium | Medium | Vue component | Modern editing experience |
| Monaco Editor | Code | ❌ | ✅ Syntax highlighting | High | Medium | Vue component | Code diff comparison |

## 📱 Responsive Support

The project fully supports responsive design:

- Desktop: Full feature display
- Tablet: Adaptive layout
- Mobile: Optimized navigation and interface

## 🔍 Debugging Features

The OnlyOffice Editor page provides rich debugging features:

- Editor status monitoring
- API call testing
- Network connection check
- Configuration information output

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve this project.

## 📄 License

MIT License

---

**Development Server Address:** <http://localhost:5174/>

**Project Started Successfully!** 🎉
