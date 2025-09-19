<template>
  <div>
    <Navigation />
    <div class="editor-container">
    <div class="editor-header">
      <div class="header-left">
        <button class="btn btn-back" @click="goBack">
          ← 返回首页
        </button>
        <h2>OnlyOffice 文档编辑器</h2>
      </div>
      <div class="header-right">
        <span class="status" :class="{ 'ready': editorState.isReady }">
          {{ editorState.status }}
        </span>
      </div>
    </div>
    
    <div class="editor-content">
      <!-- 这里是你原来的 OnlyOffice 编辑器内容 -->
      <div style="width: 100%; height: 100%; display: flex;">
        <!-- 自定义输入区域 -->
        <div style="width: 300px; padding: 20px; background: #5f6a79; border-right: 1px solid #ddd; overflow-y: auto;">
          <h3>文本输入工具</h3>
          
          <!-- 状态显示 -->
          <div style="margin-bottom: 15px; padding: 10px; background: #e3f2fd; border-radius: 4px; font-size: 12px;">
            <div><strong>状态:</strong> {{ editorState.status }}</div>
            <div><strong>编辑器:</strong> {{ editorState.isReady ? '已就绪' : '未就绪' }}</div>
          </div>

          <!-- 简单文本输入 -->
          <div style="margin-bottom: 20px;">
            <label><strong>插入文本：</strong></label>
            <input 
              v-model="textInput.value" 
              type="text" 
              placeholder="输入要插入的文本"
              style="width: 100%; margin-top: 5px; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
              @keyup.enter="handleInsertText"
            />
            <button @click="handleInsertText" style="margin-top: 10px; width: 100%; padding: 8px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
              插入文本
            </button>
          </div>

          <!-- 多行文本输入 -->
          <div style="margin-bottom: 20px;">
            <label><strong>插入段落：</strong></label>
            <textarea 
              v-model="textInput.paragraph" 
              placeholder="输入段落内容"
              style="width: 100%; height: 80px; margin-top: 5px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"
            ></textarea>
            <button @click="handleInsertParagraph" style="margin-top: 10px; width: 100%; padding: 8px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
              插入段落
            </button>
          </div>

          <!-- 预设文本按钮 -->
          <div style="margin-bottom: 20px;">
            <label><strong>快速插入：</strong></label>
            <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 5px;">
              <button 
                v-for="preset in presetTexts" 
                :key="preset.type"
                @click="handleInsertPreset(preset.type)" 
                style="padding: 5px 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>

          <!-- 格式化文本 -->
          <div style="margin-bottom: 20px;">
            <label><strong>格式化文本：</strong></label>
            <input 
              v-model="textInput.formatted" 
              type="text" 
              placeholder="输入要格式化的文本"
              style="width: 100%; margin-top: 5px; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
            />
            <div style="margin-top: 10px; display: flex; gap: 5px;">
              <button 
                v-for="format in textFormats"
                :key="format.type"
                @click="handleInsertFormattedText(format.type)" 
                :style="`padding: 5px 8px; background: ${format.color}; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; ${format.style}`"
              >
                {{ format.label }}
              </button>
            </div>
          </div>

          <!-- 编辑器功能测试 -->
          <div style="margin-bottom: 20px;">
            <label><strong>编辑器功能：</strong></label>
            <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 5px;">
              <button 
                v-for="action in editorActions"
                :key="action.type"
                @click="action.handler" 
                :style="`padding: 5px 8px; background: ${action.color}; color: ${action.textColor || 'white'}; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;`"
              >
                {{ action.label }}
              </button>
            </div>
          </div>

          <!-- 说明信息 -->
          <div style="margin-bottom: 20px; padding: 10px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; font-size: 12px; color: #856404;">
            <strong>⚠️ 重要说明：</strong><br>
            OnlyOffice API (Api.GetDocument等) 只能在插件或宏中使用，不能在外部应用中直接调用。<br>
            当前演示的是编辑器的基本集成功能。
          </div>
        </div>

        <!-- OnlyOffice 编辑器 -->
        <div style="flex: 1;">
          <DocumentEditor 
              id="docEditor" 
              ref="documentEditorRef"
              :documentServerUrl="editorConfig.serverUrl"
              :config="editorConfig.config"
              :onLoadComponentError="handleLoadError"
          /> 
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { DocumentEditor } from "@onlyoffice/document-editor-vue"
import Navigation from '../../components/Navigation.vue'

const router = useRouter()

// 返回首页
const goBack = () => {
  router.push('/')
}

// 类型声明
declare global {
  interface Window {
    DocEditor: any;
    Api: any;
  }
}

// 编辑器引用
const documentEditorRef = ref()
let documentEditor: any = null

// 编辑器状态
const editorState = reactive({
  status: '初始化中...',
  isReady: false,
  retryCount: 0,
  maxRetries: 5
})

// 文本输入状态
const textInput = reactive({
  value: '',
  paragraph: '',
  formatted: ''
})

// 预设文本配置
const presetTexts = ref([
  { type: 'title', label: '插入标题' },
  { type: 'date', label: '插入日期' },
  { type: 'signature', label: '插入签名' }
])

// 文本格式配置
const textFormats = ref([
  { type: 'bold', label: '粗体', color: '#dc3545', style: 'font-weight: bold;' },
  { type: 'italic', label: '斜体', color: '#fd7e14', style: 'font-style: italic;' },
  { type: 'underline', label: '下划线', color: '#20c997', style: 'text-decoration: underline;' }
])

// 编辑器操作处理器
const handleShowMessage = () => {
  if (!documentEditor) {
    editorState.status = '编辑器实例未获取'
    return
  }

  try {
    if (typeof documentEditor.showMessage === 'function') {
      documentEditor.showMessage("🎉 欢迎使用 OnlyOffice 编辑器！\
\
注意：Office API (Api.GetDocument等) 只能在插件或宏中使用。\
当前演示的是编辑器的基本集成功能。")
      editorState.status = '✅ showMessage 测试成功'
      console.log('✅ showMessage 调用成功')
    } else {
      editorState.status = '❌ showMessage 方法不可用'
      console.log('❌ showMessage 方法不可用')
    }
  } catch (error: any) {
    console.error('❌ showMessage 调用失败:', error)
    editorState.status = `showMessage 失败: ${error.message}`
  }
}

const handleRequestFocus = () => {
  if (!documentEditor) {
    editorState.status = '编辑器未就绪'
    return
  }

  try {
    if (typeof documentEditor.requestFocus === 'function') {
      documentEditor.requestFocus()
      editorState.status = '✅ 已聚焦到编辑器'
    } else {
      editorState.status = '❌ requestFocus 方法不可用'
    }
  } catch (error: any) {
    console.error('❌ 聚焦失败:', error)
    editorState.status = `聚焦失败: ${error.message}`
  }
}

const handleDownloadDocument = () => {
  if (!documentEditor) {
    editorState.status = '编辑器未就绪'
    return
  }

  try {
    if (typeof documentEditor.downloadAs === 'function') {
      documentEditor.downloadAs('docx')
      editorState.status = '✅ 开始下载文档'
    } else {
      editorState.status = '❌ downloadAs 方法不可用'
    }
  } catch (error: any) {
    console.error('❌ 下载失败:', error)
    editorState.status = `下载失败: ${error.message}`
  }
}

const handleDebugConfiguration = () => {
  console.log('🔍 === OnlyOffice 配置调试信息 ===')
  console.log('📋 当前配置:', editorConfig.config)
  console.log('🌐 文档服务器 URL:', editorConfig.config.document.url)
  console.log('🔑 文档权限:', editorConfig.config.document.permissions)
  console.log('⚙️ 编辑器模式:', editorConfig.config.mode)
  console.log('👤 用户信息:', editorConfig.config.editorConfig.user)
  
  console.log('🔍 === 编辑器实例状态 ===')
  console.log('📄 编辑器就绪:', editorState.isReady)
  console.log('🎯 编辑器实例:', documentEditor)
  console.log('🌍 全局对象检查:')
  console.log('  - window.DocEditor:', typeof (window as any).DocEditor)
  console.log('  - window.DocEditor.instances:', (window as any).DocEditor?.instances)
  console.log('  - window.Api:', typeof (window as any).Api)
  
  if (documentEditor) {
    console.log('📋 编辑器实例方法:')
    console.log('  - callCommand:', typeof documentEditor.callCommand)
    console.log('  - showMessage:', typeof documentEditor.showMessage)
    console.log('  - destroyEditor:', typeof documentEditor.destroyEditor)
  }
  
  console.log('🌐 === 网络连接检查 ===')
  fetch('http://192.168.0.240:54322/web-apps/apps/api/documents/api.js')
    .then(response => {
      console.log('✅ API.js 文件可访问:', response.status)
    })
    .catch(error => {
      console.error('❌ API.js 文件无法访问:', error)
    })
  
  editorState.status = '🔍 调试信息已输出到控制台'
}

// 文档就绪事件
const handleDocumentReady = () => {
  console.log('📄 文档已准备就绪')
  editorState.isReady = true
  editorState.status = '文档加载完成，正在初始化编辑器...'
  
  setTimeout(() => {
    getEditorInstance()
  }, 2000)
}

// 文档错误事件
const handleDocumentError = (event: any) => {
  console.error('❌ OnlyOffice 错误:', event)
  editorState.status = `错误: ${event.data}`
}

// 文档信息事件
const handleDocumentInfo = (event: any) => {
  console.log('ℹ️ OnlyOffice 信息:', event)
}

// 获取编辑器实例
const getEditorInstance = () => {
  const tryGetInstance = () => {
    try {
      console.log(`🔍 尝试获取编辑器实例 (${editorState.retryCount + 1}/${editorState.maxRetries})`)
      
      documentEditor = (window as any).DocEditor?.instances?.["docEditor"]

      
      if (documentEditor) {
        console.log('✅ 获取到 Vue 包装器实例:', documentEditor)
        
        const hasCallCommand = typeof documentEditor.callCommand === 'function'
        const hasShowMessage = typeof documentEditor.showMessage === 'function'
        
        console.log('📋 Vue 包装器方法检查:')
        console.log(`  - callCommand: ${hasCallCommand ? '✅' : '❌'}`)
        console.log(`  - showMessage: ${hasShowMessage ? '✅' : '❌'}`)
        
        if (hasCallCommand) {
          editorState.status = 'Vue 编辑器已就绪 ✅'
          console.log('🎉 编辑器实例获取成功，可以使用 callCommand')
          testCallCommandAvailability()
        } else {
          throw new Error('callCommand 方法不可用')
        }
      } else if (editorState.retryCount < editorState.maxRetries) {
        editorState.retryCount++
        console.log(`⏳ 编辑器实例未就绪，${1000}ms 后重试...`)
        setTimeout(tryGetInstance, 1000)
      } else {
        throw new Error('达到最大重试次数，无法获取编辑器实例')
      }
    } catch (error: any) {
      console.error('❌ 获取编辑器实例失败:', error)
      editorState.status = `获取实例失败: ${error.message}`
    }
  }
  
  tryGetInstance()
}

// 测试 callCommand 可用性
const testCallCommandAvailability = () => {
  if (!documentEditor || typeof documentEditor.callCommand !== 'function') {
    console.error('❌ callCommand 不可用')
    return
  }
  
  try {
    documentEditor.callCommand(function() {
      console.log('🧪 callCommand 测试成功')
      console.log('Api 对象:', typeof Api !== 'undefined' ? '✅ 可用' : '❌ 不可用')
      
      if (typeof Api !== 'undefined') {
        console.log('📋 Api 方法检查:')
        const methods = ['GetDocument', 'CreateParagraph', 'CreateRun']
        methods.forEach(method => {
          console.log(`  - ${method}: ${typeof Api[method] === 'function' ? '✅' : '❌'}`)
        })
        
        try {
          var oDocument = Api.GetDocument()
          console.log('✅ Api.GetDocument() 调用成功:', oDocument)
          
          var oParagraph = Api.CreateParagraph()
          var oRun = Api.CreateRun()
          oRun.AddText('🎉 API 测试成功！编辑器已就绪，可以使用 OnlyOffice API')
          oRun.SetBold(true)
          oRun.SetColor(0, 128, 0)
          oParagraph.AddElement(oRun)
          oDocument.Push(oParagraph)
          
          console.log('✅ 测试段落插入成功')
        } catch (apiError) {
          console.error('❌ API 调用失败:', apiError)
        }
      }
    })
    
    console.log('✅ callCommand 功能测试通过')
  } catch (error) {
    console.error('❌ callCommand 测试失败:', error)
  }
}

// 插入简单文本
const handleInsertText = () => {
  if (!textInput.value.trim()) {
    editorState.status = '请输入文本'
    return
  }

  if (!documentEditor) {
    editorState.status = '编辑器未就绪'
    return
  }

  try {
    documentEditor.showMessage(`请在编辑器中手动输入: ${textInput.value}`)
    
    if (typeof documentEditor.requestFocus === 'function') {
      documentEditor.requestFocus()
    }
    
    editorState.status = `💡 请在编辑器中输入: ${textInput.value}`
    textInput.value = ''
  } catch (error: any) {
    console.error('❌ 操作失败:', error)
    editorState.status = `操作失败: ${error.message}`
  }
}

// 插入段落
const handleInsertParagraph = () => {
  if (!textInput.paragraph.trim()) {
    editorState.status = '请输入段落内容'
    return
  }

  if (!documentEditor) {
    editorState.status = '编辑器未就绪'
    return
  }

  try {
    documentEditor.showMessage(`请在编辑器中输入以下段落内容:
${textInput.paragraph}`)
    
    if (typeof documentEditor.requestFocus === 'function') {
      documentEditor.requestFocus()
    }
    
    editorState.status = `💡 请在编辑器中输入段落内容`
    textInput.paragraph = ''
  } catch (error: any) {
    console.error('❌ 操作失败:', error)
    editorState.status = `操作失败: ${error.message}`
  }
}

// 插入预设文本
const handleInsertPreset = (type: string) => {
  if (!documentEditor) {
    editorState.status = '编辑器未就绪'
    return
  }

  const presetConfig: { [key: string]: { text: string; message: string } } = {
    title: {
      text: '文档标题',
      message: `请在编辑器中输入标题: 文档标题
建议设置为粗体和较大字号`
    },
    date: {
      text: new Date().toLocaleDateString('zh-CN'),
      message: `请在编辑器中输入日期: ${new Date().toLocaleDateString('zh-CN')}`
    },
    signature: {
      text: '签名模板',
      message: `请在编辑器中添加签名区域:

签名：___________
日期：___________`
    }
  }

  const config = presetConfig[type]
  if (!config) return

  try {
    documentEditor.showMessage(config.message)
    
    if (typeof documentEditor.requestFocus === 'function') {
      documentEditor.requestFocus()
    }
    
    editorState.status = `💡 ${type}内容已提示，请在编辑器中输入`
  } catch (error: any) {
    console.error('❌ 操作失败:', error)
    editorState.status = `操作失败: ${error.message}`
  }
}

// 插入格式化文本
const handleInsertFormattedText = (format: string) => {
  if (!textInput.formatted.trim()) {
    editorState.status = '请输入要格式化的文本'
    return
  }

  if (!documentEditor) {
    editorState.status = '编辑器未就绪'
    return
  }

  const formatNames: { [key: string]: string } = {
    bold: '粗体',
    italic: '斜体',
    underline: '下划线'
  }

  const formatName = formatNames[format]
  if (!formatName) return

  try {
    documentEditor.showMessage(`请在编辑器中输入以下文本并设置为${formatName}:
${textInput.formatted}`)
    
    if (typeof documentEditor.requestFocus === 'function') {
      documentEditor.requestFocus()
    }
    
    editorState.status = `💡 请在编辑器中输入文本并设置${formatName}格式`
    textInput.formatted = ''
  } catch (error: any) {
    console.error('❌ 操作失败:', error)
    editorState.status = `操作失败: ${error.message}`
  }
}

// 编辑器操作配置
const editorActions = computed(() => [
  { type: 'message', label: '💬 显示消息', color: '#6f42c1', handler: handleShowMessage },
  { type: 'focus', label: '🎯 聚焦编辑器', color: '#28a745', handler: handleRequestFocus },
  { type: 'download', label: '💾 下载文档', color: '#17a2b8', handler: handleDownloadDocument },
  { type: 'debug', label: '🔍 调试配置', color: '#ffc107', textColor: 'black', handler: handleDebugConfiguration }
])

// OnlyOffice 编辑器配置
const editorConfig = reactive({
  serverUrl: "http://192.168.0.240:54322/",
  config: {
    document: {
      fileType: "docx",
      key: "test-document-" + Date.now(),
      title: "API测试文档.docx",
      url: "http://192.168.0.240:54321/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL21lZGlhLyVFNSVCQyU4MCVFNSU4RiU5MSVFNiVCNSU4QiVFOCVBRiU5NSVFOCVCNSU4NCVFNiU5NiU5OS5kb2N4P1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9V044SE9aNzhPWTJRV09QNEFQVEMlMkYyMDI1MDkxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA5MTlUMDgxNDMyWiZYLUFtei1FeHBpcmVzPTQzMTk5JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKWFRqaElUMW8zT0U5Wk1sRlhUMUEwUVZCVVF5SXNJbVY0Y0NJNk1UYzFPREk0TnpFNE1Dd2ljR0Z5Wlc1MElqb2laSE5xWlhKeWVTSjkuazdNTFczV1BaS1VLQWtRcndCUkdpZ0FCaFNtUlF1YktLa0hXY3ZGSklGY2pPNUNSTUp5S09HU2dmejgtckM0NGFPX1VJU2ExTWtSamE0bTVETXFKVmcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT1mZTk4ZDIxN2Y5NjJiZTI5ZDMzNzgwZWI1OGE4ZmFiNWE0M2EwNGY5NTZhMTQ4Y2I3ZTg4YmE5MTMwZDFlYTZj",
      permissions: {
        edit: true,
        download: true,
        print: true,
        review: true,
        comment: true,
        copy: true,
        modifyFilter: true,
        modifyContentControl: true
      }
    },
    documentType: "word",
    mode: "edit",
    editorConfig: {
      mode: "edit",
      lang: "zh-CN",
      serviceUrl: "http://192.168.0.240:54322/web-apps/apps/api/documents/",
      customization: {
        toolbar: true,
        statusBar: false,
        leftMenu: false,
        rightMenu: false,
        help: false,
        about: false,
        feedback: false,
        api: {
          enabled: true
        }
      },
      user: {
        id: "user-1",
        name: "Test User"
      }
    },
    events: {
      onDocumentReady: handleDocumentReady,
      onError: handleDocumentError,
      onInfo: handleDocumentInfo,
    
    }
  }
})

// 组件加载错误处理
const handleLoadError = (errorCode: number, errorDescription: string) => {
  console.error('❌ 组件加载错误:', errorCode, errorDescription)
  editorState.status = `组件错误: ${errorDescription}`
  
  const errorMessages: { [key: number]: string } = {
    [-1]: '未知错误',
    [-2]: '转换错误',
    [-3]: '下载错误',
    [-4]: '下载错误',
    [-5]: '不正确的密码',
    [-6]: '数据库连接错误'
  }
  
  console.log(errorMessages[errorCode] || '未知错误类型:', errorDescription)
}

onMounted(() => {
  console.log('编辑器组件已挂载')
})

onUnmounted(() => {
  console.log('编辑器组件即将卸载')
  if (documentEditor && typeof documentEditor.destroyEditor === 'function') {
    documentEditor.destroyEditor()
  }
})
</script>

<style scoped>
.editor-container {
  height: calc(100vh - 60px); /* 减去导航栏高度 */
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
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.status {
  padding: 0.5rem 1rem;
  background: #ffc107;
  color: #333;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status.ready {
  background: #28a745;
  color: white;
}

.editor-content {
  flex: 1;
  overflow: hidden;
}

/* 自定义样式 */
button:hover {
  opacity: 0.8;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}
</style>