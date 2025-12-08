<template>
    <iframe ref="preview" sandbox="allow-scripts allow-same-origin"></iframe>
</template>

<script>
import { html_code,css_code,js_code  } from '../common/common';
export default {
  name: "StaticCodePreview",
  props: {
    html_code: String,
  },
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
    runNewview(){
        this.$refs.preview.srcdoc = this.html_code;
    }
  },
  watch: {
    html_code(newCode) {
      this.htmlCode = newCode;
      console.log("HTML code updated:", newCode);
      this.runNewview();
    }
  }
};
</script>