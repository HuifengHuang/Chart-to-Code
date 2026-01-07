<template>
    <div class="title">
        <span>模型对话</span>
        <div style="height: 10px;"></div>
    </div>

    <div style="width: 100%;height: 90%;display: flex;align-items: center;flex-direction: column;">
        <div id="talking-page">
            <div v-for="sentence in dialogue_content">
                <div v-if="sentence.speaker === 'model'" class="sentence_left">
                    <img :src="AI_logo" class="_img"/>
                    <div style="margin-left: 10px" class="sentence_text">
                        <el-text class="mx-1">{{ sentence.content }}</el-text>
                    </div>
                </div>
                <div v-else-if="sentence.speaker === 'user'" class="sentence_right">
                    <div style="margin-right: 10px" class="sentence_text">
                        <el-text class="mx-1">{{ sentence.content }}</el-text>
                    </div>
                    <img :src="user_logo" class="_img"/>
                </div>
            </div>
        </div>
        <div style="justify-content: space-between; margin-top: 10px;">
            <el-input v-model="inputText" style="width: 300px" placeholder="Please input" 
                 type="textarea" :autosize="{ minRows: 1, maxRows: 1 }"/>
            <div style="width: 30px;margin-left: 15px;"> 
                <transition name="fade">
                    <button :class="['btn', { 'btn-green': hasInput }]" @click="submitText()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"
                             stroke-width="2">
                            <path
                                d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                                :fill="hasInput == 1 ? 'white' : 'rgba(0, 0, 0, 0.2)'"></path>
                        </svg>
                    </button>
                </transition>
            </div>
        </div>
    </div>




</template>

<script>
import axios from "axios";
import { ElMessage } from 'element-plus'
import AI_img from '../assets/AI.png'
import user_img from '../assets/user.png'
import { ref } from 'vue'
export default {
    name: 'Talking',
    data() {
        return {
            AI_logo: AI_img,
            user_logo: user_img,
            inputText: '',
            dialogue_content: [
                {
                    speaker: "model",
                    content: "你好，我是您的AI助手，请问有什么需要帮助的吗？"
                },
                {
                    speaker: "user",
                    content: "我需要一份html文件。"
                },
            ]
        }
    },
    computed: {
        hasInput () {
            return this.inputText.trim() !== '';
        }
    },
    methods: {
        handleImageUpload(e) {
            const file = e.target.files[0];
            if (!file) return;

            this.imageFile = file;
            this.previewUrl = URL.createObjectURL(file);
        },
        submitText(){
            this.dialogue_content.push({
                speaker: "user",
                content: this.inputText
            });
            this.inputText = '';
        }
    }
}
</script>

<style scoped>
div{
    display: flex;
}
.title{
    margin: 3%;
    border-bottom: 1px solid gray;
    flex-direction: column;
}

#talking-page{
    width: 95%;
    height: 88%;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 5px;
}
.btn {
    height: 31px;
    width: 31px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 6px;
    float: right;
    border-radius: 6px;
}

.btn-green {
    border: 1px solid rgb(91, 155, 255);
    background-color: rgb(91, 155, 255);
    cursor: pointer;
}

.sentence_left{
    width: 100%;
    justify-content: flex-start;
    padding: 3%;
}
.sentence_right{
    width: 100%;
    justify-content: flex-end;
    padding: 3%;
}
.sentence_text{
    padding: 5px;
    width: 75%;
    background-color: #f5f7fa;
}
._img{
    height: 40px;
    width: 40px;
    object-fit: contain;
}
</style>