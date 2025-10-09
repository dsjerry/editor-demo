<template>
    <div>
        <Navigation />
        <div class="canvas-editor-container">
            <div class="editor-toolbar">
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="executeCommand('undo')" title="撤销">
                        <i class="icon-undo"></i>
                    </button>
                    <button class="toolbar-btn" @click="executeCommand('redo')" title="重做">
                        <i class="icon-redo"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="executeCommand('bold')" title="加粗">
                        <i class="icon-bold"></i>
                    </button>
                    <button class="toolbar-btn" @click="executeCommand('italic')" title="斜体">
                        <i class="icon-italic"></i>
                    </button>
                    <button class="toolbar-btn" @click="executeCommand('underline')" title="下划线">
                        <i class="icon-underline"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="executeCommand('justifyLeft')" title="左对齐">
                        <i class="icon-align-left"></i>
                    </button>
                    <button class="toolbar-btn" @click="executeCommand('justifyCenter')" title="居中对齐">
                        <i class="icon-align-center"></i>
                    </button>
                    <button class="toolbar-btn" @click="executeCommand('justifyRight')" title="右对齐">
                        <i class="icon-align-right"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="insertElement('heading', 1)" title="标题1">H1</button>
                    <button class="toolbar-btn" @click="insertElement('heading', 2)" title="标题2">H2</button>
                    <button class="toolbar-btn" @click="insertElement('heading', 3)" title="标题3">H3</button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="insertElement('list', 'unordered')" title="无序列表">
                        <i class="icon-list-ul"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('list', 'ordered')" title="有序列表">
                        <i class="icon-list-ol"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="insertElement('table')" title="插入表格">
                        <i class="icon-table"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('image')" title="插入图片">
                        <i class="icon-image"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('link')" title="插入链接">
                        <i class="icon-link"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="insertElement('barcode1d')" title="插入条形码">
                        <i class="icon-barcode"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('barcode2d')" title="插入二维码">
                        <i class="icon-qrcode"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('codeblock')" title="插入代码块">
                        <i class="icon-code"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="insertElement('pageBreak')" title="插入分页符">
                        <i class="icon-page-break"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('datePicker')" title="插入日期选择器">
                        <i class="icon-calendar"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('diagram')" title="插入流程图">
                        <i class="icon-diagram"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="insertElement('radio')" title="插入单选框">
                        <i class="icon-radio"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('checkbox')" title="插入复选框">
                        <i class="icon-checkbox"></i>
                    </button>
                    <button class="toolbar-btn" @click="insertElement('input')" title="插入文本框">
                        <i class="icon-input"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="importDocument('docx')" title="导入Word">
                        <i class="icon-file-word"></i>
                    </button>
                    <button class="toolbar-btn" @click="importDocument('excel')" title="导入Excel">
                        <i class="icon-file-excel"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="exportDocument('docx')" title="导出Word">
                        <i class="icon-file-word"></i>
                    </button>
                    <button class="toolbar-btn" @click="exportDocument('pdf')" title="导出PDF">
                        <i class="icon-file-pdf"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="executeCommand('upperCase')" title="转成大写">
                        <i class="icon-uppercase"></i>
                    </button>
                    <button class="toolbar-btn" @click="executeCommand('lowerCase')" title="转成小写">
                        <i class="icon-lowercase"></i>
                    </button>
                </div>
                <div class="toolbar-divider"></div>
                <div class="toolbar-group">
                    <button class="toolbar-btn" @click="toggleMode()" title="切换编辑/只读模式">
                        <i class="icon-mode"></i>
                    </button>
                </div>
            </div>
            
            <!-- 三栏布局 -->
            <div class="editor-content">
                <!-- 左侧目录栏 -->
                <div class="sidebar-left">
                    <div class="sidebar-header">
                        <h3>目录</h3>
                    </div>
                    <div class="toc-container">
                        <ul class="toc-list">
                            <li v-for="(item, index) in tableOfContents" :key="index" 
                                :class="'toc-item toc-level-' + item.level"
                                @click="scrollToHeading(item.id)">
                                {{ item.text }}
                            </li>
                        </ul>
                    </div>
                </div>
                
                <!-- 中间编辑器栏 -->
                <div class="editor-main">
                    <div class="editor"></div>
                    <div class="editor-statusbar">
                        <span class="status-item">字数: {{ wordCount }}</span>
                        <span class="status-item">页数: {{ pageCount }}</span>
                        <span class="status-item">当前页: {{ currentPage }}</span>
                    </div>
                </div>
                
                <!-- 右侧批注栏 -->
                <div class="sidebar-right">
                    <div class="sidebar-header">
                        <h3>批注</h3>
                    </div>
                    <div class="comments-container">
                        <p>批注功能开发中...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import Navigation from '../../components/Navigation.vue';

let editorInstance = null;
import { Editor, ElementType } from '@hufe921/canvas-editor';
import barcode1dPlugin from '@hufe921/canvas-editor-plugin-barcode1d';
import barcode2dPlugin from '@hufe921/canvas-editor-plugin-barcode2d';
import codeblockPlugin from '@hufe921/canvas-editor-plugin-codeblock';
import docxPlugin from '@hufe921/canvas-editor-plugin-docx';
import excelPlugin from '@hufe921/canvas-editor-plugin-excel';
import floatingToolbarPlugin from '@hufe921/canvas-editor-plugin-floating-toolbar';
import diagramPlugin from '@hufe921/canvas-editor-plugin-diagram';
import casePlugin from '@hufe921/canvas-editor-plugin-case';

// 状态管理
const wordCount = ref(0);
const pageCount = ref(1);
const currentPage = ref(1);
const editorStatus = reactive({
    isDirty: false,
    isLoading: true,
    mode: 'edit' // edit 或 readonly
});

// 目录数据
const tableOfContents = ref([]);

// 执行编辑器命令
function executeCommand(command) {
    if (!editorInstance) return;

    switch (command) {
        case 'undo':
            editorInstance.command.executeUndo();
            break;
        case 'redo':
            editorInstance.command.executeRedo();
            break;
        case 'bold':
            editorInstance.command.executeBold();
            break;
        case 'italic':
            editorInstance.command.executeItalic();
            break;
        case 'underline':
            editorInstance.command.executeUnderline();
            break;
        case 'justifyLeft':
            editorInstance.command.executeAlignment('left');
            break;
        case 'justifyCenter':
            editorInstance.command.executeAlignment('center');
            break;
        case 'justifyRight':
            editorInstance.command.executeAlignment('right');
            break;
        case 'upperCase':
            editorInstance.command.executeUpperCase();
            break;
        case 'lowerCase':
            editorInstance.command.executeLowerCase();
            break;
    }

    editorStatus.isDirty = true;
    updateStatus();
}

// 插入元素
function insertElement(type, subtype) {
    if (!editorInstance) return;

    switch (type) {
        case 'heading':
            editorInstance.command.executeHeading(subtype);
            break;
        case 'list':
            if (subtype === 'unordered') {
                editorInstance.command.executeList('unordered');
            } else {
                editorInstance.command.executeList('ordered');
            }
            break;
        case 'table':
            editorInstance.command.executeInsertTable(3, 3);
            break;
        case 'image':
            const imageUrl = window.prompt('请输入图片URL');
            if (imageUrl) {
                editorInstance.command.executeInsertImage(imageUrl);
            }
            break;
        case 'link':
            const linkUrl = window.prompt('请输入链接URL');
            const linkText = window.prompt('请输入链接文本');
            if (linkUrl && linkText) {
                editorInstance.command.executeInsertLink(linkUrl, linkText);
            }
            break;
        case 'barcode1d':
            const barcode1dContent = window.prompt('请输入条形码内容');
            if (barcode1dContent) {
                editorInstance.command.executeInsertBarcode1D(barcode1dContent, 200, 100);
            }
            break;
        case 'barcode2d':
            const barcode2dContent = window.prompt('请输入二维码内容');
            if (barcode2dContent) {
                editorInstance.command.executeInsertBarcode2D(barcode2dContent, 200, 200);
            }
            break;
        case 'codeblock':
            const codeContent = window.prompt('请输入代码内容');
            const language = window.prompt('请输入编程语言 (如: javascript, python, html)');
            if (codeContent && language) {
                editorInstance.command.executeInsertCodeblock(codeContent, language);
            }
            break;
        case 'pageBreak':
            editorInstance.command.executeInsertPageBreak();
            break;
        case 'datePicker':
            editorInstance.command.executeInsertDatePicker();
            break;
        case 'diagram':
            editorInstance.command.executeLoadDiagram({
                data: '',
                onDestroy: message => {
                    if (!message || !message.data) return;
                    const { bounds } = message;
                    editorInstance.command.executeInsertElementList([
                        {
                            type: ElementType.IMAGE,
                            width: bounds.width,
                            height: bounds.height,
                            value: message.data,
                            extension: {
                                name: 'diagram',
                                xml: message.xml
                            }
                        }
                    ]);
                }
            });
            break;
        case 'radio':
            const radioOptions = window.prompt('请输入选项，用逗号分隔 (如: 选项1,选项2,选项3)');
            if (radioOptions) {
                const radioOptionList = radioOptions.split(',');
                editorInstance.command.executeInsertRadio(radioOptionList);
            }
            break;
        case 'checkbox':
            const checkboxOptions = window.prompt('请输入选项，用逗号分隔 (如: 选项1,选项2,选项3)');
            if (checkboxOptions) {
                const checkboxOptionList = checkboxOptions.split(',');
                editorInstance.command.executeInsertCheckbox(checkboxOptionList);
            }
            break;
        case 'input':
            const placeholder = window.prompt('请输入占位符文本');
            editorInstance.command.executeInsertInput(placeholder);
            break;
    }

    editorStatus.isDirty = true;
    updateStatus();
}

// 导出文档
function exportDocument(format) {
    if (!editorInstance) return;

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');

    if (format === 'docx') {
        editorInstance.command.executeExportDocx({
            fileName: `canvas-editor-${timestamp}.docx`
        });
    } else if (format === 'pdf') {
        editorInstance.command.executePrint({
            fileName: `canvas-editor-${timestamp}.pdf`
        });
    }
}

// 导入文档
function importDocument(format) {
    if (!editorInstance) return;

    if (format === 'docx') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.docx';
        input.onchange = e => {
            const file = e.target.files[0];
            if (file) {
                editorInstance.command.executeImportDocx({
                    file
                });
            }
        };
        input.click();
    } else if (format === 'excel') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx,.xls';
        input.onchange = e => {
            const file = e.target.files[0];
            if (file) {
                editorInstance.command.executeImportExcel({
                    file
                });
            }
        };
        input.click();
    }
}

// 切换编辑/只读模式
function toggleMode() {
    if (!editorInstance) return;
    
    editorStatus.mode = editorStatus.mode === 'edit' ? 'readonly' : 'edit';
    editorInstance.command.executeSetMode(editorStatus.mode);
}



onMounted(() => {
    const instance = new Editor(
        document.querySelector('.editor'),
        [
            {
                value: 'Canvas Editor - 基于canvas/svg的富文本编辑器',
                type: ElementType.HEADING,
                level: 1,
                style: {
                    textAlign: 'center',
                    color: '#1976d2'
                }
            },
            {
                value: '\n\n'
            },
            {
                value: '功能特点：',
                type: ElementType.HEADING,
                level: 2
            },
            {
                value: '\n\n'
            },
            {
                value: '1. 富文本操作：支持撤销、重做、字体、字号、加粗、斜体、上下标、对齐方式、标题、列表等',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '2. 插入元素：支持表格、图片、链接、代码块、分页符、日期选择器、内容块等',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '3. 右键菜单：可插入条形码、二维码、代码块、导出/导入文档等',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '4. 打印功能：基于canvas转图片、PDF绘制',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '5. 控件支持：单选、文本、复选框等',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '6. 拖拽功能：文字、元素、控件拖拽',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '7. 页面设置：页眉、页脚、页码、页边距、水印、分页等',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '8. 快捷键：内部快捷键和自定义快捷键',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '9. 其他功能：选择文本查看悬浮工具栏、大小写转换、流程图绘制等',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '使用说明：',
                type: ElementType.HEADING,
                level: 2
            },
            {
                value: '\n\n'
            },
            {
                value: '右键点击编辑器区域可以查看更多功能选项，包括插入条形码、二维码、代码块、导出/导入文档等。',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '选择文本可以查看悬浮工具栏，进行文本格式化操作。',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '支持拖拽文字、元素和控件。',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '可以插入分页符、日期选择器等内容块。',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '支持设置页眉、页脚、页码、页边距、水印等页面属性。',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '可以导出为PDF或直接打印。',
                type: ElementType.PARAGRAPH
            },
            {
                value: '\n\n'
            },
            {
                value: '代码块示例：',
                type: ElementType.HEADING,
                level: 2
            },
            {
                value: '\n\n'
            },
            {
                type: ElementType.CODEBLOCK,
                language: 'javascript',
                value: `// Canvas Editor 使用示例
import { Editor } from '@hufe921/canvas-editor';

const instance = new Editor(container, [
    {
        value: 'Hello World',
        type: 'paragraph'
    }
], {
    mode: 'edit',
    locale: 'zhCN'
});`
            },
            {
                value: '\n\n'
            },
            {
                value: '表格示例：',
                type: ElementType.HEADING,
                level: 2
            },
            {
                value: '\n\n'
            },
            {
                value: '表格示例：\n\n功能 | 描述\n富文本编辑 | 支持多种文本格式和样式\n插件系统 | 支持多种插件扩展功能\n',
                type: ElementType.PARAGRAPH
            }
        ],
        {
            mode: "edit",
            locale: "zhCN",
            defaultType: "TEXT",
            defaultColor: "#000000",
            defaultFont: "Microsoft YaHei",
            defaultSize: 16,
            minSize: 5,
            maxSize: 72,
            defaultRowMargin: 1,
            defaultBasicRowMarginHeight: 8,
            defaultTabWidth: 32,
            width: 794,
            height: 1123,
            scale: 1,
            pageGap: 20,
            underlineColor: "#000000",
            strikeoutColor: "#FF0000",
            rangeAlpha: 0.6,
            rangeColor: "#AECBFA",
            rangeMinWidth: 5,
            searchMatchAlpha: 0.6,
            searchMatchColor: "#FFFF00",
            searchNavigateMatchColor: "#AAD280",
            highlightAlpha: 0.6,
            highlightMarginHeight: 8,
            resizerColor: "#4182D9",
            resizerSize: 5,
            marginIndicatorSize: 35,
            marginIndicatorColor: "#BABABA",
            margins: [100, 120, 100, 120],
            pageMode: "paging",
            renderMode: "speed",
            defaultHyperlinkColor: "#0000FF",
            paperDirection: "vertical",
            inactiveAlpha: 0.6,
            historyMaxRecordCount: 100,
            wordBreak: "break-word",
            printPixelRatio: 3,
            maskMargin: [60, 0, 30, 0],
            letterClass: ["A-Za-z"],
            contextMenuDisableKeys: [],
            shortcutDisableKeys: [],
            scrollContainerSelector: "",
            pageOuterSelectionDisable: false,
            watermark: {
                data: "CANVAS-EDITOR",
                type: "text",
                width: 0,
                height: 0,
                color: "#AEB5C0",
                opacity: 0.3,
                size: 120,
                font: "Microsoft YaHei",
                repeat: false,
                gap: [10, 10],
                numberType: "arabic"
            },
            pageNumber: {
                bottom: 60,
                size: 12,
                font: "Microsoft YaHei",
                color: "#000000",
                rowFlex: "center",
                format: "第{pageNo}页/共{pageCount}页",
                numberType: "arabic",
                disabled: false,
                startPageNo: 1,
                fromPageNo: 0,
                maxPageNo: null
            },
            placeholder: {
                data: "请输入正文",
                color: "#DCDFE6",
                opacity: 1,
                size: 16,
                font: "Microsoft YaHei"
            },
            zone: {
                tipDisabled: false
            },
            table: {
                tdPadding: [0, 5, 5, 5],
                defaultTrMinHeight: 42,
                defaultColMinWidth: 40,
                defaultBorderColor: "#000000",
                overflow: true
            },
            header: {
                top: 30,
                inactiveAlpha: 1,
                maxHeightRadio: "half",
                disabled: false,
                editable: true
            },
            footer: {
                bottom: 30,
                inactiveAlpha: 1,
                maxHeightRadio: "half",
                disabled: false,
                editable: true
            },
            control: {
                placeholderColor: "#9c9b9b",
                bracketColor: "#000000",
                prefix: "{",
                postfix: "}",
                borderWidth: 1,
                borderColor: "#000000",
                activeBackgroundColor: "",
                disabledBackgroundColor: "",
                existValueBackgroundColor: "",
                noValueBackgroundColor: ""
            },
            checkbox: {
                width: 14,
                height: 14,
                gap: 5,
                lineWidth: 1,
                fillStyle: "#5175f4",
                strokeStyle: "#ffffff",
                verticalAlign: "bottom"
            },
            radio: {
                width: 14,
                height: 14,
                gap: 5,
                lineWidth: 1,
                fillStyle: "#5175f4",
                strokeStyle: "#000000",
                verticalAlign: "bottom"
            },
            cursor: {
                width: 1,
                color: "#000000",
                dragWidth: 2,
                dragColor: "#0000FF",
                dragFloatImageDisabled: false
            },
            title: {
                defaultFirstSize: 26,
                defaultSecondSize: 24,
                defaultThirdSize: 22,
                defaultFourthSize: 20,
                defaultFifthSize: 18,
                defaultSixthSize: 16
            },
            group: {
                opacity: 0.1,
                backgroundColor: "#E99D00",
                activeOpacity: 0.5,
                activeBackgroundColor: "#E99D00",
                disabled: false,
                deletable: true
            },
            pageBreak: {
                font: "Microsoft YaHei",
                fontSize: 12,
                lineDash: [3, 1]
            },
            background: {
                color: "#FFFFFF",
                image: "",
                size: "cover",
                repeat: "no-repeat",
                applyPageNumbers: []
            },
            lineBreak: {
                disabled: true,
                color: "#CCCCCC",
                lineWidth: 1.5
            },
            separator: {
                lineWidth: 1,
                strokeStyle: "#000000"
            },
            lineNumber: {
                size: 12,
                font: "Microsoft YaHei",
                color: "#000000",
                disabled: true,
                right: 20,
                type: "continuity"
            },
            pageBorder: {
                color: "#000000",
                lineWidth: 1,
                padding: [0, 5, 0, 5],
                disabled: true
            },
            badge: {
                top: 0,
                left: 5
            },
            modeRule: {
                print: {
                    imagePreviewerDisabled: false
                },
                readonly: {
                    imagePreviewerDisabled: false
                },
                form: {
                    controlDeletableDisabled: false
                }
            }
        }
    );

    // 注册插件
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

    // 注册右键菜单
    instance.register.contextMenuList([
        {
            name: '插入条形码',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: command => {
                const content = window.prompt('请输入内容');
                command.executeInsertBarcode1D(content, 200, 100);
            }
        },
        {
            name: '插入二维码',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: command => {
                const content = window.prompt('请输入内容');
                command.executeInsertBarcode2D(content, 200, 200);
            }
        },
        {
            name: '插入代码块',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: command => {
                const content = window.prompt('请输入代码内容');
                const language = window.prompt('请输入编程语言 (如: javascript, python, html)');
                command.executeInsertCodeblock(content, language);
            }
        },
        {
            name: '插入分页符',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: command => {
                command.executeInsertPageBreak();
            }
        },
        {
            name: '插入日期选择器',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: command => {
                command.executeInsertDatePicker();
            }
        },
        {
            name: '插入单选框',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: command => {
                const options = window.prompt('请输入选项，用逗号分隔 (如: 选项1,选项2,选项3)');
                if (options) {
                    const optionList = options.split(',');
                    command.executeInsertRadio(optionList);
                }
            }
        },
        {
            name: '插入复选框',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: command => {
                const options = window.prompt('请输入选项，用逗号分隔 (如: 选项1,选项2,选项3)');
                if (options) {
                    const optionList = options.split(',');
                    command.executeInsertCheckbox(optionList);
                }
            }
        },
        {
            name: '插入文本框',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: command => {
                const placeholder = window.prompt('请输入占位符文本');
                command.executeInsertInput(placeholder);
            }
        },
        {
            isDivider: true
        },
        {
            name: '导出Word文档',
            when: payload => true,
            callback: command => {
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                command.executeExportDocx({
                    fileName: `canvas-editor-${timestamp}.docx`
                });
            }
        },
        {
            name: '导入Word文档',
            when: payload => true,
            callback: command => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.docx';
                input.onchange = e => {
                    const file = e.target.files[0];
                    if (file) {
                        command.executeImportDocx({
                            file
                        });
                    }
                };
                input.click();
            }
        },
        {
            name: '导入Excel文档',
            when: payload => true,
            callback: command => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.xlsx,.xls';
                input.onchange = e => {
                    const file = e.target.files[0];
                    if (file) {
                        command.executeImportExcel({
                            file
                        });
                    }
                };
                input.click();
            }
        },
        {
            isDivider: true
        },
        {
            name: '打开/编辑流程图',
            when: payload => {
                return !payload.isReadonly && payload.editorTextFocus;
            },
            callback: (command, context) => {
                const extension = context.startElement?.extension;
                const data = extension?.name === 'diagram' ? extension.xml : '';
                command.executeLoadDiagram({
                    data,
                    onDestroy: message => {
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
                                        name: 'diagram',
                                        xml: message.xml
                                    }
                                }
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
                                        name: 'diagram',
                                        xml: message.xml
                                    }
                                }
                            });
                        }
                    }
                });
            }
        },
        {
            isDivider: true
        },
        {
            name: '转成大写',
            when: payload => {
                return !payload.isReadonly && payload.editorHasSelection;
            },
            callback: command => {
                command.executeUpperCase();
            }
        },
        {
            name: '转成小写',
            when: payload => {
                return !payload.isReadonly && payload.editorHasSelection;
            },
            callback: command => {
                command.executeLowerCase();
            }
        },
        {
            isDivider: true
        },
        {
            name: '切换编辑/只读模式',
            when: payload => true,
            callback: command => {
                editorStatus.mode = editorStatus.mode === 'edit' ? 'readonly' : 'edit';
                command.executeSetMode(editorStatus.mode);
            }
        }
    ]);

    // 注册快捷键
    instance.register.shortcutKeyList([
        {
            key: 'ctrl+s',
            when: payload => true,
            callback: command => {
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                command.executeExportDocx({
                    fileName: `canvas-editor-${timestamp}.docx`
                });
            }
        },
        {
            key: 'ctrl+p',
            when: payload => true,
            callback: command => {
                command.executePrint();
            }
        },
        {
            key: 'ctrl+b',
            when: payload => !payload.isReadonly,
            callback: command => {
                command.executeBold();
            }
        },
        {
            key: 'ctrl+i',
            when: payload => !payload.isReadonly,
            callback: command => {
                command.executeItalic();
            }
        },
        {
            key: 'ctrl+u',
            when: payload => !payload.isReadonly,
            callback: command => {
                command.executeUnderline();
            }
        },
        {
            key: 'ctrl+z',
            when: payload => !payload.isReadonly,
            callback: command => {
                command.executeUndo();
            }
        },
        {
            key: 'ctrl+y',
            when: payload => !payload.isReadonly,
            callback: command => {
                command.executeRedo();
            }
        }
    ]);

    // 监听编辑器事件
    instance.listener.valueChange = () => {
        editorStatus.isDirty = true;
        updateStatus();
    };

    // 初始化完成
    editorStatus.isLoading = false;
    updateStatus();
});

// 提取目录
function extractTableOfContents() {
    if (!editorInstance) return;
    
    // 清空现有目录
    tableOfContents.value = [];
    
    // 获取编辑器内容
    const content = editorInstance.command.getValue();
    
    // 检查内容是否为数组
    if (Array.isArray(content)) {
        // 遍历内容数组，查找标题元素
        let idCounter = 1;
        content.forEach(item => {
            if (item.type === ElementType.HEADING && item.level && item.level <= 3) {
                tableOfContents.value.push({
                    id: `heading-${idCounter++}`,
                    level: item.level,
                    text: item.value || ''
                });
            }
        });
    } else {
        // 如果内容不是数组，尝试使用HTML解析
        const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
        let match;
        let idCounter = 1;
        
        while ((match = headingRegex.exec(content)) !== null) {
            const level = parseInt(match[1]);
            const text = match[2].replace(/<[^>]*>/g, ''); // 移除HTML标签
            
            // 只提取H1-H3级别的标题
            if (level <= 3) {
                tableOfContents.value.push({
                    id: `heading-${idCounter++}`,
                    level: level,
                    text: text
                });
            }
        }
    }
}

// 滚动到指定标题
function scrollToHeading(headingId) {
    if (!editorInstance) return;
    
    // 从headingId中提取标题索引
    const indexMatch = headingId.match(/heading-(\d+)/);
    if (!indexMatch) return;
    
    const headingIndex = parseInt(indexMatch[1]) - 1;
    if (headingIndex < 0 || headingIndex >= tableOfContents.value.length) return;
    
    const targetHeading = tableOfContents.value[headingIndex];
    
    // 获取编辑器内容
    const content = editorInstance.command.getValue();
    
    if (Array.isArray(content)) {
        // 查找目标标题在内容数组中的位置
        let headingCount = 0;
        for (let i = 0; i < content.length; i++) {
            const item = content[i];
            if (item.type === ElementType.HEADING && item.level && item.level <= 3) {
                if (headingCount === headingIndex) {
                    // 找到目标标题，尝试滚动到该位置
                    // 由于canvas-editor的API限制，这里使用一个简单的方法
                    
                    // 方法1：尝试使用编辑器的滚动API（如果存在）
                    if (editorInstance.command.scrollToElement) {
                        editorInstance.command.scrollToElement(i);
                        return;
                    }
                    
                    // 方法2：将光标移动到标题位置，这可能会自动滚动视图
                    if (editorInstance.command.setCursorPosition) {
                        editorInstance.command.setCursorPosition(i, 0);
                        return;
                    }
                    
                    // 方法3：如果以上方法都不可用，记录日志
                    console.log(`找到目标标题: ${targetHeading.text} (位置: ${i})`);
                    return;
                }
                headingCount++;
            }
        }
    }
    
    console.log(`未找到标题: ${headingId}`);
}

// 更新状态信息
function updateStatus() {
    if (!editorInstance) return;
    
    // 获取编辑器内容
    const content = editorInstance.command.getValue();
    
    // 更新字数统计
    let plainText = '';
    if (Array.isArray(content)) {
        // 如果内容是数组，遍历所有元素提取文本
        content.forEach(item => {
            if (item.value) {
                plainText += item.value;
            }
        });
    } else {
        // 如果内容不是数组，直接提取文本
        plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');
    }
    
    wordCount.value = plainText.trim().length;
    
    // 更新页码信息（这里使用简单估算，实际应用中可能需要更精确的计算）
    // 假设每页大约1000个字符
    const estimatedCharsPerPage = 1000;
    pageCount.value = Math.max(1, Math.ceil(wordCount.value / estimatedCharsPerPage));
    
    // 更新目录
    extractTableOfContents();
}
</script>

<style scoped>
/* 容器样式 */
.canvas-editor-container {
    height: calc(100vh - 60px); /* 减去导航栏高度 */
    background: #f5f5f5;
    font-family: 'Microsoft YaHei', sans-serif;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.editor-toolbar {
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.editor-content {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.sidebar-left {
    width: 25%;
    border-right: 1px solid #ddd;
    overflow-y: auto;
    background-color: #f9f9f9;
}

.editor-main {
    width: 50%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.sidebar-right {
    width: 25%;
    border-left: 1px solid #ddd;
    overflow-y: auto;
    background-color: #f9f9f9;
}

.sidebar-header {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    background-color: #f0f0f0;
}

.sidebar-header h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.toc-container {
    padding: 10px;
}

.toc-list {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
}

.toc-item {
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
    margin-bottom: 2px;
}

.toc-item:hover {
    background-color: #e6e6e6;
}

.toc-level-1 {
    font-weight: bold;
    padding-left: 10px;
}

.toc-level-2 {
    font-weight: normal;
    padding-left: 20px;
}

.toc-level-3 {
    font-weight: normal;
    padding-left: 30px;
    font-size: 0.9em;
}

.comments-container {
    padding: 10px;
}

.toolbar-group {
    display: flex;
    align-items: center;
    margin-right: 8px;
}

.toolbar-divider {
    width: 1px;
    height: 24px;
    background: #e0e0e0;
    margin: 0 8px;
}

.toolbar-btn {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 6px 8px;
    margin: 0 2px;
    cursor: pointer;
    color: #333;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    transition: all 0.2s;
}

.toolbar-btn:hover {
    background: #f5f5f5;
    border-color: #d0d0d0;
}

.toolbar-btn:active {
    background: #e0e0e0;
}

/* 编辑器样式 */
.editor {
    flex: 1;
    background: white;
    overflow: auto;
}

/* 状态栏样式 */
.editor-statusbar {
    background: #f5f5f5;
    border-top: 1px solid #e0e0e0;
    padding: 6px 16px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #666;
}

.status-item {
    margin-right: 16px;
}

/* 图标样式 - 使用简单的Unicode字符代替图标 */
.icon-undo::before {
    content: '↶';
}
.icon-redo::before {
    content: '↷';
}
.icon-bold::before {
    content: 'B';
    font-weight: bold;
}
.icon-italic::before {
    content: 'I';
    font-style: italic;
}
.icon-underline::before {
    content: 'U';
    text-decoration: underline;
}
.icon-align-left::before {
    content: '◀';
}
.icon-align-center::before {
    content: '◆';
}
.icon-align-right::before {
    content: '▶';
}
.icon-list-ul::before {
    content: '•';
}
.icon-list-ol::before {
    content: '1.';
}
.icon-table::before {
    content: '⊞';
}
.icon-image::before {
    content: '🖼';
}
.icon-link::before {
    content: '🔗';
}
.icon-file-word::before {
    content: 'W';
}
.icon-file-pdf::before {
    content: 'P';
}
.icon-file-excel::before {
    content: 'E';
}
.icon-barcode::before {
    content: '⧏';
}
.icon-qrcode::before {
    content: '⚏';
}
.icon-code::before {
    content: '</>';
}
.icon-page-break::before {
    content: '⏎';
}
.icon-calendar::before {
    content: '📅';
}
.icon-diagram::before {
    content: '⬡';
}
.icon-radio::before {
    content: '⊙';
}
.icon-checkbox::before {
    content: '☑';
}
.icon-input::before {
    content: '▭';
}
.icon-uppercase::before {
    content: 'AA';
}
.icon-lowercase::before {
    content: 'aa';
}
.icon-mode::before {
    content: '✏';
}

/* 响应式设计 */
@media (max-width: 768px) {
    .toolbar-group {
        margin-bottom: 4px;
    }

    .editor-toolbar {
        padding: 6px 8px;
    }

    .toolbar-btn {
        min-width: 28px;
        height: 28px;
        padding: 4px 6px;
        font-size: 12px;
    }
}
</style>
