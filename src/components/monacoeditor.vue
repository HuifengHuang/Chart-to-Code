<template>
  <div
    ref="container"
    class="monaco-editor"
    :style="`height: ${height}vh;width:${width}%;font-size:18px`"
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
      default() {
        return {};
      },
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
      // 编辑器对象
      monacoEditor: {},
      oldValue: "",
      newValue: "",
    };
  },
  watch: {
    opts: {
      handler() {
        this.updateLanguage();
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$refs.container.innerHTML = "";
      this.monacoEditor = monaco.editor.create(this.$refs.container, this.opts);
      monaco.languages.register({ id: "myCustomLanguage" });

      // 设置语言的语法高亮
      monaco.languages.setMonarchTokensProvider("myCustomLanguage", {
        tokenizer: {
          root: [[/\$\_\$/, { token: "keyword" }]],
        },
      });
      monaco.editor.defineTheme("myCustomTheme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#fbf8fd", // 设置背景颜色
        },
      });

      // 应用自定义主题
      monaco.editor.setTheme("myCustomTheme");

      this.monacoEditor.onDidChangeModelContent(() => {
        this.$store.state.code = toRaw(this.monacoEditor).getValue();
        console.log(this.$store.state.code);
      });
    },
    get_value() {
      return toRaw(this.monacoEditor).getValue();
    },
    updateLanguage() {
      // let editorOptions = Object.assign(this.defaultOpts, this.opts)
      console.log(this.opts.language);
      monaco.editor.setModelLanguage(
        toRaw(this.monacoEditor.getModel()),
        this.opts.language
      );
    },
  },
};
</script>
