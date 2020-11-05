<template src="./index.html"></template>

<script>
import SingleUpload from '@/components/SingleUpload.vue'
import { getArticleClassDetail as getData, addArticleClass as addData, updateArticleClass as updateData, getArticleClassTree as getParentList } from '@/api/article'
import config from './config'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'

export default {
	name: 'articleClassDetail',
    setup() {
        const { ctx } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()

        const id = ref('')
        id.value = route.query.id
        const parent_id = route.query.parent_id
        const loading = ref(false)
        let viewData = reactive({
            sortnum: '',
            name: '',
            parent_id: parent_id ?? '',
            intro: '',
            photos: [],
            state: 1,
        })
        const parentList = ref([])

        const ruleRef = reactive(config.rules)
        const { validate, validateInfos } = useForm(viewData, ruleRef)

        const handleSubmit = async () => {
            try {
                await validate()
                loading.value = true
                const params = {
                    ...toRaw(viewData),
                    deletedIds: deletedIds.value,
                    savedIds: savedIds.value
                }
                id.value ? apiUpdateData(params) : apiAddData(params)
            } catch (error) {
                console.log('error: ', error);
            }
        }

        const loaded = ref(false)
        const deletedIds = ref([])
        const savedIds = ref([])

        const handleUpload = (data, tag) => {
            viewData[tag] = data.uploadList
			deletedIds.value = data.deletedIds
			savedIds.value = data.savedIds
        }

        const apiGetParentList = async () => {
            const { code, data } = await getParentList()
            if (code == '200') {
                parentList.value = data
            }
        }
        apiGetParentList()

        const apiGetData = async () => {
            const { code, msg, data: { name, sortnum, parent_id, intro, photos, state } } = await getData({id: id.value})
            if (code == '200') {
                viewData.name = name
                viewData.sortnum = sortnum
                viewData.parent_id = parent_id
                viewData.intro = intro
                viewData.photos = photos
                viewData.state = state
                loaded.value = true
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
            formRightLayout: Object.freeze(config.formRightLayout),
            INFO_CLASS_STATUS: config.INFO_CLASS_STATUS,
            id,
            loading,
            viewData,
            parentList,
            loaded,
            savedIds,
            deletedIds,
            handleUpload,
            validateInfos,
            handleSubmit
        }
    },
	components: {
		SingleUpload
    }
};
</script>
