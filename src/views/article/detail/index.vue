<template src="./index.html"></template>

<script>
import SingleUpload from '@/components/SingleUpload.vue'
import BulkUpload from '@/components/BulkUpload.vue'
import { getArticleDetail as getData, addArticle as addData, updateArticle as updateData, getArticleClassIndex as getParentList } from '@/api/article'
import config from './config'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'

export default {
	name: 'articleDetail',
    setup() {
        const { ctx } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()

        const id = ref(route.query?.id ?? '')
        const loading = ref(false)
        let viewData = reactive({
            sortnum: '',
            title: '',
            classid: '',
            publish_time: '',
            thumbnail: [],
            tags: [],
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
            const { code, msg, data: { title, sortnum, classid, publish_time, intro, content, thumbnail, photos, state, file, tags } } = await getData({id: id.value})
            if (code == '200') {
                viewData.title = title
                viewData.sortnum = sortnum
                viewData.classid = classid
                viewData.publish_time = publish_time
                viewData.intro = intro
                viewData.content = content
                viewData.thumbnail = thumbnail
                viewData.photos = photos
                viewData.tags = tags
                viewData.file = file
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
                    router.replace({name: 'articleEdit', query: {id: newId}})
                }
            })
        }

        const onPublishDateChange = val => {
            viewData.publish_time = val
        }

        return {
            formRightLayout: Object.freeze(config.formRightLayout),
			formLeftLayout: Object.freeze(config.formLeftLayout),
            INFO_STATUS: config.INFO_STATUS,
            ARTICLE_TAGS: config.ARTICLE_TAGS,
            id,
            loading,
            loaded,
            viewData,
            parentList,
            savedIds,
            deletedIds,
            validateInfos,
            handleSubmit,
            handleUpload,
            onPublishDateChange
        }
    },
	components: {
        SingleUpload,
        BulkUpload
    }
};
</script>
