<template src="./index.html"></template>

<script>
    import PageSkeleton from '@/components/PageSkeleton.vue'

    import { searchGlobal as getDataList } from '@/api/common'
    import config from './config'
    import { computed, getCurrentInstance, reactive, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    export default {
        name: 'searchList',
        setup() {
            const { ctx } = getCurrentInstance()
            const router = useRouter()
            const route = useRoute()

            const keyword = route.query.keyword
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

            let filterValues = reactive({
                keyword
            })
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

            const handleClickItem = (type, id) => {
                if (type === 'edit') {
					router.push({name: 'articleEdit', query: {id}})
                } else {
                    ctx.$message.error('非法操作')
                }
            }

            const highlightKeyword = val => {
                if (val.indexOf(keyword) !== -1) {
                    const reg = new RegExp(keyword, 'g');
                    return val.replace(reg, `<span class='ant-btn-primary'>${keyword}</span>`)
                } else {
                    return val
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
                        dataList.value = data.map(v => {
                            v.title = highlightKeyword(v.title)
                            return v
                        })
                        pagination.total = total
                    }
                } catch (error) {
                    loading.value = false
                }
            }
            apiGetDataList()

            return {
                panelGroup: Object.freeze(config.panelGroup),
                excelConfig: Object.freeze(config.excelConfig),
                filterList: Object.freeze(config.filterList),
                BADGE_STATUS: config.BADGE_STATUS,
                columnList: config.columnList,
                dataList,
                pagination,
                loading,
                rowSelection,
                selectedRowKeys,
                handleFilter,
                handleTableChange,
                handleClickItem,
            }
        },
        components: {
            PageSkeleton,
        }
    }
</script>
