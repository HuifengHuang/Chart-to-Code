<template>
    <div class="thumbnail_container">
        <div class="block" @click="handle_click('D3js')">
            <span>D3.js</span>
            <img :src="d3js_logo" class="_img"/>
        </div>
        <div class="block" @click="handle_click('ECharts')">
            <span>ECharts</span>
            <img :src="echart_logo" class="_img"/>
        </div>
        <div class="block" @click="handle_click('Vega')">
            <span>Vega</span>
            <img :src="vega_logo" class="_img"/>
        </div>
    </div>
</template>

<script>
import d3js_img from '../assets/D3jsDemo.png'
import echart_img from '../assets/EChartsDemo.png'
import vega_img from '../assets/VegaDemo.png'
export default {
    name: 'Thumbnails',
    data() {
        return {
            d3js_logo: d3js_img,
            echart_logo: echart_img,
            vega_logo: vega_img,
        }
    },
    methods:{
        handle_click(language){
            this.$emit('select-language', language);
        }
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
}
._img {
    width: 100%;
    height: 80%;
    object-fit: contain;
}
</style>