<template src="./index.html"></template>

<script>
import PageSkeleton from '@/components/PageSkeleton.vue'

import { getArticleClassIndex as getDataList, deleteArticleClass as deleteData } from '@/api/article'
import config from './config'
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'articleClassIndex',
    setup() {
        const { ctx } = getCurrentInstance()
        const router = useRouter()

        const dataList = ref([])
        const loading = ref(false)

        const previewVisible = ref(false)
        const previewPhoto = ref('')

        const handlePhotoPreview = file => {
            previewPhoto.value = file
            previewVisible.value = true
        }

        const handleClickItem = (type, id) => {
            if (type === 'add') {
                router.push({name: 'articleClassAdd', query: {parent_id: id}})
            } else if (type === 'edit') {
                router.push({name: 'articleClassEdit', query: {id}})
            } else if (type === 'delete') {
                apiDeleteData([id])
            } else {
                ctx.$message.error('非法操作')
            }
        }

        const apiGetDataList = async () => {
            loading.value = true
            try {
                const { code, data = [] } = await getDataList()
                loading.value = false
                if (code == 200) {
                    dataList.value = data
                }
            } catch (error) {
                loading.value = false
            }
        }
        apiGetDataList()

        const apiDeleteData = async ids => {
            loading.value = true
            const { code, msg } = await deleteData({ids})
            if (code == '200') {
                ctx.$message.success(msg, 1, () => {
                    loading.value = false
                    apiGetDataList()
                })
            } else {
                ctx.$message.error(msg)
                loading.value = false
            }
        }

        return {
            panelGroup: Object.freeze(config.panelGroup),
            columnList: config.columnList,
            dataList,
            loading,
            previewVisible,
            previewPhoto,
            handleClickItem,
            handlePhotoPreview
        }
    },
    components: {
        PageSkeleton,
    }
}
</script>
