<template>
    <a-modal :visible="visible" title="修改头像" :width="800" destroyOnClose :maskClosable="false" :footer="null" @cancel="cancel">
        <div class="wrap">
            <a-spin :spinning="spinning">
                <div class="cropperBox">
                    <vueCropper
                        ref="cropper"
                        :img="getImgAbsPath(img)"
                        :outputSize="outputSize"
                        :outputType="outputType"
                        :autoCropWidth="autoCropWidth"
                        :autoCropHeight="autoCropHeight"
                        :info="true"
                        :full="full"
                        :canMove="canMove"
                        :canScale="canScale"
                        :canMoveBox="canMoveBox"
                        :original="original"
                        :autoCrop="autoCrop"
                        :fixed="fixed"
                        :high="high"
                        :fixedNumber="fixedNumber"
                        :centerBox="centerBox"
                        :infoTrue="infoTrue"
                        :fixedBox="fixedBox"
                        :mode="mode"
                        @realTime="realTime"
                    />
                    <div class="optionBox">
                        <a-upload
                            name="file"
                            :showUploadList="false"
                            :before-upload="beforeUpload"
                            @change="upload"
                        >
                            <a-button icon="upload">选择图片</a-button>
                        </a-upload>
                        <a-button icon="plus" @click="zoomBig"></a-button>
                        <a-button icon="minus" @click="zoomSmall"></a-button>
                        <a-button icon="redo" @click="rotateForward"></a-button>
                        <a-button icon="undo" @click="rotateReverse"></a-button>
                    </div>
                </div>
                <div class="previewBox">
                    <div class="previewImg"><img :src="getImgAbsPath(previewImg)" :style="previewStyle"></div>
                    <a-button class="saveBtn" type="primary" :loading="submitDisabled" @click="saveAvatar">保存</a-button>
                </div>
            </a-spin>
        </div>
    </a-modal>
</template>

<script>
import Vue from 'vue'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

import { uploadFile } from '@/api/common'
import { updateAdmin } from '@/api/admin'
import { getImgAbsPath } from 'utils/util'

import { uploadUrl, uploadHeaders } from 'config/baseUrl'

export default {
    name: 'avatarUpload',
    props: {
        visible: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
    },
    data () {
        return {
            getImgAbsPath,
            uploadUrl,
            uploadHeaders,
            file: {},
            submitDisabled: false,
            img: '', // 原始图片
            previewImg: '', // 预览图片
            previewStyle: '',  // 预览样式
            outputSize: 0.8,  // 裁剪生成图片的质量  	0.1 - 1
            outputType: 'jpg',  // 裁剪生成图片的格式  jpeg || png || webp
            full: false,  // 是否输出原图比例的截图,false输出裁剪大小
            autoCropWidth: 180, // 默认生成截图框宽度
            autoCropHeight: 180, // 默认生成截图框高度
            canScale: true,   // 图片是否允许滚轮缩放
            canMove: true,   // 上传图片是否可以移动
            canMoveBox: true,   // 截图框能否拖动
            original: true,   // 上传图片按照原始比例渲染
            autoCrop: true,   // 是否默认生成截图框
            high: true,   // 是否按照设备的dpr 输出等比例图片
            fixed: true,   // 	是否开启截图框宽高固定比例
            fixedNumber: [1, 1],   // 截图框的宽高比例  [宽度, 高度]
            centerBox: false,   // 	截图框是否被限制在图片里面
            infoTrue: false,   // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            fixedBox: true,   // 固定截图框大小 不允许改变
            mode: 'contain',   // 图片默认渲染方式  contain , cover, 100px, 100% auto
            spinning: false,  // 加载上传的图片loading
        }
    },
    methods: {
        cancel() {
            this.submitDisabled = false;
            this.$emit('cancel');
        },
        realTime(data) {
            this.previewImg = data.url;
            this.previewStyle = data.img;
        },
        saveAvatar() {
            if (!this.img) {
                this.$emit('cropper-done', '');
            } else {
                this.submitDisabled = true;
                this.$refs.cropper.getCropBlob(data => { // 生成环境不能使用mock数据，否则获取不到图片
                    // console.log('获取截图的Blob 数据', data);
                    // let blobImg = window.URL.createObjectURL(data);
                    // console.log('blobImg', blobImg);
                    (async () => {
                        const formData = new FormData();
                        formData.append('file', data, this.file.name);
                        formData.append('state', 1);
                        const uploadData = await uploadFile(formData);
                        if (uploadData.code == '200') {
                            const url = uploadData.data.src + '/' + uploadData.data.filename;
                            const updateData = await updateAdmin({id: JSON.parse(sessionStorage.getItem('user')).id, avatar: url});
                            if (updateData.code == 200) {
                                this.$message.success('更新头像成功!', 1, () => {
                                    this.img = '';
                                    this.previewImg = '';
                                    this.previewStyle = '';
                                    this.submitDisabled = false;
                                    this.$emit('cropper-done', url);
                                })
                            }
                        }
                    })()
                })
            }
        },
        beforeUpload(file) {
            this.file = file;
            return false;
        },
        async upload() {
            const formData = new FormData();
            formData.append('file', this.file);
            const data = await uploadFile(formData);
            if (data.code == '200') {
                this.$message.success('上传成功', 1);
                this.spinning = true;
                const _img = new Image();
                _img.onload = () => {
                    if (_img.complete) {
                        this.spinning = false;
                        // this.img = this.previewImg = data.data.src + '/' + data.data.filename;  // dev
                        this.img = this.previewImg = getImgAbsPath(data.data.src + '/' + data.data.filename);  // product
                    }
                }
                _img.src = getImgAbsPath(data.data.src + '/' + data.data.filename);
            }
        },
        zoomBig() {
            if (!this.img) return;
            this.$refs.cropper.changeScale(2);
        },
        zoomSmall() {
            if (!this.img) return;
            this.$refs.cropper.changeScale(-2);
        },
        rotateForward() {
            if (!this.img) return;
            this.$refs.cropper.rotateRight();
        },
        rotateReverse() {
            if (!this.img) return;
            this.$refs.cropper.rotateLeft();
        },
    }
};
</script>
<style scoped>
.wrap {
    width: 100%;
    height: 350px;
}
.cropperBox {
    float: left;
    position: relative;
    width: 50%;
    height: 300px;
}
.optionBox {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.optionBox .ant-btn {
    margin-right: 15px;
}
.previewBox {
    float: right;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.previewImg {
    width: 180px;
    height: 180px;
    margin: 60px auto;
	border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 4px #ccc;
}
.previewImg img {
    max-width: none;
}
.saveBtn {
    margin: 0 auto;
}
</style>
