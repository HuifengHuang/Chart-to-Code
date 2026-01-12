<template>
    <div class="title">
        <span>渲染结果</span>
        <div style="height: 10px;"></div>
    </div>
    <div style="flex-grow: 1; position: relative;">
      <iframe v-for="value in languages.value" v-show="value===language" :ref=value 
          sandbox="allow-scripts allow-same-origin" style="width: 100%;height: 100%;"></iframe>
      <div v-if="editorLoading.isLoading" class="loading-mask">
          <div class="spinner"></div>
          <p class="text">加载中...</p>
      </div>
    </div>
    
</template>

<script>
import { languages } from "monaco-editor";
import { editorLoading, iframe_html, languages } from "../global/global";
export default {
  name: "StaticCodePreview",
  props: {
    Codes: {
      type: Object,
      required: false,
      default: {}
    },
    language:{
      type: String,
      default: 'D3js'
    }
  },
  data() {
    return {
      htmlCode: '',
      cssCode: '',
      jsCode: '',
      input_code: {},
      editorLoading,
      languages,
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
      for(const item of languages.value){
        this.$refs.item.srcdoc = this.input_code.item;
      }
    }
  },
  watch: {
    Codes(newCode) {
      this.input_code = newCode;
      // iframe_html.iframe = this.$refs.preview;

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