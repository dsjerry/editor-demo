<template>
  <div>
    <Navigation />
    <div class="home-container">
      <div class="hero-section">
        <h1 class="hero-title">📚 多编辑器文档平台</h1>
        <p class="hero-subtitle">选择适合您需求的文档编辑器</p>
      </div>
      
      <div class="editors-grid">
        <!-- OnlyOffice 编辑器卡片 -->
        <div class="editor-card onlyoffice-card">
          <div class="card-header">
            <div class="editor-icon">🏢</div>
            <h2>OnlyOffice 编辑器</h2>
          </div>
          
          <div class="card-content">
            <p class="editor-description">
              专业的在线办公套件，支持 Word、Excel、PowerPoint 文档的在线编辑和协作。
            </p>
            
            <div class="features-list">
              <div class="feature-item">
                <span class="feature-icon">✅</span>
                <span>完整的 Office 功能</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">👥</span>
                <span>多人实时协作</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">☁️</span>
                <span>云端文档管理</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔒</span>
                <span>企业级安全</span>
              </div>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-primary" @click="goToOnlyOffice">
              进入 OnlyOffice
            </button>
            <button class="btn btn-secondary" @click="learnMore('onlyoffice')">
              了解更多
            </button>
          </div>
        </div>

        <!-- Canvas Editor 编辑器卡片 -->
        <div class="editor-card canvas-editor-card">
          <div class="card-header">
            <div class="editor-icon">🎨</div>
            <h2>Canvas Editor 编辑器</h2>
          </div>
          
          <div class="card-content">
            <p class="editor-description">
              基于 Canvas 的现代化富文本编辑器，支持插件扩展和自定义功能。
            </p>
            
            <div class="features-list">
              <div class="feature-item">
                <span class="feature-icon">🎯</span>
                <span>轻量级设计</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔧</span>
                <span>插件扩展系统</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📊</span>
                <span>图表和流程图</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">⚡</span>
                <span>高性能渲染</span>
              </div>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-primary" @click="goToCanvasEditor">
              进入 Canvas Editor
            </button>
            <button class="btn btn-secondary" @click="learnMore('canvas-editor')">
              了解更多
            </button>
          </div>
        </div>

        <!-- OnlyOffice API 编辑器卡片 -->
        <div class="editor-card onlyoffice-api-card">
          <div class="card-header">
            <div class="editor-icon">🔗</div>
            <h2>OnlyOffice API 编辑器</h2>
          </div>
          
          <div class="card-content">
            <p class="editor-description">
              直接通过 OnlyOffice Document Server API 集成的编辑器，提供原生的编辑体验。
            </p>
            
            <div class="features-list">
              <div class="feature-item">
                <span class="feature-icon">🚀</span>
                <span>原生 API 集成</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📝</span>
                <span>完整文档编辑</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔄</span>
                <span>动态文档类型</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">💾</span>
                <span>直接保存下载</span>
              </div>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-primary" @click="goToOnlyOfficeAPI">
              进入 OnlyOffice API
            </button>
            <button class="btn btn-secondary" @click="learnMore('onlyoffice-api')">
              了解更多
            </button>
          </div>
        </div>
      </div>
      
      <!-- 功能对比表 -->
      <div class="comparison-section">
        <h2 class="section-title">功能对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>功能特性</th>
                <th>OnlyOffice</th>
                <th>Canvas Editor</th>
                <th>OnlyOffice API</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>文档格式支持</td>
                <td>Word, Excel, PowerPoint</td>
                <td>富文本, Markdown</td>
                <td>Word, Excel, PowerPoint</td>
              </tr>
              <tr>
                <td>协作功能</td>
                <td>✅ 实时协作</td>
                <td>❌ 单用户</td>
                <td>✅ 支持协作</td>
              </tr>
              <tr>
                <td>插件系统</td>
                <td>❌ 有限扩展</td>
                <td>✅ 丰富插件</td>
                <td>❌ 原生功能</td>
              </tr>
              <tr>
                <td>性能表现</td>
                <td>⚡ 中等</td>
                <td>⚡⚡ 高性能</td>
                <td>⚡⚡ 原生性能</td>
              </tr>
              <tr>
                <td>学习成本</td>
                <td>📚 熟悉的界面</td>
                <td>📖 简单易用</td>
                <td>📚 Office 体验</td>
              </tr>
              <tr>
                <td>集成方式</td>
                <td>🔧 Vue 封装</td>
                <td>🎨 Canvas 渲染</td>
                <td>🔗 直接 API</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Navigation from '../components/Navigation.vue'

const router = useRouter()

const goToOnlyOffice = () => {
  router.push('/editors/onlyoffice')
}

const goToCanvasEditor = () => {
  router.push('/editors/canvas-editor')
}

const goToOnlyOfficeAPI = () => {
  router.push('/editors/onlyoffice-api')
}

const learnMore = (editor: string) => {
  // 这里可以添加更多信息的逻辑
  console.log(`了解更多关于 ${editor} 的信息`)
}
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.hero-section {
  text-align: center;
  color: white;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  font-weight: 300;
}

.editors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  margin: 0 auto 4rem;
}

.editor-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.editor-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.onlyoffice-card:hover {
  border-color: #ff6b6b;
}

.canvas-editor-card:hover {
  border-color: #4ecdc4;
}

.onlyoffice-api-card:hover {
  border-color: #ffa726;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.editor-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.canvas-editor-card .editor-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.onlyoffice-api-card .editor-icon {
  background: linear-gradient(135deg, #ffa726 0%, #ff7043 100%);
}

.card-header h2 {
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.editor-description {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.features-list {
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.feature-icon {
  font-size: 1.2rem;
}

.card-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #f8f9fa;
  color: #333;
  border: 2px solid #e9ecef;
}

.btn-secondary:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.comparison-section {
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.section-title {
  text-align: center;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.comparison-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

td {
  color: #666;
}

tr:hover {
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .editors-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .editor-card {
    padding: 1.5rem;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .comparison-section {
    padding: 1.5rem;
  }
  
  table {
    font-size: 0.9rem;
  }
  
  th, td {
    padding: 0.75rem 0.5rem;
  }
}
</style>