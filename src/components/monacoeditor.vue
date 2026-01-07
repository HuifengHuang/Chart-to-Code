<template>
  <div
    ref="container"
    class="monaco-editor"
    :style="{
      height: height + '%',
      width: width + '%',
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

      this.initialized = true;
    },

    /** 重置当前内容 */
    setAllCode(code, modelIndex) {
      console.log("setAllCode:" + code)
      const models = monaco.editor.getModels();
      models[modelIndex]?.setValue(code);
    },

    /** 获取当前内容 */
    getValue() {
      const model = monaco.editor.getModels();
      return model[0]?.getValue();
    },

    changeLanguage(language, modelIndex) {
      monaco.editor.setModelLanguage(monaco.editor.getModels()[modelIndex], language);
    },

    highlightLines(start, end) {
      highlightDecorations = monaco.editor.deltaDecorations(
        highlightDecorations,
        [
          {
            range: new monaco.Range(start, 1, end, 1),
            options: {
              isWholeLine: true,
              className: 'my-highlight-line'
            }
          }
        ]
      );
    }
  },
};
</script>

<style scoped>
.monaco-editor {
  border: 1px solid #ddd;
}

.my-highlight-line {
  background: rgba(255, 230, 150, 0.6);
}
</style>
