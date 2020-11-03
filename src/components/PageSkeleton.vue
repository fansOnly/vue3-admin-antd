<template>
    <div class="container">
        <!-- 筛选区域 -->
        <a-form-model v-if="optionList.SHOWAREA" ref="filterForm" :model="filterValues" layout="horizontal" :colon="true" label-align="right" class="ant-advanced-search-form">
            <a-row :gutter="24">
                <a-col v-if="filterList.FILTER_ID" :span="6">
                    <a-form-model-item :label="$t('GLOBAL.DATA_ID')">
                        <a-input v-model="filterValues.fid" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_ID')" />
                    </a-form-model-item>
                </a-col>
                <slot name="filterBeforeSlot" :filterValues="filterValues"></slot>
                <a-col v-if="filterList.FILTER_TITLE" :span="6">
                    <a-form-model-item :label="$t('GLOBAL.DATA_TITLE')">
                        <a-input v-model="filterValues.ftitle" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_TITLE')" />
                    </a-form-model-item>
                </a-col>
                <a-col v-if="filterList.FILTER_NAME" :span="6">
                    <a-form-model-item :label="$t('GLOBAL.DATA_NAME')">
                        <a-input v-model="filterValues.fname" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_NAME')" />
                    </a-form-model-item>
                </a-col>
                <slot name="filterAfterSlot" :filterValues="filterValues"></slot>
                <a-col v-if="filterList.FILTER_PHONE" :span="6">
                    <a-form-model-item :label="$t('GLOBAL.PHONE')">
                        <a-input v-model="filterValues.fphone" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.PHONE')" />
                    </a-form-model-item>
                </a-col>
                <a-col v-if="filterList.FILTER_CREATE_TIME" :span="6">
                    <a-form-model-item :label="$t('GLOBAL.CREATE_DATE')">
                        <a-date-picker v-model="filterValues.fcreate_time" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.CREATE_DATE')" style="width: 100%" />
                    </a-form-model-item>
                </a-col>
                <a-col v-if="filterList.FILTER_STATE" :span="6">
                    <a-form-model-item :label="$t('GLOBAL.STATE')">
                        <a-select v-model="filterValues.fstate" :placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.STATE')">
                            <a-select-option value="">{{$t('GLOBAL.TEXT_ALL')}}</a-select-option>
                            <template v-for="(item, index) in filterList.STATUS" :key="index">
                                <a-select-option :value="index">{{item}}</a-select-option>
                            </template>
                        </a-select>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="24">
                    <a-form-model-item style="margin-bottom:0;text-align: right;">
                        <a-button type="primary" @click="handleFilterSubmit('filterForm')">{{$t('GLOBAL.TEXT_SEARCH')}}</a-button>
                        <a-button :style="{ marginLeft: '8px' }" @click="handleFilterReset('filterForm')">{{$t('GLOBAL.TEXT_RESET')}}</a-button>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
        <!-- 内容操作区域 -->
        <div v-if="optionList.SHOW_OPTION_BAR" class="option-bar">
            <slot name="optionSlot"></slot>
            <a-button v-if="optionList.ADD_ABLE" style="margin-right:10px;" type="primary" @click="handleModalShow('add')">{{$t('GLOBAL.TEXT_ADD')}}</a-button>
            <template v-if="selectedRowKeys.length">
                <div v-if="excelConfig.SHOW_EXPORT" style="margin-right:10px;">
                    <export-excel :EXCEL_FIELDS="excelConfig.EXCEL_FIELDS" :excelData="excelData" :EXCEL_NAME="excelConfig.EXCEL_NAME" :btnName="$t('GLOBAL.TEXT_EXPORT') + ' Excel'" @exportExcel="exportExcel" ></export-excel>
                </div>
                <a-button style="margin-right:10px;" type="danger" @click="handleBulkDelete">{{$t('GLOBAL.TEXT_BATCH_DELETE')}}</a-button>
                <slot name="bulkOptionSlot"></slot>
                <div v-html="$t('GLOBAL.DATA_CURRENTLY_SELECT', [selectedRowKeys.length])"></div>
            </template>
        </div>
        <!-- 列表数据展示区域 -->
        <slot name="tableSlot"></slot>
        <!-- 信息查看/修改弹窗 -->
        <template v-if="optionList.SHOW_MODAL">
            <a-modal :visible="modalVisible" width="50%" :okButtonProps="{props: {disabled: submitDisabled}}" :maskClosable="false" @cancel="handleModalCancel" @ok="handleModalSubmit">
                <div class="modal-header">
                    <div class="modal-header_title">{{modalTitle}}</div>
                </div>
                <slot name="viewSlot"></slot>
            </a-modal>
        </template>
        <!-- 图片预览弹窗 -->
        <a-modal :visible="photoPreviewVisible" :zIndex=1001 :footer="null" @cancel="handlePhotopreviewCancel">
            <img alt="" style="width: 100%" :src="getImgAbsPath(previewPhoto)" />
        </a-modal>
    </div>
</template>

<script>
    import ExportExcel from 'components/ExportExcel.vue'
    import { getImgAbsPath } from '@/utils/util'

    export default {
        name: 'pageSkeleton',
        components: {
            ExportExcel
        },
        props: {
            dataList: {  // 表单数据
                type: Array,
                default: function () {
                    return []
                }
            },
            optionList: {
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
            photoPreviewVisible: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            previewPhoto: {
                type: String,
                default: function () {
                    return ''
                }
            },
            modalVisible: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            modalTitle: {
                type: String,
                default: function () {
                    return ''
                }
            },
            submitDisabled: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
        },
        data() {
            return {
                excelData: [],
                filterValues: {},  // 筛选的值
            }
        },
        methods: {
            exportExcel() {
                let exportList = this.dataList.filter(item => this.selectedRowKeys.includes(item.id));
                if (!exportList.length) {
                    this.$message.info(this.$t('GLOBAL.OPTION_CHECK_NONE'));
                    return;
                }
                this.excelData = exportList;
            },
			handleBulkDelete() {
				const that = this;
				this.$confirm({
					title: this.$t('GLOBAL.OPTION_DELETE_REMIND'),
					content: this.$t('GLOBAL.OPTION_DELETE_CONFIRM'),
					okType: 'danger',
					onOk() {
                        that.$emit('delete-multi-items');
					},
                });
            },
            handlePhotopreviewCancel() {
				this.$emit('handle-photopreview-cancel');
            },
            handleModalShow (action) {
                this.$emit('show-modal', action);
            },
            handleModalCancel () {
                this.$emit('handle-modal-cancel');
            },
            handleModalSubmit () {
                this.$emit('handle-modal-submit');
            },
            handleFilterSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (!valid) return;
                    const values = {
                        id: this.filterValues['fid'],
                        admin_username: this.filterValues['fadminusername'],
                        admin_nickname: this.filterValues['fadminnickname'],
                        member_nickname: this.filterValues['fmembernickname'],
                        phone: this.filterValues['fphone'],
                        class_id: this.filterValues['fparent'],
                        section_id: this.filterValues['fsectionid'],
                        category_id: this.filterValues['fcatogoryid'],
                        name: this.filterValues['fname'],
                        nickname: this.filterValues['fnickname'],
                        title: this.filterValues['ftitle'],
                        admin_id: this.filterValues['fadminid'],
                        admin: this.filterValues['fadmin'],
                        operation: this.filterValues['foperation'],
                        object_table: this.filterValues['fobjecttable'],
                        state: this.filterValues['fstate'],
                        create_time: this.filterValues['fcreate_time'] && this.filterValues['fcreate_time'].format('YYYY-MM-DD'),
                        update_time: this.filterValues['fupdate_time'] && this.filterValues['fupdate_time'].format('YYYY-MM-DD'),
                        delete_time: this.filterValues['fdelete_time'] && this.filterValues['fdelete_time'].format('YYYY-MM-DD'),
                    };
                    // console.log('filterValues:', values);
                    this.$emit('handle-filter-submit', values);
                })
            },
            handleFilterReset (formName) {
                this.$refs[formName].resetFields();
                this.filterValues = {};
                this.$emit('handle-filter-reset');
            },
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
