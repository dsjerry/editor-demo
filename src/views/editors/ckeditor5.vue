<template>
  <div class="editor-container">
    <Ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

// 导入ckeditor5核心模块
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  Link,
  List,
  Undo
} from 'ckeditor5';

// 导入CKEditor样式
import 'ckeditor5/ckeditor5.css';

// 编辑器数据
const editorData = ref('<p>Hello from CKEditor 5!</p>');

// 编辑器实例
const editor = ClassicEditor;

// 编辑器配置
const editorConfig = {
  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    Link,
    List,
    Undo
  ],
  toolbar: [
    'undo', 'redo', '|',
    'heading', '|', 'bold', 'italic', '|',
    'link', '|', 'bulletedList', 'numberedList'
  ],
  licenseKey: 'GPL',
};
</script>

<style>
.editor-container {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* 确保编辑器有足够的高度 */
.ck-editor__editable {
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
}

/* 改进工具栏外观 */
.ck-toolbar {
  border-radius: 6px 6px 0 0 !important;
}

/* 改进内容区外观 */
.ck-editor__editable {
  border-radius: 0 0 6px 6px !important;
}

/* 确保在移动设备上也能正常显示 */
@media (max-width: 768px) {
  .editor-container {
    width: 95%;
    padding: 10px;
  }
  
  .ck-editor__editable {
    min-height: 200px;
  }
}
</style>
