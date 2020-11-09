<template>
    <div>
        <a-upload
			name="files"
            multiple
            :list-type="listType"
            :accept="acceptType"
            :file-list="uploadList"
            :before-upload="beforeUpload"
            :transform-file="transformFile"
            :remove="remove"
            @preview="handlePhotoPreview"
            @change="handleFileUpload"
        >
            <template v-if="showUploadBtn">
                <div v-if="textType === 'button'">
                    <a-button><UploadOutlined />上传</a-button>
                    <span class="upload-tip">只能上传 {{acceptList}}</span>
                </div>
                <div v-else>
                    <LoadingOutlined v-if="uploading" />
                    <PlusOutlined v-else />
                    <div class="ant-upload-text">上传</div>
                </div>
            </template>
        </a-upload>
        <a-modal
            :visible="photoPreviewVisible"
            :footer="null"
            @cancel="handlePhotopreviewCancel"
        >
            <img alt="" style="width: 100%" :src="getImgAbsPath(previewPhoto)" />
        </a-modal>
    </div>
</template>
<script>
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { uploadMultiFile } from '@/api/common'
import { getImgAbsPath, deepCopy } from 'utils/util'

// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

export default {
	name: 'bulkUpload',
	props: {
        dataList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        originIds: { // 默认图片id组
            type: Array,
            default: function() {
                return [];
            }
        },
        savedIds: { // 记录最终保存的资源uid state 0 => 1
            type: Array,
            default: function() {
                return [];
            }
        },
        deletedIds: { // 记录更新时被删除的资源id state 1 => 0
            type: Array,
            default: function() {
                return [];
            }
        },
        maxUploadLimit: {
            type: Number,
            default: function() {
                return 5;
            }
        },
        listType: {
            type: String,
            default: function() {
                return 'picture-card';
            }
        },
        textType: {
            type: String,
            default: function() {
                return 'text'
            }
        },
        acceptType: {
            type: String,
            default: function() {
                return 'image/*';
            }
        },
        acceptList: {
            type: String,
            default: function() {
                return 'jpg, jpeg, png, gif';
            }
        },
    },
    data() {
        return {
            getImgAbsPath,
            uploading: false,  // 上传中
			bulkUploadReadyCount: 0,
            photoPreviewVisible: false,
            previewPhoto: '',
            uploadList: [],  // 上传列表
        };
    },
    computed: {
        _savedIds: {
            get() {
                return this.savedIds;
            },
            set(val) {
                this._savedIds = val;
            }
        },
        _deletedIds: {
            get() {
                return this.deletedIds;
            },
            set(val) {
                this._deletedIds = val;
            }
        }
    },
    watch: {
        uploadList: {
            handler: function(val) {
                this.showUploadBtn = val.length < this.maxUploadLimit;
            }
        }
    },
    created() {
        this.showUploadBtn = this.dataList.length < this.maxUploadLimit;
        this.uploadList = this.dataList;
        this.uploadList.length && this.uploadList.map(item => {
            item.url = getImgAbsPath(item.path);
        })
    },
    methods: {
		beforeUpload (file, fileList) {
            // console.log('beforeUpload', file, fileList);
            const mediaType = this.getMediaType(this.acceptType);
            const regExp = new RegExp('^'+mediaType+'/\\S', 'g');
            const typeValidate = regExp.test(file.type);
            if (!typeValidate) {
                this.$message.error(`You can only upload ${this.acceptList} file!`);
            }
            const maxSizeValues = {image: 5, video: 15, audio: 10, file: 10};  // 图片默认5M，视频默认10M, 音频默认10M，其他附件默认10M
            const fileSizeLimit = file.size / 1024 / 1024 < maxSizeValues[mediaType];
            if (!fileSizeLimit) {
                this.$message.error(`${mediaType} must smaller than ${maxSizeValues[mediaType]}MB!`);
            }
            // return typeValidate && fileSizeLimit;
            // return file.uid === fileList.slice(-1)[0].uid;
            return false;
        },
        remove(file) {
            const removeIndex = this.uploadList.findIndex(item => item.id == file.id);
            this.uploadList.splice(removeIndex, 1);
            if (this.originIds.includes(file.id)) {
                this._deletedIds.push(file.id);
            }
            if (this._savedIds.includes(file.id)) {
                const index = this._savedIds.indexOf(file.id);
                this._savedIds.splice(index, 1);
            }
            const _uploadList = deepCopy(this.uploadList);
            _uploadList.map(item => delete item.url);
            this.$emit('change', {uploadList: _uploadList, savedIds: this._savedIds, deletedIds: this._deletedIds});
        },
        async handleFileUpload({ file, fileList, event }) {
            // console.log('handleFileUpload:', file, fileList, event);
            if (fileList.length > this.maxUploadLimit) {
                fileList.splice(this.maxUploadLimit)
            }
            this.bulkUploadReadyCount++;
            const uploadReadyList = fileList.filter(item => item.originFileObj);
            if (!uploadReadyList.length) return;
            if (this.bulkUploadReadyCount === uploadReadyList.length) {
                this.uploading = true;
                const formData = new FormData();
                uploadReadyList.map(file => {
                    formData.append('files', file.originFileObj);
                })
                const { code, msg, data } = await uploadMultiFile(formData);
                this.uploading = false;
                if (code == '200') {
                    this.$message.success(msg);
                    this.bulkUploadReadyCount = 0;
                    data.map((file, index) => {
                        console.log('file: ', file);
                        const resFile = {
                            id: file.id,
                            uid: uploadReadyList[index].uid,
                            url: getImgAbsPath(file.src + '/' + file.filename),
                            path: file.src + '/' + file.filename,
                            filename: file.filename,
                            name: file.originalname,
                            // originalname: data.originalname,
                            size: file.size,
                            type: file.mimetype,
                            state: 1
                        };
                        this._savedIds.push(file.id);
                        this.uploadList.push(resFile);
                        const _uploadList = deepCopy(this.uploadList);
                        _uploadList.map(item => delete item.url);
                        this.$emit('change', {uploadList: _uploadList, savedIds: this._savedIds, deletedIds: this._deletedIds});
                    })
                } else {
                    this.$message.error(data.err.name + ': ' + data.err.message);
                }
            }
        },
        transformFile(file) {
            // return new Promise(resolve => {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onload = () => {
            //         const canvas = document.createElement('canvas');
            //         const img = document.createElement('img');
            //         img.src = reader.result;
            //         img.onload = () => {
            //         const ctx = canvas.getContext('2d');
            //         ctx.drawImage(img, 0, 0);
            //         ctx.fillStyle = 'red';
            //         ctx.textBaseline = 'middle';
            //         ctx.fillText('Ant Design', 20, 20);
            //         canvas.toBlob(resolve);
            //         };
            //     };
            // });
        },
        handlePhotopreviewCancel() {
            this.photoPreviewVisible = false;
        },
        handlePhotoPreview(file) {
            this.previewPhoto = getImgAbsPath(file.path);
            this.photoPreviewVisible = true;
        },
        getMediaType(type) {
            if (/^image\/\S/.test(type)) {
                return 'image';
            } else if (/^video\/\S/.test(type)) {
                return 'video';
            } else if (/^audio\/\S/.test(type)) {
                return 'audio';
            } else {
                return 'file';
            }
        },
    },
    components: {
        UploadOutlined,
        LoadingOutlined,
        PlusOutlined
    }
};
</script>
<style scoped>
.upload-tip {
    margin-left: 10px;
    color: #999;
    font-size: 12px;
}
</style>
