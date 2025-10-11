import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 定义路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '多编辑器文档平台 - 首页'
    }
  },
  {
    path: '/editors',
    name: 'EditorsIndex',
    component: () => import('../views/editors/index.vue'),
    meta: {
      title: '选择编辑器'
    }
  },
  {
    path: '/editors/onlyoffice',
    name: 'OnlyOfficeEditor',
    component: () => import('../views/editors/onlyoffice.vue'),
    meta: {
      title: 'OnlyOffice 编辑器'
    }
  },
  {
    path: '/editors/canvas-editor',
    name: 'CanvasEditor',
    component: () => import('../views/editors/canvas-editor.vue'),
    meta: {
      title: 'Canvas Editor 富文本编辑器'
    }
  },
  {
    path: '/editors/onlyoffice-api',
    name: 'OnlyOfficeByAPI',
    component: () => import('../views/editors/onlyoffice-by-api.vue'),
    meta: {
      title: 'OnlyOffice API 编辑器'
    }
  },
  {
    path: '/editors/ckeditor5',
    name: 'ckeditor5',
    component: () => import('../views/editors/ckeditor5.vue'),
  },
  {
    path: '/editors/onlyoffice-gptver',
    name: 'OnlyOfficeGptver',
    component: () => import('../views/editors/onlyoffice-gptver.vue'),
    meta: {
      title: 'OnlyOffice GPT版本编辑器'
    }
  },
  {
    path: '/editors/monaco-editor',
    name: 'MonacoEditor',
    component: () => import('../views/editors/monaco-editor.vue'),
    meta: {
      title: 'Monaco 差异对比编辑器'
    }
  },
  {
    path: '/editors/tinymce',
    name: 'TinyMCEEditor',
    component: () => import('../views/editors/tinymce.vue'),
    meta: {
      title: 'TinyMCE 富文本编辑器'
    }
  },
  {
    path: '/editors/onlyoffice-docspace',
    name: 'OnlyOfficeDocSpace',
    component: () => import('../views/editors/onlyoffice-docspace.vue'),
    meta: {
      title: 'OnlyOffice DocSpace 集成'
    }
  },
  {
    path: '/canvas-editor',
    redirect: '/editors/canvas-editor'
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 路由切换时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  
  // 这里可以添加权限验证逻辑
  console.log(`路由跳转: ${from.path} -> ${to.path}`)
  
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  console.log(`路由跳转完成: ${to.path}`)
})

export default router