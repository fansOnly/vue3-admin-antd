<template>
    <div class="login-wrap">
        <div class="logo-box">
            <img class="logo" src="../../assets/images/logo.png" alt="">
            <div class="en-logo">fans-admin</div>
        </div>
        <div class="title">fans-admin</div>
        <a-form class="login-form" ref="loginForm">
            <a-form-item v-bind="validateInfos.username">
                <a-input v-model:value="formRef.username" placeholder="用户名：test" >
                    <template v-slot:prefix><UserOutlined type="user"/></template>
                </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
                <a-input v-model:value="formRef.password" type="password" placeholder="密码：123456" >
                    <template v-slot:prefix><LockOutlined type="user"/></template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <div class="login-form_rem">
                    <a-checkbox>记住账号</a-checkbox >
                    <router-link to="">忘记密码</router-link>
                </div>
                <a-button type="primary" size="large" block :loading="submiting" @click="handleSubmit">登陆</a-button>
            </a-form-item>
        </a-form>
        <div class="footer"><BaseFooter /></div>
    </div>
</template>

<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import BaseFooter from '@/components/Layouts/Footer.vue'

import { reactive, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@ant-design-vue/use'

import { login } from '@/api/common'
import config from './config'

export default {
    name: 'login',
    setup() {
        const { ctx } = getCurrentInstance()
        const router = useRouter()

        const submiting = ref(false)
        const formRef = reactive({
            username: '',
            password: ''
        })
        const ruleRef = reactive(config.rules)
        const { validate, validateInfos } = useForm(formRef, ruleRef)

        const handleSubmit = async e => {
            e.preventDefault()
            try {
                const params = await validate()
                submiting.value = true
                const data = await login(params)
                if (data.code == '200') {
                    ctx.$message.success(data.msg, 1, () => {
                        submiting.value = false
                        sessionStorage.setItem('user', JSON.stringify(data.data))
                        sessionStorage.setItem('token', data.token)
                        router.push('/admin/index')
                    })
                } else {
                    ctx.$message.error(data.msg, 1, () => {
                        submiting.value = false
                    })
                }
            } catch (error) {
                console.log('error: ', error);
            }
        }

        return {
            submiting,
            formRef,
            validateInfos,
            handleSubmit
        }
    },
    components: {
        BaseFooter,
        UserOutlined,
        LockOutlined
    },
};
</script>
<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    min-height: 100%;
    padding: 200px 0 144px;
    background: #f0f2f5 url(../../assets/images/loginbg.svg) no-repeat 50%;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo {
    width: 50px;
    height: auto;
}
.en-logo {
    margin-left: 15px;
    font-size: 40px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 600;
}
.title {
    padding: 10px 0;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.45);
}
.login-form {
    width: 350px;
}
.login-form_rem {
	display: flex;
	justify-content: space-between;
}
.footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 15px;
}
</style>
