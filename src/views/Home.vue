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
                        <button class="btn btn-primary" @click="goToOnlyOffice">进入 OnlyOffice</button>
                        <button class="btn btn-secondary" @click="learnMore('onlyoffice')">了解更多</button>
                    </div>
                </div>

                <!-- Canvas Editor 编辑器卡片 -->
                <div class="editor-card canvas-editor-card">
                    <div class="card-header">
                        <div class="editor-icon">🎨</div>
                        <h2>Canvas Editor 编辑器</h2>
                    </div>

                    <div class="card-content">
                        <p class="editor-description">基于 Canvas 的现代化富文本编辑器，支持插件扩展和自定义功能。</p>

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
                        <button class="btn btn-primary" @click="goToCanvasEditor">进入 Canvas Editor</button>
                        <button class="btn btn-secondary" @click="learnMore('canvas-editor')">了解更多</button>
                    </div>
                </div>

                <!-- OnlyOffice API 编辑器卡片 -->
                <!-- <div class="editor-card onlyoffice-api-card">
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
        </div> -->

                <!-- CKEditor5 编辑器卡片 -->
                <div class="editor-card ckeditor5-card">
                    <div class="card-header">
                        <div class="editor-icon">✍️</div>
                        <h2>CKEditor5 编辑器</h2>
                    </div>

                    <div class="card-content">
                        <p class="editor-description">功能强大的富文本编辑器，提供现代化的编辑体验和丰富的插件生态。</p>

                        <div class="features-list">
                            <div class="feature-item">
                                <span class="feature-icon">📝</span>
                                <span>丰富的文本编辑</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">🔌</span>
                                <span>插件生态系统</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">🎨</span>
                                <span>内容样式定制</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">📱</span>
                                <span>响应式设计</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-actions">
                        <button class="btn btn-primary" @click="goToCKEditor5">进入 CKEditor5</button>
                        <button class="btn btn-secondary" @click="learnMore('ckeditor5')">了解更多</button>
                    </div>
                </div>

                <!-- OnlyOffice GPT版本 编辑器卡片 -->
                <!-- <div class="editor-card onlyoffice-gptver-card">
          <div class="card-header">
            <div class="editor-icon">🤖</div>
            <h2>OnlyOffice GPT版本</h2>
          </div>
          
          <div class="card-content">
            <p class="editor-description">
              集成 AI 助手的 OnlyOffice 编辑器，提供智能文档编辑和内容生成功能。
            </p>
            
            <div class="features-list">
              <div class="feature-item">
                <span class="feature-icon">🧠</span>
                <span>AI 智能助手</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✍️</span>
                <span>内容生成</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📊</span>
                <span>数据分析</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔍</span>
                <span>智能摘要</span>
              </div>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-primary" @click="goToOnlyOfficeGptver">
              进入 OnlyOffice GPT
            </button>
            <button class="btn btn-secondary" @click="learnMore('onlyoffice-gptver')">
              了解更多
            </button>
          </div>
        </div> -->

                <!-- Monaco Editor 编辑器卡片 -->
                <div class="editor-card monaco-editor-card">
                    <div class="card-header">
                        <div class="editor-icon">💻</div>
                        <h2>Monaco 差异对比编辑器</h2>
                    </div>

                    <div class="card-content">
                        <p class="editor-description">
                            VS Code 同源的代码编辑器，支持语法高亮、智能提示和差异对比功能。
                        </p>

                        <div class="features-list">
                            <div class="feature-item">
                                <span class="feature-icon">🔍</span>
                                <span>差异对比</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">🎨</span>
                                <span>语法高亮</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">💡</span>
                                <span>智能提示</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">🔧</span>
                                <span>代码格式化</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-actions">
                        <button class="btn btn-primary" @click="goToMonacoEditor">进入 Monaco Editor</button>
                        <button class="btn btn-secondary" @click="learnMore('monaco-editor')">了解更多</button>
                    </div>
                </div>

                <!-- TinyMCE 编辑器卡片 -->
                <div class="editor-card tinymce-card">
                    <div class="card-header">
                        <div class="editor-icon">📝</div>
                        <h2>TinyMCE 编辑器</h2>
                    </div>

                    <div class="card-content">
                        <p class="editor-description">
                            功能强大的WYSIWYG编辑器，提供直观的编辑体验和丰富的内容创作功能。
                        </p>

                        <div class="features-list">
                            <div class="feature-item">
                                <span class="feature-icon">✏️</span>
                                <span>所见即所得</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">🔌</span>
                                <span>丰富插件</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">📱</span>
                                <span>响应式设计</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">🌐</span>
                                <span>多语言支持</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-actions">
                        <button class="btn btn-primary" @click="goToTinyMCE">进入 TinyMCE</button>
                        <button class="btn btn-secondary" @click="learnMore('tinymce')">了解更多</button>
                    </div>
                </div>

                <!-- OnlyOffice DocSpace 编辑器卡片 -->
                <!-- <div class="editor-card onlyoffice-docspace-card">
          <div class="card-header">
            <div class="editor-icon">🌐</div>
            <h2>OnlyOffice DocSpace</h2>
          </div>
          
          <div class="card-content">
            <p class="editor-description">
              专业的文档空间管理系统，提供企业级文档存储、协作和管理功能。
            </p>
            
            <div class="features-list">
              <div class="feature-item">
                <span class="feature-icon">📁</span>
                <span>文档空间管理</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">👥</span>
                <span>团队协作</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔐</span>
                <span>权限控制</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📊</span>
                <span>版本管理</span>
              </div>
            </div>
          </div>
          
          <div class="card-actions">
            <button class="btn btn-primary" @click="goToOnlyOfficeDocSpace">
              进入 OnlyOffice DocSpace
            </button>
            <button class="btn btn-secondary" @click="learnMore('onlyoffice-docspace')">
              了解更多
            </button>
          </div>
        </div> -->
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
                                <th>CKEditor5</th>
                                <th>TinyMCE</th>
                                <th>Monaco Editor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>文档格式支持</td>
                                <td>Word, Excel, PowerPoint</td>
                                <td>富文本, Markdown</td>
                                <td>富文本, Markdown</td>
                                <td>富文本, HTML</td>
                                <td>代码文件</td>
                            </tr>
                            <tr>
                                <td>协作功能</td>
                                <td>✅ 实时协作</td>
                                <td>❌ 单用户</td>
                                <td>✅ 支持协作</td>
                                <td>✅ 支持协作</td>
                                <td>❌ 单用户</td>
                            </tr>
                            <tr>
                                <td>插件系统</td>
                                <td>❌ 有限扩展</td>
                                <td>✅ 丰富插件</td>
                                <td>✅ 丰富插件</td>
                                <td>✅ 丰富插件</td>
                                <td>✅ 扩展支持</td>
                            </tr>
                            <tr>
                                <td>性能表现</td>
                                <td>⚡ 中等</td>
                                <td>⚡⚡ 高性能</td>
                                <td>⚡⚡ 高性能</td>
                                <td>⚡⚡ 高性能</td>
                                <td>⚡⚡⚡ 极高性能</td>
                            </tr>
                            <tr>
                                <td>学习成本</td>
                                <td>📚 熟悉的界面</td>
                                <td>📖 简单易用</td>
                                <td>📖 简单易用</td>
                                <td>📖 简单易用</td>
                                <td>📖 开发者友好</td>
                            </tr>
                            <tr>
                                <td>集成方式</td>
                                <td>🔧 Vue 封装</td>
                                <td>🎨 Canvas 渲染</td>
                                <td>🔧 Vue 组件</td>
                                <td>🔧 Vue 组件</td>
                                <td>💻 Web 编辑器</td>
                            </tr>
                            <tr>
                                <td>特色功能</td>
                                <td>完整办公套件</td>
                                <td>轻量级设计</td>
                                <td>丰富插件生态</td>
                                <td>所见即所得</td>
                                <td>代码差异对比</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Navigation from '../components/Navigation.vue';

const router = useRouter();

const goToOnlyOffice = () => {
    router.push('/editors/onlyoffice');
};

const goToCanvasEditor = () => {
    router.push('/editors/canvas-editor');
};

const goToOnlyOfficeAPI = () => {
    router.push('/editors/onlyoffice-by-api');
};

const goToCKEditor5 = () => {
    router.push('/editors/ckeditor5');
};

const goToOnlyOfficeGptver = () => {
    router.push('/editors/onlyoffice-gptver');
};

const goToMonacoEditor = () => {
    router.push('/editors/monaco-editor');
};

const goToTinyMCE = () => {
    router.push('/editors/tinymce');
};

const goToOnlyOfficeDocSpace = () => {
    router.push('/editors/onlyoffice-docspace');
};

const learnMore = (editor: string) => {
    // 这里可以添加更多信息的逻辑
    console.log(`了解更多关于 ${editor} 的信息`);
    switch (editor) {
        case 'onlyoffice':
            window.open('https://www.onlyoffice.com/', '_blank');
            break;
        case 'canvas-editor':
            window.open('https://hufe.club/canvas-editor-docs/', '_blank');
            break;
        case 'ckeditor5':
            window.open('https://ckeditor.com/ckeditor-5/', '_blank');
            break;
        case 'monaco-editor':
            window.open('https://microsoft.github.io/monaco-editor/', '_blank');
            break;
        case 'tinymce':
            window.open('https://www.tiny.cloud/', '_blank');
            break;
        default:
            break;
    }
};
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
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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

.ckeditor5-card:hover {
    border-color: #9c27b0;
}

.onlyoffice-gptver-card:hover {
    border-color: #00bcd4;
}

.monaco-editor-card:hover {
    border-color: #4caf50;
}

.tinymce-card:hover {
    border-color: #00a8ff;
}

.onlyoffice-docspace-card:hover {
    border-color: #ff5722;
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

.ckeditor5-card .editor-icon {
    background: linear-gradient(135deg, #9c27b0 0%, #673ab7 100%);
}

.onlyoffice-gptver-card .editor-icon {
    background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%);
}

.monaco-editor-card .editor-icon {
    background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
}

.tinymce-card .editor-icon {
    background: linear-gradient(135deg, #00a8ff 0%, #0066cc 100%);
}

.onlyoffice-docspace-card .editor-icon {
    background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
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
    color: #333;
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

th,
td {
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

    th,
    td {
        padding: 0.75rem 0.5rem;
    }
}
</style>
