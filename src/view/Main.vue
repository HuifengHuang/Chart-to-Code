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
                    <ImageDisplayer style="width: 100%;height: 100%;" :Codes="codeToRun"/>
                </div>
                <div class="module" style="height: 30%; flex-direction: column;">
                    <!-- <ImageDisplayer style="width: 100%;height: 100%;" :Codes="codeToRuns"/> -->
                </div>
            </div>
            <div class="code child_block">
                <div class="module" style="height: 100%; width: 100%; flex-direction: column;">
                    <CodeArea @code-run="handle_run" :Codes="obj_code" style=""/>
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
import { create_chart_html } from '../common/common';

export default {
    name: 'Main',
    components: {
        Selector,
        ImageDisplayer,
        CodeArea,
        Talking
    },
    data() {
        return {
            codeToRun: '',
            obj_code: null,
        }
    },
    methods: {
        handle_run(code) {
            this.codeToRun = code;
            // Handle the code execution logic here
        },
        handle_request_code(code) {
            console.log("handle_request_code收到代码：", code);
            this.codeToRun = create_chart_html(code.body, code.css, code.data, code.script_render, code.import_script);
            this.obj_code = code;
        }
    }
}
</script>

<style scoped>

div {
    display: flex;
}
.container {
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    overflow: hidden;
}
.title{
    height: 4%; 
    width: 100%; 
    align-items: center; 
    padding-left: 1%;
    border-bottom: 1px solid #ccc;
    background-color: #373737;
    color: #FFF;
}
.main {
    height: 96%; 
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
}
.code {
    width: 30%;
}
.module{
    border-style: solid;
    border-color: #d3dce6;
    border-width: 0.5px;
    border-radius: 3px;
    box-shadow: 1px 2px 3px 1px #bdbaba;
    margin: 0.5vw;
}
</style>