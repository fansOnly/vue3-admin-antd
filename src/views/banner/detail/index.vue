<template src="./index.html"></template>

<script>
import SingleUpload from '@/components/SingleUpload.vue'
import { getBannerDetail as getData, addBanner as addData, updateBanner as updateData, getBannerClassList as getParentList } from '@/api/banner'
import config from './config'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'

export default {
	name: 'bannerDetail',
    setup() {
        const { ctx } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()

        const id = ref('')
        id.value = route.query.id
        const loading = ref(false)
        let viewData = reactive({
            sortnum: '',
            title: '',
            classid: '',
            photos: [],
            state: 1,
            blank: 1
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
            const { code, msg, data: { title, sortnum, classid, url, content, photos, state, file } } = await getData({id: id.value})
            if (code == '200') {
                viewData.title = title
                viewData.sortnum = sortnum
                viewData.classid = classid || parentList.value[1].id
                viewData.url = url
                viewData.content = content
                viewData.photos = photos
                viewData.file = file
                viewData.state = state
                loaded.value = true
            } else {
                ctx.$message.error(msg)
            }
        }
        id.value && apiGetData()

        const apiUpdateData = async params => {
            const { code, msg } = await updateData({id, ...params})
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
            formRightLayout: Object.freeze(config.formRightLayout),
			formLeftLayout: Object.freeze(config.formLeftLayout),
            BANNER_STATUS: config.BANNER_STATUS,
			WINDOW_OPEN_GROUP: config.WINDOW_OPEN_GROUP,
            id,
            loading,
            loaded,
            viewData,
            parentList,
            savedIds,
            deletedIds,
            validateInfos,
            handleSubmit,
            handleUpload
        }
    },
	components: {
		SingleUpload,
    }
};
</script>
