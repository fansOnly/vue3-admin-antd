<template src="./index.html"></template>

<script>
import PageSkeleton from '@/components/PageSkeleton.vue'

import { getArticleRecycleList as getDataList, restoreArticle, clearArticle, clearAllArticle } from '@/api/article'
import config from './config'
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'articleRecycleList',
    setup() {
        const { ctx } = getCurrentInstance()
        const router = useRouter()

        const dataList = ref([])
        const pagination = reactive(config.pagination)
        const loading = ref(false)
        const selectedRowKeys = ref([])

        const rowSelection = computed(() => {
            return {
                onChange: selectedKeys => {
                    selectedRowKeys.value = selectedKeys
                }
            }
        })

        const previewVisible = ref(false)
        const previewPhoto = ref('')

        const handlePhotoPreview = file => {
            previewPhoto.value = file
            previewVisible.value = true
        }

        let filterValues = reactive({})
        const handleFilter = (values = {}) => {
            filterValues = values
            pagination.current = 1
            apiGetDataList(values)
        }

        const handleClickItem = (type, id) => {
            if (type === 'delete') {
                apiDeleteData([id])
            } else if (type === 'restore') {
                apiRestoreData([id])
            }
        }

        const handleTableChange = page => {
            if (!dataList.value.length) return;
            loading.value = true
            pagination.current = page.current
            apiGetDataList()
        }

        const handleBulkDelete = () => {
            const delteIds = dataList.value.filter(v => selectedRowKeys.value.includes(v.id)).map(v => v.id)
            apiDeleteData(delteIds)
        }

        const apiGetDataList = async () => {
            const { current, pageSize } = pagination
            const params = { page: current, pageSize, ...filterValues }
            loading.value = true
            try {
                const { code, data = [], total = 0 } = await getDataList(params)
                loading.value = false
                if (code == 200) {
                    dataList.value = data
                    pagination.total = total
                }
            } catch (error) {
                loading.value = false
            }
        }
        apiGetDataList()

        const apiDeleteData = async ids => {
            loading.value = true
            const { code, msg } = await clearArticle({ids})
            if (code == '200') {
                ctx.$message.success(msg, 1, () => {
                    loading.value = false
                    selectedRowKeys.value = []
                    const { current, pageSize, total } = pagination
                    const { length } = ids
                    if ((total - length <= pageSize * (current - 1)) && (total - length > pageSize)) {
                        pagination.current = current - 1
                    }
                    apiGetDataList()
                })
            } else {
                ctx.$message.error(msg)
                loading.value = false
            }
        }

        const apiRestoreData = async ids => {
            loading.value = true
            const { code, msg } = await restoreArticle({ids})
            if (code == '200') {
                ctx.$message.success(msg, 1, () => {
                    loading.value = false
                    selectedRowKeys.value = []
                    const { current, pageSize, total } = pagination
                    const { length } = ids
                    if ((total - length <= pageSize * (current - 1)) && (total - length > pageSize)) {
                        pagination.current = current - 1
                    }
                    apiGetDataList()
                })
            } else {
                ctx.$message.error(msg)
                loading.value = false
            }
        }

        return {
            panelGroup: Object.freeze(config.panelGroup),
            filterList: Object.freeze(config.filterList),
            columnList: config.columnList,
            dataList,
            pagination,
            loading,
            previewVisible,
            previewPhoto,
            rowSelection,
            selectedRowKeys,
            handleFilter,
            handleTableChange,
            handleBulkDelete,
            handleClickItem,
            handlePhotoPreview
        }
    },
    components: {
        PageSkeleton,
    }
}
</script>
