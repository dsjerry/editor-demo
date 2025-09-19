<template>
  <div style="width: 100%;">
    <Navigation />
    <div class="editors-container">
      <div class="hero-section">
        <h1 class="hero-title">📚 选择编辑器</h1>
        <p class="hero-subtitle">根据您的需求选择合适的文档编辑器</p>
      </div>
      
      <div class="editors-grid">
        <!-- OnlyOffice 编辑器卡片 -->
        <div class="editor-card onlyoffice-card" @click="goToOnlyOffice">
          <div class="card-header">
            <div class="editor-icon">🏢</div>
            <h2>OnlyOffice 编辑器</h2>
          </div>
          
          <div class="card-content">
            <p class="editor-description">
              专业的在线办公套件，支持 Word、Excel、PowerPoint 文档的在线编辑和协作。
            </p>
            
            <div class="features-list">
              <div class="feature-item">✅ 完整的 Office 功能</div>
              <div class="feature-item">👥 多人实时协作</div>
              <div class="feature-item">☁️ 云端文档管理</div>
              <div class="feature-item">🔒 企业级安全</div>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-primary">
              进入 OnlyOffice
            </button>
          </div>
        </div>

        <!-- Canvas Editor 编辑器卡片 -->
        <div class="editor-card canvas-editor-card" @click="goToCanvasEditor">
          <div class="card-header">
            <div class="editor-icon">🎨</div>
            <h2>Canvas Editor 编辑器</h2>
          </div>
          
          <div class="card-content">
            <p class="editor-description">
              基于 Canvas 的现代化富文本编辑器，支持插件扩展和自定义功能。
            </p>
            
            <div class="features-list">
              <div class="feature-item">🎯 轻量级设计</div>
              <div class="feature-item">🔧 插件扩展系统</div>
              <div class="feature-item">📊 图表和流程图</div>
              <div class="feature-item">⚡ 高性能渲染</div>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-primary">
              进入 Canvas Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Navigation from '../../components/Navigation.vue'

const router = useRouter()

const goToOnlyOffice = () => {
  router.push('/editors/onlyoffice')
}

const goToCanvasEditor = () => {
  router.push('/editors/canvas-editor')
}
</script>

<style scoped>
.editors-container {
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.hero-section {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
}

.editors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin: 0 auto;
}

.editor-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 3px solid transparent;
  cursor: pointer;
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
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #555;
}

.card-actions {
  text-align: center;
}

.btn {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .editors-container {
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
}
</style>