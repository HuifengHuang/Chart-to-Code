<template>
    <div class="title">
        <span>数据输入</span>
        <div style="height: 10px;"></div>
    </div>

    <div class="model-selector">
        <p style="margin: 20px;">生成模型:</p>
        <el-select v-model="selectedModel" placeholder="模型选择" style="width: 220px">
            <el-option
            v-for="item in Model_options"
            :key="item.value"
            :label="item.label" 
            :value="item.value"
            />
        </el-select>
    </div>
    <div class="image-selector">
        <p style="margin: 5px;">选择图片:</p>
        <div class="image-uploader">
            <div>
                <input
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    ref="fileInput"
                    style="display: none"
                />
                <button @click="$refs.fileInput.click()" class="upload-btn">
                    上传图片
                </button>
            </div>

        </div>
        <div style="display: flex;justify-content: center;">
            <button class="upload-btn" style="width: 100px;" @click="request_code()">
                请求代码
            </button>
        </div>
    </div>

    <div v-if="previewUrl" class="image-display">
        <img :src="previewUrl" alt="Uploaded image" class="preview-image" />
    </div>


</template>

<script>
import axios from "axios";
import { ElMessage } from 'element-plus'
export default {
    name: 'Selector',
    data() {
        return {
            imageFile: null,
            previewUrl: null,
            selectedModel: "",
            selectedLanguage: "",
            Model_options:[
                {value:"deepseek-v3", label:"deepseek-v3"},
                {value:"gemini-3-flash-preview", label:"gemini-3-flash"},
                {value:"gpt-4.1-mini", label:"gpt-4"},
            ],
        }
    },
    methods: {
        handleImageUpload(e) {
            const file = e.target.files[0];
            if (!file) return;

            this.imageFile = file;
            this.previewUrl = URL.createObjectURL(file);
        },
        async request_code(){
            if(!this.selectedModel || !this.imageFile){
                ElMessage({
                    message: '请选择图片、模型后再请求代码！',
                    type: 'warning',
                });
                return;
            }
            const formData = new FormData();
            formData.append("image", this.imageFile);
            formData.append("model_name", this.selectedModel);
            formData.append("language", 'D3.js');
            try {
                const res = await axios.post(
                "http://127.0.0.1:5001/upload",
                formData,
                {
                    headers: {
                    "Content-Type": "multipart/form-data"
                    }
                }
                );
                console.log("后端返回：", res.data.result);
                this.$emit('request-code', res.data.result);
            } catch (err) {
                console.error("上传失败：", err);
            }
        }
    }
}
</script>

<style scoped>
.image-uploader {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.upload-btn {
    padding: 10px 20px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.upload-btn:hover {
    background-color: #66b1ff;
}

.preview-image {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: contain;
}

.clear-btn {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #f56c6c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.clear-btn:hover {
    background-color: #f78989;
}

.model-selector{
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
}

.image-selector{
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
}

.title{
    margin: 3%;
    border-bottom: 1px solid gray;
}
.image-display{
    width: 100%;
    height: 55%;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}
</style>