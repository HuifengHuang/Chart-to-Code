<template>
    <div class="image-uploader">
        <div class="upload-area">
            <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                ref="fileInput"
                style="display: none"
            />
            <button @click="$refs.fileInput.click()" class="upload-btn">
                选择图片
            </button>
        </div>

        <div v-if="imageUrl" class="image-display">
            <img :src="imageUrl" alt="Uploaded image" class="preview-image" />
        </div>
    </div>
    <div class="model-selector">
        <p style="margin: 5px;">生成模型:</p>
        <el-select v-model="selectedModel" placeholder="模型选择" style="width: 300px">
            <el-option
            v-for="item in Model_options"
            :key="item.value"
            :label="item.label" 
            :value="item.value"
            />
        </el-select>
    </div>
    <div class="languege-selector">
        <p style="margin: 5px;">绘图工具:</p>
        <el-select v-model="selectedLanguege" placeholder="语言选择" style="width: 300px">
            <el-option
            v-for="item in Languege_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
    </div>

    <div style="display: flex;justify-content: center;">
        <button class="upload-btn" style="width: 100px;">
            请求代码
        </button>
    </div>

</template>

<script>
export default {
    name: 'Selector',
    data() {
        return {
            imageUrl: null,
            selectedModel: "",
            selectedLanguege: "",
            Model_options:[
                {value:"DeepSeek", label:"DeepSeek"},
                {value:"ChatGPT", label:"ChatGPT"},
                // {value:"ChatGPT", label:"ChatGPT"},
            ],
            Languege_options:[
                {value:"D3.js", label:"D3.js"},
                {value:"eChart", label:"eChart"},
                {value:"Vega", label:"Vega"},
            ]
        }
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.imageUrl = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },
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
    max-width: 300px;
    margin-top: 20px;
    border-radius: 4px;
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
    height: 100px;
    justify-content: center;
    align-items: center;
}

.languege-selector{
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
}
</style>