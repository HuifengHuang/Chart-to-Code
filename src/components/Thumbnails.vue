<template>
    <div class="thumbnail_container">
        <div class="block" @click="handle_click('D3js')" :class="{highlight : current_language === 'D3js'}">
            <span>D3.js</span>
            <iframe ref="D3js_iframe" sandbox="allow-scripts allow-same-origin" style="width: 100%;height: 100%;"></iframe>
            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>
        <div class="block" @click="handle_click('ECharts')" :class="{highlight : current_language === 'ECharts'}">
            <span>ECharts</span>
            <iframe ref="ECharts_iframe" sandbox="allow-scripts allow-same-origin" style="width: 100%;height: 100%;"></iframe>
            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>
        <div class="block" @click="handle_click('Vega')" :class="{highlight : current_language === 'Vega'}">
            <span>Vega</span>
            <iframe ref="Vega_iframe" sandbox="allow-scripts allow-same-origin" style="width: 100%;height: 100%;"></iframe>
            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>
    </div>
</template>

<script>
import d3js_img from '../assets/D3jsDemo.png'
import echart_img from '../assets/EChartsDemo.png'
import vega_img from '../assets/VegaDemo.png'
import { editorLoading } from "../global/global";
import { create_chart_html } from '../common/common';
export default {
    name: 'Thumbnails',
    props: {
        D3js_code: {
            type: String,
            required: false,
            default: ''
        },
        ECharts_code: {
            type: String,
            required: false,
            default: ''
        },
        Vega_code: {
            type: String,
            required: false,
            default: ''
        },
    },
    data() {
        return {
            d3js_logo: d3js_img,
            echart_logo: echart_img,
            vega_logo: vega_img,
            editorLoading,
            current_language: "D3js",
        }
    },
    methods:{
        handle_click(language){
            this.$emit('select-language', language);
            this.current_language = language;
        }
    },
    watch:{
        D3js_code(newCode){
            this.$refs.D3js_iframe.srcdoc = create_chart_html(
                newCode.body, newCode.css, newCode.data, newCode.script_render,newCode.import_script
            )
        },
        ECharts_code(newCode){
            this.$refs.ECharts_iframe.srcdoc = create_chart_html(
                newCode.body, newCode.css, newCode.data, newCode.script_render,newCode.import_script
            );
        },
        Vega_code(newCode){
            this.$refs.Vega_iframe.srcdoc = create_chart_html(
                newCode.body, newCode.css, newCode.data, newCode.script_render,newCode.import_script
            );
        },
    }
}
</script>

<style scoped>
.thumbnail_container {
    display: flex;
    /* justify-content: center; */
    width: 100%;
    height: 100%;
}
.block {
    flex-grow: 1;
    height: auto;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 1%;
    margin: 1%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
._img {
    width: 100%;
    height: 80%;
    object-fit: contain;
}
.highlight{
    border: 2px solid #409eff;
}
</style>