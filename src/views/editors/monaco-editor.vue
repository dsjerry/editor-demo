<template>
    <div style="display: flex; flex-direction: column; height: 100vh">
        <Navigation />
        <vue-monaco-diff-editor
            theme="vs-light"
            :original="oldText"
            :modified="newText"
            :options="OPTIONS"
            language="text"
            @mount="handleMount"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { VueMonacoDiffEditor } from '@guolao/vue-monaco-editor';
import Navigation from '../../components/Navigation.vue';

const oldText = ref(`甲方：张三
乙方：李四
合同金额：1000元
`);

const newText = ref(`甲方：张三
乙方：王五
合同金额：2000元
`);

const OPTIONS = {
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
    readOnly: false
    // lineNumbers: 'off' // 隐藏行号显示
};

const diffEditor = shallowRef();
const handleMount = diffEditorInstance => (diffEditor.value = diffEditorInstance);

// get the original value
function getOriginalValue() {
    return diffEditor.value.getOriginalEditor().getValue();
}

// get the modified value
function getModifiedValue() {
    return diffEditor.value.getModifiedEditor().getValue();
}
</script>
