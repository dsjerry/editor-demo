<template>
  <div>
    <Navigation />
    <div class="onlyoffice-container">
      <div class="editor-header">
        <div class="header-left">
          <button class="btn btn-back" @click="goBack">
            ← 返回首页
          </button>
          <h2>OnlyOffice 文档编辑器</h2>
        </div>
        <div class="header-right">
          <span class="status" :class="{ ready: isReady, loading: !isReady }">
            {{ isReady ? '编辑器已就绪' : '正在加载编辑器...' }}
          </span>
        </div>
      </div>
      
      <div class="editor-content">
        <div class="toolbar">
          <div class="toolbar-section">
            <select v-model="selectedDocType" @change="changeDocumentType" class="doc-type-select">
              <option value="word">Word 文档</option>
              <option value="excel">Excel 表格</option>
              <option value="powerpoint">PowerPoint 演示</option>
            </select>
          </div>
          
          <div class="toolbar-section">
            <button class="toolbar-btn" @click="saveDocument" :disabled="!isReady">
              💾 保存文档
            </button>
          </div>

          <!-- 外部插入控件 -->
          <div class="toolbar-section external-insert">
            <input
              v-model="externalText"
              class="text-input"
              type="text"
              placeholder="在此输入要插入的文本"
            />
            <button class="toolbar-btn" @click="insertTextAtCursor" :disabled="!isReady || !externalText">
              ⤴️ 插入文本
            </button>
            <button class="toolbar-btn" @click="insertCurrentDate" :disabled="!isReady">
              📅 插入日期
            </button>
            <button class="toolbar-btn" @click="insertParagraph" :disabled="!isReady">
              ¶ 插入段落
            </button>
          </div>
        </div>
        
        <div class="editor-wrapper">
          <div id="onlyoffice-editor" class="editor-container"></div>
        </div>
        
        <div class="info-panel">
          <h3>📋 文档信息</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">文档类型:</span>
              <span class="value">{{ getDocumentTypeName() }}</span>
            </div>
            <div class="info-item">
              <span class="label">API 地址:</span>
              <span class="value">{{ apiUrl }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from '../../components/Navigation.vue'

const router = useRouter()
const isReady = ref(false)
const selectedDocType = ref('word')
const apiUrl = 'http://192.168.0.240:54322/web-apps/apps/api/documents/api.js'

let docEditor: any = null
const externalText = ref('')

const goBack = () => {
  router.push('/')
}

const getDocumentTypeName = () => {
  const types: Record<string, string> = {
    word: 'Word 文档 (.docx)',
    excel: 'Excel 表格 (.xlsx)', 
    powerpoint: 'PowerPoint 演示 (.pptx)'
  }
  return types[selectedDocType.value] || 'Word 文档'
}

// 获取文档配置
const getDocumentConfig = () => {
  const timestamp = Date.now()
  const baseUrl = 'http://192.168.0.240:54322'
  
  const configs: Record<string, any> = {
    word: {
      documentType: 'word',
      document: {
        fileType: 'docx',
        key: `demo-word-${timestamp}`,
        title: '新建Word文档.docx',
        url: `http://192.168.0.240:54321/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL21lZGlhLyVFNSVCQyU4MCVFNSU4RiU5MSVFNiVCNSU4QiVFOCVBRiU5NSVFOCVCNSU4NCVFNiU5NiU5OS5kb2N4P1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9V044SE9aNzhPWTJRV09QNEFQVEMlMkYyMDI1MDkxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA5MTlUMDgxNDMyWiZYLUFtei1FeHBpcmVzPTQzMTk5JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKWFRqaElUMW8zT0U5Wk1sRlhUMUEwUVZCVVF5SXNJbVY0Y0NJNk1UYzFPREk0TnpFNE1Dd2ljR0Z5Wlc1MElqb2laSE5xWlhKeWVTSjkuazdNTFczV1BaS1VLQWtRcndCUkdpZ0FCaFNtUlF1YktLa0hXY3ZGSklGY2pPNUNSTUp5S09HU2dmejgtckM0NGFPX1VJU2ExTWtSamE0bTVETXFKVmcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT1mZTk4ZDIxN2Y5NjJiZTI5ZDMzNzgwZWI1OGE4ZmFiNWE0M2EwNGY5NTZhMTQ4Y2I3ZTg4YmE5MTMwZDFlYTZj`,
        permissions: {
          edit: true,
          download: true,
          print: true,
          comment: true,
          fillForms: true,
          modifyFilter: true,
          modifyContentControl: true,
          review: true
        }
      }
    },
    excel: {
      documentType: 'cell', 
      document: {
        fileType: 'xlsx',
        key: `demo-excel-${timestamp}`,
        title: '新建Excel表格.xlsx',
        url: `${baseUrl}/cache/files/new.xlsx`,
        permissions: {
          edit: true,
          download: true,
          print: true,
          comment: true,
          fillForms: true,
          modifyFilter: true,
          modifyContentControl: true,
          review: true
        }
      }
    },
    powerpoint: {
      documentType: 'slide',
      document: {
        fileType: 'pptx', 
        key: `demo-ppt-${timestamp}`,
        title: '新建PowerPoint演示.pptx',
        url: `${baseUrl}/cache/files/new.pptx`,
        permissions: {
          edit: true,
          download: true,
          print: true,
          comment: true,
          fillForms: true,
          modifyFilter: true,
          modifyContentControl: true,
          review: true
        }
      }
    }
  }
  return configs[selectedDocType.value] || configs.word
}

// 初始化编辑器
const initEditor = () => {
  if (!window.DocsAPI) {
    console.error('OnlyOffice API 未加载')
    return
  }

  if (docEditor) {
    docEditor.destroyEditor()
    docEditor = null
  }

  const config = getDocumentConfig()
  
  const editorConfig = {
    ...config,
    width: '100%',
    height: '100%',
    type: 'desktop',
    editorConfig: {
      mode: 'edit',
      lang: 'zh-CN',
      user: {
        id: `user-${Date.now()}`,
        name: '演示用户',
        group: 'users'
      },
      customization: {
        autosave: false,
        forcesave: false,
        submitForm: false,
        toolbar: true,
        header: true,
        statusBar: true,
        ruler: true,
        zoom: 100,
        compactToolbar: false,
        leftMenu: true,
        rightMenu: true,
        hideRightMenu: false,
        plugins: true,
        about: true,
        feedback: false,
        goback: {
          url: window.location.origin
        }
      },
      callbacks: {
        
        onAppReady: () => {
          console.log('OnlyOffice 编辑器已就绪')
             docEditor.getApi()
            isReady.value = true
        },
        onDocumentStateChange: (event: any) => {
          console.log('文档状态变化:', event)
        },
        onError: (event: any) => {
          console.error('编辑器错误:', event)
          console.error('错误详情:', JSON.stringify(event))
          isReady.value = false
        },
        onInfo: (event: any) => {
          console.log('编辑器信息:', event)
        },
        onWarning: (event: any) => {
          console.warn('编辑器警告:', event)
        }
      }
    }
  }

  console.log('编辑器配置:', JSON.stringify(editorConfig, null, 2))

  try {
    docEditor = new window.DocsAPI.DocEditor('onlyoffice-editor', editorConfig)
    exposeToWindow()
   
  } catch (error) {
    console.error('初始化编辑器失败:', error)
    isReady.value = false
  }
}

// 加载 OnlyOffice API
const loadOnlyOfficeAPI = () => {
  return new Promise((resolve, reject) => {
    if (window.DocsAPI) {
      console.log('OnlyOffice API 已存在')
      resolve(window.DocsAPI)
      return
    }

    console.log('开始加载 OnlyOffice API:', apiUrl)
    
    const script = document.createElement('script')
    script.src = apiUrl
    script.type = 'text/javascript'
    script.async = true
    
    script.onload = () => {
      console.log('OnlyOffice API 脚本加载成功')
      // 等待 DocsAPI 对象可用
      let attempts = 0
      const checkAPI = () => {
        attempts++
        if (window.DocsAPI) {
          console.log('OnlyOffice API 对象已可用')
          resolve(window.DocsAPI)
        } else if (attempts < 50) {
          setTimeout(checkAPI, 100)
        } else {
          console.error('OnlyOffice API 对象未能初始化')
          reject(new Error('OnlyOffice API object not available'))
        }
      }
      checkAPI()
    }
    
    script.onerror = (error) => {
      console.error('OnlyOffice API 脚本加载失败:', error)
      console.error('请检查 API 地址是否正确:', apiUrl)
      reject(new Error(`Failed to load OnlyOffice API from ${apiUrl}`))
    }
    
    document.head.appendChild(script)
  })
}

// 切换文档类型
const changeDocumentType = () => {
  isReady.value = false
  setTimeout(() => {
    initEditor()
  }, 100)
}

/**
 * 兼容多版本的外部插入实现
 */
const tryInsertText = (text: string) => {
  if (!docEditor) return false
  try {
    // 常见 API
    if (typeof (docEditor as any).insertText === 'function') {
      (docEditor as any).insertText(text); return true
    }
    if (typeof (docEditor as any).pasteText === 'function') {
      (docEditor as any).pasteText(text); return true
    }
    // 某些版本通过 editor 暴露
    if ((docEditor as any).editor) {
      const ed = (docEditor as any).editor
      if (typeof ed.insertText === 'function') { ed.insertText(text); return true }
      if (typeof ed.pasteText === 'function') { ed.pasteText(text); return true }
    }
    // 旧版兜底
    if (typeof (docEditor as any).asc_AddText === 'function') {
      (docEditor as any).asc_AddText(text); return true
    }
  } catch (e) {
    console.error('插入文本失败:', e)
  }
  return false
}

/**
 * 将外部能力挂到 window，便于在控制台或其它模块调用
 */
const exposeToWindow = () => {
  (window as any).onlyofficeApi = {
    insertText: (t: string) => tryInsertText(t),
    insertParagraph: () => tryInsertText('\
'),
    insertDate: () => tryInsertText(new Date().toLocaleString()),
    focus: () => { try { (docEditor as any)?.focus?.() } catch (e) { console.warn(e) } },
    getDocEditor: () => docEditor
  }
  console.log('onlyofficeApi 已挂到 window，可在控制台调用 window.onlyofficeApi.insertText("...")')
}

const insertTextAtCursor = () => {
  if (!isReady.value || !docEditor) return
  const ok = tryInsertText(externalText.value || '')
  if (!ok) {
    console.warn('当前 OnlyOffice 版本不支持直接外部插入文本')
    alert('当前版本不支持外部直接插入文本，请尝试用剪贴板粘贴或升级 Document Server。')
  }
}

const insertCurrentDate = () => {
  if (!isReady.value || !docEditor) return
  const ok = tryInsertText(new Date().toLocaleString())
  if (!ok) alert('外部插入不受支持')
}

const insertParagraph = () => {
  if (!isReady.value || !docEditor) return
  const ok = tryInsertText('\n')
  if (!ok) alert('外部插入不受支持')
}

// 保存文档
const saveDocument = () => {
  if (docEditor) {
    docEditor.downloadAs()
  }
}

// 组件挂载
onMounted(async () => {
  try {
    console.log('开始初始化 OnlyOffice 编辑器')
    await loadOnlyOfficeAPI()
    console.log('API 加载完成，开始初始化编辑器')
    setTimeout(() => {
      initEditor()
    }, 500) // 给 API 一些时间完全初始化
  } catch (error) {
    console.error('初始化失败:', error)
    console.error('请确保 OnlyOffice Document Server 正在运行并且可以访问')
    console.error('API 地址:', apiUrl)
  }
})

// 组件卸载
onUnmounted(() => {
  if (docEditor) {
    docEditor.destroyEditor()
    docEditor = null
  }
})

// 声明全局类型
declare global {
  interface Window {
    DocsAPI: any
  }
}
</script>

<style scoped>
.onlyoffice-container {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-left h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.btn-back {
  padding: 0.5rem 1rem;
  background: #4ecdc4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background: #45b7aa;
  transform: translateY(-1px);
}

.status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.status.ready {
  background: #28a745;
  color: white;
}

.status.loading {
  background: #ffc107;
  color: #333;
}

.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.toolbar-section {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.doc-type-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.toolbar-btn {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.toolbar-btn:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-1px);
}

.toolbar-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.editor-wrapper {
  flex: 1;
  padding: 1rem;
  overflow: hidden;
  min-height: 500px;
}

.editor-container {
  width: 100%;
  height: 100%;
  min-height: 480px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  overflow: hidden;
}

.info-panel {
  background: #f8f9fa;
  padding: 0.75rem 2rem;
  border-top: 1px solid #e0e0e0;
  flex-shrink: 0;
  max-height: 100px;
}

.info-panel h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  gap: 0.5rem;
}

.label {
  font-weight: 500;
  color: #666;
  min-width: 80px;
}

.value {
  color: #333;
  font-family: monospace;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .editor-header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .toolbar {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .toolbar-section {
    justify-content: center;
  }
  
  .info-panel {
    padding: 1rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
.text-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-width: 240px;
  font-size: 0.9rem;
  outline: none;
}
.text-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0,123,255,0.12);
}
.external-insert {
  gap: 0.5rem;
}
</style>