<template>
    <div>
        <a-button :loading="loading" :disabled="sendStatus == 'sending'" @click="getSmsCode">{{text}}</a-button>
    </div>
</template>
<script>
export default {
    props: {
        phone: {
            type: String,
            default: function() {
                return ''
            }
        }
    },
    data() {
        return {
            text: '获取验证码',
            timewait: 60,
            sendStatus: '',
            loading: false
        }
    },
    watch: {
        timewait: function(val) {
            this.text = `${val}s后重新获取`;
        }
    },
    methods: {
        getSmsCode() {
            if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phone)) {
                this.$message.warning('请输入正确的手机号');
                return
            }
            this.timewait = 60;
            this.sendStatus = 'sending';
            this.loading = true;
            // this.timewait--;
            this.$emit('sendSms', Math.floor(Math.random() * 1000000));
            let interval = setInterval(() => {
                this.loading = false;
                if (this.timewait > 0) {
                    this.timewait--;
                } else {
                    this.sendStatus = 'done';
                    this.text = '再次获取';
                    clearInterval(interval);
                }
            }, 1000)
        }
    },
}
</script>