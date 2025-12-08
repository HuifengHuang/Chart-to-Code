<template>
    <div class="code-area">
        <button @click="runCode" class="run-button">Run</button>
        <textarea
            v-model="code"
            placeholder="Enter your code here..."
            class="textarea"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: 'CodeArea',
    data() {
        return {
            code: ''
        }
    },
    methods: {
        runCode() {
            // Emit the code to parent component or handle it as needed
            this.$emit('code-run', this.code);
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
    height: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
    resize: none;
}
</style>