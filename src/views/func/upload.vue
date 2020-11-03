<template>
    <div class="container">
        <a-row>
            <a-col :span="12">
                <div>图片上传</div>
                <single-upload :list-type="listType" :accept-type="accept" :accept-list="acceptList" :data-list="imageList" @change="handleUpload($event, 'imageList')"></single-upload>
            </a-col>
            <a-col :span="12">
                <div>文件上传</div>
                <single-upload :list-type="listType" :accept-type="accept" :accept-list="acceptList" :data-list="fileList" @change="handleUpload($event, 'fileList')"></single-upload>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24">
                <div>多图片上传</div>
                <bulk-upload :list-type="listType" :accept-type="accept" :accept-list="acceptList" :data-list="photoList" @change="handleUpload($event, 'photoList')"></bulk-upload>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import SingleUpload from 'components/SingleUpload.vue'
import BulkUpload from 'components/BulkUpload.vue'

export default {
    components: {
        SingleUpload,
        BulkUpload
    },
    data() {
        return {
            savedIds: [],
            deletedIds: [],
            listType: 'picture-card',
            accept: 'image/*,.pdf',
            acceptList: 'jpg, jpeg, png, gif, ico, svg',
            imageList: [{'id': 313, 'uid': 'vc-upload-1585475608952-09', 'name': 'file-17125b916cd.png', 'path': '/upload/2020-03-29/file-17125b916cd.png', 'size': 582880, 'type': 'image/png', 'state': 1, 'originalname': '红包雨-002集卡活动一屏-切图.png'}],
            fileList: [],
            photoList: [{'id': 385, 'uid': 'vc-upload-1585475608952-99', 'name': 'file-17125b916cd.png', 'path': '/upload/2020-03-29/file-17125b916cd.png', 'size': 582880, 'type': 'image/png', 'state': 1, 'originalname': '红包雨-002集卡活动一屏-切图.png'},{'id': 386, 'uid': 'vc-upload-1585475608952-19', 'name': 'file-17125b916cd.png', 'path': '/upload/2020-03-29/file-17125b916cd.png', 'size': 582880, 'type': 'image/png', 'state': 1, 'originalname': '红包雨-002集卡活动一屏-切图.png'}],
        };
    },
    methods: {
        handleUpload(data, tag) {
            // console.log('data', tag, data);
            if (data && data.uploadList) {
                this[tag] = data.uploadList;
            }
            if (data && data.savedIds) {
                this.savedIds = data.savedIds;
            }
            if (data && data.deletedIds) {
                this.deletedIds = data.deletedIds;
            }
            console.log('data', this[tag], {savedIds:this.savedIds}, {deletedIds:this.deletedIds})
        },
    }
};
</script>
