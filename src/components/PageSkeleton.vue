<template>
    <div class="container">
        <!-- 筛选区域 -->
        <a-form v-if="panelGroup.SHOW_FILTER_AREA" ref="filterForm" layout="horizontal" :colon="true" label-align="right" class="ant-advanced-search-form">
            <a-row :gutter="24">
                <a-col v-if="filterList.FILTER_ID" :span="6">
                    <a-form-item label="数据ID">
                        <a-input v-model:value="filterRef.fid" allow-clear placeholder="请输入数据ID" />
                    </a-form-item>
                </a-col>
                <a-col v-if="filterList.FILTER_TITLE" :span="6">
                    <a-form-item label="数据标题">
                        <a-input v-model:value="filterRef.ftitle" allow-clear placeholder="请输入数据标题" />
                    </a-form-item>
                </a-col>
                <a-col v-if="filterList.FILTER_CREATE_TIME" :span="6">
                    <a-form-item label="创建日期">
                        <a-date-picker v-model:value="filterRef.fcreate_time" placeholder="请选择创建日期" style="width: 100%" />
                    </a-form-item>
                </a-col>
                <a-col v-if="filterList.FILTER_STATE" :span="6">
                    <a-form-item label="数据状态">
                        <a-select v-model:value="filterRef.fstate" placeholder="请选择数据状态">
                            <a-select-option value="">全部</a-select-option>
                            <template v-for="(item, index) in filterList.STATUS" :key="index">
                                <a-select-option :value="index">{{item}}</a-select-option>
                            </template>
                        </a-select>
                    </a-form-item>
                </a-col>
                <slot name="filterSlot" :filterValues="filterRef"></slot>
            </a-row>
            <a-row>
                <a-col :span="24">
                    <a-form-item style="margin-bottom:0;text-align: right;">
                        <a-button type="primary" @click="handleFilterSubmit">搜索</a-button>
                        <a-button :style="{ marginLeft: '8px' }" @click="handleFilterReset">重置</a-button>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <!-- 内容操作区域 -->
        <div v-if="panelGroup.SHOW_OPTION_BAR" class="option-bar">
            <slot name="operateSlot"></slot>
            <a-button v-if="panelGroup.SHOW_OPTION_ADD" v-operate-auth="'add'" style="margin-right:10px;" type="primary" @click="handleRoute('add')">新增</a-button>
            <template v-if="selectedRowKeys.length">
                <div v-operate-auth="'export'" style="margin-right:10px;">
                    <!-- TODO vue3.0 不兼容？？？ -->
                    <!-- <ExportExcel :data="exportData" :fields="excelConfig.fields" :name="excelConfig.name" button-text="导出 Excel" @export-excel="exportExcel" /> -->
                </div>
                <a-button v-operate-auth="'delete'" style="margin-right:10px;" type="danger" @click="handleBulkDelete">删除</a-button>
                <div>已选择 {{selectedRowKeys.length}} 条数据</div>
            </template>
        </div>
        <!-- 列表数据展示区域 -->
        <slot name="tableSlot"></slot>
        <!-- 图片预览弹窗 -->
        <a-modal :visible="previewVisible" :zIndex=1001 :footer="null" @cancel="handlePreviewCancel">
            <img alt="" style="width: 100%" :src="getImgAbsPath(previewPhoto)" />
        </a-modal>
    </div>
</template>

<script>
    // import ExportExcel from 'components/ExportExcel.vue'
    import { getImgAbsPath } from '@/utils/util'
    import { getCurrentInstance, reactive, ref, toRaw, toRefs } from 'vue'
    import { useForm } from '@ant-design-vue/use'
    import { Modal } from 'ant-design-vue'

    export default {
        name: 'pageSkeleton',
        props: {
            dataList: {  // 表单数据
                type: Array,
                default: function () {
                    return []
                }
            },
            panelGroup: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            filterList: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            excelConfig: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            selectedRowKeys: {
                type: Array,
                default: function () {
                    return []
                }
            },
            previewVisible: {
                type: Boolean,
                default: false
            },
            previewPhoto: {
                type: String,
                default: ''
            }
        },
        setup(props, { emit }) {
            const { ctx } = getCurrentInstance()
            const { dataList, selectedRowKeys } = toRefs(props)

            const filterRef = reactive({
                fid: '',
                ftitle: '',
                fcreate_time: '',
                fstate: ''
            })

            const { resetFields } = useForm(filterRef, reactive({}))

            const handleFilterSubmit = async () => {
                const filterValues = toRaw(filterRef)
                filterValues.fcreate_time = typeof filterValues.fcreate_time === 'object' ? filterValues.fcreate_time.format('YYYY-MM-DD') : filterValues.fcreate_time
                emit('handle-filter', filterValues)
            }

            const handleFilterReset = async () => {
                resetFields()
                emit('handle-filter')
            }

            const handlePreviewCancel = () => {
                emit('update:previewVisible', false)
            }

            const handleRoute = type => {
                emit('handle-route', type)
            }

            const excelData = ref([])
            const exportExcel = () => {
                const exportList = dataList.filter(v => selectedRowKeys.includes(v.id))
                if (!exportList.length) {
                    ctx.$message.info('没有选中数据');
                    return;
                }
                excelData.value = exportList
            }

            const handleBulkDelete = () => {
                Modal.confirm({
                    title: '删除提醒',
					content: '确认删除当前选中的信息吗?',
					okType: 'danger',
					onOk() {
                        emit('handle-bulk-delete');
					},
                })
            }

            return {
                getImgAbsPath,
                filterRef,
                excelData,
                handleFilterSubmit,
                handleFilterReset,
                handlePreviewCancel,
                exportExcel,
                handleBulkDelete,
                handleRoute
            }
        },
        components: {
            // ExportExcel
        }
    }
</script>
<style scoped>
.modal-header {
    position: relative;
    top: -24px;
    text-align: center;
}
.modal-header::after {
    content: "";
    position: absolute;
    left: -24px;
    right: -24px;
    bottom: 0;
    height: 0;
    border-bottom: 1px solid #e8e8e8;
}
.modal-header_title {
    font-size: 18px;
    line-height: 54px;
}
.option-bar {
    padding-bottom: 15px;
    display: flex;
    align-items: center;
}
</style>
