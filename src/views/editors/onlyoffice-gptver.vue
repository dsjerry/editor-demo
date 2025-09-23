<template>
    <div class="container">
      <button @click="insertText">在文档中插入文字</button>
  
      <DocumentEditor
        id="docEditor"
        documentServerUrl="http://192.168.0.240:54322/"
        :config="config"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { DocumentEditor } from "@onlyoffice/document-editor-vue";
  
  const editor = ref<any>(null);
  
  const config = {
    document: {
      fileType: "docx",
      key: "123123",
      title: "测试文档",
      url: "http://192.168.0.240:54321/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL21lZGlhLyVFNSVCQyU4MCVFNSU4RiU5MSVFNiVCNSU4QiVFOCVBRiU5NSVFOCVCNSU4NCVFNiU5NiU5OS5kb2N4P1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9S1pBMlpWTEZOT1JBOEFTTlZCVk4lMkYyMDI1MDkyMyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA5MjNUMDg0MDAzWiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKTFdrRXlXbFpNUms1UFVrRTRRVk5PVmtKV1RpSXNJbVY0Y0NJNk1UYzFPRFkxT1RrM01pd2ljR0Z5Wlc1MElqb2laSE5xWlhKeWVTSjkuTHpZT0hTWWpCU0tnOTZ3c2F3czJQMm5OZ1BUVnAtcWFrbERPNHhHZU93ZnA1SWNpNUR1a3lrTjk5TmdHLU5nMTJJRWNpYWhTYjVDOWNWYVJUTkN6MUEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT02NTI1MTEyMjU5OTViYzA5MjBkZTVlNzkzN2ZhOThhNjFhNThhOTk3ODNmMGI5MzNlMmE1NDAxNTI0MzQ4OWM2",
    },
    editorConfig: {
      mode: "edit",
      events: {
        // 编辑器 UI 初始化完成
        onAppReady: () => {
          editor.value = (document.getElementById("docEditor") as any).editor;
          console.log("✅ OnlyOffice DocEditor 已经就绪:", editor.value);
        },
      },
    },
  };
  
  function insertText() {
    if (editor.value) {
      editor.value.executeCommand("InsertText", "这是外部插入的文字！");
    } else {
      console.warn("❌ Editor 尚未初始化完成");
    }
  }
  </script>
  
  <style>
  .container {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  #docEditor {
    width: 100%;
    height: 800px;
  }
  </style>
  