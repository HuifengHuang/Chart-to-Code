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
                <div class="attr-title" @click="handle_collapse('legend')">
                    <span>Legend</span>
                    <span>></span>
                </div>
                <el-collapse-transition>
                    <div class="attr-content" style="padding: 1% 5%;" v-show="collapse_values['legend']">
                        <div class="lenged-item" v-for="item in legend_test">
                            <span style="margin-right: 1%;">Label:</span>
                            <svg style="width: 20px;height: 20px;" viewBox="0 0 100 100">
                                <path :d="cube_path" :fill="item.color" />
                            </svg>
                            <el-input style="height: 25px;width: 200px;margin-left: 1%;" v-model="item.label"></el-input>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="attr-group">
                <div class="attr-title" @click="handle_collapse('title')">
                    <span>Title</span>
                    <span>></span>
                </div>
                <el-collapse-transition>
                    <div class="attr-content" style="padding: 1% 5%;" v-show="collapse_values['title']">
                        <div class="lenged-item" v-for="item in title_test">
                            <span style="margin-right: 1%;width: 50px;">{{ item.label }}:</span>
                            <el-input style="height: 25px;width: 200px;margin-left: 1%;" v-model="item.value"></el-input>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="attr-group">
                <div class="attr-title" @click="handle_collapse('source-data')">
                    <span>Source Data</span>
                    <span>></span>
                </div>
                <el-collapse-transition>
                    <div class="attr-content" v-show="collapse_values['source-data']">
                        <div class="data-list" v-if="data_keeper.length>0">
                            <div v-for="group in data_keeper" class="span_border" @click="choose_data(group)" :class="{'chosen': source_values.id===group['id']}">
                                <span style="margin: 0 5px;">id : {{ group['id'] }}</span>
                                <span style="margin: 0 5px;">class : {{ group['class'] }}</span>
                                <span style="margin: 0 5px;">x : {{ group.value.x }}</span>
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
import { tr } from "element-plus/es/locales.mjs";
import { editorLoading } from "../global/global";
export default {
    name: 'GraphicalArea',
    props:{
        Source_data: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
            isLoading: true,
            editorLoading,
            collapse_values: {
                "source-data": true,
                "legend": true,
                "title": true,
            },
            data_keeper: '',
            source_values: {
                id: '',
                x: '',
                y: '',
            },
            render_values: {
                bar_width: '',
                point_radius: '',
                circle_radius: ['','']
            },
            legend_test:[
                {label:"large", color:"gray"},
                {label:"medium", color:"red"},
                {label:"small", color:"green"}
            ],
            title_test:[
                {label:"title", value:"Book sale volumes"},
                {label:"x-axis", value:"Days"},
                {label:"y-axis", value:"Sales"}
            ]
        }
    },
    computed: {
        cube_path() {
            return 'M10 10 L90 10 L90 90 L10 90 Z';
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
        runCode(){

        }
    },
    watch:{
        Source_data:{
            handler(newValue){
                this.data_keeper = JSON.parse(newValue);
                console.log(this.data_keeper);
                if(newValue.length>0){
                    this.render_values.bar_width = this.data_keeper[0]['render']['bar-width'];
                    this.render_values.point_radius = this.data_keeper[0]['render']['point-radius']; 
                    this.render_values.circle_radius[0] = this.data_keeper[0]['render']['circle-radius']['in']; 
                    this.render_values.circle_radius[1] = this.data_keeper[0]['render']['circle-radius']['out'];  
                }
            }
        },
        deep: true
    },
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
    /* border-bottom: 1px solid rgba(99, 99, 99, 0.3); */
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

.lenged-item{
    height: 25px;
    margin: 3px;
    display: flex;
    align-items: center;
}
</style>