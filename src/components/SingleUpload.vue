<template>
    <div>
        <a-upload
			name="file"
            :list-type="listType"
            :accept="acceptType"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :file-list="uploadList"
            :before-upload="beforeUpload"
            :transform-file="transformFile"
            :remove="remove"
            @preview="handlePhotoPreview"
            @change="handleFileUpload"
        >
            <template v-if="!uploadList.length">
                <div v-if="textType === 'button'">
                    <a-button><UploadOutlined />上传</a-button>
                    <span class="upload-tip">允许上传 {{acceptList.join(', ')}}</span>
                </div>
                <div v-else>
                    <LoadingOutlined v-if="uploading" />
                    <PlusOutlined v-else />
                    <div class="ant-upload-text">上传</div>
                </div>
            </template>
        </a-upload>
        <a-modal :visible="photoPreviewVisible" :footer="null" @cancel="handlePhotopreviewCancel" >
            <img alt="" style="width: 100%" :src="getImgAbsPath(previewPhoto)" />
        </a-modal>
    </div>
</template>

<script>
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { uploadUrl, uploadHeaders } from '@/config/baseUrl'
import { getImgAbsPath, deepCopy, download } from '@/utils/util'

// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

export default {
	name: 'singleUpload',
	props: {
        dataList: {
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
        listType: {
            type: String,
            default: 'picture-card'
        },
        textType: {
            type: String,
            default: 'text'
        },
        fileType: {
            type: String,
            default: 'image'
        },
    },
    data() {
        return {
            getImgAbsPath,
            uploadUrl,
            uploadHeaders,
            uploading: false,  // 上传中
            photoPreviewVisible: false,
            previewPhoto: '',
            uploadList: [],  // 上传列表
            originalIds: [],  // 默认图片id组
        };
    },
    computed: {
        acceptType() {
            return this.getMediaAccept(this.fileType).type;
        },
        acceptList() {
            return this.getMediaAccept(this.fileType).list;
        },
        _savedIds: {
            get() {
                return this.savedIds || [];
            },
            set(val) {
                this._savedIds = val;
            }
        },
        _deletedIds: {
            get() {
                return this.deletedIds || [];
            },
            set(val) {
                this._deletedIds = val;
            }
        }
    },
    created() {
        this.uploadList = this.dataList;
        this.uploadList.length && this.uploadList.map(item => {
            item.url = getImgAbsPath(item.path);
            this.originalIds.push(item.id);
        })
    },
    methods: {
		beforeUpload (file) {
            // console.log('beforeUpload', file, fileList);
            const regExpList = this.acceptType.split(',');
            let _reg = '';
            regExpList.map(reg => {
                _reg += '(' + reg + ')|'
            })
            const regExp = new RegExp('^'+_reg+'/\\S', 'g');
            const typeValidate = regExp.test(file.type);
            if (!typeValidate) {
                this.$message.error(`You can only upload ${this.acceptList.join(', ')} file!`);
            }
            const maxSizeValues = {image: 5, video: 15, audio: 10, file: 10};  // 图片默认5M，视频默认10M, 音频默认10M，其他附件默认10M
            const fileSizeLimit = file.size / 1024 / 1024 < maxSizeValues[this.fileType];
            if (!fileSizeLimit) {
                this.$message.error(`${this.fileType} must smaller than ${maxSizeValues[this.fileType]}MB!`);
            }
            return typeValidate && fileSizeLimit;
        },
        remove(file) {
            if (this.originalIds.includes(file.id)) {
                this._deletedIds.push(file.id);
            }
            if (this._savedIds.includes(file.id)) {
                const index = this._savedIds.indexOf(file.id);
                this._savedIds.splice(index, 1);
            }
            this.uploadList = [];
            this.$emit('change', {uploadList: [], savedIds: this._savedIds, deletedIds: this._deletedIds});
        },
        handleFileUpload({ file, fileList }) {
            // console.log('handleFileUpload:', file, fileList, event);
			if (file.status === 'uploading') {
                this.uploading = true;
                this.uploadList = fileList;
            }
            if (file.status == 'done') {
                this.uploading = false;
                if (file.response.code == 200) {
                    const data = file.response.data;
                    this.$message.success('上传成功');
                    const resFile = {
                        id: data.id,
                        uid: file.uid,
                        url: getImgAbsPath(data.src + '/' + data.filename),
                        path: data.src + '/' + data.filename,
                        filename: data.filename,
                        name: data.originalname,
                        // originalname: data.originalname,
                        size: data.size,
                        type: data.mimetype,
                        state: 1
                    };
                    this._savedIds.push(data.id);
                    this.uploadList = [resFile];
                    const _uploadList = deepCopy(this.uploadList);
                    _uploadList.map(item => delete item.url);
                    this.$emit('change', {uploadList: _uploadList, savedIds: this._savedIds, deletedIds: this._deletedIds});
                } else {
                    this.$message.error(file.response.msg);
                }
            } else if (file.status === 'error') {
                this.uploading = false;
                this.$message.error(`${file.name} file upload failed.`);
            }
        },
        transformFile() {
            // console.log('file: ', file);
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
            if (this.fileType === 'image') {
                this.previewPhoto = file.path;
                this.photoPreviewVisible = true;
            } else {
                download(file.url, file.originalname);
            }
        },
        getMediaAccept(type) {
            let _type = '', _list = [];
            switch (type) {
                case 'image':
                    _type = 'image/*';
                    _list = ['jpg', 'jpeg', 'png', 'gif'];
                    break;
                case 'video':
                    _type = 'video/*';
                    // MP4 = MPEG 4文件使用 H264 视频编解码器和AAC音频编解码器
                    // WebM = WebM 文件使用 VP8 视频编解码器和 Vorbis 音频编解码器
                    // Ogg = Ogg 文件使用 Theora 视频编解码器和 Vorbis音频编解码器
                    _list = ['mp4', 'webm', 'ogg'];
                    break;
                case 'audio':
                    _type = 'audio/*';
                    _list = ['mp3', 'wav', 'ogg'];
                    break;
                case 'file':
                    _type = 'text/*,application/*';
                    _list = ['rar', 'zip', 'txt', 'docx', 'xls', 'pdf', 'json'];
                    break;
                default:
                    _type = 'image/*';
                    _list = ['jpg', 'jpeg', 'png', 'gif'];
                    break;
            }
            return {type: _type, list: _list};
        }
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
