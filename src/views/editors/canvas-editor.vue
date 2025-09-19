<template>
  <div>
    <Navigation />
    <div class="canvas-editor-container">
      <div class="editor-header">
        <div class="header-left">
          <button class="btn btn-back" @click="goBack">
            ← 返回首页
          </button>
          <h2>Canvas Editor 富文本编辑器</h2>
        </div>
        <div class="header-right">
          <span class="status ready">
            编辑器已就绪
          </span>
        </div>
      </div>
      
      <div class="editor-content">
        <div class="toolbar">
          <div class="toolbar-section">
            <label class="file-upload-btn">
              📄 导入 Word
              <input type="file" name="file-docx" id="file-docx" accept=".docx" />
            </label>
            <label class="file-upload-btn">
              📊 导入 Excel
              <input type="file" name="file-excel" id="file-excel" accept=".xlsx" />
            </label>
          </div>
          
          <div class="toolbar-section">
            <button class="toolbar-btn" @click="exportDocument">
              💾 导出文档
            </button>
          </div>
        </div>
        
        <div class="editor-wrapper">
          <div class="editor"></div>
        </div>
        
        <div class="help-panel">
          <h3>💡 使用提示</h3>
          <ul>
            <li>右键菜单可插入条形码、二维码、代码块</li>
            <li>支持导入/导出 Word 和 Excel 文档</li>
            <li>可以绘制流程图和图表</li>
            <li>选择文本查看悬浮工具栏</li>
            <li>支持大小写转换功能</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router'
import Navigation from '../../components/Navigation.vue'

const router = useRouter()

// 返回首页
const goBack = () => {
  router.push('/')
}

// 导出文档
let exportDocument = () => {
  console.log('编辑器尚未初始化')
}

let editorInstance = null
import { Editor, ElementType } from "@hufe921/canvas-editor";
import barcode1dPlugin from "@hufe921/canvas-editor-plugin-barcode1d";
import barcode2dPlugin from "@hufe921/canvas-editor-plugin-barcode2d";
import codeblockPlugin from "@hufe921/canvas-editor-plugin-codeblock";
import docxPlugin from "@hufe921/canvas-editor-plugin-docx";
import excelPlugin from "@hufe921/canvas-editor-plugin-excel";
import floatingToolbarPlugin from "@hufe921/canvas-editor-plugin-floating-toolbar";
import diagramPlugin from "@hufe921/canvas-editor-plugin-diagram";
import casePlugin from "@hufe921/canvas-editor-plugin-case";

onMounted(() => {
  const instance = new Editor(document.querySelector(".editor"), {
    main: [
      {
        value:
          "右键插入条形码、二维码、代码块、导出/导出word文档、导入excel、绘制流程图、转换大/小写；选择文本查看悬浮工具栏",
      },
      {
        value:
          "\nRight-click to insert barcode, QR code, code block, and export/import docx, load diagram, convert uppercase and lowercase; select text to view floating toolbar.",
      },
    ],
  });

  instance.use(barcode1dPlugin);
  instance.use(barcode2dPlugin);
  instance.use(codeblockPlugin);
  instance.use(docxPlugin);
  instance.use(excelPlugin);
  instance.use(floatingToolbarPlugin);
  instance.use(diagramPlugin);
  instance.use(casePlugin);

  // 保存编辑器实例
  editorInstance = instance;
  
  // 重新定义导出函数
  exportDocument = () => {
    instance.command.executeExportDocx({
      fileName: "canvas-editor-document",
    });
  };

  const docxFileInput = document.querySelector("#file-docx");
  const excelFileInput = document.querySelector("#file-excel");

  instance.register.contextMenuList([
    {
      name: "插入条形码",
      when: (payload) => {
        return !payload.isReadonly && payload.editorTextFocus;
      },
      callback: (command) => {
        const content = window.prompt("请输入内容");
        command.executeInsertBarcode1D(content, 200, 100);
      },
    },
    {
      name: "插入二维码",
      when: (payload) => {
        return !payload.isReadonly && payload.editorTextFocus;
      },
      callback: (command) => {
        const content = window.prompt("请输入内容");
        command.executeInsertBarcode2D(content, 200, 200);
      },
    },
    {
      name: "插入代码块",
      when: (payload) => {
        return !payload.isReadonly && payload.editorTextFocus;
      },
      callback: (command) => {
        const content = window.prompt("请输入内容");
        command.executeInsertCodeblock(content);
      },
    },
    {
      name: "导出文档",
      when: (payload) => true,
      callback: (command) => {
        command.executeExportDocx({
          fileName: "canvas-editor",
        });
      },
    },
    {
      name: "导入文档",
      when: (payload) => true,
      callback: (command) => {
        docxFileInput.click();
      },
    },
    {
      name: "导入excel",
      when: (payload) => true,
      callback: (command) => {
        excelFileInput.click();
      },
    },
    {
      name: "打开/编辑流程图",
      when: (payload) => {
        return !payload.isReadonly && payload.editorTextFocus;
      },
      callback: (command, context) => {
        const extension = context.startElement?.extension;
        const data = extension?.name === "diagram" ? extension.xml : "";
        command.executeLoadDiagram({
          data,
          onDestroy: (message) => {
            if (!message || !message.data) return;
            const { bounds } = message;
            if (!data) {
              // 新增
              command.executeInsertElementList([
                {
                  type: ElementType.IMAGE,
                  width: bounds.width,
                  height: bounds.height,
                  value: message.data,
                  extension: {
                    name: "diagram",
                    xml: message.xml,
                  },
                },
              ]);
            } else {
              // 更新
              command.executeUpdateElementById({
                id: context.startElement.id,
                properties: {
                  width: bounds.width,
                  height: bounds.height,
                  value: message.data,
                  extension: {
                    name: "diagram",
                    xml: message.xml,
                  },
                },
              });
            }
          },
        });
      },
    },
    {
      name: "转成大写",
      when: (payload) => {
        return !payload.isReadonly && payload.editorHasSelection;
      },
      callback: (command) => {
        command.executeUpperCase();
      },
    },
    {
      name: "转成小写",
      when: (payload) => {
        return !payload.isReadonly && payload.editorHasSelection;
      },
      callback: (command) => {
        command.executeLowerCase();
      },
    },
  ]);

  docxFileInput.onchange = () => {
    const file = docxFileInput?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event?.target?.result;
      if (buffer instanceof ArrayBuffer) {
        instance.command.executeImportDocx({
          arrayBuffer: buffer,
        });
      }
      docxFileInput.value = "";
    };
    reader.readAsArrayBuffer(file);
  };

  excelFileInput.onchange = () => {
    const file = excelFileInput?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event?.target?.result;
      if (buffer instanceof ArrayBuffer) {
        instance.command.executeImportExcel({
          arrayBuffer: buffer,
        });
      }
      excelFileInput.value = "";
    };
    reader.readAsArrayBuffer(file);
  };
});
</script>

<style scoped>
.canvas-editor-container {
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
  background: #28a745;
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 保持头部与工具栏区域不滚动 */
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
}

.file-upload-btn {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.file-upload-btn:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.toolbar-btn {
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.toolbar-btn:hover {
  background: #1e7e34;
  transform: translateY(-1px);
}

.editor-wrapper {
  flex: 1;
  padding: 1rem;
  overflow: auto; /* 内容超出时滚动 */
  min-height: 500px; /* 确保编辑器有最小高度 */
}

.editor {
  width: 100%;
  height: 100%;
  min-height: 480px; /* 设置最小高度 */
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  overflow: auto; /* 确保内部也能出现滚动条（某些渲染模式需要） */
}

.help-panel {
  background: #f8f9fa;
  padding: 0.75rem 2rem; /* 减少垂直内边距 */
  border-top: 1px solid #e0e0e0;
  flex-shrink: 0; /* 防止被压缩 */
  max-height: 120px; /* 限制帮助面板最大高度 */
  overflow-y: auto; /* 内容过多时滚动 */
}

.help-panel h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
}

.help-panel ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #666;
  font-size: 0.9rem;
}

.help-panel li {
  margin-bottom: 0.25rem;
}

input[type="file"] {
  display: none;
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
  
  .help-panel {
    padding: 1rem;
  }
}
</style>
