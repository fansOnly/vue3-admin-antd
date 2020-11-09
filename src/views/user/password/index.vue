<template src="./index.html"></template>

<script>
import { updateAdminPass as updateData } from '@/api/common'
import config from './config'
import { MD5 } from '@/utils/secret'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { useStore } from 'vuex'

export default {
	name: 'adminDetail',
    setup() {
        const { ctx } = getCurrentInstance()
        const store = useStore()

        const viewData = reactive({
            oldPass: '',
            newPass: '',
            confirmPass: ''
        })
        const loading = ref(false)

        let validateOldPass = (rule, value) => {
            if (!value) {
                return Promise.reject('请输入原始密码');
            } else {
                return Promise.resolve();
            }
        }

        let compareOldAndNew = (rule, value,) => {
            if (!value) {
                return Promise.reject('请输入新的密码');
            } else if (value.length < 6) {
                return Promise.reject('密码至少需要6位组合');
            } else if (value == viewData.oldPass) {
                return Promise.reject('新密码不能与原密码一致');
            } else {
                return Promise.resolve();
            }
        }

        let confirmNewPass = (rule, value) => {
            if (!value) {
                return Promise.reject('请输入新的确认密码');
            } else if (value != viewData.newPass) {
                return Promise.reject('两次输入的新密码不一致');
            } else {
                return Promise.resolve();
            }
        }

        const ruleRef = reactive({
            oldPass: [
                { required: true, message: '请输入原始密码', trigger: ['change', 'blur'] },
                { validator: validateOldPass, trigger: 'change' }
            ],
            newPass: [
                { required: true, message: '请输入新密码', trigger: ['change', 'blur'] },
                { validator: compareOldAndNew, trigger: 'change' }
            ],
            confirmPass: [
                { required: true, message: '请输入确认密码', trigger: ['change', 'blur'] },
                { validator: confirmNewPass, trigger: 'change' }
            ],
        })
        const { validate, validateInfos } = useForm(viewData, ruleRef)

        const handleSubmit = async () => {
            try {
                await validate()
                loading.value = true
                const params = {
                    oldPass: MD5(viewData.oldPass),
                    newPass: MD5(viewData.newPass),
                    confirmPass: MD5(viewData.confirmPass)
                }
                apiUpdateData(params)
            } catch (error) {
                console.log('error: ', error)
            }
        }

        const apiUpdateData = async params => {
            const userid = store.state.user.user.id
            const { code, msg } = await updateData({id: userid, ...params})
            ctx.$message[code == '200' ? 'success': 'error'](msg, 1, () => {
                loading.value = false
            })
        }

        return {
			formLeftLayout: Object.freeze(config.formLeftLayout),
            loading,
            viewData,
            validateInfos,
            handleSubmit,
        }
    },
    components: {
    }
};
</script>
