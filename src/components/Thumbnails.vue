<template>
    <div class="thumbnail_container">
        <div class="block" @click="handle_click('D3js')" :class="{highlight : language === 'D3js'}">
            <span>D3.js</span>
            <!-- <iframe ref="D3js_iframe" sandbox="allow-scripts allow-same-origin" style="width: 100%;height: 100%;"></iframe> -->
            <img :src="iframeDocs.D3js" />
            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>
        <div class="block" @click="handle_click('echarts')" :class="{highlight : language === 'echarts'}">
            <span>ECharts</span>
            <img :src="iframeDocs.echarts" />
            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>
        <div class="block" @click="handle_click('vega')" :class="{highlight : language === 'vega'}">
            <span>Vega</span>
            <img :src="iframeDocs.vega" />
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
import { editorLoading, iframeDocs } from "../global/global";
export default {
    name: 'Thumbnails',
    props: {
        language:{
            type: String,
            required: true,
            default: "D3js"
        }
    },
    data() {
        return {
            d3js_logo: d3js_img,
            echart_logo: echart_img,
            vega_logo: vega_img,
            editorLoading,
            thumbnails: {},
            iframeDocs,
        }
    },

    methods:{
        handle_click(lang){
            this.$emit('select-language', lang);
        },
    },
    watch:{
        // D3js_code(newCode){
        //     // this.$refs.D3js_iframe.srcdoc = create_chart_html(
        //     //     newCode.body, newCode.css, newCode.data, newCode.script_render,newCode.import_script
        //     // )
        // },
        // ECharts_code(newCode){
        //     this.$refs.ECharts_iframe.srcdoc = create_chart_html(
        //         newCode.body, newCode.css, newCode.data, newCode.script_render,newCode.import_script
        //     );
        // },
        // Vega_code(newCode){
        //     this.$refs.Vega_iframe.srcdoc = create_chart_html(
        //         newCode.body, newCode.css, newCode.data, newCode.script_render,newCode.import_script
        //     );
        // },
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
    width: 30%;
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
.block img{
    width: 290px;
    height: 174px;
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