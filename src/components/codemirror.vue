<template>
  <div class="app">
    <!-- 左侧代码展示区 -->
    <div class="left">
      <div class="panel">
        <div class="title">HTML</div>
        <pre class="code-view">{{ htmlCode }}</pre>
      </div>

      <div class="panel">
        <div class="title">CSS</div>
        <pre class="code-view">{{ cssCode }}</pre>
      </div>

      <div class="panel">
        <div class="title">JavaScript</div>
        <pre class="code-view">{{ jsCode }}</pre>
      </div>
    </div>

    <!-- 右侧预览区 -->
    <div class="right">
      <div class="toolbar">
        <span class="small">代码运行预览</span>
        <div class="controls">
          <button @click="runPreview" class="btn">运行</button>
          <button @click="downloadHTML" class="btn">下载 HTML</button>
        </div>
      </div>
      <iframe ref="preview" class="preview" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>
  </div>
</template>

<script>
import { html_code,css_code,js_code  } from '../common/common';
export default {
  name: "StaticCodePreview",
  data() {
    return {
      htmlCode: html_code(),

      cssCode: css_code(),

      jsCode: js_code(),
    };
  },
  mounted() {
    this.runPreview();
  },
  methods: {
    buildSrcdoc() {
      return `<!doctype html>
<html>
<head>
<meta charset='utf-8'>
<script src="https://d3js.org/d3.v7.min.js"><\/script>
<style>${this.cssCode}<\/style>
<\/head>
<body>
${this.htmlCode}
<script>${this.jsCode}<\/script>
<\/body>
<\/html>`;
    },

    runPreview() {
      this.$refs.preview.srcdoc = this.buildSrcdoc();
    },

    downloadHTML() {
      const blob = new Blob([this.buildSrcdoc()], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "page.html";
      a.click();
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  background: #0f1720;
}
.left {
  padding: 10px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}
.panel {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.title {
  padding: 6px 10px;
  background: #0b1220;
  color: #d1d5db;
  font-size: 14px;
}
.code-view {
  flex: 1;
  margin: 0;
  padding: 10px;
  overflow: auto;
  white-space: pre-wrap;
  background: #0f172a;
  color: #e2e8f0;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 0 0 8px 8px;
}
.right {
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: #111827;
}
.preview {
  flex: 1;
  border: 1px solid #333;
  border-radius: 8px;
  background: white;
}
.controls {
  display: flex;
  gap: 8px;
}
.btn {
  background: #1f2937;
  border: 1px solid #374151;
  color: #fff;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.small {
  font-size: 13px;
  color: #9ca3af;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
}
</style>