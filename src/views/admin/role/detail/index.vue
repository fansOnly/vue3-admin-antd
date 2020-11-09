<template src="./index.html"></template>

<script>
import { getRoleDetail as getData, addRole as addData, updateRole as updateData, getPermissionTree } from '@/api/admin'
import config from './config'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { formatPhone } from '@/utils/util'

export default {
	name: 'adminRoleDetail',
    setup() {
        const { ctx } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()

        const id = ref('')
        id.value = route.query?.id ?? null
        const loading = ref(false)
        let viewData = reactive({
            title: '',
            permission: [],
            state: 1
        })

        const ruleRef = reactive(config.rules)
        const { validate, validateInfos } = useForm(viewData, ruleRef)

        const handleSubmit = async () => {
            try {
                await validate()
                loading.value = true
                const params = {
                    ...toRaw(viewData),
                }
                id.value ? apiUpdateData(params) : apiAddData(params)
            } catch (error) {
                console.log('error: ', error);
            }
        }

        const permissionData = ref([])
        const apiGetpermissionTree = async () => {
            const { code, data } = await getPermissionTree()
            if (code == '200') {
                permissionData.value = data
            }
        }
        apiGetpermissionTree()

        const apiGetData = async () => {
            const { code, msg, data: { title, permission, state } } = await getData({id: id.value})
            if (code == '200') {
                viewData.title = title
                viewData.permission = permission
                viewData.state = state
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
                    router.replace({name: 'adminRoleEdit', query: {id: newId}})
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
            ROLE_STATUS: config.ROLE_STATUS,
            id,
            loading,
            viewData,
            permissionData,
            validateInfos,
            handleSubmit,
            onPhoneChange
        }
    }
};
</script>
