<template>
    <div class="code-area">
        <monaco
            ref="monaco"
            :height="95"
            :width="100"
            :opts="opts"
            :newCode="newCode"
            style="margin-top: 10px"
        ></monaco>
        <button @click="runCode" class="run-button">Run</button>
    </div>
</template>

<script>
import monaco from "../components/monacoeditor.vue";
export default {
    name: 'CodeArea',
    components: { monaco},
    props:{
        Codes: {
            type: String,
            required: false,
            default: ''
        },
    },
    data() {
        return {
            code: this.Codes,
            opts: {
                value: `
                console.log("aaa")`,
                readOnly: false,
                language: "html",
                theme: "vs",
                autoIndent: true, // 自动缩进
                fontSize: 20,
            },
            newCode: '',
        }
    },
    methods: {
        runCode() {
            // Emit the code to parent component or handle it as needed
            // this.$emit('code-run', this.code);
            this.$refs.monaco.setAllCode(
                "console.log('Hello Monaco');"
            );
        }
    },
    watch:{
        Codes(newCode) {
            this.code = newCode;
            // this.$refs.monaco.setAllCode(
            //     "console.log('Hello Monaco');"
            // );
            console.log("CodeArea收到代码：", newCode);
        }
    }
}
</script>

<style scoped>
.run-button {
    padding: 8px 16px;
    background-color: #0969da;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    margin: 10px;
    transition: background-color 0.2s;
}
.run-button:hover {
    background-color: #0860ca;
}
.run-button:active {
    background-color: #033d8b;
}
.code-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.textarea {
    box-sizing: border-box;
    width: 100%;
    height: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
    resize: none;
}
</style>