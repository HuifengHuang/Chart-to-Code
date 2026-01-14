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
        <div class="title-line" style="margin: 10px 0 5px 0;">
            <span>源数据</span>
        </div>
        <div style="height: auto;width: 100%; position: relative;">
            <div class="attr-group">
                <div class="attr-title" @click="handle_collapse('source-data')">
                    <span>Source Data</span>
                    <span>></span>
                </div>
                <el-collapse-transition>
                    <div class="attr-content" v-show="collapse_values['source-data']">
                        <div class="data-list">
                            <div v-for="group in JSON.parse(Source_data)" class="span_border">
                                <span v-for="(value, key) in group" style="margin: 0 5px;"
                                    >{{ key }} : {{ value }}</span>
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

        <div class="title-line" style="margin: 20px 0 5px 0;">
            <span>渲染代码</span>
        </div>

        <div style="height: auto;width: 100%; position: relative;">

            <div v-if="editorLoading.isLoading" class="loading-mask">
                <div class="spinner"></div>
                <p class="text">加载中...</p>
            </div>
        </div>

        <div class="bottom_block">
            <el-button @click="runCode" type="primary">保存</el-button>
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
            type: Array,
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
            }
        }
    },
    methods: {
        handle_collapse(value){
            this.collapse_values[value] = (this.collapse_values[value])?false:true;
        }
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
    margin: 1% 3%;
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
    border-top: 1px solid rgba(99, 99, 99, 0.2);
    border-bottom: 1px solid rgba(99, 99, 99, 0.2);
}
</style>