<template>
    <div class="container">
        <a-form-model ref="viewForm" :model="viewData" :rules="rules" :layout="layout" :colon="colon" :label-align="labelAlign">
            <a-row :gutter="16">
                <a-col :span="13">
                    <a-form-model-item v-if="!!id" :label="$t('GLOBAL.DATA_ID')">
                        <a-input v-model="viewData.id" disabled />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.USER_NAME')" prop="username">
                        <a-input v-model="viewData.username" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.USER_NAME')" autocomplete="off" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.PASSWORD')" prop="password">
                        <a-input :type="showPass ? 'text' : 'password'" v-model="viewData.password" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.PASSWORD')" autocomplete="off" :disabled="!!id">
                            <!-- <a-icon v-if="passwordVisible" :type="showPass ? 'eye' : 'eye-invisible'" slot="suffix" @click="togglePassword" />
                            <a-icon v-if="passwordEditable" type="sync" :spin="spin" slot="addonAfter" @click="createRandomPass" /> -->
                        </a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.NICK_NAME')" prop="nickname">
                        <a-input v-model="viewData.nickname" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.NICK_NAME')" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.PHONE')" prop="phone">
                        <a-input v-model="viewData.phone" maxLength="11" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.PHONE')" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.EMAIL')" prop="email">
                        <a-input v-model="viewData.email" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.EMAIL')" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.DATA_PARENT')" prop="role_id">
                        <a-select v-model="viewData.role_id" :placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.DATA_PARENT')" :disabled="viewData.role_id == 1">
                            <a-select-option value="">{{$t('GLOBAL.OPTION_SELECT')}}</a-select-option>
                            <a-select-option v-for="(item, index) in roleList" :key="index" :value="item.id" :disabled="item.id == 1">{{item.name}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item :label="$t('GLOBAL.STATE')">
                        <a-radio-group v-model="viewData.state" buttonStyle="solid" >
                            <a-radio-button v-for="(item, index) in ACCOUNT_STATUS" :key="index" :value="index">{{item}}</a-radio-button>
                        </a-radio-group>
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item>
                        <a-button v-if="!viewData.reply_time" type="primary" :loading="submitDisabled" @click="handleSubmit('viewForm')">{{$t('GLOBAL.TEXT_SAVE')}}</a-button>
                        <a-button style="margin-left:10px;" @click="() => {$router.back()}">{{$t('GLOBAL.TEXT_BACK')}}</a-button>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </div>
</template>

<script>
import { getRoleList, addAdmin as addData, getAdminDetail as getData, updateAdmin as updateData } from '@/api/admin'
import { randPass, deepCopy } from 'utils/util'
import config from './config'

export default {
    name: 'accountView',
    data() {
        return {
            layout: config.layout,
            colon: config.colon,
            labelAlign: config.labelAlign,
            rules: config.rules,
            ACCOUNT_STATUS: config.filterList.STATUS,
            viewData: {
                password: '12345678',
                state: 1
            },
            roleList: [],
            submitDisabled: false,
            showPass: false,
            passwordVisible: false,
            passwordEditable: false,
            spin: false
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.user = JSON.parse(sessionStorage.getItem('user'));
        if (this.id) {
            this.getDataFn();
        } else {
            this.passwordVisible = this.passwordEditable = true;
        }
        this.getRoleListFn();
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
        async getRoleListFn () {
            const res = await getRoleList();
            if (res.code == '200') {
                let _roleList = deepCopy(res.data);
                if (this.user.role_id != 1) {
                    _roleList.shift();
                }
                this.roleList = _roleList;
            } else {
                this.$message.error(res.msg);
            }
        },
        async getDataFn () {
            const res = await getData({id: this.id})
            if (res.code == '200') {
                this.viewData = res.data;
                this.passwordVisible = this.passwordEditable = this.user.role_id == 1 || this.user.role_id == res.data.role_id;
            } else {
                this.$message.error(res.msg);
            }
        },
        async addDataFn (params) {
            const res = await addData(params);
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.submitDisabled = false;
                    this.$router.replace({name: 'accountEdit', params:{id: res.data}});
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
