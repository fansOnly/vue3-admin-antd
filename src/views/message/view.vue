<template>
    <div class="container">
        <a-form-model ref="viewForm" :model="viewData" :rules="rules" :layout="layout" :colon="colon" :label-align="labelAlign">
            <a-row :gutter="16">
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.DATA_ID')">
                        <a-input v-model="viewData.id" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.NICK_NAME')">
                        <a-input v-model="viewData.nickname" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.PHONE')">
                        <a-input v-model="viewData.phone" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.EMAIL')">
                        <a-input v-model="viewData.email" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.CREATE_DATE')">
                        <a-input v-model="viewData.create_time" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.DATA_CONTENT')">
                        <a-textarea v-model="viewData.content" :auto-size="{minRows:2, maxRows:6}" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13" v-if="viewData.more && viewData.more.length">
                    <a-form-model-item :label="$t('GLOBAL.ANNEX_FILE')">
                        <a-upload list-type="picture-card" disabled :file-list="viewData.more" @preview="handlePhotoPreview" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.TEXT_REPLY')" prop="reply">
                        <a-textarea v-model="viewData.reply" :auto-size="{minRows:2, maxRows:6}" :disabled="!!viewData.reply_time" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13" v-if="!!viewData.reply_time">
                    <a-form-model-item :label="$t('GLOBAL.REPLY_DATE')">
                        <a-input v-model="viewData.reply_time" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.STATE')">
                        <a-radio-group v-model="viewData.state" disabled buttonStyle="solid" >
                            <a-radio-button v-for="(item, index) in MESSAGE_STATUS" :key="index" :value="index">{{item}}</a-radio-button>
                        </a-radio-group>
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item>
                        <a-button v-if="!viewData.reply_time" type="primary" style="margin-right:10px;" :loading="submitDisabled" @click="handleSubmit('viewForm')">{{$t('GLOBAL.TEXT_REPLY')}}</a-button>
                        <a-button @click="() => {$router.back()}">{{$t('GLOBAL.TEXT_BACK')}}</a-button>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
        <a-modal :visible="photoPreviewVisible" :zIndex=1001 :footer="null" @cancel="handlePhotopreviewCancel">
            <img alt="" style="width: 100%" :src="previewPhoto" />
        </a-modal>
    </div>
</template>

<script>
import { getMessageDetail as getData, updateMessage as updateData } from '@/api/message'
import { MESSAGE_STATUS } from 'config/setting'
import config from './config'

export default {
    name: 'messageView',
    data() {
        return {
            layout: config.layout,
            colon: config.colon,
            labelAlign: config.labelAlign,
            rules: config.rules,
            MESSAGE_STATUS,
            viewData: {},
            photoPreviewVisible: false,
            previewPhoto: '',
            submitDisabled: false
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getDataFn();
    },
    methods: {
        handlePhotopreviewCancel() {
            this.photoPreviewVisible = false;
        },
        handlePhotoPreview(file) {
            this.previewPhoto = file.path;
            this.photoPreviewVisible = true;
        },
        handleSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (!valid) return;
                this.submitDisabled = true;
                this.updateDataFn(this.viewData);
            });
        },
        async getDataFn () {
            const res = await getData({id: this.id})
            if (res.code == '200') {
                this.viewData = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        async updateDataFn (params) {
            const res = await updateData(params);
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.submitDisabled = false;
                    this.getDataFn();
                });
            } else {
                this.$message.error(res.msg, () => {
                    this.submitDisabled = false;
                });
            }
        },
    }
}
</script>
