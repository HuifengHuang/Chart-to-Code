<template>
    <div class="code-area">
        <!-- <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="1">源数据</el-menu-item>
            <el-menu-item index="2">渲染代码</el-menu-item>
            <el-menu-item index="3">整体代码</el-menu-item>
        </el-menu> -->
        <div class="title-line" style="margin: 10px 0 5px 0;">
            <span>源数据</span>
        </div>
        <div style="height: 41%;width: 100%; position: relative;">
            <monaco
                ref="monaco_source"
                :height="100"
                :width="98"
                :opts="opt_source"
                :newCode="newCode"
            ></monaco>
            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>

        <div class="title-line" style="margin: 20px 0 5px 0;">
            <span>渲染代码</span>
        </div>

        <div style="height: 41%;width: 100%; position: relative;">
            <monaco
                ref="monaco_render"
                :height="100"
                :width="98"
                :opts="opt_render"
                :newCode="newCode"
            ></monaco>
            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>

        <div class="bottom_block">
            <el-button @click="runCode" type="primary">运行</el-button>
        </div>

    </div>
</template>

<script>
import monaco from "../components/monacoeditor.vue";
import { create_chart_html } from '../common/common';
import { editorLoading } from "../global/global";
export default {
    name: 'CodeArea',
    components: {monaco},
    props:{
        Codes: {
            type: Object,
            required: false,
            default: ''
        },
    },
    data() {
        return {
            activeIndex: '1',
            code: this.Codes,
            opt_source: {
                value: `console.log("aaa")`,
                readOnly: false,
                language: "html",
                theme: "vs",
                autoIndent: true, // 自动缩进
                fontSize: 13,
            },
            opt_render: {
                value: `console.log("bbb")`,
                readOnly: false,
                language: "html",
                theme: "vs",
                autoIndent: true, // 自动缩进
                fontSize: 13,
            },
            newCode: '',
            isLoading: true,
            editorLoading,
        }
    },
    methods: {
        runCode() {
            // Emit the code to parent component or handle it as needed
            var Overall_code='';
            Overall_code = create_chart_html(this.code.body, this.code.css, this.$refs.monaco_source.getValue(0), this.$refs.monaco_render.getValue(1), this.code.import_script);
            this.$emit('code-run', Overall_code);
        },
        handleSelect(index){
            if(index==='1'){
                this.activeIndex='1';
                this.$refs.monaco.changeLanguage('json');
                this.$refs.monaco.setAllCode(this.code.data);
            }
            else if(index==='2'){
                this.activeIndex='2';
                this.$refs.monaco.changeLanguage('javascript');
                this.$refs.monaco.setAllCode(this.code.script_render);
            }
            else if(index==='3'){
                this.activeIndex='3';
                this.$refs.monaco.changeLanguage('html');
                this.$refs.monaco.setAllCode(create_chart_html(this.code.body, this.code.css, this.code.data, this.code.script_render, this.code.import_script));
            }
        }
    },
    watch:{
        Codes(newCode) {
            this.code = newCode;
            // this.handleSelect('1');
            console.log("CodeArea收到代码：", newCode);
            this.$refs.monaco_source.changeLanguage('json', 0);
            this.$refs.monaco_source.setAllCode(this.code.data, 0);
            this.$refs.monaco_render.changeLanguage('javascript', 1);
            this.$refs.monaco_render.setAllCode(this.code.script_render, 1);
        }
    }
}
</script>

<style scoped>
.run-button {
    padding: 8px 30px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}
.run-button:hover {
    background-color: #0860ca;
}
.run-button:active {
    background-color: #033d8b;
}
.code-area {
    /* padding: 2%; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.tabs{
    height: 6%;
}
.tab-pane{
    height: 0;
}
:deep(.el-tabs__header){
  margin-bottom: 0 !important;
}

.title-line {
  display: flex;
  align-items: center;
  width: 94%;
  padding: 0 3%;
}

.title-line::before,
.title-line::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #000;
}

.title-line span {
  margin: 0 12px;
  font-weight: bold;
}

.bottom_block{
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>