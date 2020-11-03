<template>
    <div class="editor-wrap" >
        <div class="editor-bar">
            <div class="editor-left">
                <a href="javascript:;"><a-tooltip title='Bold(ctrl + B)'><a-icon type="bold" class="editor-icon" @click="execCmd('bold')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Italic(ctrl+I)'><a-icon type="italic" class="editor-icon" @click="execCmd('italic')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Underline(ctrl+U)'><a-icon type="underline" class="editor-icon" @click="execCmd('underline')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Strikethrough(ctrl+S)'><a-icon type="strikethrough" class="editor-icon" @click="execCmd('strikeThrough')" /></a-tooltip></a>
                <a-divider type="vertical" />
                <a href="javascript:;"><a-tooltip title='Font family'>
                    <a-dropdown :trigger="['click']">
                        <a-icon type="font-colors" class="editor-icon" />
                        <a-menu slot="overlay">
                            <template v-for="(item, index) in fontFamilys">
                                <a-menu-item :key="index" :style="{fontFamily: item.value}" :title="item.name" @click="execCmd('fontName', item.value)"><a href="javascript:;">{{item.name}}</a></a-menu-item>
                            </template>
                        </a-menu>
                    </a-dropdown>
                </a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Font size'>
                    <a-dropdown :trigger="['click']">
                        <a-icon type="font-size" class="editor-icon" />
                        <a-menu slot="overlay">
                            <template v-for="(item, index) in fontSizes">
                                <a-menu-item :key="index" :style="{fontSize: item.name}" :title="item.name" @click="execCmd('fontSize', item.value)"><a href="javascript:;">{{item.name}}</a></a-menu-item>
                            </template>
                        </a-menu>
                    </a-dropdown>
                </a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Font color'><a-icon type="font-colors" class="editor-icon" @click="execCmd2('foreColor')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Background color'><a-icon type="bg-colors" class="editor-icon" @click="execCmd2('backColor')" /></a-tooltip></a>
                <a-divider type="vertical" />
                <a href="javascript:;"><a-tooltip title='Align left'><a-icon type="align-left" class="editor-icon" @click="execCmd('justifyLeft')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Align center'><a-icon type="align-center" class="editor-icon" @click="execCmd('justifyCenter')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Align right'><a-icon type="align-right" class="editor-icon" @click="execCmd('justifyRight')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Insert unOrderedList'><a-icon type="ordered-list" class="editor-icon" @click="execCmd('insertUnorderedList')" /></a-tooltip></a>
                <a-divider type="vertical" />
                <a href="javascript:;"><a-tooltip title='Insert horizontal'><a-icon type="minus" class="editor-icon" @click="execCmd('insertHorizontalRule')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Link'><a-icon type="link" class="editor-icon" @click="execCmd('createLink')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Link'><a-icon type="disconnect" class="editor-icon" @click="execCmd('unlink')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Insert image'><a-icon type="picture" class="editor-icon" @click="execCmd('insertImage')" /></a-tooltip></a>
                <a-divider type="vertical" />
            </div>
            <div class="editor-right">
                <a href="javascript:;"><a-tooltip title='Redo'><a-icon type="redo" class="editor-icon" @click="execCmd('redo')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Undo'><a-icon type="undo" class="editor-icon" @click="execCmd('undo')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Select all'><a-icon type="select" class="editor-icon" @click="execCmd('undo')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='Fullscreen'><a-icon type="fullscreen" class="editor-icon" @click="execCmd('selectAll')" /></a-tooltip></a>
                <a href="javascript:;"><a-tooltip title='View code'><a-icon type="code" class="editor-icon" @click="execCmd2('viewCode')" /></a-tooltip></a>
            </div>
        </div>
        <div class="editor-input-area">
            <div id="ediotr-content" class="editor-input-content" contenteditable="true" @input="editorTyping">{{value}}</div>
        </div>
        <div class="editor-footer">
            <div class="editor-footer-copy">Powered by fans</div>
            <div class="editor-footer-statics">字数统计: {{charLen}}</div>
        </div>
    </div>
</template>
<script>
const fontFamilys = [
    {name: 'Arial', value: 'Arial,Helvetica,sans-serif'},
    {name: 'Georgia', value: 'Georgia,serif'},
    {name: 'Impact', value: 'Impact,Charcoal,sans-serif'},
    {name: 'Tahoma', value: 'Tahoma,Geneva,sans-serif'},
    {name: 'Times New Roman', value: 'Times New Roman,Times,serif,-webkit-standard'},
    {name: 'Verdana', value: 'Verdana,Geneva,sans-serif'},
];
const fontSizes = [
    {name: '10px', value: '1'},
    {name: '12px', value: '2'},
    {name: '14px', value: '3'},
    {name: '16px', value: '4'},
    {name: '28px', value: '5'},
    {name: '20px', value: '6'},
    {name: '22px', value: '7'},
];
export default {
    name: 'FansEditor',
    props: {
        html: {
            type: String,
            default: function() {
                return ''
            }
        }
    },
    data() {
        return {
            value: '', // 编辑框的内容
            selectedText: '',  // 记录选中的文本
            range: {}, // 记录选中的文本range
            charLen: 0,
            fontFamilys,  // 选择字体
            fontSizes,   // 选择字体大小
        }
    },
    watch: {
        html: {
            handler: function(val) {
                this.value = val;
                this.charLen = val.length;
            },
            immediate: true
        },
    },
    mounted() {
        // document.addEventListener('selectionchange', this.selectionchange)
        this.editor = document.getElementById('ediotr-content');
    },
    methods: {
        editorTyping(e) {
            this.charLen = e.target.innerText.length;
        },
        execCmd2(command) {
            // 处理自定义指令
            console.log('command', command)
        },
        execCmd(command, aValueArgument = null) {
            // 处理自带指令
            try {
                document.execCommand(command, false, aValueArgument);
            } catch (error) {
                throw new Error(error);
            }
        },
        // selectionchange() {
        //     const selObj = window.getSelection();
        //     const selRange = selObj.getRangeAt(0);
        //     if (selObj.toString()) {
        //         this.range = selRange;
        //         this.selectedText = selObj.toString();
        //     }
        // },
        // updateSelection() {
        //     if (!this.isEmptyRange(this.range)) {
        //         let range = document.createRange();
        //         range.setStart(this.range.startContainer, this.range.startOffset);
        //         range.setEnd(this.range.endContainer, this.range.endOffset);

        //         let selection = window.getSelection();
        //         selection.removeAllRanges();
        //         selection.addRange(range);
        //     }
        // },
        isEmptyRange(range) {
            return range.startOffset === range.endOffset;
        },
    }
}
</script>
<style scoped>
.editor-wrap {
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 3px;
}
.editor-bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 8px;
}
.editor-bar::after {
    content: "";
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 0;
    height: 0;
    border-bottom: 1px solid #efefef;
}
.editor-left, .editor-right {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.editor-icon {
    margin: 0 3px 3px 0;
    padding: 8px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 3px;
    color: #333;
}
.editor-icon:hover {
    background: #ebebeb;
}
.editor-input-content {
    min-height: 180px;
    padding: 10px;
    line-height: 1.8;
}
.editor-footer {
    position: relative;
    height: 45px;
    padding: 10px;
    line-height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.editor-footer::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 0;
    border-bottom: 1px solid #efefef;
}
.editor-footer-copy {
    color: #999;
    font-size: 12px;
}
.editor-footer-statics {
    color: #999;
    font-size: 14px;
}
</style>