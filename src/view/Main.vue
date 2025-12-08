<template>
    <div class="container">
        <div style="height: 50px; width: 100%; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #ccc;">
            <h2>LLM based Chart to Code Platform</h2>
        </div>
        <div class="main">
            <div class="selector child_block">
                <Selector />
            </div>
            <div class="display child_block">
                <ImageDisplayer style="width: 100%;" :html_code="codeToRun"/>
            </div>
            <div class="code child_block">
                <CodeArea @code-run="handle_run"/>
            </div>
        </div>
    </div>
</template>

<script>
import Selector from '../components/Selector.vue';
import ImageDisplayer from '../components/ImageDisplayer.vue';
import CodeArea from '../components/CodeArea.vue';

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
        }
    },
    methods: {
        handle_run(code) {
            this.codeToRun = code;
            // Handle the code execution logic here
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
    width: 50%;
}
.code {
    width: 30%;
}
</style>