<template>
    <div class="Top">
        <monaco
            ref="monaco"
            :height="60"
            :width="100"
            :opts="opts"
            style="margin-top: 10px"
        ></monaco>
    </div>

</template>

<script>
import monaco from "../components/monacoeditor.vue";
export default {
  name: "App",
  components: { monaco},
  data() {
    return {
        opts: {
            value: "",
            readOnly: false,
            language: "html",
            theme: "vs",
            autoIndent: true, // 自动缩进
            fontSize: 20,
        },
    }
  }
}

</script>

<style scoped>
.Top{
    width: 50vw;
}
</style>