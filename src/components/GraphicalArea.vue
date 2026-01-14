<template>
    <div class="code-area">
        <!-- <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="1">源数据</el-menu-item>
            <el-menu-item index="2">渲染代码</el-menu-item>
            <el-menu-item index="3">整体代码</el-menu-item>
        </el-menu> -->
        <!-- <div class="title-line" style="margin: 10px 0 5px 0;">
            <span>源数据</span>
        </div> -->
        <div style="height: auto;width: 100%; position: relative;">
            <div class="attr-group">
                <div class="attr-title" @click="handle_collapse('source-data')">
                    <span>Source Data</span>
                    <span>></span>
                </div>
                <el-collapse-transition>
                    <div class="attr-content" v-show="collapse_values['source-data']">
                        <div class="data-list">
                            <div v-for="group in data_keeper" class="span_border" @click="choose_data(group)" :class="{'chosen': source_values.id===group['id']}">
                                <span style="margin: 0 5px;">id : {{ group['id'] }}</span>
                                <span style="margin: 0 5px;">class : {{ group['class'] }}</span>
                                <span style="margin: 0 5px;">x : {{ group['value']['x'] }}</span>
                                <span style="margin: 0 5px;">y : {{ group['value']['y'] }}</span>
                            </div>
                        </div>
                        <div style="margin-top: 10px;display: flex;">
                            <div class="value-group"><span>id: {{ source_values.id }}</span></div>
                            <div class="value-group"><span>x:</span><el-input v-model="source_values.x" style="width: 70px;"></el-input></div>
                            <div class="value-group"><span>y:</span><el-input v-model="source_values.y" style="width: 70px;"></el-input></div>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="attr-group">
                <div class="attr-title" @click="handle_collapse('bar-width')">
                    <span>Bar Width</span>
                    <span>></span>
                </div>
                <el-collapse-transition>
                    <div v-show="collapse_values['bar-width']">
                        <div style="margin-top: 10px;display: flex;">
                            <div class="value-group">
                                <span style="margin-left: 10px;">bar-width:</span>
                                <el-input v-model="render_values.bar_width" style="width: 70px;"></el-input>
                            </div>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="attr-group">
                <div class="attr-title" @click="handle_collapse('point-radius')">
                    <span>Point Radius</span>
                    <span>></span>
                </div>
                <el-collapse-transition>
                    <div v-show="collapse_values['point-radius']">
                        <div style="margin-top: 10px;display: flex;">
                            <div class="value-group">
                                <span style="margin-left: 10px;">point-radius:</span>
                                <el-input v-model="render_values.point_radius" style="width: 70px;"></el-input>
                            </div>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="attr-group">
                <div class="attr-title" @click="handle_collapse('circle-radius')">
                    <span>Circle Radius</span>
                    <span>></span>
                </div>
                <el-collapse-transition>
                    <div v-show="collapse_values['circle-radius']">
                        <div style="margin-top: 10px;display: flex;">
                            <div class="value-group">
                                <span style="margin-left: 10px;">inner-radius:</span>
                                <el-input v-model="render_values.circle_radius[0]" style="width: 70px;"></el-input>
                                <span style="margin-left: 10px;">outer-radius:</span>
                                <el-input v-model="render_values.circle_radius[1]" style="width: 70px;"></el-input>
                            </div>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>

        <!-- <div class="title-line" style="margin: 20px 0 5px 0;">
            <span>渲染代码</span>
        </div> -->

        <div style="height: auto;width: 100%; position: relative;">

            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>

        <div class="bottom_block">
            <el-button @click="keepCode" type="primary">保存</el-button>
            <el-button @click="runCode" type="primary">运行</el-button>
        </div>

    </div>
</template>

<script>
import { editorLoading } from "../global/global";
export default {
    name: 'GraphicalArea',
    props:{
        Source_data: {
            type: String,
            required: false,
            default: ''
        },
    },
    data() {
        return {
            isLoading: true,
            editorLoading,
            collapse_values: {
                "source-data": true,
                "bar-width": false,
            },
            data_keeper: JSON.parse(this.Source_data),
            source_values: {
                id: '',
                x: '',
                y: '',
            },
            render_values: {
                bar_width: '',
                point_radius: '',
                circle_radius: ['',''],
            }
        }
    },
    mounted() {
        const data = this.data_keeper;
        if(data.length>0){
            this.render_values.bar_width = data[0]['render']['bar-width'];
            this.render_values.point_radius = data[0]['render']['point-radius']; 
            this.render_values.circle_radius[0] = data[0]['render']['circle-radius']['in']; 
            this.render_values.circle_radius[1] = data[0]['render']['circle-radius']['out'];  
        }
    },
    methods: {
        handle_collapse(value){
            this.collapse_values[value] = (this.collapse_values[value])?false:true;
        },
        choose_data(group){
            this.source_values.id = group['id'];
            this.source_values.x = group['value']['x'];
            this.source_values.y = group['value']['y'];
        },
        keepCode(){
            this.data_keeper[parseInt(this.source_values.id)]['value'] = {
                x: this.source_values.x,
                y: this.source_values.y
            };
        },
    }

}
</script>

<style scoped>
.run-button {
    padding: 8px 30px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}
.run-button:hover {
    background-color: #0860ca;
}
.run-button:active {
    background-color: #033d8b;
}
.code-area {
    /* padding: 2%; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.title-line {
  display: flex;
  align-items: center;
  width: 94%;
  padding: 0 3%;
}
.title-line::before,
.title-line::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #000;
}
.title-line span {
  margin: 0 12px;
  font-weight: bold;
}

.bottom_block{
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.attr-group{
    display: flex;
    flex-direction: column;
    margin: 0 3%;
    background-color: #F8F8F8;
    min-height: 30px;
    border-top: 1px solid rgba(99, 99, 99, 0.3);
    border-bottom: 1px solid rgba(99, 99, 99, 0.3);
}
.attr-title{
    min-height: 30px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2%;
    border-bottom: 1px solid rgba(99, 99, 99, 0.3);
}
.attr-content{
    margin: 0 2% 2% 2%;
    background-color: #FFF;
}

.data-list{
    height: 200px;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(99, 99, 99, 0.3);
    overflow: auto;
}
.span_border{
    padding-left: 5px;
    cursor: pointer;
    border-top: 1px solid rgba(99, 99, 99, 0.2);
    border-bottom: 1px solid rgba(99, 99, 99, 0.2);
}
.span_border:hover{
    background-color: rgba(99, 99, 99, 0.8);
}
.chosen{
    background-color: rgba(99, 99, 99, 0.8);
}

.value-group{
    display: flex;
    margin: 5px 5px;
}
.value-group el-input{
    width: 30px;
}
</style>