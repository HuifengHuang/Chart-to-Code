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
                    <ImageDisplayer style="width: 100%;height: 100%;flex-direction: column;" 
                        :language="language" :Codes="codeToRun"/>
                </div>
                <div class="module" style="height: 30%;">
                    <Thumbnails @select-language="handle_select" :language="language"/>
                </div>
            </div>
            <div class="code child_block">
                <div class="module" style="height: 100%; width: 97%; flex-direction: column;">
                    <div class="child_title">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>设计面板</span>
                            <el-radio-group v-model="mode" size="small" fill="#409eff">
                                <el-radio-button label="Code" value="Code" />
                                <el-radio-button label="Graphical" value="Graphical" />
                            </el-radio-group>
                        </div>
                        <div style="height: 10px;"></div>
                    </div>
                    <CodeArea v-show="mode==='Code'" @code-run="handle_run" :Codes="obj_code" style="width: 100%;"/>
                    <GraphicalArea v-show="mode==='Graphical'" :Source_data="obj_code.data" style="width: 100%;"/>
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
import GraphicalArea from '../components/GraphicalArea.vue'
import { create_chart_html } from '../common/common';
import { languages } from "../global/global";

export default {
    name: 'Main',
    components: {
        Selector,
        ImageDisplayer,
        CodeArea,
        Talking,
        Thumbnails,
        GraphicalArea
    },
    data() {
        return {
            D3js_code: null,
            ECharts_code: null,
            Vega_code: null,
            codeToRun: {},
            whole_code: null,
            language: 'D3js',
            obj_code: {data: ['1']},
            mode: 'Code',
        }
    },
    methods: {
        handle_run(code) {
            // this.codeToRun = code;
            this.whole_code[this.language] = code;

            this.codeToRun[this.language] = create_chart_html(
                this.whole_code[this.language].body, this.whole_code[this.language].css, 
                this.whole_code[this.language].data, this.whole_code[this.language].script_render, 
                this.whole_code[this.language].import_script);
            // console.log(code);
        },
        handle_request_code(code) {
            console.log("handle_request_code收到代码：", code);
            // console.log("code.D3js：", code.D3js);
            this.whole_code = code;
            let temp = {};
            for(const item of languages.value){
                temp[item] = create_chart_html(
                    code[item].body, code[item].css, code[item].data, 
                    code[item].script_render, code[item].import_script);
            }
            this.codeToRun = temp;

            // this.codeToRun = create_chart_html(this.D3js_code.body, this.D3js_code.css, this.D3js_code.data, this.D3js_code.script_render, this.D3js_code.import_script);
            // 默认为D3.js
            this.obj_code = this.whole_code[this.language];
        },
        handle_select(language){
            // let selected_code = null;
            // if(language==='D3js')selected_code = this.D3js_code;
            // else if(language==='echarts')selected_code = this.ECharts_code;
            // else if(language==='vega')selected_code = this.Vega_code;
            this.language = language;
            this.obj_code =  this.whole_code[this.language];
        },
    }
}
</script>

<style scoped>
.container,
.main,
.child_block,
.module,
.title {
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
    min-width: 0;
}
.display {
    flex-grow: 1;
    flex-direction: column;
    min-width: 0;
}
.code {
    width: 30%;
    flex-direction: column;
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