<template src="./index.html"></template>

<script>
import { getBannerClassDetail as getData, addBannerClass as addData, updateBannerClass as updateData } from '@/api/banner'
import config from './config'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'

export default {
	name: 'bannerClassDetail',
    setup() {
        const { ctx } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()

        const id = ref('')
        id.value = route.query?.id
        const loading = ref(false)
        let viewData = reactive({
            title: '',
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

        const apiGetData = async () => {
            const { code, msg, data: { title, content, state } } = await getData({id: id.value})
            if (code == '200') {
                viewData.title = title
                viewData.content = content
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
                    router.replace({name: 'articleClassEdit', query: {id: newId}})
                }
            })
        }

        return {
			formLeftLayout: Object.freeze(config.formLeftLayout),
            BANNER_CLASS_STATUS: config.BANNER_CLASS_STATUS,
            id,
            loading,
            viewData,
            validateInfos,
            handleSubmit
        }
    }
};
</script>
