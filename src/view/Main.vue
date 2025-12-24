<template>
    <div class="container">
        <div style="height: 50px; width: 100%; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #ccc;">
            <h2>LLM based Chart to Code Platform</h2>
        </div>
        <div class="main">
            <div class="selector child_block">
                <Selector @request-code="handle_request_code"/>
            </div>
            <div class="display child_block">
                <ImageDisplayer style="width: 100%;" :Codes="codeToRun"/>
            </div>
            <div class="code child_block">
                <CodeArea @code-run="handle_run" :Codes="obj_code"/>
            </div>
        </div>
    </div>
</template>

<script>
import Selector from '../components/Selector.vue';
import ImageDisplayer from '../components/ImageDisplayer.vue';
import CodeArea from '../components/CodeArea.vue';
import { create_chart_html } from '../common/common';

export default {
    name: 'Main',
    components: {
        Selector,
        ImageDisplayer,
        CodeArea
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
    height: 98vh;
    width: 100%;
    flex-direction: column;
}
.main {
    height: 90%;
    width: auto;
    padding: 10px;
}
.child_block {
    border: 1px solid #111010;
    margin: 5px;
    height: 100%;
}
.selector {
    width: 20%;
    flex-direction: column;
}
.display {
    width: 40%;
}
.code {
    width: 40%;
}
</style>