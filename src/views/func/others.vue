<template>
    <div class="container">
        <a-button @click="openLoading">开启遮罩层</a-button>
        <Loading :spinning="spinning" />
        <a-divider />
        <!-- 滑块验证 -->
        <slideblock-validate ></slideblock-validate>
        <a-divider />
        <!-- 验证码验证 -->
        <div class="validate-code-box">
            <span class="label">图片验证码</span>
            <a-input size="large" :maxlength="maxLength" v-model="validateText" />
            <codeimage-validate :maxLength="maxLength" :isRefreshWhileFail="false" :validateFail="validateFail" @refresh="refreshValidateCode" ></codeimage-validate>
        </div>
        <a-button style="margin-top:15px" @click="validateImageCode">验证</a-button>
        <a-button style="margin-left:15px" :type="maxLength == 4 ? 'primary' : 'default'" @click="validateFour">四位验证码</a-button>
        <a-button style="margin-left:15px" :type="maxLength == 6 ? 'primary' : 'default'" @click="validateSix">六位验证码</a-button>
        <a-divider />
        <!-- 短信验证码 -->
        <div class="validate-code-box">
            <span class="label">手机号</span>
            <a-input :maxlength="11" v-model="phone" style="width:200px" />
        </div>
        <div class="validate-code-box">
            <span class="label">短信验证码</span>
            <a-input :maxlength="6" v-model="validateSms" />
            <div style="margin-left:15px"><sms-validate :phone='phone' @sendSms="sendSms" ></sms-validate></div>
        </div>
        <a-button style="margin-top:15px" @click="validateSmsCode">验证</a-button>
        <a-divider />
    </div>
</template>
<script>
import Loading from 'components/Loading.vue'
import SlideblockValidate from 'components/Funcs/slideblock-validate.vue'
import CodeimageValidate from 'components/Funcs/codeimage-validate.vue'
import SmsValidate from 'components/Funcs/sms-validate.vue'

export default {
    components: {
        Loading,
        SlideblockValidate,
        CodeimageValidate,
        SmsValidate
    },
    data() {
        return {
            spinning: false,
            // 图片验证码
            validateText: '',
            validateSuccessCode: '',
            maxLength: 4,
            validateFail: true,
            // 短信验证码
            phone: '18888888888',
            validateSms: '',
            validateSuccessSms: '133313',
        };
    },
    methods: {
        openLoading() {
            this.spinning = true;
            setTimeout(() => {
                this.spinning = false;
            }, 5000);
        },
        validateFour() {
            this.maxLength = 4;
            this.validateText = '';
            this.refreshValidateCode();
        },
        validateSix() {
            this.maxLength = 6;
            this.validateText = '';
            this.refreshValidateCode();
        },
        validateImageCode() {
            if (this.validateText.toUpperCase() == this.validateSuccessCode) {
                this.$message.success('success');
            } else {
                this.validateFail = !this.validateFail;
                this.$message.error('fail');
            }
        },
        refreshValidateCode(validateSuccessCode) {
            this.validateSuccessCode = validateSuccessCode;
        },
        sendSms(sms) {
            console.log('短信验证码', sms);
            this.validateSuccessSms = sms;
        },
        validateSmsCode() {
            if (this.validateSms == this.validateSuccessSms) {
                this.$message.success('success');
            } else {
                this.$message.error('fail');
            }
        }
    }
};
</script>
<style scoped>
.validate-code-box {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
}
.validate-code-box .label {
    width: 80px;
}
.validate-code-box .ant-input {
    width: 120px;
}
.title {
    margin-bottom: 15px;
    font-size: 18px;
}
</style>
