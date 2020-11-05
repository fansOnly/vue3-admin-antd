<template>
    <div class="container">
        <a-form ref="passForm" :model="viewData" :rules="rules" :layout="layout" :colon="colon">
            <a-row :gutter="50">
                <a-col :span="12">
                    <a-form-item class="input-password" :label="$t('GLOBAL.USER_OLD_PASS')" prop="oldPass">
                        <a-input-password v-model="viewData.oldPass" type="password" autocomplete="off" placeholder="original password" />
                    </a-form-item>
                    <a-form-item class="input-password" :label="$t('GLOBAL.USER_NEW_PASS')" prop="newPass">
                        <a-input-password v-model="viewData.newPass" type="password" autocomplete="off" placeholder="new password" />
                    </a-form-item>
                    <a-form-item class="input-password" :label="$t('GLOBAL.USER_CONFIRM_PASS')" prop="confirmPass">
                        <a-input-password v-model="viewData.confirmPass" type="password" autocomplete="off" placeholder="confirm new password" />
                    </a-form-item>
                    <a-button type="primary" :loading="submitDisabled" @click="handleSubmit('passForm')">{{$t('GLOBAL.TEXT_SAVE')}}</a-button>
                </a-col>
            </a-row>
        </a-form>
	</div>
</template>

<script>
import { getAdminPass, updateAdminPass } from '@/api/admin'
import { MD5 } from 'utils/secret'
import config from './config'

export default {
    name: 'changePass',
    data() {
        let validateOldPass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入原始密码'));
            } else if (MD5(value) !== this.oldPass) {
                callback(new Error('原始密码输入错误'));
            } else {
                callback();
            }
        }

        let compareOldAndNew = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新的密码'));
            } else if(value.length < 6) {
                callback(new Error('密码至少需要6位组合'));
            } else if (value == this.viewData.oldPass) {
                callback(new Error('新密码不能与原密码一致'));
            } else {
                callback();
            }
        }

        let confirmNewPass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新的确认密码'));
            } else if (value != this.viewData.newPass) {
                callback(new Error('两次输入的新密码不一致'));
            } else {
                callback();
            }
        }
        return {
            layout: config.layout,
            colon: config.colon,
            rules: {
                oldPass: [{ required: true, trigger: ['change', 'blur'] },{ validator: validateOldPass, trigger: 'change' }],
                newPass: [{ required: true, trigger: ['change', 'blur'] },{ validator: compareOldAndNew, trigger: 'change' }],
                confirmPass: [{ required: true, trigger: ['change', 'blur'] },{ validator: confirmNewPass, trigger: 'change' }],
            },
            viewData: {
                oldPass: '',
                newPass: '',
                confirmPass: '',
            },
            oldPass: '',
            submitDisabled: false
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    created() {
        this.id = JSON.parse(sessionStorage.getItem('user')).id;
        this.getAdminPassFn();
    },
    methods: {
        handleSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (!valid) return;
                this.submitDisabled = true;
                this.updateAdminPassFn({newPass: this.viewData.newPass});
            });
        },
        async getAdminPassFn() {
            const res = await getAdminPass({id: this.id})
            if (res.code == '200') {
                this.oldPass = res.data.password;
            } else {
                this.$message.error(res.msg);
            }
        },
        async updateAdminPassFn(params) {
            const res = await updateAdminPass({id: this.id, ...params})
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.submitDisabled = false;
                    this.$refs['passForm'].resetFields();
                    this.getAdminPassFn();
                });
            } else {
                this.$message.error(res.msg, 2, () => {
                    this.submitDisabled = false;
                });
            }
        }
    }
}
</script>
