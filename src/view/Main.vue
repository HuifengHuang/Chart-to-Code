<template>
    <div class="container">
        <div class="title">
            <h3>LLM based Chart to Code Platform</h3>
        </div>
        <div class="main">
            <div class="selector child_block">
                <div class="module" style="height: 40%;flex-direction: column;">
                    <Selector @request-code="handle_request_code"/>
                </div>
                <div class="module" style="height: 60%;flex-direction: column;">
                    <Talking/>
                </div>
                
            </div>
            <div class="display child_block">
                <div class="module" style="height: 70%; flex-direction: column;">
                    <ImageDisplayer style="width: 100%;height: 100%;flex-direction: column;" :Codes="codeToRun"/>
                </div>
                <div class="module" style="height: 30%;">
                    <Thumbnails @select-language="handle_select"/>
                </div>
            </div>
            <div class="code child_block">
                <div class="module" style="height: 100%; width: 100%; flex-direction: column;">
                    <div class="child_title">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>设计面板</span>
                            <el-radio-group v-model="mode" size="small" fill="#409eff">
                                <el-radio-button label="Code" value="Code" />
                                <el-radio-button label="Design" value="Design" />
                            </el-radio-group>
                        </div>
                        <div style="height: 10px;"></div>
                    </div>
                    <CodeArea v-show="mode==='Code'" @code-run="handle_run" :Codes="obj_code" style=""/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Selector from '../components/Selector.vue';
import ImageDisplayer from '../components/ImageDisplayer.vue';
import Talking from '../components/Talking.vue';
import CodeArea from '../components/CodeArea.vue';
import Thumbnails from '../components/Thumbnails.vue';
import { create_chart_html } from '../common/common';

export default {
    name: 'Main',
    components: {
        Selector,
        ImageDisplayer,
        CodeArea,
        Talking,
        Thumbnails
    },
    data() {
        return {
            D3js_code: null,
            ECharts_code: null,
            Vega_code: null,
            codeToRun: null,
            obj_code: null,
            mode: 'Code',
        }
    },
    methods: {
        handle_run(code) {
            this.codeToRun = code;
            // Handle the code execution logic here
        },
        handle_request_code(code) {
            console.log("handle_request_code收到代码：", code);
            console.log("code.D3js：", code.D3js);
            this.D3js_code = code.D3js;
            this.ECharts_code = code.ECharts;
            this.Vega_code = code.Vega;
            // 默认为D3.js
            this.codeToRun = create_chart_html(this.D3js_code.body, this.D3js_code.css, this.D3js_code.data, this.D3js_code.script_render, this.D3js_code.import_script);
            this.obj_code = this.D3js_code;
        },
        handle_select(language){
            let selected_code = null;
            if(language==='D3js')selected_code = this.D3js_code;
            else if(language==='ECharts')selected_code = this.ECharts_code;
            else if(language==='Vega')selected_code = this.Vega_code;
            this.codeToRun = create_chart_html(selected_code.body, selected_code.css, selected_code.data, selected_code.script_render, selected_code.import_script);
            this.obj_code = selected_code;
        },
    }
}
</script>

<style scoped>
.container,
.main,
.child_block,
.module {
    display: flex;
}

.container {
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    overflow: hidden;
}
.title{
    height: 5%; 
    width: 100%; 
    align-items: center; 
    padding-left: 1%;
    border-bottom: 1px solid #ccc;
    background-color: #373737;
    color: #FFF;
}
.main {
    height: 95%; 
    width: auto;
}
.child_block {
    /* border: 1px solid #111010; */
    height: 100%;
}
.selector {
    width: 20%;
    flex-direction: column;
}
.display {
    flex-grow: 1;
    flex-direction: column;
    min-width: 0;
}
.code {
    width: 35%;
    min-width: 0;
}
.module{
    border-style: solid;
    border-color: #d3dce6;
    border-width: 0.5px;
    border-radius: 3px;
    box-shadow: 1px 2px 3px 1px #bdbaba;
    margin: 0.5vh 0.3vw;
}
.child_title{
    margin: 2%;
    border-bottom: 1px solid gray;
    flex-direction: column;
}
</style>