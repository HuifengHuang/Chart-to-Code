<template>
    <div class="title">
        <span>渲染结果</span>
        <div style="height: 10px;"></div>
    </div>
    <div style="flex-grow: 1; position: relative;">
      <iframe ref="preview" sandbox="allow-scripts allow-same-origin" style="width: 100%;height: 100%;"></iframe>
      <div v-if="editorLoading.isLoading" class="loading-mask">
          <div class="spinner"></div>
          <p class="text">Loading...</p>
      </div>
    </div>
    
</template>

<script>
import { default_html_code,default_css_code,default_js_code } from '../common/common';
import { editorLoading } from "../global/editorLoading";
export default {
  name: "StaticCodePreview",
  props: {
    Codes: {
      type: String,
      required: false,
      default: ''
    },
  },
  data() {
    return {
      // htmlCode: default_html_code(),
      // cssCode: default_css_code(),
      // jsCode: default_js_code(),
      htmlCode: '',
      cssCode: '',
      jsCode: '',
      input_code:'',
      editorLoading,
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
    runNewview(){
      this.$refs.preview.srcdoc = this.input_code;
    }
  },
  watch: {
    Codes(newCode) {
      this.input_code=newCode;
      console.log("HTML code updated:", newCode);
      this.runNewview();
    }
  }
};
</script>

<style scoped>
.title{
  margin: 1%;
  border-bottom: 1px solid gray;
  flex-direction: column;
}
</style>