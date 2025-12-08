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
</template>

<script>
export default {
    name: 'Selector',
    data() {
        return {
            imageUrl: null
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
</style>