<template>
    <page-skeleton
        :data-list="dataList"
        :selected-row-keys="selectedRowKeys"
        :option-list="optionList"
        :filter-list="filterList"
        :excel-config="excelConfig"
        :modal-visible="modalVisible"
        :modal-title="modalTitle"
        :submit-disabled="submitDisabled"
        @delete-multi-items="handleBulkDelete"
        @handle-filter-submit="handleFilterSubmit"
        @handle-filter-reset="handleFilterReset"
        @show-modal="showModal"
        @handle-modal-cancel="handleModalCancel"
        @handle-modal-submit="handleModalSubmit"
    >
        <!-- 渲染数据 -->
        <template v-slot:tableSlot>
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="pagination" :row-selection="rowSelection" bordered @change="handleTableChange" >
                <!-- <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="action | BADGE_STATUS" :text="filterList.STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-button size="small" @click="showModal('edit', record.id)">{{$t('GLOBAL.TEXT_EDIT')}}</a-button>
                    <span>&nbsp;</span>
                    <a-popconfirm :title="$t('GLOBAL.OPTION_DELETE_CONFIRM')" @confirm="() => delItem(record.id)">
                        <a-button size="small" type="danger" >{{$t('GLOBAL.TEXT_DELETE')}}</a-button>
                    </a-popconfirm>
                </span> -->
            </a-table>
        </template>
        <!-- 渲染编辑框 -->
        <template v-slot:viewSlot>
            <a-form-model ref="viewForm" :model="viewData" :rules="rules" :layout="layout" :colon="colon" :label-align="labelAlign">
                <a-form-model-item v-if="operation == 'edit'" :label="$t('GLOBAL.DATA_ID')">
                    <a-input v-model="viewData.id" disabled />
                </a-form-model-item>
                <a-form-model-item :label="$t('GLOBAL.DATA_NAME')" prop="name">
                    <a-input v-model="viewData.name" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_NAME')" />
                </a-form-model-item>
                <a-form-model-item :label="$t('GLOBAL.DATA_DESC')">
                    <a-textarea v-model="viewData.content" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_DESC')" :auto-size="{ minRows: 2, maxRows: 4 }" />
                </a-form-model-item>
            </a-form-model>
        </template>
    </page-skeleton>
</template>

<script>
import PageSkeleton from 'components/PageSkeleton.vue'

import {
    getBannerClassList as getDataList,
    addBannerClass as addData,
    getBannerClassDetail as getData,
    updateBannerClass as updateData,
    deleteBannerClass as deleteDataList
} from '@/api/banner'
import config from './config'

import { pluck, deepCopy } from 'utils/util'

export default {
    name: 'bannerClass',
    components: {
        PageSkeleton,
    },
    data () {
        return {
            layout: config.layout,
            colon: config.colon,
            labelAlign: config.labelAlign,
            rules: config.rules,
            optionList: config.optionList,
            excelConfig: config.excelConfig,
            columnList: config.columnList,
            filterList: config.filterList,
            pagination: config.pagination,
            dataList: [],
            loading: true,
            selectedRowKeys: [],
            modalVisible: false,
            modalTitle: '',
            submitDisabled: false,
            filterValues: {}, // 筛选条件
            operation: '',
            viewData: {},
        }
    },
    computed: {
        rowSelection () {
            let { selectedRowKeys } = this;
            return {
                selectedRowKeys,
                onChange: this.checkItems,
            }
        }
    },
    created () {
        this.getDataListFn();
    },
    methods: {
        checkItems(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        delItem(id) {
            this.deleteDataListFn([id]);
        },
        handleBulkDelete() {
            const deleteList = this.dataList.filter(
                item => this.selectedRowKeys.includes(item.id)
            );
            const deleteIds = pluck(deleteList, 'id');
            this.deleteDataListFn(deleteIds);
        },
        handleFilterSubmit (values = {}) {
            this.filterValues = values;
            this.pagination = {
                ...this.pagination,
                current: 1
            };
            this.getDataListFn();
        },
        handleFilterReset () {
            this.handleFilterSubmit();
        },
        handleTableChange (pagination) {
            if (!this.dataList.length) return;
            this.loading = true;
            this.pagination = pagination;
            this.getDataListFn();
        },
        showModal (action, editId) {
            if (action == 'add') {
                this.operation = action;
                this.modalTitle = '新增幻灯片分类';
                this.modalVisible = true;
            } else if (action == 'edit') {
                this.operation = action;
                this.editId = editId;
                this.modalTitle = '编辑幻灯片分类';
                this.getDataFn();
            } else {
                this.$message.error(this.$t('GLOBAL.TEXT_OPERATION_ILLEGAL'));
            }
        },
        handleModalCancel () {
            this.modalVisible = false;
            this.resetFormData();
        },
        handleModalSubmit () {
            this.$refs.viewForm.validate(valid => {
                if (!valid) return;
                if (JSON.stringify(this._viewData) !== JSON.stringify(this.viewData)) {
                    this.submitDisabled = true;
                    if (this.operation == 'add') {
                        this.addDataFn(this.viewData);
                    }
                    if(this.operation == 'edit') {
                        this.updateDataFn(this.viewData);
                    }
                } else {
                    this.handleModalCancel();
                }
            })
        },
        resetFormData () {
            this.viewData = {};
            this.submitDisabled = false;
            this.$refs.viewForm.resetFields();
        },
        async getDataListFn () {
            const { current, pageSize } = this.pagination;
            const params = { page: current, pageSize, ...this.filterValues };
            try {
                const res = await getDataList(params);
                this.loading = false;
                if (res.code == 200) {
                    this.dataList = res.data;
                    this.pagination = {
                        ...this.pagination,
                        total: res.total,
                    };
                } else {
                    this.$message.error(res.msg);
                }
                this.resetFormData();
            } catch (error) {
                this.loading = false;
            }
        },
        async getDataFn () {
            const res = await getData({id: this.editId})
            if (res.code == '200') {
                this.viewData = res.data;
                this._viewData = deepCopy(res.data);
                this.modalVisible = true;
            } else {
                this.$message.error(res.msg);
            }
        },
        async addDataFn (params) {
            const res = await addData(params);
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.getDataListFn();
                    this.submitDisabled = false;
                    this.modalVisible = false;
                });
            } else {
                this.$message.error(res.msg, () => {
                    this.submitDisabled = false;
                });
            }
        },
        async updateDataFn (params) {
            const res = await updateData(params);
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.getDataListFn();
                    this.submitDisabled = false;
                    this.modalVisible = false;
                });
            } else {
                this.$message.error(res.msg, () => {
                    this.submitDisabled = false;
                });
            }
        },
        async deleteDataListFn (ids) {
            const params = { ids: ids };
            const res = await deleteDataList(params);
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.selectedRowKeys = [];
                    let { current, pageSize, total } = this.pagination;
                    const delLength = ids.length;
                    if ((total - delLength <= pageSize * (current - 1)) && (total - delLength > pageSize)) {
                        this.pagination.current = current - 1;
                    }
                    this.getDataListFn();
                });
            } else {
                this.$message.error(res.msg);
            }
        },
    }
}
</script>
