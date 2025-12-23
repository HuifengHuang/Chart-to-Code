<template>
  <div
    ref="container"
    class="monaco-editor"
    :style="{
      height: height + '%',
      width: width + '%',
      fontSize: '18px'
    }"
  ></div>
</template>

<script>
import * as monaco from "monaco-editor";
import { toRaw } from "vue";

export default {
  name: "AcMonaco",

  props: {
    opts: {
      type: Object,
      default: () => ({}),
    },
    height: {
      type: Number,
      default: 80,
    },
    width: {
      type: Number,
      default: 33,
    },
  },

  data() {
    return {
      monacoEditor: null,
      monacoModel: null,
      initialized: false,
    };
  },

  mounted() {
    this.initEditor();
  },

  beforeUnmount() {
    if (this.monacoEditor) {
      this.monacoEditor.dispose();
      this.monacoEditor = null;
    }
  },

  methods: {
    /* ---------------- 初始化 ---------------- */

    initEditor() {
      this.$refs.container.innerHTML = "";

      // ⚠️ opts 只用于初始化
      this.monacoEditor = monaco.editor.create(
        this.$refs.container,
        toRaw(this.opts)
      );

      this.monacoModel = this.monacoEditor.getModel();

      this.initCustomLanguage();
      this.initTheme();

      this.initialized = true;
    },

    initCustomLanguage() {
      if (!this.opts.language) return;

      monaco.languages.register({ id: "myCustomLanguage" });

      monaco.languages.setMonarchTokensProvider("myCustomLanguage", {
        tokenizer: {
          root: [[/\$\_\$/, "keyword"]],
        },
      });

      monaco.editor.setModelLanguage(
        this.monacoModel,
        this.opts.language
      );
    },

    initTheme() {
      monaco.editor.defineTheme("myCustomTheme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#fbf8fd",
        },
      });

      monaco.editor.setTheme("myCustomTheme");
    },

    /* ---------------- 对外 API（安全） ---------------- */

    /** 整体替换代码（低频、安全） */
    setAllCode(code) {
      console.log("setAllCode:" + code)
      if (!this.monacoModel) return;
      const model = monaco.editor.getModels();
      model[0]?.setValue(code);
    },

    /** 追加代码（高频也安全） */
    appendCode(text) {
      if (!this.monacoModel) return;

      const line = this.monacoModel.getLineCount();
      const col = this.monacoModel.getLineMaxColumn(line);

      this.monacoModel.applyEdits([
        {
          range: new monaco.Range(line, col, line, col),
          text,
        },
      ]);

      this.monacoEditor.revealLine(
        this.monacoModel.getLineCount()
      );
    },

    /** 获取当前内容 */
    getValue() {
      return this.monacoModel
        ? this.monacoModel.getValue()
        : "";
    },

    /** 切换语言（安全） */
    setLanguage(lang) {
      if (!this.monacoModel) return;
      monaco.editor.setModelLanguage(this.monacoModel, lang);
    },
  },
};
</script>

<style scoped>
.monaco-editor {
  border: 1px solid #ddd;
}
</style>
