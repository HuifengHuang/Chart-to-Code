<template>
    <div class="title">
        <span>渲染结果</span>
        <div style="height: 10px;"></div>
    </div>
    <div style="flex-grow: 1; position: relative;">
      <iframe ref='D3js' sandbox="allow-scripts allow-same-origin" 
          style="width: 1000px;height: 600px;" :class="{'hidden-capture': language!='D3js'}"></iframe>
      <iframe ref='echarts' sandbox="allow-scripts allow-same-origin" 
          style="width: 1000px;height: 600px;" :class="{'hidden-capture': language!='echarts'}"></iframe>
      <iframe ref='vega' sandbox="allow-scripts allow-same-origin" 
          style="width: 1000px;height: 600px;" :class="{'hidden-capture': language!='vega'}"></iframe>
      <div v-if="editorLoading.isLoading" class="loading-mask">
          <div class="spinner"></div>
          <p class="text">加载中...</p>
      </div>
    </div>
    
</template>

<script>
import { editorLoading, languages, iframeDocs } from "../global/global";
import { sleep } from "../common/common"
import html2canvas from "html2canvas";
import { tr } from "element-plus/es/locales.mjs";
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
      for(const item of languages.value){
        this.$refs[item].srcdoc = this.buildSrcdoc();
      }
      // this.$refs.preview.srcdoc = this.buildSrcdoc();
    },
    async runNewview(){
      for(const item of languages.value){
        this.$refs[item].srcdoc = this.input_code[item];
        this.generateThumbnail(item, this.$refs[item]);
      }
    },
    async generateThumbnail(item, iframe) {
      await sleep(1000);
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const canvas = await html2canvas(iframeDoc.body, {
          scale: 1,     // 关键：直接生成缩略图
          useCORS: true
      });
      iframeDocs[item] = canvas.toDataURL("image/png");
      // console.log("item:" + item)
      // console.log(iframeDocs[item])
    }
  },
  watch: {
    Codes: {
      handler(newCode){
        this.input_code = newCode;
        // iframe_html.iframe = this.$refs.preview;
        console.log("HTML code updated:", newCode);
        this.runNewview();
      },
      deep: true
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
.hidden-capture {
  position: fixed;
  left: -99999px;
  top: 0;
  width: 800px;
  height: 500px;
}

</style>