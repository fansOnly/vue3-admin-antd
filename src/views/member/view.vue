<template>
    <div class="container">
        <a-form-model ref="viewForm" :model="viewData" :rules="rules" :layout="layout" :colon="colon" :label-align="labelAlign">
            <a-row :gutter="16">
                <a-col :span="13" v-if="id">
                    <a-form-model-item :label="$t('GLOBAL.DATA_ID')">
                        <a-input v-model="viewData.id" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.USER_NAME')" prop="username">
                        <a-input v-model="viewData.username" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.USER_NAME')" autocomplete="off" :disabled="!EDIT_ABLE && !!id" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13" v-if="!id">
                    <a-form-model-item :label="$t('GLOBAL.PASSWORD')" prop="password">
                        <a-input :type="showPass ? 'text' : 'password'" v-model="viewData.password" autocomplete="off" :disabled="!!id">
                            <!-- <a-icon :type="showPass ? 'eye' : 'eye-invisible'" slot="suffix" @click="togglePassword" />
                            <a-icon v-if="EDIT_ABLE" type="sync" :spin="spin" slot="addonAfter" @click="createRandomPass" /> -->
                        </a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.NICK_NAME')" prop="nickname">
                        <a-input v-model="viewData.nickname" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.NICK_NAME')" :disabled="!EDIT_ABLE && !!id" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.PHONE')" prop="phone">
                        <a-input v-model="viewData.phone" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.PHONE')" :disabled="!EDIT_ABLE && !!id" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.EMAIL')" prop="email">
                        <a-input v-model="viewData.email" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.EMAIL')" :disabled="!EDIT_ABLE && !!id" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13" v-if="id">
                    <a-form-model-item :label="$t('GLOBAL.CREATE_DATE')">
                        <a-input v-model="viewData.create_time" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.GENDER')">
                        <a-radio-group v-model="viewData.gender" :disabled="!EDIT_ABLE && !!id" buttonStyle="solid" >
                            <a-radio-button v-for="(item, index) in GENDER_ITEMS" :key="index" :value="index">{{item}}</a-radio-button>
                        </a-radio-group>
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.STATE')">
                        <a-radio-group v-model="viewData.state" :disabled="!EDIT_ABLE && !!id" buttonStyle="solid" >
                            <a-radio-button v-for="(item, index) in MEMBER_STATUS" :key="index" :value="index">{{item}}</a-radio-button>
                        </a-radio-group>
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item>
                        <a-button type="primary" :loading="submitDisabled" @click="handleSubmit('viewForm')">{{$t('GLOBAL.TEXT_SAVE')}}</a-button>
                        <a-button style="margin-left:10px;" @click="() => {$router.back()}">{{$t('GLOBAL.TEXT_BACK')}}</a-button>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </div>
</template>

<script>
import { addMember as addData, getMemberDetail as getData, updateMember as updateData } from '@/api/member'
import { MEMBER_STATUS, GENDER_ITEMS } from 'config/setting'
import { randPass } from 'utils/util'
import config from './config'

export default {
    name: 'memberView',
    data() {
        return {
            layout: config.layout,
            colon: config.colon,
            labelAlign: config.labelAlign,
            rules: config.rules,
            MEMBER_STATUS,
            GENDER_ITEMS,
            EDIT_ABLE: config.optionList.EDIT_ABLE,
            viewData: {
                password: '123456',
                gender: 0,
                state: 1
            },
            submitDisabled: false,
            showPass: false,
            spin: false
        }
    },
    created() {
        this.id = this.$route.params.id;
        !!this.id && this.getDataFn();
    },
    methods: {
        togglePassword () {
            this.showPass = !this.showPass;
        },
        createRandomPass() {
            this.spin = true;
            setTimeout(() => {
                this.viewData.password = randPass();
                this.spin = false
            }, 500)
        },
        handleSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (!valid) return;
                this.submitDisabled = true;
                if (this.id) {
                    this.updateDataFn(this.viewData);
                } else {
                    this.addDataFn(this.viewData);
                }
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
        async addDataFn (params) {
            const res = await addData(params);
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.submitDisabled = false;
                    this.$router.replace({name: 'memberEdit', params:{id: res.data}});
                });
            } else {
                this.$message.error(res.msg, () => {
                    this.submitDisabled = false;
                });
            }
        },
        async updateDataFn (params) {
            const res = await updateData(params);
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.submitDisabled = false;
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
