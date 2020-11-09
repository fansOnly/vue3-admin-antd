<template src="./index.html"></template>

<script>
import { getAdminDetail as getData, addAdmin as addData, updateAdmin as updateData, getRoleList as getParentList } from '@/api/admin'
import config from './config'
import { useRoute, useRouter } from 'vue-router'
import { computed, getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { formatPhone } from '@/utils/util'

export default {
	name: 'adminDetail',
    setup() {
        const { ctx } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()

        const id = ref('')
        id.value = route.query?.id ?? null
        const loading = ref(false)
        let viewData = reactive({
            username: '',
            password: '',
            nickname: '',
            phone: '',
            email: '',
            role_id: '',
            state: '正常'
        })
        const ADMIN_STATUS_VALID = computed(() => config.ADMIN_STATUS.filter(Boolean))

        const ruleRef = reactive(config.rules)
        const { validate, validateInfos } = useForm(viewData, ruleRef)

        const handleSubmit = async () => {
            try {
                await validate()
                loading.value = true
                const params = {
                    ...toRaw(viewData),
                    state: config.ADMIN_STATUS.indexOf(viewData.state)
                }
                id.value ? apiUpdateData(params) : apiAddData(params)
            } catch (error) {
                console.log('error: ', error);
            }
        }

        const parentList = ref([])
        const apiGetParentList = async () => {
            const { code, data } = await getParentList()
            if (code == '200') {
                parentList.value = data
            }
        }
        apiGetParentList()

        const apiGetData = async () => {
            const { code, msg, data: { username, password, nickname, role_id, phone, email, intro, state } } = await getData({id: id.value})
            if (code == '200') {
                viewData.username = username
                viewData.password = password
                viewData.nickname = nickname
                viewData.role_id = role_id
                viewData.phone = phone
                viewData.email = email
                viewData.intro = intro
                viewData.state = config.ADMIN_STATUS[state]
            } else {
                ctx.$message.error(msg)
            }
        }
        id.value && apiGetData()

        const apiUpdateData = async params => {
            const { code, msg } = await updateData({id: id.value, ...params})
            ctx.$message[code == '200' ? 'success': 'error'](msg, 1, () => {
                loading.value = false
            })
        }

        const apiAddData = async params => {
            const { code, msg, id: newId } = await addData(params)
            ctx.$message[code == '200' ? 'success' : 'error'](msg, 1, () => {
                loading.value = false
                if (code == '200') {
                    id.value = newId
                    router.replace({name: 'adminEdit', query: {id: newId}})
                }
            })
        }

        const onPhoneChange = e => {
            const { value } = e.target
            viewData.phone = formatPhone(value)
        }

        return {
            formatPhone,
			formLeftLayout: Object.freeze(config.formLeftLayout),
            ADMIN_STATUS_VALID,
            id,
            loading,
            viewData,
            parentList,
            validateInfos,
            handleSubmit,
            onPhoneChange
        }
    }
};
</script>
