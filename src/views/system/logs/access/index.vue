<template src="./index.html"></template>

<script>
    import PageSkeleton from '@/components/PageSkeleton.vue'

    import { getAccesslogList as getDataList, deleteAccesslog as deleteData } from '@/api/system'
    import config from './config'
    import { computed, getCurrentInstance, reactive, ref } from 'vue'

    export default {
        name: 'accessLogList',
        setup() {
            const { ctx } = getCurrentInstance()

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

            let filterValues = reactive({})
            const handleFilter = (values = {}) => {
                filterValues = values
                pagination.current = 1
                apiGetDataList(values)
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

            const handleClickItem = (type, id) => {
                if (type === 'delete') {
                    apiDeleteData([id])
                } else {
                    ctx.$message.error('非法操作')
                }
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
                const { code, msg } = await deleteData({ids})
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
                excelConfig: Object.freeze(config.excelConfig),
                filterList: Object.freeze(config.filterList),
                columnList: config.columnList,
                dataList,
                pagination,
                loading,
                rowSelection,
                selectedRowKeys,
                handleFilter,
                handleTableChange,
                handleBulkDelete,
                handleClickItem
            }
        },
        components: {
            PageSkeleton,
        }
    }
</script>
